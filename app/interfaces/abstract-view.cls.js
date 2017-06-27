export default class AbstractView{
    constructor(){

    }
    createElement(string){
        this.el = this.stringToElement(string);
    }
    stringToElement(s){
        var div = document.createElement('div');
        div.innerHTML = s;
        return div.firstChild;
    }
    appendTo(parentSelector){
        this.parent = document.querySelector(parentSelector);
        this.parent.appendChild(this.el);
    }
    remove(){
        this.el.parentNode.removeChild(this.el);
    }
}
