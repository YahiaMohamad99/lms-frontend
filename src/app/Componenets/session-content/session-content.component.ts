import { Component, Input, OnInit } from '@angular/core';
import { SessionContentService, SessionContent } from 'src/app/core/services/session_content/session-content.service';

@Component({
  selector: 'app-session-content',
  templateUrl: './session-content.component.html',
  styleUrls: ['./session-content.component.css']
})
export class SessionContentComponent implements OnInit {
  @Input() sessionId!: number;
  contents: SessionContent[] = [];
  loading = false;

  constructor(private contentService: SessionContentService) {}

  ngOnInit(): void {
    this.loadContents();
  }

  loadContents(): void {
    if (!this.sessionId) return;
    this.loading = true;
    this.contentService.getBySession(this.sessionId).subscribe({
      next: res => {
        this.contents = res;
        this.loading = false;
      },
      error: err => {
        console.error('❌ فشل تحميل المحتوى:', err);
        this.loading = false;
      }
    });
  }

  deleteContent(contentId: number): void {
    this.contentService.deleteContent(contentId).subscribe({
      next: () => this.loadContents(),
      error: err => console.error('❌ فشل حذف المحتوى:', err)
    });
  }

  getContentsByType(type: string): SessionContent[] {
    return this.contents.filter(c => c.type.toLowerCase() === type.toLowerCase());
  }
}
