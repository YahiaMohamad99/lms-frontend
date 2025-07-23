import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionContent, SessionContentService } from 'src/app/core/services/session_content/session-content.service';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html'
})
export class SessionDetailsComponent implements OnInit {
  sessionId!: number;
  contents: SessionContent[] = [];

  constructor(private route: ActivatedRoute, private contentService: SessionContentService) {}

  ngOnInit(): void {
    this.sessionId = +this.route.snapshot.paramMap.get('sessionId')!;
    this.loadContents();
  }

  loadContents(): void {
    this.contentService.getBySession(this.sessionId).subscribe({
      next: res => this.contents = res
    });
  }

  deleteContent(id: number): void {
    this.contentService.deleteContent(id).subscribe({
      next: () => this.loadContents()
    });
  }

  getContentsByType(type: string): SessionContent[] {
    return this.contents.filter(c => c.type.toLowerCase() === type.toLowerCase());
  }

  onFileSelect(event: any, type: string): void {
    const file: File = event.target.files[0];
    if (file) {
      this.contentService.uploadContent(this.sessionId, type, file).subscribe({
        next: () => this.loadContents()
      });
    }
  }
}
