import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NodesService } from '../root/shared/nodes.service';
import { tap, takeUntil } from 'rxjs/operators';
import { AuthService } from '../login/shared/auth.service';
import { Article } from '../root/shared/models/article';
import { Base } from 'src/app/root/shared/base';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent extends Base implements OnInit {
  public article$: any;
  private selected: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private nodesService: NodesService,
    private authService: AuthService) {
      super();
    }

  ngOnInit() {
    this.article$ = this.nodesService.findArticle(this.route.paramMap).pipe(
      takeUntil(this.destroy$),
      tap((data: Article) => { this.selected = data })
    );
  }

  private edit(): void {
    this.router.navigate([this.selected.id, 'edit']);
  }

  private remove(): void {
    this.nodesService.removeArticle(this.selected);
  }
}
