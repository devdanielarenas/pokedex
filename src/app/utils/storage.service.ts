import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storageSub = new Subject<boolean>();

  /**
   * This method change of status, for example true or false
   */
  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any): any {
    localStorage.setItem(key, data);
    this.storageSub.next(true);
  }

  updateItem(key: string, property: string, value: any): any {
    const obj = JSON.parse(this.getItem(key));
    obj[property] = value;
    this.setItem(key, JSON.stringify(obj));
  }

  /**
   * This method get element of local storage
   * @param key is a string for example 'token', this key is the one that is going to get
   */
  getItem(key): any {
    return localStorage.getItem(key);
  }

  /**
   * This method remove element of local storage
   * @param key is a string for example 'token', this key is the one that will be removed
   */
  removeItem(key): any {
    localStorage.removeItem(key);
    this.storageSub.next(false);
  }
  /**
   * This method remove element of local storage
   */
  clear(): any {
    localStorage.clear();
    this.storageSub.next(false);
  }

}
