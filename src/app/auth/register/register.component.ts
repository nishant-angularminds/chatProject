import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  isValid: boolean = false;
  status = true;

  recaptcha = '6LdPS2wnAAAAAJoZSByaz4MFJb8Y1x5vWPhpSJGW';

  registerGroup = this.fb.group({

    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    companyName: ['', Validators.required]  })

  constructor(private fb: FormBuilder, private service: AuthService, private router: Router, private tostr: HotToastService) {
  }

  sendForm(formData: any) {

    console.log(formData)

    this.isValid = true;
    this.status = false
    this.service.register(`/auth/register?captcha=false`, formData).subscribe({
      next: (data) => {
        console.log(data);

        this.tostr.success('Register successfully');
        this.router.navigateByUrl('/seller/auth/login');
      }
    })

  }

}
