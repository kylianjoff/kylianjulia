import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cheatsheets } from './cheatsheets';

describe('Cheatsheets', () => {
  let component: Cheatsheets;
  let fixture: ComponentFixture<Cheatsheets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cheatsheets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cheatsheets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
