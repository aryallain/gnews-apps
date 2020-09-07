import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsService } from './../../news.service';
import { of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  articles: any;

  constructor(private newsService: NewsService, private http: HttpClient) {
    this.loadNews();
  }

  loadNews() {
    this.newsService.getNews('everything?q=*&from=2020-09-01&to=2020-09-07&sortBy=popularity').subscribe(
      news => this.articles = news['articles'])
  }

  getImage(url: string): Observable<boolean> {
    return this.http.get(url)
      .pipe(
        map(response => {
          return true;
        }),
        catchError(error => {
          return of(false);
        })
      );
  }
}
