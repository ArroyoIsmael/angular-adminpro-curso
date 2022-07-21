import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imgUpload: File;
  public imgTemp: any = '';

  constructor(public modalImagenService: ModalImagenService, public fileUploadServices : FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadServices.actualizarFoto(
      this.imgUpload,
      tipo,
      id
    ).then( img =>{
      this.modalImagenService.nuevaImagen.emit(img);
      this.cerrarModal();
      Swal.fire('Guardado', 'Imagen actualizada', 'success');

  }).catch( err => {
    console.log(err);
    this.cerrarModal();
    Swal.fire('Ups', 'No se pudo actualizar la imagen', 'error');




  });
  }

}
