import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    const url = `${base_url}/uploads/${tipo}/${id}`;

    const formData = new FormData();

    formData.append('imagen', archivo);

    const resp = await fetch(url, {
      method: 'PUT',
      headers: {
        'x-api-key': localStorage.getItem('token') || ''
      },
      body: formData
    });

    const data = await resp.json();
    console.log(data);
    if (data.ok) {
      return data.nombreArchivo;
    } else {
      console.log(data.msg);
    }

    try {
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
