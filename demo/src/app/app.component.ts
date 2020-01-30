import { Component } from '@angular/core';
import { ConsumorestService } from './service/consumorest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';
  categoria:any = [];
  //injectar el servicio
  constructor( public rest:ConsumorestService){

  }
  ngOnInit(){
    this.getCategoria();
  }
  getCategoria(){
    this.categoria = [];
    this.rest.getCategoriaRest().subscribe(d=>{
      console.log(d);
      this.categoria=d;
    });

    


  }
}
