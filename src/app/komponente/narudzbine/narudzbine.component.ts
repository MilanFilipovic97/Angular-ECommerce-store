import { Component, OnInit } from '@angular/core';
import { Primalac } from '../../modeli/primalac';
import { Router, ActivatedRoute } from '@angular/router'
import { NarudzbinaService } from '../../servisi/narudzbina.service';
import { PorudzbinaFL } from '../../modeli/porudzbina';
import { Observable } from 'rxjs';
import { Korisnik } from 'src/app/modeli/korisnik';
import { PravnoLice } from '../../modeli/pravnoLice';
@Component({
  selector: 'app-narudzbine',
  templateUrl: './narudzbine.component.html',
  styleUrls: ['./narudzbine.component.scss']
})
export class NarudzbineComponent implements OnInit {
  //user ="";
  primalac = new Primalac();
  selectedPorudzbina: PorudzbinaFL;
  ean;
  kontaktTel ="";
  pravnoLice = false; // promenljiva koja odredjuje da li je pravno ili fizicko lice

  korisnik: Korisnik;


  pravnoLicePodaci= new PravnoLice();

  dokument :File;

  constructor(private narudzbineService: NarudzbinaService) { }

  ngOnInit(){
    
    this.ucitajPodatkeKorisnika();   
  }
  
  ucitajPodatkeKorisnika(){
    console.log(localStorage.getItem("Korisnik"));
    
    if (localStorage.getItem("Korisnik")==null){
      console.log("nema");
    try{	
    this.korisnik = new Korisnik();
      this.korisnik.Ime = "";
      console.log("ode "+ this.korisnik.Ime);
      this.korisnik.Prezime = "";
      this.korisnik.Grad = "";
      this.korisnik.Adresa= "";
      this.korisnik.mail = "";
      this.korisnik.kontaktTel;
      console.log("dodjes li ode ");
    }
    catch(e){
      console.log(e);
    }
    }else{
      console.log("ima");
      var narucilac = JSON.parse(localStorage.getItem("Korisnik"));
        var ID = narucilac.ID;
        console.log(ID);
        // za ID taj i taj iz local storaga ucitaj sve podatke  
        this.narudzbineService.ucitajPodatke(ID).subscribe((korisnici: Korisnik) =>{
          this.korisnik = korisnici;
            
        });
    }
  }


  naruciFL(){
    if (this.korisnik.Ime == "" ||
        this.korisnik.Prezime == "" ||
        this.korisnik.Grad == "" ||
        this.korisnik.Adresa == "" ||
        this.korisnik.mail == "" ||
         this.kontaktTel == "")
         {
      window.alert("Potrebno je popuniti sve kriterijume");
    }   
    else{
      console.log("ovo");
      console.log(this.kontaktTel);
      this.narudzbineService.naruciFL(this.korisnik,this.kontaktTel);
      
    }  
    
  }
  
  // funkcija koja menja prikaz u zavisnosti da li je pravno ili fizicko lice
  prikaziStavkePravnoLice(){
   if (this.pravnoLice == false)
    this.pravnoLice= true;
    else
    this.pravnoLice = false;
    
  }


  naruciPL(fileInput: any){
    //console.log("ovde sam usao");
    
    
    if (this.pravnoLicePodaci.Naziv == "" || this.pravnoLicePodaci.Naziv == "undefined" ||
    this.pravnoLicePodaci.Sediste == "" || this.pravnoLicePodaci.Sediste == "undefined" ||
    this.pravnoLicePodaci.Adresa == "" || this.pravnoLicePodaci.Adresa == "undefined" ||
    this.pravnoLicePodaci.Pib == "" || this.pravnoLicePodaci.Pib == "undefined" ||
    this.pravnoLicePodaci.Maticni == "" || this.pravnoLicePodaci.Maticni == "undefined" || 
    fileInput.files[0] === undefined || fileInput.files[0] === "")
    {
      window.alert("Potrebno je popuniti sve kriterijume");
    }   
    else{
     
      this.dokument = fileInput.files[0];
    var randomBroj = Math.floor(Math.random()*1000000+1);
    var ime = randomBroj.toString() + fileInput.files[0].name;
    var fileForUpload = new File([this.dokument],ime);

    this.pravnoLicePodaci.Dokument = ime.toString();
    //this.proizvodiService.kreirajProzivod(this.proizvod,fileForUpload);
    
     this.narudzbineService.naruciPL(this.pravnoLicePodaci,fileForUpload);
      
    }  
    
  }


}
