import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewpokemonComponent } from './viewpokemon/viewpokemon.component';
import { PokedexRoutingModule } from './pokedex-routing.modules';



@NgModule({
  declarations: [
    ViewpokemonComponent,
  ],
  imports: [
    CommonModule,
    PokedexRoutingModule
  ]
})
export class PokedexModule { }
