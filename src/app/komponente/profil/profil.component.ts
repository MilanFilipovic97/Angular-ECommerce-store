import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/modeli/korisnik';
import { RegistracijaService } from 'src/app/servisi/registracija.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  korisnik: Korisnik;
  id; // id korisnika
  porudzbinePrikaz = false;

  idNarudzbine;
  status;
  constructor(private http: HttpClient,private registracijaService: RegistracijaService) { }

  ngOnInit(){
    //this.ucitajIDKorisnika();
    this.ucitajPodatkeKorisnika();
  }


  ucitajIDKorisnika(){
    if (localStorage.getItem("Korisnik") !== null){
      var korisnikPodaci = JSON.parse(localStorage.getItem("Korisnik"));
      this.id = korisnikPodaci.ID;
      console.log(this.id);
    }
  }

  ucitajPodatkeKorisnika(){
    this.ucitajIDKorisnika();
    this.registracijaService.ucitajPodatkeKorisnika(this.id).subscribe((korisnici: Korisnik) =>{
      this.korisnik = korisnici;
     
    })
  }

 async prikaziPorudzbine(){
    this.porudzbinePrikaz = true;
    console.log(this.idNarudzbine);
    
   //var status = this.registracijaService.detaljiNarudzbine(this.idNarudzbine);

   let result = await this.http.get(`https://mfsoft.co.rs/korisnici/getStatusNarudzbine.php?ID=`+this.idNarudzbine).toPromise();
   console.log("ovo" +result);
   this.status = result.toString();
  }

}
