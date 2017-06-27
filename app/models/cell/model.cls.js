export default class Cell{
    constructor(size,pos){
        this.size = null;
        this.id = null;
        this.w = size.w;
        this.h = size.h;
        this.x = null;
        this.y = null;
        this.xOld = null;
        this.yOld = null;
        //this.type = pos?'fixed':'dynamic';
        //if(this.type === 'fixed'){
        //    this.x = pos.x;
        //    this.y = pos.y;
        //}
    }
    updateSize(size){
        this.size = size;
    }
    setPosition(x,y){
        this.x = x;
        this.y = y;
        
    }
    setOldPosition(){
        this.xOld = this.x;
        this.yOld = this.y;
         
    }
}