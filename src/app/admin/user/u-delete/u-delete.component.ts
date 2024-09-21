import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-u-delete',
  templateUrl: './u-delete.component.html',
  styleUrl: './u-delete.component.scss'
})
export class UDeleteComponent implements OnInit{

  constructor(private activated: ActivatedRoute){}

  ngOnInit(): void {
      this.activated.params.subscribe(
        (data) => {
          console.log(data);

        }
      )
  }
}
