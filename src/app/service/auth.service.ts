
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(normalUrl: any, payload: any) {

    return this.http.post(`${baseUrl}${normalUrl}`, payload);
  }

  register(normalUrl: any, payload: any) {

    console.log(`${baseUrl}${normalUrl}`);
    
    return this.http.post(`${baseUrl}${normalUrl}`, payload);

  }
}
