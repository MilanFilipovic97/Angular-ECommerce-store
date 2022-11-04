import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProizvodiComponent } from './komponente/proizvodi/proizvodi.component';
import { KorpaComponent } from './komponente/korpa/korpa.component';
import { ProizvodiDetaljiComponent } from './komponente/proizvodi-detalji/proizvodi-detalji.component';
import { NarudzbineComponent } from './komponente/narudzbine/narudzbine.component';
import { PrijavaComponent } from './komponente/prijava/prijava.component';
import { RegistracijaComponent } from './komponente/registracija/registracija.component';
import { AdminComponent } from './komponente/admin/admin.component';
import { ProfilComponent } from './komponente/profil/profil.component';
import { NarudzbineDetaljiComponent } from './komponente/narudzbine-detalji/narudzbine-detalji.component';
import { NarudzbineDetaljiPLComponent } from './komponente/narudzbine-detalji-pl/narudzbine-detalji-pl.component';

const routes: Routes = [
  {path:"",component:ProizvodiComponent},
  {path:"korpa",component:KorpaComponent},
  {path:"proizvodi-detalji/:ean",component:ProizvodiDetaljiComponent},
  {path:"narudzbine", component:NarudzbineComponent},
  {path:"prijava",component: PrijavaComponent },
  {path:"registracija",component:RegistracijaComponent},
  {path:"admin",component:AdminComponent },
  {path:"profil",component:ProfilComponent},
  {path:"narudzbine-detalji/:ean",component:NarudzbineDetaljiComponent},
  {path:"narudzbine-detaljiPL/:ean",component:NarudzbineDetaljiPLComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
