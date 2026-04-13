import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../service/employee';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css']
})
export class EmployeeListComponent implements OnInit {

  employees: any[] = [];
  allEmployees: any[] = [];
  loading: boolean = true;

  searchText: string = '';

  constructor(
    private empService: EmployeeService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading = true;

    this.empService.getEmployees().subscribe({
      next: (res: any) => {
        console.log("LIST RESPONSE:", res);

        const data = res?.data?.getAllEmployees?.employees;

        if (data) {
          // 🔥 force new reference (IMPORTANT)
          this.employees = [...data];
          this.allEmployees = [...data];
        } else {
          this.employees = [];
          this.allEmployees = [];
        }

        this.loading = false;

        // 🔥 force UI update
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  deleteEmployee(id: string) {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    this.empService.deleteEmployee(id).subscribe({
      next: () => {
        alert("Employee deleted!");

        // 🔥 reload fresh list from backend
        this.loadEmployees();
      },
      error: (err) => {
        console.error(err);
        alert("Delete failed");
      }
    });
  }

  search() {
    const text = this.searchText.trim().toLowerCase();

    this.employees = this.allEmployees.filter(emp =>
      (emp.department && emp.department.toLowerCase().includes(text)) ||
      (emp.designation && emp.designation.toLowerCase().includes(text))
    );
  }
  logout() {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']); 
  }
}