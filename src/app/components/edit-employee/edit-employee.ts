import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../service/employee';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">

      <h2>Edit Employee</h2>

      <div class="form-card">

        <input [(ngModel)]="emp.first_name" placeholder="First Name"><br>
        <input [(ngModel)]="emp.last_name" placeholder="Last Name"><br>
        <input [(ngModel)]="emp.email" placeholder="Email"><br>

        <input [(ngModel)]="emp.department" placeholder="Department"><br>
        <input [(ngModel)]="emp.designation" placeholder="Designation"><br>

        <input [(ngModel)]="emp.salary" type="number" placeholder="Salary"><br>

        <div class="buttons">
          <button (click)="updateEmployee()">Update</button>
          <button (click)="goBack()">Cancel</button>
        </div>

      </div>

    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      text-align: center;
    }

    .form-card {
      background: #ffffff;
      padding: 20px;
      border-radius: 10px;
      max-width: 400px;
      margin: auto;
      box-shadow: 0px 2px 8px rgba(0,0,0,0.1);
    }

    input {
      width: 90%;
      padding: 8px;
      margin: 6px 0;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    .buttons {
      margin-top: 10px;
    }

    button {
      background-color: #2c6e7f;
      color: white;
      border: none;
      padding: 8px 14px;
      margin: 5px;
      border-radius: 5px;
      cursor: pointer;
    }

    button:hover {
      background-color: #1f4f5a;
    }
  `]
})
export class EditEmployeeComponent implements OnInit {

  emp: any = {};
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private empService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.empService.getEmployeeById(this.id).subscribe({
      next: (res: any) => {
        console.log("EDIT DATA:", res);
        this.emp = res?.data?.searchEmployeeByEid?.employee;
      },
      error: (err) => {
        console.error("LOAD ERROR:", err);
      }
    });
  }
  updateEmployee() {
    const formattedEmp = {
      first_name: this.emp.first_name,
      last_name: this.emp.last_name,
      email: this.emp.email,
      department: this.emp.department,
      designation: this.emp.designation,
      gender: this.emp.gender,
      salary: Number(this.emp.salary),
      date_of_joining: this.emp.date_of_joining
    };
  
    this.empService.updateEmployee(this.id, formattedEmp).subscribe({
      next: () => {
        alert("Employee updated!");
  
        // ✅ Proper navigation (NO reload)
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error(err);
        alert("Update failed");
      }
    });
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
}