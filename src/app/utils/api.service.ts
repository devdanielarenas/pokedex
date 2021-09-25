import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';

/**
 * Abstract case for implementing functions set for
 * the CRUD of any service, when inheriting this class must
 * value the URI field
 */
export abstract class API<T> {

  protected URL_API: string = env.API + '/api/';
  protected abstract URL: string;

  constructor(protected http: HttpClient) {
  }

  /**
   * Function that executes a post request for
   * Save the object
   * @param value object to save
   */
  add(value: T): Observable<T> {
    return this.http.post<T>(this.URL, value);
  }

  /**
   * Function that executes a get request and returns a list
   * of object
   * @param params parameters for the query params
   */
  list(params?: {}): Observable<T[]> {
    return this.http.get<T[]>(this.URL, { params });
  }

  /**
   * Function that executes a get request and returns a list
   * of object
   * @param params parameters for the query params
   */
  listPagination(params?: {}): Observable<T[]> {
    return this.http.get<T[]>(this.URL, { params });
  }

  /**
   * Function that executes a get request to return
   * a single object
   * @param id of the object to return
   * @param params query params that are passed with the get query
   */
  get(id: string | number, params?: {}): Observable<T> {
    return this.http.get<T>(`${this.URL + encodeURIComponent(`${id}`)}` + '/', { params });
  }

  /**
   * Function that executes a put request to update
   * an object
   * @param id of the object
   * @param value object with modifications
   */
  update(id: string | number, value: T, params?): Observable<T> {
    return this.http
      .patch<T>(this.URL + id + '/', value, { params });
  }

  /**
   * Function that executes a delete request to delete a
   * object
   * @param id of the object
   */
  remove(id: string | number): Observable<T> {
    return this.http
      .delete<T>(this.URL + id);
  }

  /**
   * Function that executes a patch request to update a
   * object
   */
  updateAll(): Observable<T> {
    return this.http.patch<T>(this.URL, {});
  }

  /**
   * Function that executes a get request to fetch all
   * Colombian cities
   */
  getCountries(): Observable<T> {
    return this.http.get<T>(this.URL_API + 'country');
  }
}
