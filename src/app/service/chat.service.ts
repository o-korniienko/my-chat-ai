import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {GptResponse} from '../model/gpt-response'
import {GptRequest} from '../model/gpt-request'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient,) { }

  private url = "https://api.openai.com/v1/chat/completions"
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                "Authorization": "Bearer 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"})
  };

  askChatGpt(question: string): Observable<any> {
    let messages = [{
            "role": "user",
            "content": question
        }]
    let body: GptRequest = new GptRequest("gpt-3.5-turbo", messages)

    let body2 = {"model":"gpt-3.5-turbo",
                      "messages": [{"role": "user", "content": "example of java code"}]}

    return this.http.post<any>(this.url, body, this.httpOptions).pipe(
      tap(_ => this.log(question)),
      catchError(this.handleError<any>('question'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
        return of(result as T);
      };
    }

      private log(message: string) {
        console.log(message)
      }
}
