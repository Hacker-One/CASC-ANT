import {
  Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import tinymce from 'tinymce/tinymce';
@Component({
  selector: 'app-tiny',
  template: ``
})
export class MyEditorComponent implements AfterViewInit, OnDestroy {
  @Input() elementId: string;
  @Output() onEditorKeyup = new EventEmitter();
  editor;
  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table', 'image'],
      // skin_url: 'assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();

          this.onEditorKeyup.emit(content);
        });

      },
    });
  }
  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
