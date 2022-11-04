import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProizvodiComponent } from './komponente/proizvodi/proizvodi.component';
import { NavComponent } from './komponente/nav/nav.component';
import { KorpaComponent } from './komponente/korpa/korpa.component';
import { ProizvodiDetaljiComponent } from './komponente/proizvodi-detalji/proizvodi-detalji.component';
import { NarudzbineComponent } from './komponente/narudzbine/narudzbine.component';
import { PrijavaComponent } from './komponente/prijava/prijava.component';
import { RegistracijaComponent } from './komponente/registracija/registracija.component';
import { AdminComponent } from './komponente/admin/admin.component';
import { ProfilComponent } from './komponente/profil/profil.component';
import { NarudzbineDetaljiComponent } from './komponente/narudzbine-detalji/narudzbine-detalji.component';
import { NarudzbineDetaljiPLComponent } from './komponente/narudzbine-detalji-pl/narudzbine-detalji-pl.component';
import { FooterComponent } from './komponente/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ProizvodiComponent,
    NavComponent,
    KorpaComponent,
    ProizvodiDetaljiComponent,
    NarudzbineComponent,
    PrijavaComponent,
    RegistracijaComponent,
    AdminComponent,
    ProfilComponent,
    NarudzbineDetaljiComponent,
    NarudzbineDetaljiPLComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
