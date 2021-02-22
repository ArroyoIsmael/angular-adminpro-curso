import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() { 
    

    // this.retornaObservable().pipe(
    //   retry()
    // ).subscribe(
    //   valor => console.log('Subs: ', valor),
    //   error => console.warn('Error: ', error),
    //   () => console.info('Obs Terminado')
    // );

    this.intervalSubs = this.retornaInterval().subscribe(console.log);

  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();  
  }
  
  retornaInterval(): Observable<number> {
    return interval(100)
                      .pipe(
                        map(valor => {return valor + 1}),
                        filter( valor => ( valor % 2 === 0) ? true : false ),
                        // take(10),
                      );
  }


  // retornaObservable(): Observable<number> {
  //   let i = -1;

  //   const obs$ = new Observable<Number>( observer => {  
     
  //     const interval = setInterval( () => {
  //       i++;
  //       observer.next(i);
  //       if ( i === 4) {
  //         clearInterval(interval);
  //         observer.complete();
  //       }
  //       if ( i === 2) {
  //         observer.error('I = 2');
  //       }
  //     }, 1000)
  //   });

  //   return obs$;
    
  // }


}
