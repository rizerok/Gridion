export default class CssTransforms{
    constructor(transforms){
        this.props = {};
        this.priority = [];
        this.set(transforms);
    }
    set(transforms){
        if(typeof transforms === 'string'){
            this.setFromString(transforms);
        }else{
            transforms && this.setFromObject(transforms);
        }
    }
    setFromString(string){
        let transforms = string.match(/\w+\([^\(]*\)/g);
        transforms.forEach((el)=>{
            let name = el.match(/\w+/)[0];
            this.props[name] = el.match(/\((.*)\)/)[1].split(',');
            //let self = this;
            // this[name] = function(){
            //     for(let i=0;i<arguments.length;i++){
            //         self.props[name] = arguments;
            //     }
            // };
        });
    }
    setFromObject(obj){
        for(let key in obj){
            this.props[key] = obj[key];
        }
    }
    setPriority(priority){
        this.priority = priority;
    }
    addToElement(el,transforms,priority){
        priority && this.setPriority(priority);
        transforms && this.set(transforms);
        let transform = '';
        //priority
        this.priority.forEach((p)=>{
            if(p in this.props){
                transform += ` ${p}(${this.props[p]})`;
            }
        });
        //no priority
        for(let key in this.props){
            if(this.priority.some((p)=>p===key)){
                continue;//exclude
            }
            let vals = '';
            this.props[key].forEach((v)=>{
                vals += `,${v}`
            });
            vals = vals.slice(1);
            transform += ` ${key}(${this.props[key]})`;
        }
        el.style.transform = transform.slice(1);
    }
}