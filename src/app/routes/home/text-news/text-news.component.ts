import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'text-news',
  templateUrl: './text-news.component.html',
  styleUrls: ['./text-news.component.scss']
})
export class TextNewsComponent implements OnInit {
  list = [11, 2, 3, 4, 5, 6, 7, 8];
  @Input() serverUrl: String = ''

  constructor() { }

  ngOnInit() {
  }

}
