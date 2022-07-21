import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', Url: '/'},
        { titulo: 'Progressbar', Url: 'progress'},
        { titulo: 'Gráficas', Url: 'grafica1'},
        { titulo: 'Promesas', Url: 'promesas'},
        { titulo: 'Rxjs', Url: 'rxjs'},
      ]
    },
    {
      titulo: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', Url: 'usuarios'},
        { titulo: 'Hospitales', Url: 'hospitales'},
        { titulo: 'Médicos', Url: 'medicos'}
      ]
    }
  ];

  constructor() { }
}
