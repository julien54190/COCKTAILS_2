
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { IUser } from '../../../_interfaces/user';

@Component({
  selector: 'app-u-index',
  templateUrl: './u-index.component.html',
  styleUrl: './u-index.component.scss'
})
export class UIndexComponent implements OnInit {

  userList: IUser[] = []

  constructor(private userService: UserService){}

  ngOnInit(): void {
      this.userService.getAllUser().subscribe(
        users => {
          this.userList = users.data
        }
        )

    }
  }
