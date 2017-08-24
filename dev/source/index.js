import Gridion from 'lib/lib';
import './style.styl';

window.grid = new Gridion('.container',6);

console.time(1234);
let items = [];
for(let i =0;i<25;i++){
    items[i] = {
        //data:`${i+1}`,
        size:{
            w:nr(1, 3),
            h:nr(1, 3)
        },
        buildCallback:function(cell){
            cell.view.el.addEventListener('click',()=>{
                window.grid.removeItem(cell.model.id);
                renderTable();
            });
            //console.log(cell.view.el,cell.model.id);
            cell.view.el.innerHTML = cell.model.id;
        }
    };
}
window.grid.fastAddItems(items);
console.timeEnd(1234);

function nr(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderTable(){
    table.innerHTML = '';
    for(let v=0;v<window.grid.model.table.cells.length;v++){
        let tr = document.createElement('tr');
        table.appendChild(tr);
        for(let h=0;h<window.grid.model.table.cells[v].length;h++){
            let td = document.createElement('td');
            td.innerHTML = window.grid.model.table.cells[v][h];
            tr.appendChild(td);
        }
    }
}

let table = document.querySelector('table');
renderTable();
window.addItems = function(){
    let items = [];
    for(let i =0;i<2;i++){
        items[i] = {
            data:`${i}`,
            size:{
                w:nr(1, 3),
                h:nr(1, 3)
            },
            buildCallback:function(cell){
                // cell.view.el.style.backgroundSize = 'cover';
                // cell.view.el.style.backgroundColor = 'transparent';
                // cell.view.el.style.backgroundImage = `url(http://lorempixel.com/${Math.floor(grid.model.size*cell.model.w)}/${Math.floor(grid.model.size*cell.model.h)})`;
                cell.view.el.addEventListener('click',()=>{
                    console.log('cell',cell);
                    window.grid.removeItem(cell.model.id);
                });
            }
        };
    }
    window.grid.addItems(items,0);
};

document.querySelector('button').addEventListener('click',()=>{
    renderTable();
});