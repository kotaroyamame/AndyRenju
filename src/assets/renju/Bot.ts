import {Bord} from './Bord';
export class Bot {
    bord: Bord;
    constructor(bord: Bord) {
        this.bord = bord;
    }
    decision(index: number|string) {
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
