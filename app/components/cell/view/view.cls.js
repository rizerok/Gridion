import cell from './cell.tpl';
import AbstractView from '_interfaces/abstract-view.cls';
import CssTransforms from '_interfaces/css-transforms.cls';
export default class View extends AbstractView{
    constructor(data){
        super();
        this.createElement(cell(data));
        this.transforms = new CssTransforms({
            scale:['1']
        });
        this.transforms.setPriority(['translate','scale']);
    }
    setPosition(left,top){
        this.transforms.addToElement(this.el,{
            translate:[`${left}px`,`${top}px`]
        });
    }
    setSize(width,height){
        this.el.style.width = width+'px';
        this.el.style.height = height+'px';
    }
    animatedRemove(callback){
        this.el.classList.add('is-scaling');
        this.transforms.addToElement(this.el,{
            scale:['0']
        });
        this.el.addEventListener('transitionend',()=>{
            this.remove();
            callback && callback();
        });
    }
}