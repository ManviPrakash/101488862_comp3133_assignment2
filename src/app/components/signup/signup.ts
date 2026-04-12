import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {

  username = '';
  email = '';
  password = '';
  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    this.auth.signup(this.username, this.email, this.password)
      .subscribe({
        next: (res: any) => {
          const token = res.data.signup.token;
  
          localStorage.setItem('token', token); // 🔥 IMPORTANT
  
          alert("Signup successful!");
  
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          alert("Signup failed!");
        }
      });
  }
}