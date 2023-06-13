import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlayComponent} from "./play/play.component"
import {TranslateComponent} from "./translate/translate.component"

const routes: Routes = [
  { path: '', redirectTo: '/play', pathMatch: 'full' },
  { path: 'play', component: PlayComponent },
  { path: 'translate', component: TranslateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
