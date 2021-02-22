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
    }
  ]; 

  constructor() { }
}
