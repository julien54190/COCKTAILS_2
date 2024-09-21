import { Component, OnInit } from '@angular/core';
import { CocktailService } from '../../../_services/cocktail.service';
import { ICocktail } from '../../../_interfaces/cocktail';

@Component({
  selector: 'app-c-index',
  templateUrl: './c-index.component.html',
  styleUrl: './c-index.component.scss'
})
export class CIndexComponent implements OnInit {

  cocktailList: ICocktail[] = []

  constructor(private cocktailService: CocktailService){}

  ngOnInit(): void {
    this.cocktailService.getAllCocktail().subscribe(
      data =>{
        console.log(data)
        this.cocktailList = data.data
      }
    )
  }

}
