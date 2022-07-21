import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

import { BrowserModule } from '@angular/platform-browser'
import Swal from 'sweetalert2';
//SERVICES
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {


  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private usuarioService: UsuarioService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService
              ) { }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(1000)
    )
    .subscribe( img => this.cargarUsuarios());

  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe(({ total, usuarios}) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    })
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();


  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;

    }
    this.busquedasService.buscar('usuarios', termino)
    .subscribe(resp => {
        this.usuarios = resp
      })
  }

  eliminarUsuario(usuario: Usuario){

    if(usuario.uid === this.usuarioService.uId ) {
      return Swal.fire('Error', '¡No puede borrarse a si mismo!', 'error');
    }


    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Eliminar usuario ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
        .subscribe( resp => {
          Swal.fire(
            'Eliminado!',
            `El usuario ${usuario.nombre} ha sido eliminado`,
            'success'
            );
            this.cargarUsuarios();
        })

      }
    })

  }

  cambiarRole(usuario: Usuario){
    this.usuarioService.actualizarRole(usuario )
    .subscribe(resp => {
      console.log(usuario);
    })
  }

  abrirImagen(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios',usuario.uid, usuario.img);
  }

}
