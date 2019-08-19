import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactory, TemplateRef, ComponentFactoryResolver } from '@angular/core';
import { ManageService, LoadingService } from 'src/app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  colMap = {
    oneOfCol: 24,
    twoOfCol: 12,
    threeOfCol: 8,
    fourOfCol: 6,
  };
  columnArr: any;
  showList = [];
  content = "<p style=\"text-indent: 2em;\"><span style=\"color: #f33; font-family: &quot;\\&quot;PingFang SC\\&quot;,Arial,\\&quot;Microsoft yahei\\&quot;,simsun,\\&quot;sans-serif\\&quot;&quot;; background-color: #F9F9F9;\">8月12日，俄罗斯国防部官网放出了一组“坦克两项”比赛的精彩照片。今年的比赛在俄罗斯首都莫斯科远郊的阿拉比诺靶场举行，共有来自20多个国家的参赛队参加了比赛。</span></p>";
  serParam = [
    { key: 'p1', url: 'system/news/page?currentNum=1&pagePerNum=10&type=1&approvalStatus=0&status=2' },
    { key: 'p2', url: 'system/news/page?currentNum=1&pagePerNum=10&type=2&approvalStatus=0&status=2' },
    { key: 'p3', url: 'system/news/page?currentNum=1&pagePerNum=10&type=2&approvalStatus=0&status=2' },
    { key: 'p4', url: 'system/news/page?currentNum=1&pagePerNum=10&type=1&approvalStatus=0&status=2' },
  ]

  constructor(private manageService: ManageService, private factoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.getColumnList();
  }

  ngAfterContentInit() {

  }

  // async getColumnSetting() {
  //   // res -> serParam
  //   this.columnArr = await this.getColumnList();
  //   let promiseArr = [];
  //   if (this.columnArr instanceof Array) {
  //     this.columnArr.forEach(element => {
  //       const proItem = this.manageService.getNews(element.serviceAddr.viewUrl).toPromise().then(res => {
  //         return new Promise((resolve, reject) => {
  //           resolve(res.result)
  //         })
  //       })
  //       promiseArr.push(proItem)
  //     })
  //   }
  //   Promise.all(promiseArr).then(values => {
  //     console.log(values);
  //     this.showList = values;
  //   })
  // }

  getColumnList() {
    let params = { currentNum: 1, pagePerNum: 1000 };
    return new Promise((resolve, reject) => {
      this.manageService.getColumnList(params).subscribe((res: any) => {
        this.columnArr = res.result;
      })
    })
  }



}
