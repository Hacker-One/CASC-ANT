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
  @Input() viewUrl: String = ''

  constructor(private manageService: ManageService) { }

  ngOnInit() {
    this.getList(this.viewUrl)
  }

  getList(url) {
    this.manageService.getNews(url).subscribe((res: any) => {
      this.list = res.result;
    })
  }

  showModal(): void {
    this.isVisible = true;
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
