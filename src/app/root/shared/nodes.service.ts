import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../login/shared/auth.service';
import { Load, Clear, Loaded, Edit } from 'src/app/root/shared/store/article-store';
import { Article } from 'src/app/root/shared/models/article';
import { tap, take, map, filter, withLatestFrom, takeUntil } from 'rxjs/operators';
import { Modify } from './models/modify';
import { Base } from './base';

@Injectable({
  providedIn: 'root'
})
export class NodesService extends Base {
  public tree: any;
  public articles$: Observable<any>;
  public selected: any;

  constructor(private router: Router, private store: Store<any>, private auth: AuthService) {
    super();
    this.articles$ = this.store.select('articles').pipe(
      takeUntil(this.destroy$),
      tap(() => {
        this.tree.treeModel.update()
      })
    );
    this.auth.auth$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      data && this.loadData();
      !data && this.logOut();
    })
  }

  private loadData(): void {
    const articles = localStorage.getItem('articles');
    articles && this.store.dispatch(new Loaded(JSON.parse(articles)));
    !articles && this.store.dispatch(new Load());
  }

  private logOut() {
    this.store.dispatch(new Clear());
    this.router.navigate(['']);
  }

  public filter(text: string) {
    this.tree.treeModel.filterNodes((node) => {
      return node.data.article.title.toLowerCase().startsWith(text.toLowerCase());
    }, true);
    !text && this.tree.treeModel.collapseAll();
  }

  public findArticle(paramMap) {
    return paramMap.pipe(
      takeUntil(this.destroy$),
      withLatestFrom(this.articles$),
      map(([params, articles]) => {
        if (articles) {
          const id = params.get('id');
          this.tree.treeModel.getNodeById(id).setActiveAndVisible();
          return this.searchInTree(articles, id);
        }
      })
    )
  }

  public createArticle(selected: any, created: any, root = false) {
    this.articles$.pipe(take(1)).subscribe((articles: any) => {
      if (root) {
        articles.push(created);
      } else {
        const found = this.searchInTree(articles, selected.id);
        if (found.children) {
          found.children.push(created)
        } else {
          found['children'] = [created];
        }
      }
      this.store.dispatch(new Edit(new Modify(articles, created.id)));
    })
  }

  public updateArticle(selected: any) {
    this.articles$.pipe(take(1)).subscribe((articles: any) => {
      const found = this.searchInTree(articles, selected.id);
      Object.assign(found, selected);
      this.store.dispatch(new Edit(new Modify(articles, selected.id)));
    })
  }

  
  public removeArticle(selected: any) {
    this.articles$.pipe(take(1)).subscribe((articles: any) => {
      let found = this.searchInTree(articles, selected.id, true);
      let redirect = found.id ? found.id : articles[0].id;
      found = found ? found.children : articles;
      found.splice(found.indexOf(selected), 1);
      this.store.dispatch(new Edit(new Modify(articles, redirect)));
    })
  }

  private searchInTree(articles, id, findParent = false, array = [], parent = '') {
    articles && articles.map(article => {
      if (article.id == id) {
        array.push(findParent ? parent : article);
      } else {
        this.searchInTree(article.children, id, findParent, array, article);
      }
    })
    return array[0];
  }
}
