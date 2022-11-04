import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proizvod } from '../modeli/proizvod';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProizvodiDetaljiService {
  PHP_API_SERVER = "https://mfsoft.co.rs/proizvodi-detalji";

  constructor(private http: HttpClient) {}
  
  readProizvodiDetalji(ean): Observable<Proizvod[]>{
    console.log("id koji cu proslediti jeee " + ean);
    return this.http.get<Proizvod[]>(`${this.PHP_API_SERVER}/read.php?id=`+ean);
  }


  async updateProizvod(/*ean,*/ proizvodi: Proizvod){
    
    const response = await fetch(this.PHP_API_SERVER + "/updateProizvod.php", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  //"Authorization": "Token " + this.userService.currentUserToken
                },
                body: JSON.stringify(proizvodi),
              })
              if (!response.ok) {
                const json = await response.json()
                throw new Error("Greska prilikom izmene proizvoda!")
              }
  
  
    }


    async deleteProizvod(/*ean,*/ proizvodi: Proizvod){
    
      const response = await fetch(this.PHP_API_SERVER + "/deleteProizvod.php", {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    //"Authorization": "Token " + this.userService.currentUserToken
                  },
                  body: JSON.stringify(proizvodi),
                })
                if (!response.ok) {
                  window.alert("Ne moze se obrisati narucen proizvod.");
                  const json = await response.json()
                  throw new Error("Greska prilikom izmene proizvoda!")
                }
                else{
                  window.alert("Uspesno obrisna proizvod.");
                }
    
    
      }

}
