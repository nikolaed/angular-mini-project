import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';


@Injectable(

)
export class DataService {

  // private apiUrl = 'https://www.universal-tutorial.com/api';
  // private apiToken = 'AuXnFjES43NqbdODZoc1anLtpO9op_9HsA7hqU56HJoxlbbNrMsUAzmsp6cqoZ0HhWQ'; 


  apiUrl = '/api';
  token: string | undefined;

  apiBaseUrl = 'http://localhost/dev/tcxapp/';

  constructor(private http: HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'X-CSCAPI-KEY': 'bERTcmdNQkdubGlRWmJhSkVWVGJsbUVqdWlhRGJ6T1hpcVNKek90Nw=='
    })
  }

  getCountries(): Observable<any> {
    return this.http.get('https://api.countrystatecity.in/v1/countries', {headers: this.httpOptions.headers});
  }


  getStates(country: string): Observable<any> {
    return this.http.get('https://api.countrystatecity.in/v1/countries/${country}/states', {headers: this.httpOptions.headers});
  }

  getCities(country: string, state: string): Observable<any> {
    return this.http.get('https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities', {headers: this.httpOptions.headers});
  }

  getStateOfSelectedCountry(countryIso: string): Observable<any>{
    return this.http.get(`https://api.countrystatecity.in/v1/countries/${countryIso}/states`,{headers: this.httpOptions.headers} )
  }

  getCitiesOfSelectedState(countryIso: any, stateIso: any): Observable<any>{
    return this.http.get(`https://api.countrystatecity.in/v1/countries/${countryIso}/states/${stateIso}/cities`, {headers: this.httpOptions.headers} )
  }



  // getCountries(): Observable<any> {
  //   return this.getTokenResponse().pipe(
  //     switchMap((response: any) => {
  //       debugger;
  //       this.token = response.auth_token;
  //       console.log(this.token);
  //       const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`).set('Accept', 'application/json');
  //       return this.http.get(`${this.apiUrl}/countries`, { headers });
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Error fetching countries:', error);
  //       return throwError('Error fetching countries. Please try again later.');
  //     })
  //   );
  // }

  // getTokenResponse(): Observable<any> {
  //   const headers = new HttpHeaders().set('Accept', 'application/json')
  //                                       .set('api-token', 'hSCw-APVxLwNHRXTQjV1StOtG5e6KQq5afsEo78Uo4ugTdXpe0RAl27mW9B6Y6Crzsg')
  //                                       .set('user-email', 'nikola.edrovski@gmail.com');
  //   return this.http.get('https://www.universal-tutorial.com/api/getaccesstoken', { headers });
  // }

  // getStates(country: string): Observable<any> {
  //   return this.http.get(`https://www.universal-tutorial.com/api/states/${country}`, {
  //     headers: {
  //       'Accept': 'application/json',
  //       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJtdmdhZGFnaUBnbWFpbC5jb20ifSwiZXhwIjoxNTY2MjM0ODU0fQ.nMWPN38zptwwDKAo11bFyjhCRuzNhZc6NqqCaYJVxP0' // Replace with your access token if required
  //     }
  //   });
  // }

  // getCities(state: string): Observable<any> {
  //   return this.http.get(`https://www.universal-tutorial.com/api/cities/${state}`, {
  //     headers: {
  //       'Accept': 'application/json',
  //       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJtdmdhZGFnaUBnbWFpbC5jb20ifSwiZXhwIjoxNTY2MjM0ODU0fQ.nMWPN38zptwwDKAo11bFyjhCRuzNhZc6NqqCaYJVxP0' // Replace with your access token if required
  //     }
  //   });
  // }











  


  // getStates(country: string): Observable<any> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.apiToken}`);
  //   return this.http.get(`${this.apiUrl}/states/${country}`, { headers });
  // }

  // getCities(state: string): Observable<any> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.apiToken}`);
  //   return this.http.get(`${this.apiUrl}/cities/${state}`, { headers });
  // }

  // getCountries(): Observable<any> {
  //   return this.http.get('https://www.universal-tutorial.com/api/countries', {
  //     headers: {
  //       'Accept': 'application/json',
  //       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJtdmdhZGFnaUBnbWFpbC5jb20ifSwiZXhwIjoxNTY2MjM0ODU0fQ.nMWPN38zptwwDKAo11bFyjhCRuzNhZc6NqqCaYJVxP0' // Replace with your access token if required
  //     }
  //   });
  // }














}
