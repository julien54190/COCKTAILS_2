import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AloyoutComponent } from './aloyout/aloyout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { CIndexComponent } from './cocktail/c-index/c-index.component';
import { CAddComponent } from './cocktail/c-add/c-add.component';
import { CEditComponent } from './cocktail/c-edit/c-edit.component';
import { CDeleteComponent } from './cocktail/c-delete/c-delete.component';
import { AheaderComponent } from './aheader/aheader.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AloyoutComponent,
    DashboardComponent,
    SidemenuComponent,
    CIndexComponent,
    CAddComponent,
    CEditComponent,
    CDeleteComponent,
    AheaderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
