import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { on } from 'process';

declare const gapi : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ 'login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubmit = false;
  public auth2 : any;
  
    public loginForm = this.fb.group({
      email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['',Validators.required],
      remember: false
    });

  constructor( private router: Router, private fb: FormBuilder, private usuarioService : UsuarioService, private ngZone : NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    // this.formSubmit = true;
    
    // if (this.loginForm.invalid) {
    //   return;
      
    // }
    this.usuarioService.login(this.loginForm.value)
    .subscribe(resp => {
      if (this.loginForm.get('remember').value) {
        localStorage.setItem('email', this.loginForm.get('email').value);
        
      } else {
        localStorage.removeItem('email');
      }
      this.router.navigateByUrl('/dashboard');
      
    }, (err => {
      Swal.fire('Error', err.error.msg, 'error');
    }));
    // console.log(this.loginForm.value);
  }

  // onSuccess(googleUser) {
  //   console.log(googleUser.getAuthResponse().id_token);
  //   console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  // }

  // onFailure(error) {
  //   console.log(error);
  // }



  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }

  async startApp() {
    
    await this.usuarioService.googleInit()
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element) {

    this.auth2.attachClickHandler(element, {},
        (googleUser)  => {
          const idToken = googleUser.getAuthResponse().id_token;
          this.usuarioService.loginGoogle(idToken)
          .subscribe( resp => {
            //REDIRECT

            this.ngZone.run(() =>{
              this.router.navigateByUrl('/dashboard');
      
            })

          });

        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
