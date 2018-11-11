import { Component, OnInit } from '@angular/core';
import { Bot } from 'src/assets/renju/Bot';
import { Bord } from 'src/assets/renju/Bord';
@Component({
  selector: 'app-renju',
  templateUrl: './renju.component.html',
  styleUrls: ['./renju.component.scss']
})
export class RenjuComponent implements OnInit {
  bord: Bord;
  bot: Bot;
  constructor() { }

  ngOnInit() {
    this.bord = new Bord(15);
    this.bot = new Bot(this.bord);
  }

}
