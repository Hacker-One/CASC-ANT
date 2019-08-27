import { Component, OnInit, Input } from '@angular/core';
import { ManageService } from 'src/app/core';

@Component({
  selector: 'text-news',
  templateUrl: './text-news.component.html',
  styleUrls: ['./text-news.component.scss']
})
export class TextNewsComponent implements OnInit {
  list = [];
  isVisible = false;
  detailNew = {
    title: '',
    subTitle: '',
    content: ''
  };
  config = {};
  @Input() viewUrl: String = '';
  @Input() borderColor: String = '';
  @Input() fontColor: String = '';

  constructor(private manageService: ManageService) { }

  ngOnInit() {
    this.getList(this.viewUrl)
  }

  getList(url) {
    this.manageService.getNews(url).subscribe((res: any) => {
      if (res.resultCode === '0') {
        this.list = res.result;
      }
    })
  }

  linkDetail(item) {
    this.isVisible = true;
    this.detailNew.title = item.title;
    this.detailNew.subTitle = item.deputyTitle;
    this.detailNew.content = item.content;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
