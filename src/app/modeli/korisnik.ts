export class Korisnik{
    Ime: string;
    Prezime: string;
    Grad: string;
    Adresa: string;
    mail: string;
    Korisnicko_ime: string;
    Lozinka: string;
    Tip: string;
    ID: number;

    kontaktTel:number;

    constructor(/*ime: string, prezime:string, grad:string, adresa: string, mail:string, korisnicko_ime:string,lozinka: string, tip:string, ID:number*/){
       /* this.Ime= ime;
        this.Prezime = prezime;
        this.Grad= grad;
        this.Adresa = adresa;
        this.mail = mail;
        this.Korisnicko_ime = korisnicko_ime;
        this.Lozinka = lozinka;
        this.Tip = tip;
        this.ID = ID;
        */
        this.Tip = "Korisnik";
    }

    
}