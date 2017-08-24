export default class Transitions{
    constructor(prepare,start,finish,ending){
        this.prepare = prepare;
        this.start = start;
        this.finish = finish;
        this.ending = ending;
    }
    run(callback){
        this.prepare();
        requestAnimationFrame(()=>{
            this.start();
            requestAnimationFrame(()=>{
                this.finish(()=>{
                    this.ending();
                    callback && callback();
                });
            });
        });
    }
}