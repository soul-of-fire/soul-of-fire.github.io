import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NodesService } from '../root/shared/nodes.service';
import { ArticleCreateComponent } from './article-create.component';
import { Article } from '../root/shared/models/article';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent extends ArticleCreateComponent implements OnInit, AfterViewInit {
  public label = 'Edit';

  ngAfterViewInit() {
    setTimeout(() => {
      this.formGroup.patchValue(this.selected.article);
    })
  }

  submit() {
    Object.assign(this.selected.article, this.formGroup.getRawValue());
    this.nodesService.updateArticle(this.selected);
  }
}
