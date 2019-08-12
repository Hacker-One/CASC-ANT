import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'image-news',
  templateUrl: './image-news.component.html',
  styleUrls: ['./image-news.component.scss']
})
export class ImageNewsComponent implements OnInit {
  array = [1, 2, 3];

  constructor() { }

  ngOnInit() {
  }

}
