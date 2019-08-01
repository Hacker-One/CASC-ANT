import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpService } from '../../../../system/share/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-directory',
  templateUrl: './application-directory.component.html',
  styleUrls: ['./application-directory.component.scss']
})
export class ApplicationDirectoryComponent implements OnInit {

  directoryObj = {
    desc: '',
    pdesc: '',
    sortNum: null,
    rExtIds: []
  }
  roleCheckBoxArr: Array<any> = [];
  constructor(private http: HttpService, private router: Router) { }

  ngOnInit() {
    this.getRoles();
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

  checkboxClicked(idx, evt) {
    console.log(evt);
    this.roleCheckBoxArr[idx].selected = event.target['value'];
    console.log(this.roleCheckBoxArr);
  }

  save() {
    for (let item of this.roleCheckBoxArr) {
      if (item.selected) {
        this.directoryObj.rExtIds.push(item.externalId);
      }
    };
    console.log(this.directoryObj);

    const url = `${environment.apiURl.saveDirectory}`;
    this.http.post(url, this.directoryObj).subscribe(res => {
      console.log(res);
      alert('save success');
      this.router.navigate(['/manage/applicat-list']);
    })
  }


}
