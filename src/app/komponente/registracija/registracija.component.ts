import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../../modeli/korisnik';
import { RegistracijaService } from '../../servisi/registracija.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.scss']
})
export class RegistracijaComponent implements OnInit {
  
  korisnik = new Korisnik();

  constructor(private registracijaService: RegistracijaService,private router: Router) { }

  ngOnInit(): void {
  }

  registrujSe(){
    
    
    this.registracijaService.store(this.korisnik);
    console.log("proveri u bazu");
    this.router.navigate(["/"]);
    //this.korpa = this.korpaService.getProizvodi();
    //console.log("ovo je u korpi");
    //console.log(this.korpa);
  }

}
