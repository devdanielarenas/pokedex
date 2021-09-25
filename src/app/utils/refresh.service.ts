import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshService extends API<any> {

  constructor(http: HttpClient) {
    super(http);
  }

  protected URL = `${this.URL_API}refresh_token`;

}
