import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsService } from './../../news.service';
import { of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  articles: any;
  constructor(private newsService: NewsService, private http: HttpClient) {
    this.loadNews();
  }

  loadNews() {
    this.newsService.getNews('top-headlines?country=id').subscribe(
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
