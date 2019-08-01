import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-news',
  templateUrl: './text-news.component.html',
  styleUrls: ['./text-news.component.scss']
})
export class TextNewsComponent implements OnInit {
  @Input() serverUrl: String = ''

  constructor() { }

  ngOnInit() {
  }

}
