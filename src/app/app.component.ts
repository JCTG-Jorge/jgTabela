import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {
  PoMenuModule,
  PoPageModule,
  PoToolbarModule
} from '@po-ui/ng-components';
import { ScrollingTableComponent } from './scrolling-table/scrolling-table.component';
import { TableComponentComponent } from './table-component/table-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    HttpClientModule,
    TableComponentComponent,
    ScrollingTableComponent


  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  items = []

  constructor(private http: HttpClient) {

  }
  ngOnInit() {

    this.http.get<any>('https://po-sample-api.onrender.com/v1/people').subscribe(response => {
      this.items = response.items;
      console.log( this.items )
      });


  }



}
