import { Proizvod } from '../modeli/proizvod';

export class Korpa{
    Proizvod: Proizvod;
    Kolicina: number;

    constructor(Proizvod: Proizvod, Kolicina:number){
        this.Proizvod = Proizvod;
        this.Kolicina = Kolicina;
    }
}