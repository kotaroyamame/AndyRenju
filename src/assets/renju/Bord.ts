export class Bord {
    x: number;
    y: number;
    private cellObj: {[n: number]: {[stone: string]: 0|1|2}};
    constructor(size: number) {
        this.x = this.y = size;
        this.cellObj = {};
        [...Array(Math.pow(size, 2)).keys()].forEach(n => {
            this.cellObj[n] = { stone: 0 };
        });
    }
    public getCellObj(): Object {
        return this.cellObj;
    }
    public getCellKeys(): number[] {
        return Object.keys(this.cellObj).map(o => parseInt(o, 10));
    }
    getCell(n): Object {
        return this.cellObj[n];
    }
    getStone(x: number, y: number): -1|0|1|2 {
        if ( x < 0 || x >= this.x || y < 0 || y >= this.y) {
            return -1;
        }
        const n = y * this.x + x;
        return this.cellObj[n].stone;
    }
    getCellSize() {
        return Object.keys(this.cellObj).length;
    }
    getStoneByN(n: number): -1|0|1|2 {
        if ( n < 0 || n >= Math.pow(this.x, this.y) ) {
            return -1;
        }
        return this.cellObj[n].stone;
    }
    setStone(index, n: 0|1|2) {
        console.log('setStone');
        this.cellObj[index].stone = n;
    }
}
