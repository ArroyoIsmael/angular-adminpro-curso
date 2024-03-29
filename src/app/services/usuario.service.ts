import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { cargarUsuario } from '../interfaces/cargar-usuarios.interface';


const base_url = environment.base_url;
declare const gapi : any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2 : any;
  public usuario : Usuario;

  constructor( private http: HttpClient, private router : Router, private ngZone : NgZone) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get uId(): string {
    return this.usuario.uid ? this.usuario.uid : '';
  }

  get headers(){
    return  {
      headers: {
      'x-api-key' : this.token
      }
    };
  }

  googleInit(){

    return new Promise<void> (resolve => {

      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '578553616943-ei0hep201n54v4f2rgq6c1d8sgr9f4uq.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });

    })
  }

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() =>{
        this.router.navigateByUrl('/login');

      })
      });
  }

  validarToken() : Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-api-key' : this.token
      }
    }).pipe(
      map( (resp : any) => {
        const {
          email,
          google,
          img = '',
          nombre,
          role,
          uid
        } = resp.usuario;

        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);

        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError( error => of(false))
    )
  }

  crearUsuario(formData : RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap((resp : any) => {
        localStorage.setItem('token', resp.token)
      })
    );


  }

  actualizarUsuario(data: {email: string, nombre: string, role: string}) {

    data =  {
      ...data,
      role : this.usuario.role
    };
    return this.http.put(`${base_url}/usuarios/${this.uId}`, data, {
      headers: {
        'x-api-key' : this.token
      }
    });
  }

  login(formData : LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
    .pipe(
      tap( (resp : any) => {
        localStorage.setItem('token', resp.token);
      })
    );

  }

  loginGoogle( token ) {
    return this.http.post(`${base_url}/login/google`, {token})
    .pipe(
      tap( (resp : any) => {
        localStorage.setItem('token', resp.token);
      })
    );

  }

  cargarUsuarios(desde : number = 0) {

    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<cargarUsuario>(url, this.headers)
      .pipe(
        map(resp => {

          const usuarios = resp.usuarios
            .map(
              user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid))
          return {
            total: resp.total,
            usuarios
          }
        })
      )

  }

  eliminarUsuario(usuario: Usuario) {
    //usuarios/6086df835b2cafd21f29cf6c
    const url = `${base_url}/usuarios/${usuario.uid}`;

    return this.http.delete(url, this.headers);

  }

  actualizarRole(data: Usuario) {

    return this.http.put(`${base_url}/usuarios/${data.uid}`, data, this.headers);
  }

}
