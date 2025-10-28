import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPost } from './project-post';

describe('ProjectPost', () => {
  let component: ProjectPost;
  let fixture: ComponentFixture<ProjectPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
