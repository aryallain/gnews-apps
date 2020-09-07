import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsService } from './../../news.service';
import { of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent {
  articles: any;
  arrID: string[];
  constructor(private newsService: NewsService, private http: HttpClient, private route: ActivatedRoute) {
    this.loadNews();
  }

  loadNews() {
    // let id = this.route.snapshot.paramMap.get('id');
    let title = this.route.snapshot.paramMap.get('title');
    title = title.replace(/[^a-z0-9]/gmi, "").replace(/\s+/g, "");
    this.newsService.getNews(`everything?qInTitle=${title}`).subscribe(
      news => {
        this.articles = news['articles'];
      });
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
