import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  lastFiveUrls: string[] = [];
  totalUrls: number = 0;
  uniqueClicks: number = 0;
  numberOfUsers: number = 0;

  constructor(private authService: AuthService, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.fetchLastFiveUrls();
    this.fetchSummary();
  }

  fetchLastFiveUrls() {
    this.dataService.getLastFiveUrls().subscribe(urls => {
      this.lastFiveUrls = urls;
    });
  }

  fetchSummary() {
    this.dataService.getSummary().subscribe(summary => {
      this.totalUrls = summary.totalUrls;
      this.uniqueClicks = summary.uniqueClicks;
      this.numberOfUsers = summary.numberOfUsers;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to the login page after logging out.
  }
}
