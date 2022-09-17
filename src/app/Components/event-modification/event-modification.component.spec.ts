import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventModificationComponent } from './event-modification.component';

describe('EventModificationComponent', () => {
  let component: EventModificationComponent;
  let fixture: ComponentFixture<EventModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventModificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
