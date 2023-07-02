import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Trending } from 'src/app/interfaces/trending';

@Injectable({
  providedIn: 'root'
})
export class ReadService {

  public trendingPosts: BehaviorSubject<Array<Trending>> = new BehaviorSubject<Array<Trending>>([]);

  constructor(
    private http: HttpClient,
    ) {
  }

  private getTrendingPosts() {
    return this.http.get("https://www.reddit.com/r/trendingposts/hot.json");
  }

  private getPost(url: string) {
    return this.http.get(`${url}.json`);
  }

  private createTrendingObject(id: string, title: string, text: string, backgroundImage: string): Trending {
    const obj: Trending = {
      id: id,
      title: title,
      text: text,
      backgroundImage: backgroundImage
    };
    return obj;
  }

  private getValidImageUrl(url: string): string {
    if (url == undefined)
      return '';
    else if (url.includes('.jpg' || '.jpeg') === false && url != '')
      return url + '.jpeg';
    else
      return url;
  }

  public getTrending(): Observable<Trending[]> {
    var subject = new Subject<Trending[]>

    this.getTrendingPosts().subscribe((res: any) => {

      const numberOfPosts = res['data']['children'].length;
      const arr = new Array<Trending>(numberOfPosts);

      for (let i = 0; i < numberOfPosts; i++) {
        const url = res['data']['children'][i]['data']['url'];

        this.getPost(url).subscribe((post: any) => {
          let imageUrl = this.getValidImageUrl(post[0]['data']['children'][0]['data']['url_overridden_by_dest']);
          arr[i] = this.createTrendingObject(
            res['data']['children'][i]['data']['id'],
            post[0]['data']['children'][0]['data']['title'],
            post[0]['data']['children'][0]['data']['selftext'],
            imageUrl
          );
        });
      }
      this.trendingPosts.next(arr);
      subject.next(arr);
    });

    return subject.asObservable();
  }
}
