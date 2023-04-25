import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  let dataService: DataService;

  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [AdminDashboardComponent],
      providers: [AuthService, DataService],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    dataService = TestBed.inject(DataService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that there are no pending HTTP requests
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the last 5 URLs', () => {
    const mockUrls = ['url1', 'url2', 'url3', 'url4', 'url5'];
  
    component.fetchLastFiveUrls();
  
    const req = httpTestingController.expectOne(dataService.getLastFiveUrlsEndpoint + '/urls/last-five');
    expect(req.request.method).toEqual('GET');
    req.flush(mockUrls);
  
    expect(component.lastFiveUrls).toEqual(mockUrls);
  });
  
  it('should fetch the summary', () => {
    const mockSummary = {
      totalUrls: 100,
      uniqueClicks: 50,
      numberOfUsers: 10,
    };
  
    component.fetchSummary();
  
    const req = httpTestingController.expectOne(dataService.getSummaryEndpoint + '/summary');
    expect(req.request.method).toEqual('GET');
    req.flush(mockSummary);
  
    expect(component.totalUrls).toEqual(mockSummary.totalUrls);
    expect(component.uniqueClicks).toEqual(mockSummary.uniqueClicks);
    expect(component.numberOfUsers).toEqual(mockSummary.numberOfUsers);
  });

  it('should log out and navigate to the login page', () => {
    // Handle the requests made in ngOnInit
    httpTestingController.expectOne(`${dataService.getLastFiveUrlsEndpoint}/urls/last-five`).flush([]);
    httpTestingController.expectOne(`${dataService.getSummaryEndpoint}/urls/summary`).flush({});

    const authServiceLogoutSpy = spyOn(authService, 'logout');
    const routerNavigateSpy = spyOn(router, 'navigate');
  
    component.logout();
  
    expect(authServiceLogoutSpy).toHaveBeenCalled();
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
