import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../servisi/admin.service';
import { PorudzbinaFL } from '../../modeli/porudzbina';
import { Router, ActivatedRoute } from '@angular/router'
import { Korisnik } from 'src/app/modeli/korisnik';
import { NarudzbinaService } from '../../servisi/narudzbina.service';
import { ProizvodiService } from 'src/app/servisi/proizvodi.service';
import { Proizvod } from 'src/app/modeli/proizvod';
import { PravnoLice } from 'src/app/modeli/pravnoLice';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  prikazPorudzFL= false;
  prikazProiz= false;
  prikazPorudzPL= false;
  

  korisnik: Korisnik;
  porudzbine: PorudzbinaFL[];
  porudzbinePL: PravnoLice[];

  selectedPorudzbina: PorudzbinaFL;
  selectedPorudzbinaPL: PravnoLice;
  ean;
  proizvod = new Proizvod();
  
  slikaProizvoda: File;
  imeSlikeProizvoda = '';
  avatar: File;

  constructor(private adminService: AdminService,private router: Router, private proizvodiService:ProizvodiService) { }

  ngOnInit(){
   
  }

  /*ovde da stavim 3 linka od kojih na sta kliknes mozes da gledas prikaz
  porudzbine, korisnici i proizvodi*/

 

  prikazPorudzbinaFL(){
    this.prikazPorudzFL = true;
    this.prikazPorudzPL = false;
    this.prikazProiz = false;
    this.adminService.readPorudzbine().subscribe((porudzbine: PorudzbinaFL[]) =>{
      this.porudzbine = porudzbine;
    })
  }

  prikazPorudzbinaPL(){
    this.prikazPorudzFL = false;
    this.prikazPorudzPL = true;
    this.prikazProiz = false;
    this.adminService.readPorudzbinePL().subscribe((porudzbine: PravnoLice[]) =>{
      this.porudzbinePL = porudzbine;
    })
  }
  
  prikazProizvoda() {
    this.prikazProiz = true;
    this.prikazPorudzFL = false;
    this.prikazPorudzPL = false;
  
  }
  

    //funkcija koja ce da me odvede na stranicu narudzbine-detalji
  //u odnosu na selektovanu narudzbina 
  onSelect(porudzbina: PorudzbinaFL): void {
    
    this.selectedPorudzbina = porudzbina;
    this.ean = this.selectedPorudzbina.ID;  // ovde mozda treba staviti Broj_Narudzbine
    this.router.navigate(["/narudzbine-detalji",this.ean]);
 }

 onSelectPL(porudzbina: PravnoLice): void {
    
  this.selectedPorudzbinaPL = porudzbina;
  this.ean = this.selectedPorudzbinaPL.ID;  // ovde mozda treba staviti Broj_Narudzbine
  this.router.navigate(["/narudzbine-detaljiPL",this.ean]);
 //ovde treba navigirati na narudzbine-detalji-pl
 //console.log(this.selectedPorudzbinaPL);
}
 
  kreirajProizvod(imageInput: any){
      //ovde cu da dodam proizvod i sliku i saljem servisu da probamo tako 
      console.log(this.proizvod.Naziv);
      if (this.proizvod.Naziv === undefined || this.proizvod.Naziv === ""
          || this.proizvod.Opis === undefined || this.proizvod.Opis === ""
          || this.proizvod.Cena === undefined || this.proizvod.Cena.toString() === ""
          || imageInput.files[0] === undefined || imageInput.files[0] === ""
          || this.proizvod.Stanje === undefined || this.proizvod.Stanje === ""
          || this.proizvod.Proizvodjac === undefined || this.proizvod.Proizvodjac === ""){
            
        window.alert("Potrebno je popuniti sve kriterijume.");
            
      }
      else{
        if (this.proizvod.Naziv.length>15){
          window.alert("Naziv proizvoda ne moze imati vise od 15 karaktera.");
        }
        else{
    this.slikaProizvoda = imageInput.files[0];
    var randomBroj = Math.floor(Math.random()*1000000+1);
    var ime = randomBroj.toString() + imageInput.files[0].name;
    var fileForUpload = new File([this.slikaProizvoda],ime);

    this.proizvod.Slika = ime.toString();
    this.proizvodiService.kreirajProzivod(this.proizvod,fileForUpload);
    window.alert("Uspesno kreiran proizvod");
        }
      }
  }

 
  

}