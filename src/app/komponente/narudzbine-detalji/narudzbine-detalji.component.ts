import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/servisi/admin.service';
import { PorudzbinaFL } from 'src/app/modeli/porudzbina';
import { Artikal } from 'src/app/modeli/artikal';

@Component({
  selector: 'app-narudzbine-detalji',
  templateUrl: './narudzbine-detalji.component.html',
  styleUrls: ['./narudzbine-detalji.component.scss']
})
export class NarudzbineDetaljiComponent implements OnInit {
  ean;
  porudzbine: PorudzbinaFL[];
  artikli: Artikal[];
  constructor(private route: ActivatedRoute,private adminService:AdminService) { }

  ngOnInit(){
    this.route.params.subscribe(async params => {
      this.ean = params['ean']
    });
    console.log("ean" + this.ean);
    this.adminService.readPorudzbinaDetalji(this.ean).subscribe((porudzbine: PorudzbinaFL[]) =>{
      this.porudzbine = porudzbine;
     
    })

    //sad cu da ucitam detalje narudzbine

    this.adminService.readPorudzbinaFLArtikli(this.ean).subscribe((artikli: Artikal[]) =>{
      this.artikli= artikli;
    
    })

  }

  ukupnaVrednost(){
    
    var ukupno =0;
    for(var i=0;i<this.artikli.length;i++) {
      ukupno += this.artikli[i].Kolicina * this.artikli[i].Cena;
    }
    return ukupno;
  }

  izmeniStatusNarudzbine(){
    this.adminService.updateStatusNarudzbineFL(this.ean, this.porudzbine[0].Status);
    window.alert("Uspesno promenjen status");
  }
}
