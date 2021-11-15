import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomePage],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display dealers card', () => {
    expect(document.getElementsByClassName('dealer')[0]).toBeTruthy();
  });

  it('should display one dealer card', () => {
    expect(document.getElementsByClassName('dealer').length).toBe(1);
  });

  it('should display players card', () => {
    expect(document.getElementsByClassName('player')[0]).toBeTruthy();
  });

  it('should display two player cards', () => {
    expect(document.getElementsByClassName('player').length).toBe(2);
  });
});
