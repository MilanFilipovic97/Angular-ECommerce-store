import { Component, OnInit } from '@angular/core';
import { Proizvod } from '../../modeli/proizvod';
import { KorpaService } from '../../servisi/korpa.service';
import { Korpa } from '../../modeli/korpa';
import { Router } from '@angular/router'
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-korpa',
  templateUrl: './korpa.component.html',
  styleUrls: ['./korpa.component.scss']
})
export class KorpaComponent implements OnInit {

  korpa: Korpa[]=[];
  errorMessage: string = ""
  constructor(private korpaService: KorpaService, private router: Router) { }

  ngOnInit(){
    if (localStorage.getItem("Korpa") !== ""){
    this.korpa = this.korpaService.getProizvodi();
    console.log("ovo je u korpi");
    console.log(this.korpa);
    }
  }

  obrisiCeluKorpu(){
    if(confirm('Jeste li sigurni da zelite da obrisete sve artikle?')){
    this.korpaService.obrisiKorpu();
    this.korpa = this.korpaService.getProizvodi();
    location.reload(true);
    }
    else{

    }
  }

  zavrsiKupovinu() {
    var artikli = JSON.parse(localStorage.getItem("Korpa"));
    
    if (artikli[0] === undefined)
    {
    window.alert("Korpa je prazna");
      
    } 
    else {
      this.router.navigateByUrl("/narudzbine")
    }
  }


  smanjiKolicinu(artikal: Proizvod,kolicina) {
    if (kolicina == 1){
        window.alert("Nemoguce je smanjiti kolicinu ispod 1. Ukoliko zelite obrisite artikal.");
    }
    else{
      var korpa = JSON.parse(localStorage.getItem("Korpa"));
      for(var i=0;i<korpa.length;i++) {
        if(korpa[i].Proizvod.Naziv == artikal.Naziv)
        {
          korpa[i].Kolicina -= 1;
        }
      }
      localStorage.setItem("Korpa", JSON.stringify(korpa));
      location.reload(true);
    }
  }

  povecajKolicinu(artikal: Proizvod,kolicina) {
      var korpa = JSON.parse(localStorage.getItem("Korpa"));
      for(var i=0;i<korpa.length;i++) {
        if(korpa[i].Proizvod.Naziv == artikal.Naziv)
        {
          korpa[i].Kolicina += 1;
        }
      }
      localStorage.setItem("Korpa", JSON.stringify(korpa));
      location.reload(true);
  }


  obrisiArtikal(artikal: Proizvod,kolicina){
    if(confirm('Jeste li sigurni da zelite da obrisete artikal?')){
    var korpa = JSON.parse(localStorage.getItem("Korpa"));
    for(var i=0;i<korpa.length;i++) {
      if(korpa[i].Proizvod.Naziv == artikal.Naziv)
      {
        korpa.splice(i, 1);
      }
    }
    localStorage.setItem("Korpa", JSON.stringify(korpa));
    location.reload(true);
  }
  else{

  }
  }

  ukupnaVrednost(){
    if (localStorage.getItem("Korpa") !== null){
    var korpa = JSON.parse(localStorage.getItem("Korpa"));
    var ukupno =0;
    for(var i=0;i<korpa.length;i++) {
      ukupno += korpa[i].Kolicina * korpa[i].Proizvod.Cena;
    }
    return ukupno;
  }
}

}
