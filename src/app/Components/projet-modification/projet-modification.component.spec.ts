import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetModificationComponent } from './projet-modification.component';

describe('ProjetModificationComponent', () => {
  let component: ProjetModificationComponent;
  let fixture: ComponentFixture<ProjetModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetModificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
