import { Injectable } from '@angular/core';
import { Korpa } from '../modeli/korpa';
import { Proizvod } from '../modeli/proizvod';

@Injectable({
  providedIn: 'root'
})
export class KorpaService {
  
  korpaArtikli: Korpa[] = []

  constructor() {
    // Ucitaj sve predmete iz localStore u korpu/cart
    this.korpaArtikli = JSON.parse(localStorage.getItem("Korpa")) || []
  }

  saveCartToLocalStorage() {
    localStorage.setItem("Korpa", JSON.stringify(this.korpaArtikli))
  }

  addToCart(proizvod: Proizvod) {
    
    this.korpaArtikli.push(new Korpa(proizvod, 1))
    this.saveCartToLocalStorage();
    console.log("ovo je u local storage");
    console.log(localStorage);
  }
  getProizvodi() {
    return this.korpaArtikli;
  }
  obrisiKorpu(){
    //localStorage.clear();
    //localStorage.removeItem('Proizvod');
    //localStorage.removeItem('Kolicina');
    localStorage.removeItem('Korpa');// To remove individual items
  }

}
