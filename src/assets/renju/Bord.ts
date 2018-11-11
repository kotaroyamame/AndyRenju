export class Bord {
    x: number;
    y: number;
    private cellObj: {[n: number]: {[stone: string]: number}};
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
    setStone(index, n: 0|1|2) {
        this.cellObj[index].stone = n;
    }
}
