import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/home/models/persona';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  personas: Persona[];
  selectedPersona: Persona = new Persona();
  
  realizarPrestamo(){

        console.log(this.selectedPersona); 
        
        if(confirm('Confirme la operacion')){
        this.http.post("http://localhost:8080/prestamos/realizarprestamo", {
         "id" : null,
         "fechainicio":null,
         "fechafin":null,
         "personaid":this.selectedPersona
        
      }).subscribe(
        data  => {
        console.log("POST Request is successful ", data);
        this.router.navigate([`home`], { relativeTo: this.route });
        },
        error  => {
        
        console.log("Error", error);
        
        }
        
        );
      }
    }
    
  
  constructor(public http: HttpClient,private router: Router, private route: ActivatedRoute) { }
  openForEdit(Persona: Persona){
    this.selectedPersona=Persona;
}

  ngOnInit() {
    this.http.get("http://localhost:8080/personas",{responseType: 'json'}).subscribe(
      (resp:any) =>{
      this.personas = resp.data;
      console.log("Funciona la APi REst");
      console.log(this.personas); })
  }

}
