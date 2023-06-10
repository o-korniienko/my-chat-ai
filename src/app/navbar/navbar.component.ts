import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Btn} from '../btn'
import {BUTTONS} from '../buttons'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
      private route: ActivatedRoute,
    ) {}

  title = "My AI Chat"
  hoverIndex = -1
  path  = window.location.pathname
  logoUrl = "assets/logo/logo.png"

  buttons:Btn[]=[]
  ngOnInit(): void {
    this.buttons = BUTTONS
    this.setCheckedBtnColor()
  }

  setCheckedBtnColor(){
    for(var btn of this.buttons){
      if(btn.link === this.path){
        btn.color = "#a4e1ac"
      }
    }
  }

  getBtnStyle(color:string){
    return {
             'padding': '1rem',
             'margin-top': '2%',
             'display': 'inline-block',
             'color': color,
             'border-radius': '4px',
             'font-size':'250%'
             }
  }
}
