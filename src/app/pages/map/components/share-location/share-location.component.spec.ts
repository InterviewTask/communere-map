import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareLocationComponent } from './share-location.component';

describe('ShareLocationComponent', () => {
  let component: ShareLocationComponent;
  let fixture: ComponentFixture<ShareLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
