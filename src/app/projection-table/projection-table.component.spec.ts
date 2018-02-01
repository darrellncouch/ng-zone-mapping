import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionTableComponent } from './projection-table.component';

describe('ProjectionTableComponent', () => {
  let component: ProjectionTableComponent;
  let fixture: ComponentFixture<ProjectionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
