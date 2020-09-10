import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_KEY = environment.API_KEY;
const API_URL = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(url: string) {
    return this.http.get(`${API_URL}/${url}&apiKey=${API_KEY}`)
  }
}
