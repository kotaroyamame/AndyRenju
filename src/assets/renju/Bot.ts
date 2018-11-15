import { Bord } from './Bord';
export class Jadge {
	constructor(private bord: Bord) { }
	// 1=石は置ける 0=すでにあるので置けない -1=反則で置けない
	isPutStoneByN(n: number, stone: 1 | 2): 0 | 1 | -1 {
		const pt = this.bord.getStoneByN(n);
		if (pt === 1 || pt === 2) {
			return 0;
		}
		const hansoku = this.isHansoku(n, stone);
		if (hansoku === 1) {
			return -1;
		}
		return 1;
	}
	// 1=石は置ける 0=すでにあるので置けない -1=反則で置けない
	isPutStone(x: number, y: number, stone: 1 | 2): 0 | 1 | -1 {
		const pt = this.bord.getStone(x, y);
		if (pt === 1 || pt === 2) {
			return 0;
		}
		const hansoku = this.isHansoku(this.xyToN(x, y), stone);
		if (hansoku === 1) {
			return -1;
		}
		return 1;
	}
	private xyToN(x: number, y: number): number {
		return y * this.bord.x + x;
	}
	private nToXY(n: number): number[] {
		return [n % this.bord.y, Math.floor(n / this.bord.x)];
	}
	public isHansoku(n: number, stoneColor: 1 | 2): 0 | 1 {
		let tr_tr = 0;
		const [x, y] = this.nToXY(n);
		for (let j = 1; j <= 4; j++) {
			const { type, size, edgeScore } = this.search(x, y, j);
			if (stoneColor === 1 && type === 1 && size === 3 && edgeScore === 2) {
				tr_tr += 1;
				if (tr_tr >= 2) {
					return 1;
				}
			}
		}
		return 0;
	}
	public isGemeOver(n: number, stoneColor: 1 | 2): 0 | 1 | 2 {
		const [x, y] = this.nToXY(n);
		for (let j = 1; j <= 4; j++) {
			const { type, size, edgeScore } = this.search(x, y, j);
			if (stoneColor !== type) {
				continue;
			}
			if (type === 1 && size === 5) {
				return 1;
			} else if (type === 2 && size >= 5) {
				return 2;
			}
		}
		return 0;
	}

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
	public searchByN(n: number, vc: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | any, stack: Array<0 | 1 | 2> | any = []): { type: 0 | 1 | 2, size: number, edgeScore: number } {
		const [x, y] = this.nToXY(n);
		const { type, size, edgeScore } = this.search(x, y, vc);
		return { type, size, edgeScore };
	}
	public search(x: number, y: number, vc: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | any, stack: Array<0 | 1 | 2> | any = []): { type: 0 | 1 | 2, size: number, edgeScore: number } {
		if (stack.length <= 1 || stack[1] !== 0) {
			if (stack.length > 1 && this.bord.getStone(x, y) !== stack[1] || (stack.length === 1 && this.bord.getStone(x, y) <= 0)) {
				// 反転して最初から一つ進む
				if (vc <= 4) {
					vc += 4;
					for (let i = 0; i < stack.length + 1; i++) {
						const [_x, _y] = this.advance(x, y, vc);
						x = _x; y = _y;
					}
					return this.search(x, y, vc, stack);
				} else {
					// edgeScore 石の端の空間が空いているかどうか、0空いてない 1一方こうだけ空いてる 2両方空いてる
					let edgeScore = this.bord.getStone(x, y) <= 0 ? 1 : 0;
					vc -= 4;
					for (let i = 0; i < stack.length + 1; i++) {
						const [_x, _y] = this.advance(x, y, vc);
						x = _x; y = _y;
					}
					edgeScore += this.bord.getStone(x, y) <= 0 ? 1 : 0;
					return { type: stack[1], size: stack.length, edgeScore: edgeScore };
				}
			}
			stack.push(this.bord.getStone(x, y));
		} else if (stack[1] <= 0) {
			return { type: 0, size: 0, edgeScore: 0 };
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
	decision(mindBord: Bord, index: number | string, stone: 1 | 2, count: number = 2) {
		index = typeof index === 'number' ? index : parseInt(index, 10);
		let score = -1;
		const jadge = new Jadge(mindBord);
		if (jadge.isPutStoneByN(index, stone) === 1) {
			score = 0;
			for (let j = 1; j <= 4; j++) {
				const { type, size, edgeScore } = jadge.searchByN(index, j);
				if (type !== stone) {
					score += Math.pow(size - 1, 2) + Math.pow(edgeScore, 2);
				} else {
					score += Math.pow(size - 1, 2) + Math.pow(edgeScore, 2);
				}

			}
			console.log(score);
			if (count <= 0 || score <= 28) {
				return score;
			}
			mindBord.getStoneByN(index);
			const bordCellObj = mindBord.getCellObj();
			let maxCellScore = null;
			// let minCellScore = null;
			// tslint:disable-next-line:forin
			for (const _index in bordCellObj) {
				// const cell = bordCellObj[_index];
				const cellScore = { index: _index, score: this.decision(mindBord, _index, stone === 1 ? 2 : 1, count--) };
				// if (stone === 1) {
				if (maxCellScore === null || maxCellScore.score < cellScore.score) {
					maxCellScore = cellScore;
				}
				// } else {
				// 	if (minCellScore === null || minCellScore.score > cellScore.score) {
				// 		minCellScore = cellScore;
				// 	}
				// }

			}
			// if (stone === 1) {
			return maxCellScore.score + score;
			// } else {
			// 	return minCellScore.score;
			// }
		}
		return score;
	}
	setStone(stone: 1 | 2) {
		const cellScoreList = [];
		const bordCellObj = this.bord.getCellObj();
		// tslint:disable-next-line:forin
		for (const index in bordCellObj) {
			// const cell = bordCellObj[index];
			cellScoreList.push({ index: index, score: this.decision(this.bord.copy(), index, stone, 2) });
		}
		let maxScoreCell = cellScoreList[0];
		for (let i = 1; i < cellScoreList.length; i++) {
			if (maxScoreCell.score < cellScoreList[i].score) {
				maxScoreCell = cellScoreList[i];
			}
		}
		return maxScoreCell.index;
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
		if (this.jadge.isPutStoneByN(n, this.is_user ? 1 : 2) === 1) {
			if (this.is_user) {
				this.bord.setStone(n, 1);
				// this.is_user = !this.is_user;
				this.is_win(n, this.is_user ? 1 : 2);
				const botStoneIndex = this.bot.setStone(2);
				this.bord.setStone(botStoneIndex, 2);
				this.is_win(botStoneIndex, this.is_user ? 2 : 1);
			}
		}
	}
	is_win(n, stone) {
		const k = this.jadge.isGemeOver(n, stone);
		if (k === 1) {
			this.winner = '先手の勝ちです';
		} else if (k === 2) {
			this.winner = '後手の勝ちです';
		}
	}
}
