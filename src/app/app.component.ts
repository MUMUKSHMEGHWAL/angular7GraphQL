import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import gql from 'graphql-tag';
import { AppQuery } from './__generated__/AppQuery';
import { Cursors } from './__generated__/Cursors';

const cursorsQuery = gql`
  query Cursors {
    current @client
  }
`;

const appQuery = gql`
  query AppQuery($first: Int!) {
  	search(query: "is:public", type: REPOSITORY, first: $first) {
      edges {
        node {
          ... on Repository {
            name , id, description, url
          }
        }
      }
    },
  }
`;

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
  <div class="container">
    <h1>
      Public GitHub repositories
    </h1>
    <div *ngIf="data$ | async as data">
      <app-repo-list [repoList]="data.search"></app-repo-list>
    </div>
  </div>
  `,
})
export class AppComponent implements OnInit {
  data$: Observable<AppQuery>;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.data$ = this.apollo.watchQuery<Cursors>({
      query: cursorsQuery,
    }).valueChanges.pipe(
      tap(x => console.log(x)), // logging for debug purpose
      switchMap(({ data: { current } }) => this.apollo.watchQuery<AppQuery>({
        query: appQuery,
        variables: { first: 20},
      }).valueChanges)
    ).pipe(map(x => { console.log(x.data); return x.data; }));
  }
}
