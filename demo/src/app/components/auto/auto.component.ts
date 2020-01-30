import { Component, OnInit } from '@angular/core';
import { ConsumorestService } from 'src/app/service/consumorest.service';
import { ConsumofirebaseService } from 'src/app/service/consumofirebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { error } from 'protractor';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})
export class AutoComponent implements OnInit {
  public autos: any = [];
  public documentID = null;
  public currentStatus = 1;

  public crearAutoForm = new FormGroup({
    marcaF: new FormControl('', Validators.required),
    modeloF: new FormControl('', Validators.required),
    anioF: new FormControl('', Validators.required),
    urlF: new FormControl('', Validators.required),
    idF: new FormControl('')
  });

  constructor(
    private fs: ConsumofirebaseService
  ) {
    this.crearAutoForm.setValue({
      idF: '',
      marcaF: '',
      modeloF: '',
      anioF: '',
      urlF: ''
    });

  }

  ngOnInit() {
    this.obtenerAutos();
  }
  public obtenerAutos() {
    this.fs.ObtenerAutos().subscribe((dataDocumentos) => {
      dataDocumentos.forEach((data: any) => {
        this.autos.push({
          id: data.payload.doc.id,
          data: data.payload.doc.data()
        });
        console.log(this.autos);
      })
    });
  }

  public eliminarAuto(documentID) {
    this.fs.eliminarAuto(documentID).then(
      () => { console.log("Documento eliminado"); }, (error) => { console.log(error); })
  }



  public actualizarAuto(documentID) {
    let editsubscribe = this.fs.obtenerAutoId(documentID).subscribe(
      (data) => {
        this.currentStatus = 2;
        this.documentID = documentID;
        this.crearAutoForm.setValue({
          idF: documentID,
          marcaF: data.payload.data()['marca'],
          modeloF: data.payload.data()['modelo'],
          anioF: data.payload.data()['anio'],
          urlF: data.payload.data()['url'],
        })
        editsubscribe.unsubscribe();
      }
    );
  }
  //metodo para actualizar y agregar un nuevo auto
  //nuevo auto
  public nuevoAuto(form,documentId= this.documentID)
  {
    if(this.currentStatus==1)
    {
      let data = {
        marca: form.marcaF,
        modelo: form.modeloF,
        anio: form.anioF,
        url: form.urlF
      }

      this.fs.crearAuto(data).then(
        ()=>  
      {
        console.log("Documento creado exitosamente");
        this.crearAutoForm.setValue(
          {
          idF:'',
          marcaF:'',
          modeloF:'',
          anioF:'',
          urlF:''
        });
      }, (error)=>{
      console.log(error);
    });
  
      
    }else{
      let data = {
        marca: form.marcaF,
        modelo: form.modeloF,
        anioF: form.anioF,
        url: form.urlF
      }
      this.fs.actualizarAuto(documentId,data).then(
        ()=>
      {
        this.crearAutoForm.setValue(
          {
           idF:'',
            marcaF:'',
            modeloF:'',
            anioF:'',
            urlF:''
          });
          console.log("Documento editado existosamente");
      },(error) =>
      {
        console.log(error);
        
      });
  
    }
  }

}
