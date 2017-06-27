//transitionend once
export default function teOnce(el,callback){
    let fnc = ()=>{
        el.removeEventListener('transitionend',fnc);
        callback();
    };
    el.addEventListener('transitionend',fnc);
}
