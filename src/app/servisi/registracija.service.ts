import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Observable, throwError,  } from 'rxjs';
import { Korisnik } from '../modeli/korisnik';

@Injectable({
  providedIn: 'root'
})
export class RegistracijaService {

  baseUrl = 'https://mfsoft.co.rs/korisnici/';
  //user: Korisnik; // = new Korisnik('', '');
  korisnici: Korisnik[];
 
  
  
  korisnik: Korisnik;

  constructor(private http: HttpClient) { }



  async store(korisnik: Korisnik) {
    // Pripremanje podataka u formatu koji ocekuje server
   console.log(korisnik);

    const response = await fetch(this.baseUrl + "create.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //"Authorization": "Token " + this.userService.currentUserToken
      },
      body: JSON.stringify(korisnik),
    })

    if (!response.ok) {
      window.alert("Korisnicko ime je vec iskorisceno");
      const json = await response.json()
      throw new Error("Greska prilikom zavrsavanja porudzbine!")
    }
    else{
      window.alert("Uspesno izvrsena registracija.");
    }
  }

  login(korisnicko: string, lozinka: string): Observable<Korisnik> {
    // Pripremanje podataka u formatu koji ocekuje server
    console.log("ovo je stiglo");
   console.log(JSON.stringify({
    "Korisnicko_ime": korisnicko,
    "Lozinka": lozinka
  }));

    const response = fetch(this.baseUrl + "login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //"Authorization": "Token " + this.userService.currentUserToken
      },
      body: JSON.stringify({
        "Korisnicko_ime": korisnicko,
        "Lozinka": lozinka
      }),
    })
/*
    if (!response) {
      //const json = response.json()
      throw new Error("Greska prilikom prijavljivanja!")
    }
*/
    return this.http.get<Korisnik>(`${this.baseUrl}login.php`);
  }
  
 ulogujSe(korisnicko: string, lozinka: string): Observable<Korisnik[]>{
    console.log("ovo je stiglo");
   console.log(korisnicko + " " + lozinka);

   // console.log("id koji cu proslediti jeee " + ean);
   console.log("link");
   console.log(this.baseUrl+"login.php?Korisnicko_ime="+korisnicko+"&Lozinka="+lozinka);
   	 
   return this.http.get<Korisnik[]>(`${this.baseUrl}login.php?Korisnicko_ime=`+korisnicko+`&Lozinka=`+lozinka);
    
  }

  ucitajPodatkeKorisnika(id: number): Observable<Korisnik>{
    return this.http.get<Korisnik>(`${this.baseUrl}getKorisnikPodaci.php?ID=`+id);

  }
  
}
