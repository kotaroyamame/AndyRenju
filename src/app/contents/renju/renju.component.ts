import { Component, OnInit } from '@angular/core';
import { Bot, Jadge, GameController } from 'src/assets/renju/Bot';
import { Bord } from 'src/assets/renju/Bord';
@Component({
	selector: 'app-renju',
	templateUrl: './renju.component.html',
	styleUrls: ['./renju.component.scss']
})
export class RenjuComponent implements OnInit {
	gameController: GameController;
	kekka = '';
	constructor() { }

	ngOnInit() {

		this.gameController = new GameController(new Bord(15));
	}

}
