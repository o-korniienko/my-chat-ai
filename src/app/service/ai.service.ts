import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {GptResponse} from '../model/gpt-response'
import {GptRequest} from '../model/gpt-request'

@Injectable({
  providedIn: 'root'
})
export class AIService {

  constructor(private http: HttpClient,) { }

  private url = "https://api.openai.com/v1/chat/completions"
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                "Authorization": "Bearer my_token"})
  };

  askChatGpt(question: string): Observable<any> {
    let messages = [{
            "role": "user",
            "content": question
        }]
    let body: GptRequest = new GptRequest("gpt-3.5-turbo", messages)

    return this.http.post<any>(this.url, body, this.httpOptions).pipe(
      tap(_ => this.log(question)),
      catchError(this.handleError<any>('question'))
    );
  }

  translate(question: string, language: string): Observable<any> {
      let messages = [{
              "role": "user",
              "content": "translate into " + language + ": " + question
          }]
      let body: GptRequest = new GptRequest("gpt-3.5-turbo", messages)

      return this.http.post<any>(this.url, body, this.httpOptions).pipe(
        tap(_ => this.log(question)),
        catchError(this.handleError<any>('translate'))
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
