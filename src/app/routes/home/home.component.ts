import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactory, TemplateRef, ComponentFactoryResolver } from '@angular/core';
import { HttpService } from '../share/http.service';
import { environment } from './../../../environments/environment';
import { TextNewsComponent } from './text-news/text-news.component';

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
  isVisible = true;
  newsArr = [
    {
      "id": "072253672ed9f47499f825ace5fee8bc9",
      "title": "国际军事比赛坦克两项赛现场图曝光",
      "deputyTitle": "B1",
      "beginDate": 1569859200000,
      "endDate": 1571846400000,
      "type": "1",
      "priority": "1",
      "top": 10,
      "topDate": 1566698666000,
      "content": "<p style=\"text-indent: 2em;\"><span style=\"color: #191919; font-family: &quot;\\&quot;PingFang SC\\&quot;,Arial,\\&quot;Microsoft yahei\\&quot;,simsun,\\&quot;sans-serif\\&quot;&quot;; background-color: #F9F9F9;\">8月12日，俄罗斯国防部官网放出了一组“坦克两项”比赛的精彩照片。今年的比赛在俄罗斯首都莫斯科远郊的阿拉比诺靶场举行，共有来自20多个国家的参赛队参加了比赛。</span></p>",
      "publisherObj": "0",
      "createUser": "admin",
      "createDate": 1565834666000,
      "approvalStatus": "0"
    }
  ];
  content = "<p style=\"text-indent: 2em;\"><span style=\"color: #f33; font-family: &quot;\\&quot;PingFang SC\\&quot;,Arial,\\&quot;Microsoft yahei\\&quot;,simsun,\\&quot;sans-serif\\&quot;&quot;; background-color: #F9F9F9;\">8月12日，俄罗斯国防部官网放出了一组“坦克两项”比赛的精彩照片。今年的比赛在俄罗斯首都莫斯科远郊的阿拉比诺靶场举行，共有来自20多个国家的参赛队参加了比赛。</span></p>";
  // content = `<p style="color: red;">国际军事比赛坦克两项赛现场图曝光</p>`;
  // content = '<span>' +
  //   '<strong>' +
  //   '<span style="font-size: 50px;color:red">' +
  //   '把啦啦啦' +
  //   '</span>' +
  //   '</strong>' +
  //   '</span>';

  constructor(private http: HttpService, private factoryResolver: ComponentFactoryResolver) { }

  // @ViewChild('dynamicContainer', { read: ViewContainerRef }) dynamicContainer: ViewContainerRef

  // @ViewChild('tpl',null) tpl: TemplateRef<any>;
  // @ViewChild('tplR', { read: ViewContainerRef }) tplR: ViewContainerRef

  ngOnInit() {

  }

  ngAfterContentInit() {
    // const factory = this.factoryResolver.resolveComponentFactory(TextNewsComponent);
    // let component = this.dynamicContainer.createComponent(factory);
    // console.log(component);
    // component.instance.serverUrl = 'api/xxx'

    // console.log(this.tplR);
    // // this.tplR.createEmbeddedView(null);
    // // console.log(this.tplR);
    // this.tplR.createEmbeddedView(this.tpl);
    // console.log(this.tplR);
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
