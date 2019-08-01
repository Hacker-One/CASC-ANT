import { Injectable } from '@angular/core';
import { LoadingComponent } from '../../component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public static loading: LoadingComponent;

  constructor() { }

  public static show(): void {
    LoadingService.loading.show();
  }

  public static close(): void {
    LoadingService.loading.close();
  }
}
