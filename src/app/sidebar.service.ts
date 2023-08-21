import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }
  private _opened = new BehaviorSubject<boolean>(false);
  opened$ = this._opened.asObservable();

  toggleSidebar() {
    this._opened.next(!this._opened.value);
  }

}
