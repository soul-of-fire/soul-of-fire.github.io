import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NodesService } from './shared/nodes.service';
import { AuthService } from '../login/shared/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/root/shared/api/api.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Base } from './shared/base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends Base implements OnInit {
  collapse = true;  
  searchForm = new FormGroup({
    search: new FormControl()
  });

  constructor(private nodesService: NodesService,
    public apiService: ApiService,
    private router: Router,
    public authService: AuthService) { 
      super();
    }

  ngOnInit() {
    this.searchForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.onFilter();
    })
  }

  onFilter() {
    const search = this.searchForm.getRawValue().search;
    this.nodesService.filter(search);
  }

  add() {
    const selected = this.nodesService.tree.treeModel.getActiveNode();
    this.router.navigate([selected.data.id, 'create']);
  }
}
