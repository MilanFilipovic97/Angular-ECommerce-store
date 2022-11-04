import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Korisnik } from '../../modeli/korisnik';
import { RegistracijaService } from '../../servisi/registracija.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss']
})
export class PrijavaComponent implements OnInit {
  
  korisnik = new Korisnik();
  constructor(private router: Router, private registracijaService: RegistracijaService,private route: ActivatedRoute) { }

  korisnici: Korisnik[]; 
  korisniciPodaci: Korisnik[] =[];

  ngOnInit(): void {
  }
  
  
  
  ulogujSe(){
    
    console.log("saljem ovo "+this.korisnik.Korisnicko_ime +" "+this.korisnik.Lozinka );
    this.registracijaService.ulogujSe(this.korisnik.Korisnicko_ime,this.korisnik.Lozinka)
    .subscribe((korisnici: Korisnik[]) =>{
      this.korisnici = korisnici;
      console.log(this.korisnici);
  
      //this.korisniciPodaci.push()
      localStorage.clear();
      localStorage.setItem("Korisnik", JSON.stringify(this.korisnici));
    console.log("ovo je u local storage");
    console.log(localStorage);
  
    this.router.navigate(["/"]);
  
    },
    (err)=>window.alert("Uneti su netacni podaci."))
  }

  
}
