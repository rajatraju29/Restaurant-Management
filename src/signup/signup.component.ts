import { Component, OnInit } from '@angular/core';
import { provideRouter,Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
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
    MatFormFieldModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  implements OnInit{
  myForm!:FormGroup;
constructor(private fb:FormBuilder,private http:HttpClient,private router:Router){}
ngOnInit():void{
this.myForm=this.fb.group({
  name:['',Validators.required],
  email:['',Validators.required],
  mobile:['',Validators.required],
  password:['',Validators.required]
});
}
signup() {
  this.http.post<any>("http://localhost:3000/Signup", this.myForm.value)
    .subscribe(
      res => {
        alert("Registered Successfully");
        this.myForm.reset();
        this.router.navigate(['login']);
      },
      error => {
        console.error("Error: ", error); // Log the error
        if (error.status === 404) {
          alert("API Endpoint not found (404). Check your API URL.");
        } else {
          alert("Something bad happened");
        }
      }
    );
}


}
