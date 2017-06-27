import Cell from '_components/cell/component.cls';
import Table from '_models/table/model.cls';
export default class Model{
    constructor(width,cols){
        this.size = parseFloat(width)/cols;
        this.w = cols;
        this.list = [];
        this.table = new Table(cols);
        this.ids = [];
        this.differences = [];
    }
    updateSize(width){
        this.size = parseFloat(width)/this.w;
    }
    genId(){
        let id = this.ids.length+1;
        this.ids.push(id);
        return id;
    }
    addItem(config,index){
        let cell = new Cell(config);
        if(!(index||index===0 && index<this.list.length)) {
            index = this.list.length
        }
        //prepare
        cell.setId(this.genId());
        cell.model.size = this.size;
        //list
        this.list.splice(index,0,cell);
        //table
        this.table.remove();//let cp =
        this.table.addCells(this.list);
        //cell.model.setPosition(cp.x,cp.y);

        this.setDifferences();

        return cell;
    }
    addItems(configList,index){
        let addedCellList = [];
        if(!(index||index===0 && index < this.list.length)) {
            index = this.list.length
        }
        configList.forEach((config)=>{
            let cell = new Cell(config);
            //prepare
            cell.setId(this.genId());
            cell.model.size = this.size;
            addedCellList.push(cell);
        });
        //list
        let push = this.list.splice.bind(this.list,index,0);
        push.apply(this.list,addedCellList);
        //table
        this.table.remove();
        this.table.addCells(this.list);

        this.setDifferences();

        return addedCellList;
    }
    setDifferences(){
        this.differences = [];
        this.list.forEach((cell)=>{
            if((cell.model.y !== cell.model.yOld && cell.model.yOld!==null) || (cell.model.x !== cell.model.xOld && cell.model.xOld!==null)){
                
                if(cell.model.id===2){
                    
                }
                //first set differences
                this.differences.push(cell);
                //second set current as old coords
                cell.model.setOldPosition();
            }
        });
    }
    removeItem(id){
        let cell = this.list.find(cell=>cell.model.id===id);
        const idx = this.list.indexOf(cell);
        this.list.splice(idx,1);
        //this.update();                    
        this.table.remove();
        this.table.addCells(this.list);
        
        this.setDifferences();
        
        return cell;
    }
    scaleItem(id,w,h){      
        let cell = this.list.find(cell=>cell.model.id===id);
        cell.model.w = w;
        cell.model.h = h;    
        this.table.scaleCell(id,w,h,this.list);

        this.setDifferences();
        return cell;
    }
    // update(){
    //     this.table.remove();
    //     this.list.forEach((cell)=>{
    //         cell.model.size = this.size;
    //         let cp = this.table.addCell(cell);
    //         cell.model.setPosition(cp.x,cp.y);
    //     });
    // }
}