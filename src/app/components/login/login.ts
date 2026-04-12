import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';
  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.email, this.password)
      .subscribe({
        next: (res: any) => {
          const token = res.data.login.token;
  
          localStorage.setItem('token', token); // 🔥 REQUIRED
  
          alert("Login successful!");
  
          this.router.navigate(['/employees']); // next screen
        },
        error: (err) => {
          console.error(err);
          alert("Login failed! Check credentials");
        }
      });
  }
}