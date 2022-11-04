import { Component, OnInit, Input } from '@angular/core';
import { Proizvod } from '../../modeli/proizvod';
import { ActivatedRoute, Router } from '@angular/router';
import { ProizvodiDetaljiService } from '../../servisi/proizvodi-detalji.service';
import { KorpaService } from '../../servisi/korpa.service';
import { Korisnik } from 'src/app/modeli/korisnik';

@Component({
  selector: 'app-proizvodi-detalji',
  templateUrl: './proizvodi-detalji.component.html',
  styleUrls: ['./proizvodi-detalji.component.scss']
})
export class ProizvodiDetaljiComponent implements OnInit {
 //@Input() proizvod: Proizvod;
 proizvodi: Proizvod[]; 
  nema = "Nema na stanju"; // pokazatelj da nema na stanju
 admin = false;
  ean;
  korisnik: Korisnik;
  constructor(private router: Router,private route: ActivatedRoute,private proizvodiDetaljiService: ProizvodiDetaljiService, private korpaService: KorpaService) { }

  ngOnInit(){
    this.route.params.subscribe(async params => {
      this.ean = params['ean']
    });
    console.log("ean" + this.ean);
    this.proizvodiDetaljiService.readProizvodiDetalji(this.ean).subscribe((proizvodi: Proizvod[]) =>{
      this.proizvodi = proizvodi;
      console.log(this.proizvodi);
    })
    this.jeLiAdmin();

  }

  jeLiAdmin(){
    if (localStorage.getItem("Korisnik") !== null){
    var kori = localStorage.getItem("Korisnik");
    this.korisnik = JSON.parse(kori);
    if(this.korisnik.Tip === "Admin"){
      this.admin = true;
    }
    else{
      this.admin = false;
    }
    //return this.admin;
  }
}


  dodajUKorpu(proizvod: Proizvod) {
    //console.log("ovaj proizvod cu dodati u korpu");
    //console.log(proizvod);
    if (localStorage.getItem("Korpa") === null)
    {
      this.korpaService.addToCart(proizvod);
      window.alert("Proizvod uspesno dodat u korpu.");
    }
    else{
      var unetArtikal = false;
      var korpa = JSON.parse(localStorage.getItem("Korpa"));
    for(var i=0;i<korpa.length;i++) {
      if(korpa[i].Proizvod.Naziv == proizvod.Naziv)
      {
        unetArtikal = true;
      }
    }
    if (unetArtikal == false){
    this.korpaService.addToCart(proizvod);
    window.alert("Proizvod uspesno dodat u korpu.");
    }
    else{
      window.alert("Proizvod je vec dodat u korpu.");
    }
    }    
  }

  izmeniProizvod(){
    if (this.proizvodi[0].Naziv === undefined || this.proizvodi[0].Naziv === ""
          || this.proizvodi[0].Opis === undefined || this.proizvodi[0].Opis === ""
          || this.proizvodi[0].Cena === undefined || this.proizvodi[0].toString() === ""
          || this.proizvodi[0].Stanje === undefined || this.proizvodi[0].Stanje === ""
          || this.proizvodi[0].Proizvodjac === undefined || this.proizvodi[0].Proizvodjac === ""){
            
        window.alert("Potrebno je popuniti sve kriterijume.");
            
      }
      else{
        if (this.proizvodi[0].Naziv.length>15){
          window.alert("Naziv proizvoda ne moze imati vise od 15 karaktera.");
        }else{
    this.proizvodiDetaljiService.updateProizvod(/*this.ean,*/ this.proizvodi[0]);
    window.alert("Uspesno izmenjen proizvod.");
        }
      }
  }
  obrisiProizvod(){
    this.proizvodiDetaljiService.deleteProizvod(/*this.ean,*/ this.proizvodi[0]);
    //window.alert("Uspesno obrisna proizvod.");
    this.router.navigate(["/"]);
  }


}
