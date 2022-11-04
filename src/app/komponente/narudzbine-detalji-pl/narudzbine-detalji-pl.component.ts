import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/servisi/admin.service';
import { PravnoLice } from 'src/app/modeli/pravnoLice';
import { Artikal } from 'src/app/modeli/artikal';

@Component({
  selector: 'app-narudzbine-detalji-pl',
  templateUrl: './narudzbine-detalji-pl.component.html',
  styleUrls: ['./narudzbine-detalji-pl.component.scss']
})
export class NarudzbineDetaljiPLComponent implements OnInit {
  ean;
  porudzbinePL: PravnoLice[];
  artikli: Artikal[];

  link;
  constructor(private route: ActivatedRoute,private adminService:AdminService) { }

  ngOnInit(){
    this.route.params.subscribe(async params => {
      this.ean = params['ean']
    });
    console.log("ean" + this.ean);  // do ovde sam stigao i admin service vidi
    this.adminService.readPorudzbinaDetaljiPL(this.ean).subscribe((porudzbinePL: PravnoLice[]) =>{
      this.porudzbinePL = porudzbinePL;
     
    })

    //sad cu da ucitam detalje narudzbine

    this.adminService.readPorudzbinaPLArtikli(this.ean).subscribe((artikli: Artikal[]) =>{
      this.artikli= artikli;
    
    })
    
   // this.link = "http://localhost/backend/narudzbine/dokumenti/"+this.porudzbinePL[0].Dokument;
    //console.log(this.porudzbinePL[0].Dokument);
  }

  ukupnaVrednost(){
    
    var ukupno =0;
    for(var i=0;i<this.artikli.length;i++) {
      ukupno += this.artikli[i].Kolicina * this.artikli[i].Cena;
    }
    return ukupno;
  }

  izmeniStatusNarudzbine(){
    this.adminService.updateStatusNarudzbinePL(this.ean, this.porudzbinePL[0].Status);
    window.alert("Uspesno promenjen status");
  }
  
  
  

}
