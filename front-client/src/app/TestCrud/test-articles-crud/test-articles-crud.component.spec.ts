import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestArticlesCrudComponent } from './test-articles-crud.component';

describe('TestArticlesCrudComponent', () => {
  let component: TestArticlesCrudComponent;
  let fixture: ComponentFixture<TestArticlesCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestArticlesCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestArticlesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
