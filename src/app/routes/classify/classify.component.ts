import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd';

@Component({
  selector: 'app-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.scss']
})
export class ClassifyComponent implements OnInit {

  public nodes = [
    {
      title: 'OA归档文件',
      key: '100',
      expanded: true,
      children: [
        {
          title: 'EHS方案成立',
          key: '1001',
          children: [
            { title: 'leaf', key: '10010', isLeaf: true },
            { title: 'leaf', key: '10011', isLeaf: true },
            { title: 'leaf', key: '10012', isLeaf: true }
          ]
        },
        {
          title: 'KPI Target Result',
          key: '1002',
          children: [{ title: 'leaf', key: '10020', isLeaf: true }]
        },
        {
          title: '不符合项报告',
          key: '1003',
          children: [{ title: 'leaf', key: '10030', isLeaf: true }, { title: 'leaf', key: '10031', isLeaf: true }]
        },
        {
          title: 'ISO文件',
          key: '1003',
          expanded: true,
          children: [
            { title: '标准表格', key: '10031', isLeaf: true },
            {
              title: '程序文件',
              key: '10030',
              expanded: true,
              children: [
                { title: 'SKC', key: '10010', isLeaf: true },
                { title: 'SKC&SKF', key: '10011', isLeaf: true },
                { title: 'SKF', key: '10012', isLeaf: true }
              ]
            },
            { title: '岗位说明书', key: '10031', isLeaf: true },
            { title: '管理手册', key: '10031', isLeaf: true }
          ]
        },
      ]
    }
  ];
  public portalList = [
    '加班申请', '请假管理', '财务报销', '其他流程', 'XXXX流程', 'XXXX流程', 'XXXX流程', 'XXXX流程', 'XXXX流程',
  ];

  constructor() { }

  ngOnInit() {
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

}
