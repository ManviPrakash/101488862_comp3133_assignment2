import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../service/employee';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-employee.html',
  styleUrls: ['./view-employee.css']
})
export class ViewEmployeeComponent implements OnInit {

  emp: any = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private empService: EmployeeService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    console.log("VIEW ID:", id);

    if (!id) {
      this.loading = false;
      return;
    }

    this.empService.getEmployeeById(id).subscribe({
      next: (res: any) => {
        console.log("FULL RESPONSE:", res);

        const employee = res?.data?.searchEmployeeByEid?.employee;

        console.log("EXTRACTED EMP:", employee);

        // 🔥 FORCE NEW OBJECT (CRITICAL)
        this.emp = employee ? JSON.parse(JSON.stringify(employee)) : null;

        this.loading = false;

        // 🔥 FORCE UI REFRESH
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("VIEW ERROR:", err);
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
}