import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, observable } from 'rxjs';
import { baseUrl } from 'src/environment/environment';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) { }

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  socket = io('http://localhost:5000');

  public sendMessage(message: any, isSender: boolean) {

    const messageWithSender = { message, isSender };

    this.socket.emit('message', message);
  }

  public getNewMessage = () => {

    this.socket.on('message', (message) => {

      console.log(message);

      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  getchats(normalUrl:any) {

    const token = localStorage.getItem('token');    

    const headers = { 'Authorization': `Bearer ${token}` }

    return this.http.get(`${baseUrl}${normalUrl}`,{headers});

  }

  createChat(normalUrl:any,payload:any) {

    const token = localStorage.getItem('token');    

    const headers = { 'Authorization': `Bearer ${token}` }

    return this.http.post(`${baseUrl}${normalUrl}`,payload,{headers});

  }

  addUserToGroup(normalUrl:any,payload:any) {

    const token = localStorage.getItem('token');    

    const headers = { 'Authorization': `Bearer ${token}` }

    return this.http.patch(`${baseUrl}${normalUrl}`,payload,{headers});
    
  }
}