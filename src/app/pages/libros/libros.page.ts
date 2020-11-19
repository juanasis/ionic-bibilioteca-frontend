import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/home/models/libro';
import { Persona } from 'src/app/home/models/persona';
import { ModalController } from '@ionic/angular';
import { ModalPage } from 'src/app/modal/modal/modal.page';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.page.html',
  styleUrls: ['./libros.page.scss'],
})
export class LibrosPage implements OnInit {


  libros: Libro[];
  selectedLibro: Libro = new Libro();
  oldlibro: Libro = new Libro() ;
  personas: Persona[];
  selectedPersona: Persona = new Persona();
  addOnEdit(){
    
    this.oldlibro = this.selectedLibro;
    if(this.selectedLibro.titulo === ""  )
        console.log("ingrese un titulo");
    else    if(this.selectedLibro.id === 0){//libro nuevo
      
      this.selectedLibro.id = this.libros.length + 1;
      console.log(this.selectedLibro.id);
      this.libros.push(this.selectedLibro);
      this.http.post("http://localhost:8080/libros/agregarlibro", {
         "id" : this.selectedLibro.id,
        "titulo":this.selectedLibro.titulo,
        "cantidadpaginas":this.selectedLibro.cantidadpaginas,
        "fechapublicacion":this.selectedLibro.fechapublicacion
      }).subscribe(
        data  => {
        console.log("POST Request is successful ", data);
        },
        error  => {
        
        console.log("Error", error);
        
        }
        
        );
    }else{ //no es libro nuevo,entonces hay que editar, llamar la api rest para editar
      var contador =0;
      var encontrado=0;
     for (let item of this.libros) {
     
      if (item.id === this.selectedLibro.id) {
        
        encontrado = contador;
      }
      ++contador;
      
    }     
    this.libros[encontrado] = this.selectedLibro;
   
    }
     // this.selectedLibro= this.selectedLibro;
    
     this.selectedLibro= { "id" : 0,
                           "titulo":"",
                           "cantidadpaginas":0,
                           "fechapublicacion":""};
    this.libros = this.libros;
    
  }
 
  openForEdit(libro: Libro){

      this.selectedLibro=libro;
  }
  
  delete(){
    if(confirm('Estas seguro de eliminar?')){
      this.libros = this.libros.filter(x => x != this.selectedLibro);
      
      this.http.delete("http://localhost:8080/libros/"+this.selectedLibro.id).subscribe(
        data  => {
        console.log("DELETE Request is successful ", data);
        },
        error  => {   
        
        console.log("Error", error);
        
        }
        
        );
        this.selectedLibro=new Libro();
    }

  }

 
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      //cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  limpiar(){
    
    this.selectedLibro= { "id" : 0,
                           "titulo":"",
                           "cantidadpaginas":0,
                           "fechapublicacion":""};
  }
  constructor(public http: HttpClient , public modalController:ModalController) { }

  ngOnInit(): void {
    this.http.get("http://localhost:8080/libros",{responseType: 'json'}).subscribe(
      (resp:any) =>{
      this.libros = resp.data;
      console.log("Funciona la APi REst");
      console.log(this.libros); })
  }
}
