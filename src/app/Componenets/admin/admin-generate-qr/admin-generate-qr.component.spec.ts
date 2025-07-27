import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGenerateQrComponent } from './admin-generate-qr.component';

describe('AdminGenerateQrComponent', () => {
  let component: AdminGenerateQrComponent;
  let fixture: ComponentFixture<AdminGenerateQrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGenerateQrComponent]
    });
    fixture = TestBed.createComponent(AdminGenerateQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
