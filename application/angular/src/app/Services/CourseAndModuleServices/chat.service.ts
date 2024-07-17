import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
// @ts-ignore
import { ChatMessage } from '../../../../../../../integration/Angular/Angular/angular-frontend/src/app/models/chat-message';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: any
 private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);
  constructor() {
    this.initConnenctionSocket();

  }


  initConnenctionSocket() {
    const url = '//localhost:8095/chat-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket)
  }
  joinRoom(roomId: string) {
    this.stompClient.connect({}, ()=>{
      this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
        const messageContent = JSON.parse(messages.body);
        const currentMessage = this.messageSubject.getValue();
        currentMessage.push(messageContent);

        this.messageSubject.next(currentMessage);

      })
    })
  }
  sendMessage(roomId: string, chatMessage: ChatMessage) {
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage))
  }
  getMessageSubject(){
    return this.messageSubject.asObservable();
  }
  isStompConnected(): boolean {
    return this.stompClient && this.stompClient.connected;
  }


}
