import { Component, Input } from '@angular/core';
import { RepoList } from './__generated__/RepoList';

@Component({
  selector: 'app-repo-list',
  styleUrls: ['./repo-list.component.css'],
  template: `
    <div *ngIf="repoList && repoList.edges as repositories">

      <app-repo-item
        class="item"
        *ngFor="let node of repositories"
        [repoItem]="node"
      ></app-repo-item>

    </div>
  `,
})

export class RepoListComponent {
  @Input() repoList: RepoList;
}
