export default class Model{
    constructor(cols){
        this.cells = [];
        this.w = cols;
        this.h = 0;
    }
    generate(){
        for(let y=0;y<this.h;y++){
            this.cells[y] = [];
            for(let x=0;x<this.w;x++){        
                this.cells[y][x] = 0;
            }
        }
    }
    clear(){
        this.generate();
    }
    remove(){
        this.cells = [];
        this.h = 0;
    }
    addCell(cell){
        while(!this.checkReceivingCell(cell.model.h)){//for start, because need row
            this.createNewRow();
        }
        let c = {x:0,y:0};//cursor

        for(;c.y<this.cells.length;c.y++){

            while(c.x<this.cells[c.y].length){
                if(this.checkFreeSpace(cell,c)){
                    this.setCell(cell,c);
                    return c;
                    //exit !important
                }
                c.x++;
            }
            c.x = 0;

            if(c.y+cell.model.h > this.h-1){//last index
                this.createNewRow();
            }
        }
    }
    setCell(cell,c){
        for(let y=c.y;y<cell.model.h+c.y;y++){
            for(let x=c.x;x<cell.model.w+c.x;x++){
                this.cells[y][x] = cell.model.id;
            }
        }
    }
    createNewRow(){
        const idx = this.h;
        this.cells[idx] = [];
        for(let x=0;x<this.w;x++){
            this.cells[idx][x] = 0;
        }
        this.h++;
    }
    checkFreeSpace(cell,c){
        if(cell.model.h+c.y > this.h || cell.model.w+c.x > this.w){//limits
            return false;
        }
        for(let y=c.y;y<cell.model.h+c.y;y++){
            for(let x=c.x;x<cell.model.w+c.x;x++){
                if(this.cells[y][x]){//no empty
                    return false;
                }
            }
        }
        return true;
    }
    checkReceivingCell(cellHeight){
        return this.h >= cellHeight;
    }
    addCells(cellList){
        for(let i = 0;i<cellList.length;i++) {
            let cp = this.addCell(cellList[i]);
                            
            cellList[i].model.setOldPosition();
            cellList[i].model.setPosition(cp.x,cp.y);
        }
    }
    scaleCell(id,w,h,cellList){
        this.remove();
        let cell,changedItems = [];

        for(let i = 0;i<cellList.length;i++){
            if(cellList[i].model.id !== id){
                changedItems.push(cellList[i]);
            }else{
                cell = cellList[i];
            }
        }
        for(let i = 0;i<cell.model.y+cell.model.h;i++){
            this.createNewRow();
        }
        this.setCell(cell,{x:cell.model.x,y:cell.model.y});
        this.addCells(changedItems);
    }
    // changePosition(changedListConfig,cellList){
    //     this.remove();
    //
    // }
}