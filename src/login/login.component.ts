import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {NgToastModule, NgToastService} from 'ng-angular-popup'
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule     ,    // Provides common directives like NgIf, NgFor
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    NgToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit {
  formValue!:FormGroup;
  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router,private toast:NgToastService){}
  ngOnInit():void{
    this.formValue=this.fb.group({

      email:['',Validators.required],
      password:['',Validators.required]
    });
}
login() {
  debugger
  this.http.get<any[]>("http://localhost:3000/Signup").subscribe(res => {

    // Find the user in the array
    const user = res.find((a: any) => {
      return a.email === this.formValue.value.email && a.password === this.formValue.value.password;
    });

    if (user) {

      this.toast.success('User Logged IN', '');
      // alert("User logged in");
      this.formValue.reset();
      this.router.navigate(['restaurant']);
      localStorage.setItem('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")
      this.formValue.value.email? localStorage.setItem('usertype','employee'):''; // Example route after login
    } else {
      this.toast.danger('User Not Found', 'Error');

      //alert("User not found");
    }
  }, error => {
    console.error("Error: ", error);
    this.toast.danger('User Not Found', 'Error');
  });
}



}

