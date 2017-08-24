import trs from '_interfaces/a-tools/transitoins.obj';
import ATools from '_interfaces/a-tools/a-tools.cls';

import View from './view/view.cls';
import Model from '_models/gridion/model.cls';
export default class Gridion{
    constructor(parentSelector,cols){
        this.parent = document.querySelector(parentSelector);
        this.view = new View();
        this.appendToParent();
        this.model = new Model(this.view.el.offsetWidth,cols);

        let update;
        window.addEventListener('resize',()=>{ 
            clearTimeout(update);
            update = setTimeout(()=>{
                this.model.updateSize(this.view.el.offsetWidth);
                this.model.list.forEach((cell)=>{
                    cell.model.updateSize(this.model.size);
                });
                this.fastUpdate();
            },100);
        });
    }
    appendToParent(){
        this.parent.appendChild(this.view.el);
    }
    fastAddItem(config,index){
        let cell = this.model.addItem(config,index);
        this.view.addItem(cell.view.el);  
        this.fastUpdate();
    }
    fastAddItems(configList,index){
        if(configList instanceof Array){
            let cellList = this.model.addItems(configList,index);
            cellList.forEach((cell)=>{
                this.view.addItem(cell.view.el);
            });
            this.fastUpdate();
        }else{
            throw new TypeError('list is not an array');
        }
    }
    fastRemoveItem(id){
        let cell = this.model.removeItem(id);
    }
    fastUpdate(){
        this.model.list.forEach((cell)=>{
            cell.updateSize();
            cell.updatePosition();
        });
        const height = this.model.table.cells.length;
        this.view.setHeight(height*this.model.size);
    }

    addItems(configList,index,cbk){
        if(configList instanceof Array){
            let newCells = this.model.addItems(configList,index);

            let height = this.model.table.cells.length;
            this.view.setHeight(height*this.model.size);

            cbk = cbk || function(){};

            new ATools.Animation(trs.positioning.simpleTranslate(this,this.model.differences))
                .then(trs.add.scaleMax(this,newCells))
                .run(cbk);
        }else{
            throw new TypeError('list is not an array');
        }
    }
    removeItem(id,cbk){
        let cell = this.model.removeItem(id);

        cbk = cbk || function(){};

        new ATools.Animation(trs.remove.scaleMin(this,[cell]))
            .then(trs.positioning.simpleTranslate(this,this.model.differences))
            .run(()=>{
                let height = this.model.table.cells.length;
                this.view.setHeight(height*this.model.size);
                cbk();
            });
    }
    scaleItem(id,x,y,cbk){
        let cell = this.model.scaleItem(id,x,y);

        cbk = cbk || function(){};

        new ATools.Animation(trs.scaling.scaleMin(this,[cell]))
            .then(trs.positioning.simpleTranslate(this,this.model.differences))
            .then(trs.scaling.scaleMax(this,[cell]))
            .run(()=>{
                let height = this.model.table.cells.length;
                this.view.setHeight(height*this.model.size);
                cbk();
            });
    }
}