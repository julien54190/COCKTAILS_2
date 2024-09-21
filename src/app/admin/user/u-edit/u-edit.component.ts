
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../_services/user.service';
import { IUser } from '../../../_interfaces/user';


@Component({
  selector: 'app-u-edit',
  templateUrl: './u-edit.component.html',
  styleUrl: './u-edit.component.scss'
})
export class UEditComponent implements OnInit{

  user: IUser = {
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    password: '',
    updatedAt: '',
    createdAt: '',
    deletedAt: null,
  }

  constructor(
    private activated: ActivatedRoute,
    private userService: UserService
    ){}

  ngOnInit(): void {
    let uid = this.activated.snapshot.paramMap.get('uid')
    this.userService.getUser(uid).subscribe(
      data => {
        console.log(data)
        this.user = data.data
      }
    )
      // this.activated.params.subscribe(
      //   (data) => {
      //     console.log(data);

      //   }
      // )
  }
  onSubmit():void{
    console.log(this.user)
  }
}
