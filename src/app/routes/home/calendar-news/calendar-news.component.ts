import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'calendar-news',
  templateUrl: './calendar-news.component.html',
  styleUrls: ['./calendar-news.component.scss']
})
export class CalendarNewsComponent implements OnInit {
  selectedValue = new Date('2017-01-25');
  
  constructor() { }

  ngOnInit() {
  }

  listDataMap = {
    1: [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' }
    ],
    2: [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'error', content: 'This is error event.' }
    ],
    4: [
      { type: 'warning', content: 'This is warning event' },
      { type: 'success', content: 'This is very long usual event........' },
      { type: 'error', content: 'This is error event 1.' },
      { type: 'error', content: 'This is error event 2.' },
      { type: 'error', content: 'This is error event 3.' },
      { type: 'error', content: 'This is error event 4.' }
    ]
  };

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }

  selectChange(select: Date): void {
    console.log(`Select value: ${select}`);
    const day = new Date(select).getDate();
    console.log(day);
  }

}
