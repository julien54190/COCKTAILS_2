import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-c-delete',
  templateUrl: './c-delete.component.html',
  styleUrl: './c-delete.component.scss'
})
export class CDeleteComponent implements OnInit {

  constructor(private activated: ActivatedRoute){}

  ngOnInit(): void {
    // permet de recuperer le parametre dans l'url
      this.activated.params.subscribe(
        (data) => {
          console.log(data);

        }
      )
  }
}
