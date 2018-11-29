import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TreeModule } from 'angular-tree-component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicFormsBootstrapUIModule } from "@ng-dynamic-forms/ui-bootstrap";

import { AppComponent } from './root/app.component';
import { ArticleComponent } from './article/article.component';
import { TreeComponent } from './tree/tree.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { NodesService } from './root/shared/nodes.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToasterModule } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from 'src/app/root/shared/api/api.service';
import { OptionsService } from 'src/app/root/shared/api/options.service';
import { articleReducer } from 'src/app/root/shared/store/article-store';
import { EffectsModule } from '@ngrx/effects';
import { ArticleEffects } from 'src/app/root/shared/store/article-effects';
import { ArticleCreateComponent } from 'src/app/article-edit/article-create.component';

const routes = [
  { path: ':id', component: ArticleComponent},
  { path: ':id/edit', component: ArticleEditComponent },
  { path: ':id/create', component: ArticleCreateComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    TreeModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
      articles: articleReducer
    }),
    EffectsModule.forRoot([ArticleEffects]),
    FormsModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule.forRoot(), 
    DynamicFormsBootstrapUIModule,
    LoginModule
  ],
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticleCreateComponent,
    ArticleEditComponent,
    TreeComponent
  ],
  providers: [NodesService, ApiService, { provide: HTTP_INTERCEPTORS, useClass: OptionsService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
