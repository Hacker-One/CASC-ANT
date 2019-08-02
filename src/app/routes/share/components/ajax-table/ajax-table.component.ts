import { Component, OnInit, Input } from '@angular/core';
import { ManageService } from '../../../../../app/core/api/manage.service';

@Component({
  selector: 'ajax-table',
  templateUrl: './ajax-table.component.html',
  styleUrls: ['./ajax-table.component.scss']
})
export class AjaxTableComponent implements OnInit {
  @Input() serverUrl;
  param = {};
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData = [];
  loading = true;
  sortValue: string | null = null;
  sortKey: string | null = null;
  filterGender = [{ text: 'male', value: 'male' }, { text: 'female', value: 'female' }];
  searchGenderList: string[] = [];

  constructor(private service: ManageService) { }

  ngOnInit(): void {
    this.searchData();
  }

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.searchData();
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.service.getRoleList(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.loading = false;
      this.total = 200;
      this.listOfData = data.resources;
    })
  }

  updateFilter(value: string[]): void {
    this.searchGenderList = value;
    this.searchData(true);
  }


}
