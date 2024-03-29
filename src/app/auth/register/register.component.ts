import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ 'register.component.css' ]
})
export class RegisterComponent {

    public formSubmit = false;
  
    public registerForm = this.fb.group({
      nombre: ['Ismael', Validators.required],
      email: ['test@gmail.com', [Validators.required, Validators.email]],
      password: ['1234567890', Validators.required],
      password2: ['1234567890', Validators.required],
      terminos: [false, Validators.required],
    }, {
      validators : this.passwordsIguales('password','password2')
    });
  
    constructor(
      private fb: FormBuilder, 
      private usuarioService : UsuarioService, 
      private router : Router) { }
  
    crearUsuario() {
      this.formSubmit = true;

      if (this.registerForm.invalid) {
        return;
        
      }
      this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        Swal.fire('Success', 'Usuario creado', 'success');
        this.router.navigateByUrl('/dashboard');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });

      console.log(this.registerForm.value);
    }

    campoNoValido( campo: string): boolean {
      if (this.registerForm.get(campo).invalid && this.formSubmit) {
        return true;

      } else {
        return false
      }

    }

    contrasenasNoValidas() {
      const pass1 = this.registerForm.get('password').value;
      const pass2 = this.registerForm.get('password2').value;

      if ((pass1 !== pass2) && this.formSubmit ) {
        return true
      } else {
        return false;
      }
    }

    aceptarTerminos() {
      return !this.registerForm.get('terminos').value && this.formSubmit;
    }

    passwordsIguales(pass1Name: string, pass2Name: string) {
      return (formGroup: FormGroup) => {
        const pass1Control = formGroup.get(pass1Name);
        const pass2Control = formGroup.get(pass2Name);

        if (pass1Control.value === pass2Control.value) {
          pass2Control.setErrors(null);
        } else {
          pass2Control.setErrors({noEsIgual: true});
        }
      }
    }

}
