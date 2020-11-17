import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PrestamoxlibroDTO } from 'src/app/interfaces/prestamoxlibroDTO';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.page.html',
  styleUrls: ['./prestamos.page.scss'],
})
export class PrestamosPage implements OnInit {
  prestamos:PrestamoxlibroDTO[];
  //prestamosMock:PrestamoxlibroDTO[]=[  {id:1,titulo:"Sinceramente", apellido:"Perez", nombre:"Juan"},{id:2,titulo:"Martin Fierro", apellido:"Perez", nombre:"Juan"}  ];
  selectedPrestamo: PrestamoxlibroDTO = new PrestamoxlibroDTO();
  oldPrestamo: PrestamoxlibroDTO = new PrestamoxlibroDTO() ;
  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("http://localhost:8080/prestamoxlibro",{responseType: 'json'}).subscribe(
    (resp:any) =>{
      
    this.prestamos = resp.data;
    console.log("Funciona la APi REst");
    console.log(this.prestamos)
     })
  }
}
