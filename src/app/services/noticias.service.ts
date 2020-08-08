import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  protected headlinesPage: number;
  protected categoriaActual: string;
  protected categoriaPage: number;

  constructor( private http: HttpClient ) {
    this.headlinesPage = 0;
    this.categoriaActual = '';
    this.categoriaPage = 0;
  }

  private ejecutarQuery<T>( query: string ) {
    query = apiUrl + query;

    return this.http.get<T>( query, { headers } );
  }

  getTopHeadLines() {
    this.headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>( `/top-headlines?country=mx&page=${ this.headlinesPage }` );
  }

  getTopHeadlinesCategory( categoria: string ) {
    if ( this.categoriaActual === categoria ) {
      this.categoriaPage++;
    } else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadlines>( `/top-headlines?country=mx&category=${ categoria }&page=${ this.categoriaPage }` );
  }
}
