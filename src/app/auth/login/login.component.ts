import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  recaptcha: any = '6LdPS2wnAAAAAJoZSByaz4MFJb8Y1x5vWPhpSJGW';
  forgotData: any = '';

  loginForm = this.fb.group({

    email: [''],
    password: ['']
  })

  constructor(private fb: FormBuilder, private service: AuthService, private route: Router) { }

  sendForm(data: any) {

    this.service.login(`/auth/login?captcha=false`, data).subscribe({
      next: (data: any) => {

        localStorage.setItem('currentLoginUserId', data['user']['_id']);
        localStorage.setItem('token', data['userToken'])
        this.route.navigateByUrl('/chat');
      }
    })

  }

  resolved(event: any) {

  }

  send() {

    this.service.login('/auth/forgot-password', { email: this.forgotData }).subscribe((data) => {

    })
  }

}
