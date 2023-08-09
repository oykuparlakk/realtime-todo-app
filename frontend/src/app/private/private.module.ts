import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {PrivateRoutingModule} from "./private-routing.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { CardComponent } from './components/card/card.component';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CardComponent,
    CreateTodoComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,

    // Angular Material
    
    DragDropModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class PrivateModule { }