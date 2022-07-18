import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imgUpload: File;
  public imgTemp: any = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadservices: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    this.usuarioService
      .actualizarUsuario(this.perfilForm.value)
      .subscribe(() => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Los cambios fueron guardados', 'success');
      }, (error) => {
        Swal.fire('Ups', error.error.msg, 'error');
      });
  }

  cambiarImg(file: File) {
    this.imgUpload = file;
    if (!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader();

    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  uploadImage() {
    this.fileUploadservices.actualizarFoto(
      this.imgUpload,
      'usuarios',
      this.usuario.uid
    ).then( img =>{

      this.usuario.img = img;
      Swal.fire('Guardado', 'Imagen actualizada', 'success');

  }).catch( err => {
    console.log(err);
    Swal.fire('Ups', 'No se pudo actualizar la imagen', 'error');
  });
  }
}
