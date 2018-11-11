export class Bord {
    cellObj: Object;
    constructor(size: number) {
        this.cellObj = {};
        [...Array(size).keys()].forEach(n => {
            this.cellObj[n] = { stone: 0 };
        });
    }
    get CallObj() {
        return this.cellObj;
    }

}
