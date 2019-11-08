import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Person } from "./person";
import { Bitcoin } from "./bitcoin";
import { Shopping } from "./shopping";

import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MainService {
  readonly url = "http://localhost:3000/api";
  readonly urlAuth = "http://localhost:3000/auth";
  private httpOptions: object;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      })
    };

  }

  getPeople(data): Observable<Shopping[]> {
    return this.http.get<Shopping[]>(`${this.url}/listshopping/${data}`).pipe(
      tap(p => console.log(p)),
      catchError(e => {
        console.log(e);
        return throwError(e);
      })
    );
  }

  // getPeople(data) {
  //   return this.http.get(
  //     this.url + "/listshopping",
  //     data,
  //   );
  // }

  getBitcoin(): Observable<Bitcoin[]> {
    return this.http.get<any[]>(`${this.url}/bitcoins`).pipe(
      tap(p => console.log(p)),
      catchError(e => {
        console.log(e);
        return throwError(e);
      })
    );
  }



  soldBitcoin(data) {
    return this.http.delete(
      this.url + "/soldbitcoin",
      data
    );
  }

  registerShopping(data) {
    return this.http.post (
      this.url + "/registershopping",
      data
    );
  }

  updateUser(data) {
    return this.http.put (
      this.urlAuth  + "/updateuser",
      data
    );
  }
}
