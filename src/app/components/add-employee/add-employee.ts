import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../service/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee.html',
  styleUrls: ['./add-employee.css']
})
export class AddEmployeeComponent {

  emp: any = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    designation: '',
    salary: '',
    department: '',
    date_of_joining: '',
    employee_photo_base64: ''
  };

  constructor(
    private empService: EmployeeService,
    private router: Router
  ) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      this.emp.employee_photo_base64 = reader.result;
    };

    reader.readAsDataURL(file);
  }

  addEmployee() {

    if (!this.emp.first_name || !this.emp.last_name || !this.emp.email ||
        !this.emp.gender || !this.emp.designation ||
        !this.emp.salary || !this.emp.department || !this.emp.date_of_joining) {

      alert("Please fill all fields");
      return;
    }

    const formattedEmp = {
      ...this.emp,
      salary: Number(this.emp.salary),
      date_of_joining: new Date(this.emp.date_of_joining).toISOString()
    };

    this.empService.addEmployee(formattedEmp).subscribe({
      next: (res: any) => {
        console.log("ADD SUCCESS:", res);

        alert("Employee added successfully!");

        // 🔥 IMPORTANT FIX (prevents empty list after add)
        this.router.navigate(['/employees']).then(() => {
         
        });
      },
      error: (err) => {
        console.error("ADD ERROR:", err);

        alert(err?.error?.errors?.[0]?.message || "Error adding employee");
      }
    });
  }
}