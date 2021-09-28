import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/utils/alert.service';

import {PokedexService} from '../services/pokedex.service'

interface Pokemon {
  id: number;
  name: string;
  url: string;
  height: number;
  weight: number;
  img: string;
  base_experience: number;
  types: []
}

@Component({
  selector: 'app-viewpokemon',
  templateUrl: './viewpokemon.component.html',
  styleUrls: ['./viewpokemon.component.scss']
})
export class ViewpokemonComponent implements OnInit {

  dataStr = 'results';
  countStr = 'count';
  next = 'next';
  previous = 'previous';
  collectionSize = 0;

  pathImg = 'https://pokeres.bastionbot.org/images/pokemon/'

  searchTerm: string;
  page = 1;
  pageSize = 4;
  currentRate = 8;
  pokemons = [];
  myPokemons = [];
  pokeDetail: Pokemon;
  pokeTypes = '';
  nextPage = '';
  previousPage = '';
  numberItems = 5;
  actualId = 0;
  loadDetail = false;
  loadList = false;
  totalExp = 1000;
  showMyPokemons = false;
  message = '';

  constructor(
    private http: HttpClient,
    private spinnerService: NgxSpinnerService,
    private alertService: AlertService,
    public pokedexService: PokedexService,
    ) { }

  ngOnInit(): void {
    this.loadPokemons('https://pokeapi.co/api/v2/pokemon/?limit=5');
  }

  loadPokemons(url): void {
    
    if (url == 'start') {
      url = 'https://pokeapi.co/api/v2/pokemon/?limit=5';
      this.actualId = 0;
    }else if (url == 'next') {
      url = this.nextPage;
      this.actualId += this.numberItems;
    } else if (url == 'previous') {
        if (this.previousPage != null) {
          url = this.previousPage;
          this.actualId -= this.numberItems;  
        } else {
          url = 'https://pokeapi.co/api/v2/pokemon/?limit=5';
          this.actualId = 0;    
        }
    } else if (url == 'last') {
      url = 'https://pokeapi.co/api/v2/pokemon/?offset=145&limit=5';
      this.actualId = 150;
    } else {
      this.actualId = 0;
    }
    
    this.spinnerService.show();
    this.pokedexService.listPagination(url).subscribe(data => {
      this.loadList = true;
      this.pokemons = data[this.dataStr];
      this.spinnerService.hide();
      this.nextPage = data[this.next];
      this.previousPage = data[this.previous];
      this.collectionSize = data[this.countStr];
    });
  }

  loadPokemon(name): void {
    this.spinnerService.show();
    this.pokedexService.get(name).subscribe(data => {
      this.pokeDetail = data;
      if (this.pokeDetail.types) {
        this.pokeTypes = '';
        for (const i in this.pokeDetail.types) {
          this.pokeTypes += ' ' + this.pokeDetail.types[i]['type']['name'];
        }
      }
      this.loadDetail = true;
      this.spinnerService.hide();
    });
  }

  showPokemon(name): void {
    this.loadDetail = false;
    this.loadPokemon(name);
    this.showMyPokemons = false;
  }

  pokemonExist(id): boolean {
    return this.myPokemons.some(function(el) {
      return el.id === id;
    }); 
  }

  addPokemon(): void {
    this.showMyPokemons = true;
    if (this.pokeDetail) {
      if (this.pokemonExist(this.pokeDetail.id)) {
        this.message = 'You already have that pokemon!'
      } else {
        this.myPokemons.push(this.pokeDetail);
      }
    }
  }

  removePokemon(id): void {
    this.myPokemons.forEach((value, index)=> {
      if(value.id == id) this.myPokemons.splice(index, 1);
    });
  }

  backToDetails(): void {
    this.showMyPokemons = false;
    this.message = '';
  }

  findPokemon(nameId: string) {
    if (Number(nameId)) {
      console.log('es id');
      this.loadPokemon(nameId);
    } else {
      console.log('es texto');
      this.loadPokemon(nameId);
    }
  }

}
