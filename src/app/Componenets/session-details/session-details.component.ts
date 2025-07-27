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
    next: (res) => {
      this.contents = Array.isArray(res) ? res : [];
    },
    error: (err) => {
      console.error('❌ فشل تحميل المحتوى:', err);
      this.contents = [];
    }
  });
}



  deleteContent(id: number): void {
    this.contentService.deleteContent(id).subscribe({
      next: () => this.loadContents(),
      error: (err) => console.error('❌ فشل حذف المحتوى:', err)
    });
  }

  getContentsByType(type: string): SessionContent[] {
    if (!Array.isArray(this.contents)) return [];

    return this.contents.filter(c => c.type?.toLowerCase() === type.toLowerCase());
  }

  onFileSelect(event: any, type: string): void {
    const file: File = event.target.files[0];
    console.log('📁 ملف مختار:', file?.name, '🧮 الحجم:', file?.size);

    if (file) {
      this.contentService.uploadContent(this.sessionId, type, file).subscribe({
        next: () => {
          console.log('✅ تم الرفع بنجاح');
          this.loadContents();
        },
        error: (err) => {
          console.warn('📛 الرسالة العامة:', err.error?.title || err.message);
          console.warn('🆔 الجلسة:', err.error?.errors?.SessionId);
          console.warn('📦 النوع:', err.error?.errors?.Type);
          console.warn('📁 الملف:', err.error?.errors?.File);
        }
      });
    }
  }
}
