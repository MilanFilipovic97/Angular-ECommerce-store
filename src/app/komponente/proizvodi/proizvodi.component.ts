import { Component, OnInit } from '@angular/core';
import { ProizvodiService } from '../../servisi/proizvodi.service';
import { Proizvod } from '../../modeli/proizvod';
import { Router, ActivatedRoute } from '@angular/router';
import { KorpaService } from '../../servisi/korpa.service';

@Component({
  selector: 'app-proizvodi',
  templateUrl: './proizvodi.component.html',
  styleUrls: ['./proizvodi.component.scss']
})
export class ProizvodiComponent implements OnInit {

  proizvodi: Proizvod[];
  sortiraniProizvod: Proizvod[];
  ean;
  nema = "Nema na stanju"; // pokazatelj da nema na stanju

  sortBy: string = "Sortiranje..."
  proizvodjac="Svi";
  stanje= "Na stanju";
  filterPrikaz = false;

  cenaODFilter = 1;
  cenaDOFilter = 1000000;


  constructor(private proizvodiService: ProizvodiService,private router: Router, private korpaService: KorpaService) { }

  selectedProizvod: Proizvod;
  
  onSelect(proizvod: Proizvod): void {
   console.log(proizvod);
   this.selectedProizvod = proizvod;
   //this.router.navigate(["/proizvodi-detalji"]);
   this.ean = this.selectedProizvod.ID;
   this.router.navigate(["/proizvodi-detalji",this.ean]);
}


  ngOnInit(){
    this.proizvodiService.readProizvodi().subscribe((proizvodi: Proizvod[]) =>{
      this.proizvodi = proizvodi;
      //console.log(proizvodi);
    })
  }
  prikaziDetalje(){
    console.log("prikazao bih.");
  }

  dodajUKorpu(proizvod: Proizvod) {

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

  obrisiKorpu(){
    this.korpaService.obrisiKorpu();
  }

 
  sortiraj() {
    console.log(this.sortBy);
    switch (this.sortBy) {
    case "Cena rastuce":
        this.sortiraniProizvod = this.proizvodi.sort((x, y) => {
          const cenaX = x.Cena === 0 ? x.Cena : x.Cena
          const cenaY = y.Cena === 0 ? y.Cena : y.Cena
          return cenaX - cenaY
        })
        break

      case "Cena opadajuce":
        this.sortiraniProizvod = this.proizvodi.sort((x, y) => {
          const cenaX = x.Cena === 0 ? x.Cena : x.Cena
          const cenaY = y.Cena === 0 ? y.Cena : y.Cena
          return cenaY - cenaX
        })
        break
    }
  }


  prikaziFilter(){
    if(this.filterPrikaz == true)
      this.filterPrikaz = false;
    else
    this.filterPrikaz = true;
  }
  
  ponistiFilter(){
    this.proizvodiService.readProizvodi().subscribe((proizvodi: Proizvod[]) =>{
      this.proizvodi = proizvodi;     
    });
  }
  
  izvrsiFilter(){
    if(this.cenaDOFilter == null || this.cenaDOFilter == null)
    {
      window.alert("Potrebno je staviti opseg cene koji je po defaultu od 1 do 1000000.");
    }
    else{
      if (this.proizvodjac == "Svi")
        { //ovde kad nema proizovdjaca
        this.proizvodiService.readProizvodiFilter(this.stanje,this.cenaODFilter,this.cenaDOFilter).subscribe((proizvodi: Proizvod[]) =>{
          this.proizvodi = proizvodi;
      });
        }
        else{
          //ovde kad ima proizvodjac 

          this.proizvodiService.readProizvodiFilterProizvodjac(this.proizvodjac,this.stanje,this.cenaODFilter,this.cenaDOFilter).subscribe((proizvodi: Proizvod[]) =>{
            this.proizvodi = proizvodi;
          });

  }
}
  }
  
}
