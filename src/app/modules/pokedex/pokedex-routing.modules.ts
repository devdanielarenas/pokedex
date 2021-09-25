import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewpokemonComponent } from './viewpokemon/viewpokemon.component';

const routes: Routes = [
    {
        path: '',
        component: ViewpokemonComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PokedexRoutingModule { }
