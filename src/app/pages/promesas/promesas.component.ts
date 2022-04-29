import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';
// import { resolve } from 'dns';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // const promesa = new Promise( ( resolve, reject ) => {
    //   if ( false ) {
    //     resolve('Hola resolve');
    //   } else {
    //     reject('Algo salio mal');
    //   }
      
    // });
    
    // promesa.then( ( mensaje ) => {
    //   console.log(mensaje);
    // })
    // .catch( error => console.log(error));
    // console.log('Fin Init');

    this.getUsers().then( usuarios => {
      console.log( usuarios );
    })

    // this.getUsers();


  }

  getUsers() {

    return new Promise( resolve => {

      fetch('https://reqres.in/api/users')
        .then( resp => resp.json() )
        .then( body => resolve( body.data ) );

    });
  }


}
