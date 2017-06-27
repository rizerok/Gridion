//remove
import teOnce from './te-once.fnc';
export default function teGroupCells(cells,eachCallbacks,callback){
    cells.forEach((cell,i)=>{
        teOnce(cell.view.el,()=>{
            eachCallbacks[i]();
            updatedItemsCount--;
            if(!updatedItemsCount){
                callback();
            }
        });
    });
}