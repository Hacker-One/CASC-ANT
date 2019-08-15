import { Component, OnInit } from '@angular/core';
import { ManageService, LoadingService } from 'src/app/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  columnList = [];
  columnTypeMap = {
    1: '图文',
    2: '消息',
    3: '待办',
  };
  colMap = {
    oneOfCol: 24,
    twoOfCol: 12,
    threeOfCol: 8,
    fourOfCol: 6,
  };
  wrapperWidth: any;
  dragElementId: any;

  constructor(private manageService: ManageService, private router: Router, private message: NzMessageService) {

  }

  ngOnInit() {
    var wrapperElement = document.getElementById('columnWrapper');
    this.wrapperWidth = this.getStyle(wrapperElement, 'width') - 20;
    console.log(this.wrapperWidth);
    this.getColumnList();
  }

  getColumnList() {
    let params = { currentNum: 1, pagePerNum: 1000 };
    LoadingService.show();
    this.manageService.getColumnList(params).subscribe((res: any) => {
      LoadingService.close();
      let base = [];
      for (let element of res.result) {
        const item = { id: element.id, colWidth: element.length, canDrag: true, position: { x: 0, y: 0 }, lineIdx: 0, positionTend: { x: 0, y: 0 }, title: element.title, type: element.type };
        base.push(item);
      };
      // const base = [
      //   { id: 'id1', colWidth: 'threeOfCol', canDrag: true, position: { x: 0, y: 0 }, lineIdx: 0, positionTend: { x: 0, y: 0 } },
      //   { id: 'id2', colWidth: 'twoOfCol', canDrag: true, position: { x: 340, y: 0 }, lineIdx: 0, positionTend: { x: 0, y: 0 } },
      //   { id: 'id3', colWidth: 'threeOfCol', canDrag: true, position: { x: 0, y: 256 }, lineIdx: 0, positionTend: { x: 0, y: 0 } },
      //   { id: 'id4', colWidth: 'threeOfCol', canDrag: true, position: { x: 340, y: 256 }, lineIdx: 0, positionTend: { x: 0, y: 0 } },
      //   { id: 'id5', colWidth: 'threeOfCol', canDrag: true, position: { x: 680, y: 256 }, lineIdx: 0, positionTend: { x: 0, y: 0 } },
      //   { id: 'id6', colWidth: 'threeOfCol', canDrag: true, position: { x: 0, y: 512 }, lineIdx: 0, positionTend: { x: 0, y: 0 } },
      // ];
      this.initXYCoordinate(base);
    })
  }

  ngAfterViewInit() {

  }

  initXYCoordinate(base) { // will
    //  position->top left coordinate,positionTend->right bottom coordinate
    const dragBoxHeight = 240 + 16; //  240->box height 16->bottom margin
    const perCol = this.wrapperWidth / 24;
    let xVal = 0;
    let lineIdx = 0;
    base.map((element, index) => {
      const curWidth = this.colMap[base[index].colWidth] * perCol;
      if (index === 0) {
        element.position = { x: 0, y: 0 };
      } else {
        const preWidth = this.colMap[base[index - 1].colWidth] * perCol;
        xVal = base[index - 1].position.x + preWidth;
        if ((xVal + curWidth) / this.wrapperWidth > 1) {
          lineIdx += 1;
          xVal = 0;
        }
        element.position = { x: xVal, y: lineIdx * dragBoxHeight }
      }
      element.positionTend = { x: xVal + curWidth, y: lineIdx * dragBoxHeight + 240 }
      element.lineIdx = lineIdx;
      return element;
    })
    this.columnList = base;
    console.log(this.columnList);
  }

  getStyle(element, property) {
    let proValue = null;
    if (!document.defaultView) {
      proValue = element.currentStyle[property];
    } else {
      proValue = document.defaultView.getComputedStyle(element)[property];
    }
    return parseInt(proValue);
  }

  onDragBegin(event) {
    console.log(event.id);
    this.dragElementId = event.id;
  }
  onDragEnd(event) {
    console.log(event);
  }

  onMoving(event) {
    console.log(event);
  }

  onMoveEnd(event) {
    console.log(event);
    if (event.x <= 0 || event.y <= 0) {
      return
    }
    let dragItemIndex;
    const dragItemArr = this.columnList.filter((element, index) => {
      if (element.id == this.dragElementId) {
        dragItemIndex = index;
      }
      return element.id == this.dragElementId;
    })
    const dragItem = dragItemArr[0];
    if (JSON.stringify(dragItem.position) === JSON.stringify(event)) {
      return;
    }
    // let temp = { position: {}, positionTend: {}, colWidth: '' };
    // let replaceFlag = false;
    // this.columnList.map(element => {
    //   if (event.x > element.position.x && event.x < element.positionTend.x - 16
    //     && event.y > element.position.y && event.y < element.positionTend.y) {
    //     replaceFlag = true;
    //     temp.position = element.position;
    //     temp.colWidth = element.colWidth;
    //     temp.positionTend = element.positionTend;
    //     element.position = dragItem.position;
    //     element.colWidth = dragItem.colWidth;
    //     element.positionTend = dragItem.positionTend;
    //   }
    //   return element;
    // })
    // if (replaceFlag) {
    //   this.columnList.map(element => {
    //     if (element.id == dragItem.id) {
    //       element.position = temp.position;
    //       element.positionTend = temp.positionTend;
    //       element.colWidth = temp.colWidth;
    //     }
    //     return element;
    //   })
    // }

    this.columnList.forEach((element, replacedIndex) => {
      // find replaced element
      if (event.x > element.position.x && event.x < element.positionTend.x - 16
        && event.y > element.position.y && event.y < element.positionTend.y) {
        this.columnList.splice(replacedIndex, 1, dragItem);
        this.columnList.splice(dragItemIndex, 1, element);
      }
    })
    this.initXYCoordinate(this.columnList);

    console.log(this.columnList);
  }

  saveOrder() {
    const params = [];
    this.columnList.forEach((element, index) => {
      const one = {
        id: element.id,
        orderNum: index + 1
      }
      params.push(one)
    })
    LoadingService.show();
    this.manageService.sortColumn(params).subscribe(res => {
      LoadingService.close();
      if (res.resultCode === '0') {
        this.message.success('保存成功');
        this.getColumnList();
      }
    })
  }

  goDetail(item, act) {
    console.log(item);
    this.router.navigate(['/manage/column-new-edit', { action: act, id: item.id }])
  }


}