import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageService } from '../../../../../app/core/api/manage.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
  detailDatas = { id: '', name: '', email: '' };

  constructor(private manageService: ManageService, private activatedRoute: ActivatedRoute) {
    const userId = this.activatedRoute.snapshot.params.userId;
    this.getDetail(userId);
  }

  ngOnInit() {
  }

  getDetail(id) {
    this.manageService.getAccountDetail(id).subscribe(res => {
      this.detailDatas = res;
    })
  }

}
