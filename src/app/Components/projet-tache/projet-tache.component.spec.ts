import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetTacheComponent } from './projet-tache.component';

describe('ProjetTacheComponent', () => {
  let component: ProjetTacheComponent;
  let fixture: ComponentFixture<ProjetTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetTacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
