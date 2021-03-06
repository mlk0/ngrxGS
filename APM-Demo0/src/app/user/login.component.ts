import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';
import { Store, select } from '@ngrx/store';

//this is one option to reference directly to the app state  but in this case the selectors will not be there
import * as fromRoot from '../state/app-state';

//so it's better to export all from the feature reducer from where the AppState can be simply exported without adding anything new there
import * as fromUserReducer from './state';
import * as fromUserActions from './state/user-actions'
import { takeWhile } from 'rxjs/operators';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.componentActive = false;
  }
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;
  componentActive: boolean = true;

  constructor(private authService: AuthService,
    private router: Router,
    private state: Store<fromUserReducer.AppState>
  ) {
  }

  ngOnInit(): void {

    this.state.pipe(select(fromUserReducer.maskUserNameSelector, takeWhile(()=>this.componentActive))).subscribe(
      maskUserNameState => {
        
          console.log(`LoginComponent - user slice updated response from the subsribed observable`);
          this.maskUserName = maskUserNameState;
        
      }
    );


  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    
    console.log(`LoginComponent.checkChanged - dispatching maskUserName : ${value}`);
    
    // this.state.dispatch(
    //   {
    //     type: 'MASK_USER_NAME',
    //     payload: value
    //   }
    // );

    this.state.dispatch(new fromUserActions.MaskUserName(value));

  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
