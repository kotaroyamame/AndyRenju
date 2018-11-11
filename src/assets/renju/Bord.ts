export class Bord {
    private cellObj: Object;
    constructor(size: number) {
        this.cellObj = {};
        [...Array(size).keys()].forEach(n => {
            this.cellObj[n] = { stone: 0 };
        });
    }
    public get CallObj(): Object {
        return this.cellObj;
    }
    setStone(index, n: 0|1|2) {
        this.cellObj[index].stone = n;
    }
}
