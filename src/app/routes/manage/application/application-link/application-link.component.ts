import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpService } from '../../../../system/share/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-link',
  templateUrl: './application-link.component.html',
  styleUrls: ['./application-link.component.scss']
})
export class ApplicationLinkComponent implements OnInit {
  roleCheckBoxArr: Array<any> = [];
  directorySelectArr: Array<any> = [];
  linkObj = {
    parentId: "cfe120530d4145619cfcc7a4326d1e58",
    desc: '',
    sortNum: null,
    menuUrl: '',
    isView: 1,
  }

  constructor(private http: HttpService, private router: Router) { }

  ngOnInit() {
    this.getRoles();
    this.getMenuNoHome();
  }

  getRoles() {
    const url = `${environment.apiURl.getRoleList}`;
    this.http.get(url).subscribe(res => {
      console.log(res);
      this.roleCheckBoxArr = res.resources;
      this.roleCheckBoxArr.map(item => {
        return item['selected'] = false;
      })
    })
  }

  getMenuNoHome() {
    const url = `${environment.apiURl.getMenuNohome}`;
    this.http.get(url).subscribe(res => {
      this.directorySelectArr = res.result;
    })
  }

  directorySelected(evt) {
    console.log(evt);
  }

  urlChange(evt) {
    console.log(evt);
    this.linkObj.menuUrl = evt.target.value;
  }
  radioChange(evt) {
    console.log(evt);
  }

  save() {
    const url = `${environment.apiURl.saveLink}`;
    this.http.post(url, this.linkObj).subscribe(res => {
      console.log(res);
      alert('save success');
      this.router.navigate(['/manage/applicat-list']);
    })
  }

}
