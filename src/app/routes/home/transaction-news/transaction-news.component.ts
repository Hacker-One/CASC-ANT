import { Component, OnInit, Input } from '@angular/core';
import { ManageService } from 'src/app/core';

@Component({
  selector: 'transaction-news',
  templateUrl: './transaction-news.component.html',
  styleUrls: ['./transaction-news.component.scss']
})
export class TransactionNewsComponent implements OnInit {
  titleArr = [
    { display: '待办', active: true, value: 1 },
    { display: '已办', active: false, value: 2 },
    { display: '督办', active: false, value: 3 },
  ];
  activeTab = 1;
  list = [];
  @Input() viewUrl: String = '';
  @Input() url02: String = '';
  @Input() url03: String = '';

  constructor(private manageService: ManageService) { }

  ngOnInit() {
    this.getList(this.viewUrl)
  }

  titleClicked(element) {
    this.activeTab = element.value;
    this.list = [];
    switch (this.activeTab) {
      case 1:
        this.getList(this.viewUrl)
        break;
      case 2:
        this.getList(this.url02)
        break;
      case 3:
        this.getList(this.url03)
        break;

      default:
        break;
    }
    this.titleArr.forEach(item => {
      if (element.display === item.display) {
        item.active = true;
      } else {
        item.active = false;
      }
    })
  }

  getList(url) {
    if (url) {
      this.manageService.getNews(url).subscribe((res: any) => {
        this.list = res.result;
      })
    }
  }

  linkDetail(item) {
    window.open(item.url, '_blank');
  }


}
