import Gridion from 'dist/gridion';
import './style.styl';
import 'dist/gridion.css';

let grid = new Gridion('.container',6);
let table = document.querySelector('table');

class GridControl{
    constructor(){
        this.action = 'removeItem';
        this.width = 1;
        this.height = 1;
    }
    renderTableModel(){
        table.innerHTML = '';
        for(let v=0;v<grid.model.table.cells.length;v++){
            let tr = document.createElement('tr');
            table.appendChild(tr);
            for(let h=0;h<grid.model.table.cells[v].length;h++){
                let td = document.createElement('td');
                td.innerHTML = grid.model.table.cells[v][h];
                tr.appendChild(td);
            }
        }
    }
    add25Items(){
        grid.addItems(genConfigList(25));
    }
}

let gridControl = new GridControl();
let gui = new dat.GUI();
let action = gui.add(gridControl,'action',['removeItem','addItem','scaleItem']);
let width = gui.add(gridControl,'width',1,6).step(1); 
let height = gui.add(gridControl,'height',1,6).step(1);
gui.add(gridControl,'renderTableModel');
gui.add(gridControl,'add25Items');

function cellClick(cell){
    switch(gridControl.action){
        case 'removeItem': {
            grid[gridControl.action](cell.model.id);
            break;
        }
        case 'addItem': {
            let idx = grid.model.list.indexOf(cell);
            grid.addItems([{
                size: {
                    w: gridControl.width,
                    h: gridControl.height
                },
                buildCallback: function (cell) {
                    cell.view.el.addEventListener('click', ()=> {
                        cellClick(cell);
                    });
                    cell.view.el.innerHTML = `new item - ${cell.model.id}`;
                }
            }], idx);
            break;
        }
        case 'scaleItem': {
            grid.scaleItem(
                cell.model.id,
                gridControl.width,
                gridControl.height
            );
            break;
        }
    }
    gridControl.renderTableModel();
}

function nr(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genConfigList(n){
    let items = [];
    for(let i =0;i<n;i++){
        items[i] = {
            //data:`${i+1}`,
            size:{
                w:nr(1, 3),
                h:nr(1, 3)
            },
            buildCallback:function(cell){
                cell.view.el.addEventListener('click',()=>{
                    cellClick(cell);
                });
                cell.view.el.innerHTML = cell.model.id;
            }
        };
    }
    return items;
}

console.time('gen grid');
let items = genConfigList(25);
grid.fastAddItems(items);
console.timeEnd('gen grid');

gridControl.renderTableModel();