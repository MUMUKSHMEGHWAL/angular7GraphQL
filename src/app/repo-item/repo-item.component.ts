import { Component, Input } from '@angular/core';
import { RepoItem } from './__generated__/RepoItem';

@Component({
  selector: 'app-repo-item',
  styleUrls: ['./repo-item.component.css'],
  template: `
    <section>
      <header class="title">
      <a [href]="repoItem.node.url" targe="_blank">
          {{repoItem.node.name}}
        </a>
      </header>
      <p class="desc" *ngIf="repoItem.node.description">{{repoItem.node.description}}</p>
      <p class="desc" *ngIf="!repoItem.node.description">(no description)</p>
    </section>
  `,
})
export class RepoItemComponent {
  @Input() repoItem: RepoItem;
}
