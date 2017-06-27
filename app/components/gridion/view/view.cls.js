import './gridion.styl';
import grid from './grid.tpl';
import AbstractView from '_interfaces/abstract-view.cls';
export default class View extends AbstractView{
    constructor(){
        super();
        this.grid = this.createElement(grid());      
    }
    addItem(element){
        this.el.appendChild(element);
    }
    addItemAnimated(element){
        this.el.appendChild(element);
    }
    setHeight(height){
        this.el.style.height = height+'px';
    }
    clear(){
        this.el.innerHTML = '';
    }
}