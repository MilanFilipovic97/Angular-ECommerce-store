import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PorudzbinaFL } from '../modeli/porudzbina';
import { Observable } from  'rxjs';
import { Artikal } from '../modeli/artikal';
import { PravnoLice } from '../modeli/pravnoLice';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  PHP_API_SERVER = "https://mfsoft.co.rs/admin";

  PHP_API_SERVER_Upload = "https://mfsoft.co.rs";
  constructor(private http: HttpClient) { }

  readPorudzbine(): Observable<PorudzbinaFL[]>{
    return this.http.get<PorudzbinaFL[]>(`${this.PHP_API_SERVER}/readFL.php`);
  }
  readPorudzbinePL(): Observable<PravnoLice[]>{
    return this.http.get<PravnoLice[]>(`${this.PHP_API_SERVER}/readPL.php`);
  }

  readPorudzbinaDetalji(ean): Observable<PorudzbinaFL[]>{
    //console.log("id koji cu proslediti jeee " + ean);
    return this.http.get<PorudzbinaFL[]>(`${this.PHP_API_SERVER}/narudzbinaFL.php?id=`+ean);
  }
  readPorudzbinaDetaljiPL(ean): Observable<PravnoLice[]>{
    //console.log("id koji cu proslediti jeee " + ean);
    return this.http.get<PravnoLice[]>(`${this.PHP_API_SERVER}/narudzbinaPL.php?id=`+ean);    
  }

  readPorudzbinaFLArtikli(ean): Observable<Artikal[]>{

    return this.http.get<Artikal[]>(`${this.PHP_API_SERVER}/detaljiNarudzbineFL.php?id=`+ean);
 
  }
  readPorudzbinaPLArtikli(ean): Observable<Artikal[]>{

    return this.http.get<Artikal[]>(`${this.PHP_API_SERVER}/detaljiNarudzbinePL.php?id=`+ean);
 
  }

  async updateStatusNarudzbineFL(ean, porudzbina: string){
    
  const response = await fetch(this.PHP_API_SERVER + "/updateStatusFL.php", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                //"Authorization": "Token " + this.userService.currentUserToken
              },
              body: JSON.stringify({
                "id":ean,
                "Status": porudzbina
              }),
            })
            if (!response.ok) {
              const json = await response.json()
              throw new Error("Greska prilikom promene statusa porudzbine!")
            }


  }

  async updateStatusNarudzbinePL(ean, porudzbina: string){
    
    const response = await fetch(this.PHP_API_SERVER + "/updateStatusPL.php", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  //"Authorization": "Token " + this.userService.currentUserToken
                },
                body: JSON.stringify({
                  "id":ean,
                  "Status": porudzbina
                }),
              })
              if (!response.ok) {
                const json = await response.json()
                throw new Error("Greska prilikom promene statusa porudzbine!")
              }
  
  
    }


  uploadFajla(){
    //return this.http.get<Porudzbina[]>(`${this.PHP_API_SERVER_Upload}/uploadFajla.php`);
    try{
      console.log("radil ovo sta");
      var title = "sad";
    return this.http.post(`${this.PHP_API_SERVER_Upload}/uploadFajla.php`,title);
    }
    catch(e){
      console.log(e);
    }
  }

}
