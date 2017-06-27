import View from './view/view.cls';
import Model from '_models/cell/model.cls';
export default class Cell{
    constructor(config){
        this.model = new this.constructor.Model(config.size,config.pos);
        this.view  = new this.constructor.View(config.data);
        config.buildCallback && config.buildCallback(this);
    }
    updatePosition(){
        this.view.setPosition(this.model.x*this.model.size,this.model.y*this.model.size);
    }
    updateSize(){
        this.view.setSize(this.model.w*this.model.size,this.model.h*this.model.size);
    }
    setId(id){
        this.model.id = id;
    }
    static get Model(){
        return Model;
    }
    static get View(){
        return View;
    }
}