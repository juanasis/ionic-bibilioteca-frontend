import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/home/models/persona';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.page.html',
  styleUrls: ['./personas.page.scss'],
})
export class PersonasPage implements OnInit {

  personas: Persona[];
  selectedPersona: Persona = new Persona();
  oldPersona: Persona = new Persona() ;
  
  addOnEdit(){
    
    this.oldPersona = this.selectedPersona;
    if(this.selectedPersona.nombre === ""  )
        console.log("ingrese un nombre");
    else    if(this.selectedPersona.id === 0){//Persona nuevo
      
      this.selectedPersona.id = this.personas.length + 1;
      console.log(this.selectedPersona.id);
      this.personas.push(this.selectedPersona);
      this.http.post("http://localhost:8080/personas/agregarPersona", {
        "id" : this.selectedPersona.id,
        "apellido":this.selectedPersona.apellido,
        "nombre":this.selectedPersona.nombre,
        "direccion":this.selectedPersona.direccion,       
        "telefono":this.selectedPersona.telefono,
      }).subscribe(
        data  => {
        console.log("POST Request is successful ", data);
        },
        error  => {
        
        console.log("Error", error);
        
        }
        
        );
    }else{ //no es Persona nuevo,entonces hay que editar, llamar la api rest para editar
      var contador =0;
      var encontrado=0;
     for (let item of this.personas) {
     
      if (item.id === this.selectedPersona.id) {
        
        encontrado = contador;
      }
      ++contador;
      
    }     
    this.personas[encontrado] = this.selectedPersona;
   
    }
     // this.selectedPersona= this.selectedPersona;
    
     this.selectedPersona= { "id" : 0,
                          "apellido":"",
                          "nombre":"",
                          "direccion":"",
                          "telefono":0,
                           };
    this.personas = this.personas;
    
  }
 
  openForEdit(Persona: Persona){
      this.selectedPersona=Persona;
  }
  
  delete(){
    if(confirm('Estas seguro de eliminar?')){
      this.personas = this.personas.filter(x => x != this.selectedPersona);
      
      this.http.delete("http://localhost:8080/personas/"+this.selectedPersona.id).subscribe(
        data  => {
        console.log("DELETE Request is successful ", data);
        },
        error  => {
        
        console.log("Error", error);
        
        }
        
        );
        this.selectedPersona=new Persona();
    }

  }


  limpiar(){
    
    this.selectedPersona= { "id" : 0,
                          "apellido":"",
                          "nombre":"",
                          "direccion":"",
                          "telefono":0,
                           };
  }
  constructor(public http: HttpClient ) { }

  ngOnInit(): void {
    this.http.get("http://localhost:8080/personas",{responseType: 'json'}).subscribe(
      (resp:any) =>{
      this.personas = resp.data;
      console.log("Funciona la APi REst");
      console.log(this.personas); })
  }

}
