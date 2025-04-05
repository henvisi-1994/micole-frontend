import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged,  takeUntil } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter } from '@angular/material/core';
import { StudentAttendance } from 'src/models/school/studentAttendance.model';
import { AttendanceSummary } from 'src/models/school/attendanceSummary';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.scss']
})
export class StudentAttendanceComponent implements OnInit {

  private destroy$ = new Subject<void>();

  students: StudentAttendance[] = [];
  filteredStudents: StudentAttendance[] = [];
  attendanceSummary: AttendanceSummary = {
    totalStudents: 0,
    averageAttendance: 0,
    bestAttendance: 0,
    worstAttendance: 0
  };

  searchControl = new FormControl('');
  isLoading = true;
  errorLoading = false;
  sortColumn: keyof StudentAttendance = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions = [5, 10, 25, 100];

  // Date range form
  dateRangeForm = new FormGroup({
    startDate: new FormControl(null),
    endDate: new FormControl(null, [
      Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)
    ])
  });

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('es'); // Set locale for date formatting
  }

  ngOnInit(): void {
    this.setupSearchFilter();
    this.fetchStudentAttendance();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Sets up the search filter with debounce
   */
  private setupSearchFilter(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.currentPage = 0; // Reset to first page on search
      this.filterStudents(value || '');
    });
  }

  /**
   * Fetches student attendance data from the API
   */
  fetchStudentAttendance(): void {
    this.isLoading = true;
    this.errorLoading = false;

    // In a real app, replace with your API endpoint
    this.http.get<StudentAttendance[]>('api/student-attendance').subscribe({
      next: (data) => {
        this.students = data;
        this.filteredStudents = [...this.students];
        this.calculateSummary();
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching attendance data:', error);
        this.errorLoading = true;
        this.isLoading = false;
        this.showError('Error al cargar los datos de asistencia');
      }
    });
  }

  /**
   * Filters students based on search term
   * @param searchTerm The term to filter by
   */
  filterStudents(searchTerm: string): void {
    searchTerm = searchTerm.toLowerCase();

    this.filteredStudents = this.students.filter(student =>
      student.name.toLowerCase().includes(searchTerm) ||
      student.id.toString().includes(searchTerm)
    );

    this.calculateSummary();
  }

  /**
   * Applies date range filter to the student list
   */
  applyDateFilter(): void {
    if (this.dateRangeForm.invalid) {
      this.showError('Por favor ingrese un rango de fechas válido');
      return;
    }

    const { startDate, endDate } = this.dateRangeForm.value;

    if (!startDate && !endDate) {
      this.filteredStudents = [...this.students];
      this.calculateSummary();
      return;
    }

    this.isLoading = true;

    // In a real app, you would make an API call with date parameters
    // For demo purposes, we'll simulate the filtered data
    setTimeout(() => {
      // This would be replaced with actual filtered data from your API
      this.filteredStudents = [...this.students];
      this.calculateSummary();
      this.isLoading = false;
    }, 500);
  }

  /**
   * Resets all filters to their initial state
   */
  resetFilters(): void {
    this.searchControl.setValue('');
    this.dateRangeForm.reset();
    this.currentPage = 0;
    this.filteredStudents = [...this.students];
    this.calculateSummary();
  }

  /**
   * Sorts the student data by the specified column
   * @param column The column to sort by
   */
  sortData(column: keyof StudentAttendance): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredStudents.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection === 'asc'
          ? valueA - valueB
          : valueB - valueA;
      }
      return 0;
    });
  }

  /**
   * Calculates summary statistics for the attendance data
   */
  private calculateSummary(): void {
    if (this.filteredStudents.length === 0) {
      this.attendanceSummary = {
        totalStudents: 0,
        averageAttendance: 0,
        bestAttendance: 0,
        worstAttendance: 0
      };
      return;
    }

    const percentages = this.filteredStudents.map(s => s.attendancePercentage);
    const sum = percentages.reduce((a, b) => a + b, 0);

    this.attendanceSummary = {
      totalStudents: this.filteredStudents.length,
      averageAttendance: sum / this.filteredStudents.length,
      bestAttendance: Math.max(...percentages),
      worstAttendance: Math.min(...percentages)
    };
  }

  /**
   * Gets the appropriate sort icon for a column
   * @param column The column to get the icon for
   * @returns The icon name
   */
  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return 'sort';
    return this.sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }

  /**
   * Determines the CSS class for attendance percentage visualization
   * @param percentage The attendance percentage
   * @returns The appropriate CSS class
   */
  getAttendanceClass(percentage: number): string {
    if (percentage >= 90) return 'excellent';
    if (percentage >= 80) return 'good';
    if (percentage >= 70) return 'average';
    return 'poor';
  }

  /**
   * Shows an error message to the user
   * @param message The error message to display
   */
  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  /**
   * Handles page change event for pagination
   * @param event The page event
   */
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

}
