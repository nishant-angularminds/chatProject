import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { debounceTime, fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewInit {

  newMessage: string | undefined;
  messageList: string[] = [];
  tempArray: any = [];
  userList: any;
  userIdArray: any;
  userList1: any;
  status = false;
  tempArray1: any = [];
  user: any;
  chatInfo: any;
  @ViewChild('d') data1: any;
  groupForm = this.fb.group({

    name: ['']

  })

  constructor(private chatService: ChatService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    })

    this.chatService.getchats(`/user`).subscribe({

      next: (data: any) => {

        this.userList1 = data['user'];

      }
    })

    this.fetchChat();

  }

  ngAfterViewInit(): void {

  }

  show(event: any) {

    this.userIdArray = event;

  }


  sendGroupInformation(formData: any) {

    formData['user'] = this.userIdArray
    this.chatService.createChat('/chat/group', formData).subscribe({
      next: (data: any) => {

        this.fetchChat();

      }
    })

  }

  currentUser(user: any) {

    console.log(user);

  }

  searchUser() {

    this.status = false;

    fromEvent(this.data1.nativeElement, 'input').pipe(debounceTime(500))
      .subscribe((res) => {

        this.chatService.getchats(`/user?search=${this.data1.nativeElement.value}`).pipe(debounceTime(2000)).subscribe({

          next: (data: any) => {

            this.userList = data['user'];

          }
        })


      });

  }

  fetchChat() {

    this.chatService.getchats('/chat').subscribe((data: any) => {

      console.log(data);

      this.tempArray1 = data['message'];

      data['message'].map((data1: any) => {

        this.tempArray1 = data['message'];

        this.tempArray1[0]['selected'] = true;

      })

      this.chatInfo = this.tempArray1[0]


    })

  }

  getuser(userId: any) {

    this.chatService.createChat(`/chat`, { userId: userId }).subscribe({
      next: (data: any) => {

        this.tempArray1 = []
        this.fetchChat();

      }
    })

  }

  addUserToGroup() {

    this.chatService.addUserToGroup(`/chat/addToGroup/${this.chatInfo['_id']}`, { userId: this.userIdArray[0] }).subscribe({
      next: (data: any) => {

        this.chatInfo = data['group'];

      }
    })


  }

  selectChat(i: any) {

    this.tempArray1.map((data: any) => {

      if (data['_id'] == i['_id']) {

        data['selected'] = true;

      }

      else {

        data['selected'] = false;
      }

    })

    this.chatInfo = i;

    console.log(this.chatInfo);

  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage, true);
    this.newMessage = '';
  }

  info() {

    console.log(this.chatInfo);

  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('currentLoginUserId');

    this.router.navigateByUrl('');

  }

}