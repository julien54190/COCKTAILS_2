import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CocktailService } from '../../../_services/cocktail.service';
import { ICocktail } from '../../../_interfaces/cocktail';

@Component({
  selector: 'app-c-edit',
  templateUrl: './c-edit.component.html',
  styleUrl: './c-edit.component.scss'
})
export class CEditComponent implements OnInit{

  cocktail: ICocktail = {
    id:0,
    user_id: 0,
    nom: '',
    description: '',
    recette: '',
    updatedAt: '',
    createdAt: '',
    deletedAt: null,
  }

  constructor(
    private activated: ActivatedRoute,
    private cocktailService: CocktailService
    ){}

  ngOnInit(): void {
    let cid = this.activated.snapshot.paramMap.get('id')
    this.cocktailService.getCocktail(cid).subscribe(
      data => {
        console.log(data)
        this.cocktail = data.data

      }
    )
  }
onSubmit(){
  this.cocktailService.updateCocktail(this.cocktail).subscribe(
    data => console.log(data)

  )
}
}
