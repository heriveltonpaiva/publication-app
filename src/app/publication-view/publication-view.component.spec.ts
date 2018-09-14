import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationViewComponent } from './publication-view.component';

describe('PublicationViewComponent', () => {
  let component: PublicationViewComponent;
  let fixture: ComponentFixture<PublicationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
