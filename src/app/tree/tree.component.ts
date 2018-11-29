import { Component, OnInit, ViewChild } from '@angular/core';
import { TREE_ACTIONS } from 'angular-tree-component';
import { Node } from '../root/shared/models/node';
import { Router } from '@angular/router';
import { NodesService } from '../root/shared/nodes.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  @ViewChild('tree') tree;

  options = {
    actionMapping: {
      mouse: {
        click: TREE_ACTIONS.TOGGLE_EXPANDED
      }
    },
    displayField: 'article'
  };

  constructor(private router: Router, public nodesService: NodesService) { }

  ngOnInit() {
    this.nodesService.tree = this.tree;
  }

  details(node: Node) {
    this.router.navigate([node.id]);
  }
}
