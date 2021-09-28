import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewpokemonComponent } from './viewpokemon/viewpokemon.component';
import { PokedexRoutingModule } from './pokedex-routing.modules';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListFilterPipe } from '../../pipes/list-filter.pipe';

import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    ViewpokemonComponent,
    ListFilterPipe
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PokedexRoutingModule
  ]
})
export class PokedexModule { }
