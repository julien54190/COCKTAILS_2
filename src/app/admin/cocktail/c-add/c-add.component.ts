import { Component } from '@angular/core';
import { CocktailService } from '../../../_services/cocktail.service';

@Component({
  selector: 'app-c-add',
  templateUrl: './c-add.component.html',
  styleUrl: './c-add.component.scss'
})
export class CAddComponent {

  constructor(private cocktaiService: CocktailService){}
}
