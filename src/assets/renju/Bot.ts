import { Bord } from './Bord';
export class Jadge {
	constructor(private bord: Bord) {

	}
	// 1=石は置ける 0=すでにあるので置けない -1=反則で置けない
	isPutStone(x: number, y: number, stone: 1 | 2): 0 | 1 | -1 {
		const pt = this.bord.getStone(x, y);
		if (pt === 1 || pt === 2) {
			return 0;
		}
		return 1;
	}

	public isGemeOver(n: number): 0 | 1 | 2 {
		for (let j = 1; j <= 4; j++) {
			const { type, size } = this.search(n % this.bord.y, Math.floor(n / this.bord.x), j);
			if (type === 1 && size === 5) {
				return 1;
			} else if (type === 2 && size >= 5) {
				return 2;
			}
		}
		return 0;
	}
	// public isGemeOver(n: number): 0|1|2 {
	//     for ( let i = 0; i < this.bord.getCellSize(); i++) {
	//         for ( let j = 1; j <= 8; j++) {
	//             const {type, size} = this.search( Math.floor( i / this.bord.x), i % this.bord.y , j );
	//             console.log(size);
	//             if (type === 1 && size === 5) {
	//                 return 1;
	//             } else if ( type === 2 && size >= 5) {
	//                 return 2;
	//             }
	//         }
	//     }
	//     return 0;
	// }
	private advance(x: number, y: number, vc: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | any): Array<number> {
		switch (vc) {
			case 1: // 上方向
				y = y - 1;
				break;
			case 2: // 右上方向
				y = y - 1;
				x = x + 1;
				break;
			case 3: // 右方向
				x = x + 1;
				break;
			case 4: // 右下方向
				y = y + 1;
				x = x + 1;
				break;
			case 5: // 下方向
				y = y + 1;
				break;
			case 6: // 左下方向
				y = y + 1;
				x = x - 1;
				break;
			case 7: // 左方向
				x = x - 1;
				break;
			case 8: // 左上方向
				y = y - 1;
				x = x - 1;
				break;
		}
		return [x, y];
	}
	private search(x: number, y: number, vc: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | any, stack: Array<0 | 1 | 2> | any = []): { type: 0 | 1 | 2, size: number } {
		if (stack.length === 0 || stack[0] !== 0) {
			if (stack.length !== 0 && this.bord.getStone(x, y) !== stack[0]) {
				// 反転して最初から一つ進む
				if (vc <= 4) {
					vc += 4;
					for (let i = 0; i < stack.length + 1; i++) {
						const [_x, _y] = this.advance(x, y, vc);
						x = _x; y = _y;
					}
					return this.search(x, y, vc, stack);
				} else {
					return { type: stack[0], size: stack.length };
				}
			}
			stack.push(this.bord.getStone(x, y));
		} else if (stack[0] === 0) {
			return { type: 0, size: 0 };
		}
		// tslint:disable-next-line:no-unused-expression
		const [__x, __y] = this.advance(x, y, vc);
		x = __x; y = __y;
		return this.search(x, y, vc, stack);
	}
}
export class Bot {
	constructor(private bord: Bord) {
	}
	decision(index: number | string) {
		index = typeof index === 'number' ? index : parseInt(index, 10);
		let score = -1;

		const bordCellObj = this.bord.getCellObj();
		if (bordCellObj[index].stone !== 0) {
			return score;
		}
		const roundMap = [1, -1, this.bord.x, -this.bord.x, -this.bord.x + 1, this.bord.x + 1, this.bord.x - 1, -this.bord.x - 1];

		for (let i = 0; i < roundMap.length; i++) {
			if (bordCellObj.hasOwnProperty(roundMap[i] + index)) {
				if (bordCellObj[roundMap[i] + index].stone === 1) {
					score = score + 1;
				} else if (bordCellObj[roundMap[i] + index].stone === 2) {
					score = score + 3;
				}
			}
		}
		return score;
	}
	setStone() {
		let cellScoreList = [];
		const bordCellObj = this.bord.getCellObj();
		// tslint:disable-next-line:forin
		for (const index in bordCellObj) {
			const cell = bordCellObj[index];
			cellScoreList.push({ index: index, score: this.decision(index) });
		}
		cellScoreList = cellScoreList.sort((a, b) => {
			if (a.score > b.score) {
				return -1;
			}
			if (a.score < b.score) {
				return 1;
			}
			return 0;
		});
		this.bord.setStone(cellScoreList[0].index, 1);
	}
}
export class GameController {
	is_user = true;
	winner = '';
	jadge: Jadge;
	bot: Bot;
	constructor(public bord: Bord) {
		this.jadge = new Jadge(this.bord);
		this.bot = new Bot(this.bord);
	}
	setStone(n) {
		this.bord.setStone(n, this.is_user ? 1 : 2);
		this.is_user = !this.is_user;
		this.is_win(n);
	}
	is_win(n) {
		const k = this.jadge.isGemeOver(n);
		if (k === 1) {
			this.winner = '先手の勝ちです';
		} else if (k === 2) {
			this.winner = '後手の勝ちです';
		}
	}
}
// function search(ar=[]){
//     ar.push(1);
//     if(ar.length>5){
//         return ar;
//     }
//     return search(ar);
// }
