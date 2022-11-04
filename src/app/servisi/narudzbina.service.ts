import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Observable, throwError,  } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { Korisnik } from '../modeli/korisnik';
import { Primalac } from '../modeli/primalac';
import { PravnoLice } from '../modeli/pravnoLice';

@Injectable({
  providedIn: 'root'
})
export class NarudzbinaService {

  baseUrl = 'https://mfsoft.co.rs/narudzbine/';
  //user: Korisnik; // = new Korisnik('', '');
  primaoci: Primalac[];
 
  idNarudzbine="";
  idNarudzbinePL="";

  
  constructor(private http: HttpClient) { }

  ucitajPodatke(id): Observable<Korisnik>{
    return this.http.get<Korisnik>(`${this.baseUrl}/getKorisnikPodaci.php?ID=`+id);
  }

  async naruciFL(korisnik: Korisnik, korisnikTel) {
    console.log("ovo je service");
    //console.log(korisnikTel);
    korisnik.kontaktTel = korisnikTel;
    
    const response = await fetch(this.baseUrl + "/createFL.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //"Authorization": "Token " + this.userService.currentUserToken
      },
      body: JSON.stringify(korisnik),
    })

    if (!response.ok) {
      const json = await response.json()
      throw new Error("Greska prilikom zavrsavanja porudzbine!")
    }

   //ovde vracam idNarudzbine koju sam kreirao 
    //var idNarudzbine;
   
    await this.getIDNarudzbine(korisnik, korisnikTel);
    
    console.log(this.idNarudzbine);
    window.alert("Broj porudzbine na osnovu kojeg mozete proveriti status je "+this.idNarudzbine);

    var korpa = JSON.parse(localStorage.getItem("Korpa"));
    for(var i=0;i<korpa.length;i++) {
      var idProizvoda=korpa[i].Proizvod.ID;
      var kolicina = korpa[i].Kolicina;  
      //console.log("id proizvoda " + idProizvoda);
      //console.log("kolicina " + kolicina);
      console.log(this.idNarudzbine);
      const response1 = fetch(this.baseUrl + "createFLproizvodi.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //"Authorization": "Token " + this.userService.currentUserToken
        },
        body: JSON.stringify({
          "ID_Proizvoda": idProizvoda,
          "Kolicina": kolicina,
          "ID_Narudzbine": this.idNarudzbine
        }),
      });

      
    }

    localStorage.removeItem('Korpa'); // obrisem celu korpu
    window.alert("Uspesno izvrsena porudzbina.");
    location.reload(true);
  }
  async getIDNarudzbine(korisnik: Korisnik, korisnikTel){

    korisnik.kontaktTel = korisnikTel;
    let result = await this.http.get(`${this.baseUrl}/getIDNarudzbine.php?ime=`+korisnik.Ime+`&prezime=`+korisnik.Prezime+`&grad=`+korisnik.Grad+`&adresa=`+korisnik.Adresa+`&mail=`+korisnik.mail+`&kontakt=`+korisnik.kontaktTel).toPromise();

    this.idNarudzbine = result.toString();  

  }


  async getIDNarudzbinePL(pravnoLice: PravnoLice){
    //console.log(this.baseUrl+'/getIDNarudzbinePL.php?naziv='+pravnoLice.Naziv+'&sediste='+pravnoLice.Sediste+'&adresa='+pravnoLice.Adresa+'&pib='+pravnoLice.Pib+'&maticni='+pravnoLice.Maticni);
    let result = await this.http.get(`${this.baseUrl}/getIDNarudzbinePLNovi.php`).toPromise();

    console.log(result.toString());
    //var broj = parseInt(result.toString())+1;
    //this.idNarudzbinePL =  result.toString();  
    let broj = parseInt(result.toString())+1;
    console.log("mozel ovako " + broj);
    this.idNarudzbinePL = broj.toString();
    //this.idNarudzbinePL = result.toString();
    //console.log(parseInt(result)+1)
    console.log("ovo vracam "+ this.idNarudzbinePL);

  }


  // narudzbina za pravno lice
  async naruciPL(pravnoLice: PravnoLice, dokument:File) {
  
    //prvo cu da izvrsim upis fajla ... 
  
    const formData = new FormData();
    formData.append('File', dokument);
    formData.append('data', JSON.stringify(pravnoLice));
    //console.log(JSON.stringify(pravnoLice)); 
   
    await this.http.post(`${this.baseUrl}createPL.php`, formData).subscribe(
      (res)=> console.log(res) ,
      (err) => console.log(err)
    
    );
    //ovde vracam idNarudzbine koju sam kreirao 

    await this.getIDNarudzbinePL(pravnoLice);
    
    console.log("ovo gledaj " + this.idNarudzbinePL);
      //sad da upisem u bazu artikle za pravno lice 

      
    var korpa = JSON.parse(localStorage.getItem("Korpa"));
    for(var i=0;i<korpa.length;i++) {
      var idProizvoda=korpa[i].Proizvod.ID;
      var kolicina = korpa[i].Kolicina;  
      console.log("id proizvoda " + idProizvoda);
      console.log("kolicina " + kolicina);
      //console.log(this.idNarudzbinePL);

      const response2 = fetch(this.baseUrl + "createPLproizvodi.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //"Authorization": "Token " + this.userService.currentUserToken
        },
        body: JSON.stringify({
          "ID_Proizvoda": idProizvoda,
          "Kolicina": kolicina,
          "ID_Narudzbine": this.idNarudzbinePL
        }),
      });
    }

    window.alert("Uspesno izvrsena porudzbina.");
    localStorage.removeItem('Korpa'); // obrisem celu korpu
    location.reload(true);
    
  }



}
