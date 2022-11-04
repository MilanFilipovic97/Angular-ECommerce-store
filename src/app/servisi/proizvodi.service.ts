import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,
  HttpParams, } from '@angular/common/http';
import { Proizvod } from '../modeli/proizvod';
import { Observable, throwError  } from  'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProizvodiService {
  PHP_API_SERVER = "https://mfsoft.co.rs/proizvodi";


  proizvod: Proizvod;
  constructor(private http: HttpClient) { }

  readProizvodi(): Observable<Proizvod[]>{
    return this.http.get<Proizvod[]>(`${this.PHP_API_SERVER}/read.php`);
  }

  
  readProizvodiFilter(stanje: string, cenaOD: number, cenaDO: number): Observable<Proizvod[]>{
    return this.http.get<Proizvod[]>(`${this.PHP_API_SERVER}/readFilterBezProizvodjaca.php?Stanje=`+stanje+`&CenaOD=`+cenaOD+`&CenaDO=`+cenaDO);
  }
  readProizvodiFilterProizvodjac(proizvodjac:string, stanje: string, cenaOD: number, cenaDO: number): Observable<Proizvod[]>{
    return this.http.get<Proizvod[]>(`${this.PHP_API_SERVER}/readFilterSaProizvodjacem.php?Proizvodjac=`+proizvodjac+`&Stanje=`+stanje+`&CenaOD=`+cenaOD+`&CenaDO=`+cenaDO);
  }
 

  kreirajProzivod(proizvod: Proizvod, slika: File,){
    
    const formData = new FormData();
    formData.append('File', slika);
    formData.append('data', JSON.stringify(proizvod));
    console.log(formData.get('data')); 

    this.http.post(`${this.PHP_API_SERVER}/create.php`, formData).subscribe(
      (res)=>console.log(res),
      (err) => console.log(err)
    
    );
    
    
  }

  
  
}
