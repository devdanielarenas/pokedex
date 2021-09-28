import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/utils/api.service';

@Injectable({
  providedIn: 'root'
})
export class PokedexService extends API<any> {

  constructor(http: HttpClient) {
    super(http);
  }

  protected URL = `${this.URL_API}pokemon/`;

}
