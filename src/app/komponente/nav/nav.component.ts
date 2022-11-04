import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/modeli/korisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  appTitle = "Prodaja softvera";
  proba = "";
  korisnik: Korisnik;
  tip = "";

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem("Korisnik") !== null){
    this.jeLiAdmin();
    }
  }

  jeLiPrijavljen(){
    if (localStorage.getItem("Korisnik") === null)
    return false;
    return true;
    
  }

  jeLiAdmin(){
    if (localStorage.getItem("Korisnik") !== null){
    var kori = localStorage.getItem("Korisnik");
    this.korisnik = JSON.parse(kori);
    if(this.korisnik.Tip === "Admin"){
      return true;
    }
    else{
      return false;
    }
  }
   
  }


  odjava(){
    localStorage.removeItem('Korisnik');
    localStorage.removeItem('Korpa');
	  location.reload(true);
    this.router.navigate(["/"]);
  }
}
