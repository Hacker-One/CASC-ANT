import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  colMap = {
    oneOfCol: 24,
    twoOfCol: 12,
    threeOfCol: 8,
    fourOfCol: 6,
  }

  constructor() { }

  ngOnInit() {
  }

}
