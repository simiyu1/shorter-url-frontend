import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { UrlShorteningService } from '../services/url-shortening.service';
import { FormControl } from '@angular/forms';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let urlShorteningService: UrlShorteningService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [DashboardComponent],
      providers: [UrlShorteningService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    urlShorteningService = TestBed.inject(UrlShorteningService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should call shortenUrl and update shortenedUrls and urlMappings when the form is valid', () => {
      const shortenUrlSpy = spyOn(urlShorteningService, 'shortenUrl').and.returnValue(of('http://short.url'));
      component.urlForm.setValue({ longUrl: 'https://longurlexample.com', customAlias: '' });

      component.onSubmit();

      expect(shortenUrlSpy).toHaveBeenCalled();
      expect(component.shortenedUrls).toContain('http://short.url');
      expect(component.urlMappings).toContain('http://short.url');
    });

    it('should not call shortenUrl when the form is invalid', () => {
      const shortenUrlSpy = spyOn(urlShorteningService, 'shortenUrl');
      component.urlForm.setValue({ longUrl: 'invalid-url', customAlias: '' });

      component.onSubmit();

      expect(shortenUrlSpy).not.toHaveBeenCalled();
    });
  });

  describe('fetchShortenedUrls', () => {
    it('should fetch shortened URLs and update the shortenedUrls array', () => {
      const shortenedUrls = ['http://short1.url', 'http://short2.url'];
      spyOn(urlShorteningService, 'getShortenedUrls').and.returnValue(of(shortenedUrls));

      component.fetchShortenedUrls();

      expect(component.shortenedUrls).toEqual(shortenedUrls);
    });
  });

  describe('fetchUrlMappings', () => {
    it('should fetch all URL mappings and update the urlMappings array', () => {
      const urlMappings = [
        { longUrl: 'https://long1.url', shortUrl: 'http://short1.url', id: 1 },
        { longUrl: 'https://long2.url', shortUrl: 'http://short2.url', id:2},
      ];
      spyOn(urlShorteningService, 'getAllUrls').and.returnValue(of(urlMappings));

      component.fetchUrlMappings();

      expect(component.urlMappings).toEqual(urlMappings);
    });
  });

  describe('validUrl', () => {
    it('should return null if the URL is valid', () => {
      const control = new FormControl('https://longurlexample.com');
      const result = DashboardComponent.validUrl(control);
      expect(result).toBeNull();
    });

    it('should return an error object if the URL is invalid', () => {
      const control = new FormControl('invalid-url');
      const result = DashboardComponent.validUrl(control);
      expect(result).toEqual({ invalidUrl: { value: control.value } });
    });
  });
});