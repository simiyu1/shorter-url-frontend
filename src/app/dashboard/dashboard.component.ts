import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlShorteningService } from '../services/url-shortening.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  urlForm!: FormGroup;
  shortenedUrls: any[] = [];

  constructor(private formBuilder: FormBuilder, private urlShorteningService: UrlShorteningService) { }

  ngOnInit(): void {
    this.urlForm = this.formBuilder.group({
      longUrl: ['', Validators.required]
    });
    this.fetchShortenedUrls();
  }

  onSubmit(): void {
    if (this.urlForm.valid) {
      this.urlShorteningService.shortenUrl(this.urlForm.value).subscribe(
        (shortUrl) => {
          this.shortenedUrls.push(shortUrl);
          this.urlForm.reset();
        },
        error => {
          console.error('URL shortening failed', error);
          // Show an error message or handle the error accordingly
        }
      );
    }
  }

  fetchShortenedUrls(): void {
    this.urlShorteningService.getShortenedUrls().subscribe(
      (urls) => {
        this.shortenedUrls = urls;
      },
      error => {
        console.error('Fetching shortened URLs failed', error);
        // Show an error message or handle the error accordingly
      }
    );
  }
}

