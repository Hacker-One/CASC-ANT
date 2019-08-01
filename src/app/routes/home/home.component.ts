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



}
