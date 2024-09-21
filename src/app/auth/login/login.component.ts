
import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { ICredentials } from '../../_interfaces/credential';
import { IToken } from '../../_interfaces/token';
import { TokenService } from '../../_services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: ICredentials = {
    email: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private tokenService: TokenService
    ){}

  onSubmit(): void{
    console.log(this.form);
    this.authService.login(this.form).subscribe(
      data  => {
        //console.log(data.access_token)
        this.tokenService.saveToken(data.access_token)
      },
      err => console.log(err)


    )
  }
}
