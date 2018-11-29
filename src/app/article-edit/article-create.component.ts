import { Component, OnInit } from '@angular/core';
import { DynamicFormControlModel, DynamicFormService, DynamicFormLayout } from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';
import { FORM_MODEL, FORM_LAYOUT } from './share/schema';
import { ActivatedRoute, Router } from '@angular/router';
import { NodesService } from '../root/shared/nodes.service';
import { Article } from '../root/shared/models/article';
import { Base } from '../root/shared/base';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleCreateComponent extends Base implements OnInit {
  public formModel: DynamicFormControlModel[] = FORM_MODEL;
  public formLayout: DynamicFormLayout = FORM_LAYOUT;
  public formGroup: FormGroup;
  public selected: any;
  public label = 'Create';
  public root = false;

  constructor(protected formService: DynamicFormService,
    protected route: ActivatedRoute,
    public nodesService: NodesService) { 
      super();
    }

  ngOnInit() {
    this.formGroup = this.formService.createFormGroup(this.formModel);
    this.formGroup.reset();
    this.nodesService.findArticle(this.route.paramMap).pipe(
      takeUntil(this.destroy$)
    ).subscribe((data: Article) => {
      this.selected = data;
    });
  }

  submit() {
    const article = new Article(this.formGroup.getRawValue());
    this.nodesService.createArticle(this.selected, article, this.root);
  }
}
