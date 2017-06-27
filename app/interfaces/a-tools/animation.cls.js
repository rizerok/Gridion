export default class Animation{
    constructor(transition){
       this.list = [transition];
    }
    then(transition){
        this.list.push(transition);
        return this;
    }
    run(callback){
        let fnc = this.list[this.list.length-1].run.bind(this.list[this.list.length-1],callback);//inner
        for(let i=this.list.length-2;i>=0;i--){
            fnc = this.list[i].run.bind(this.list[i],fnc);//self,callback
        }
        fnc();
    }
}