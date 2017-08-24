import Gridion from 'dist/gridion';
import InfinityScroll from './infinity-scroll';
import './style.styl';
import 'dist/gridion.css';

let grid = new Gridion('.container',6);

function nr(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genConfigList(n){
    let items = [];
    for(let i =0;i<n;i++){
        items[i] = {
            data:``,
            size:{
                w:2,
                h:nr(1, 4)
            },
            buildCallback:function(cell){
                let height = Math.floor(grid.model.size*cell.model.h);
                let width = Math.floor(grid.model.size*cell.model.w);
                let img = new Image();
                img.src = `http://lorempixel.com/${width}/${height}`;
                cell.view.el.appendChild(img);
            }
        };
    }
    return items;
}

function addItems(is){
    let n = 6;
    let items = [];
    let loadedImagesCount = n;
    for(let i =0;i<n;i++){
        let w = 2;
        let h = nr(1, 4);
        let height = Math.floor(grid.model.size*h);
        let width = Math.floor(grid.model.size*w);

        let img = new Image();
        img.src = `http://lorempixel.com/${width}/${height}`;
        img.addEventListener('load',()=>{
            if(!--loadedImagesCount){
                grid.addItems(items,grid.model.list.length,()=>{
                    is.handling = false;
                });
            }
        });
        img.addEventListener('error',()=>{
            if(!--loadedImagesCount){
                grid.addItems(items,grid.model.list.length,()=>{
                    is.handling = false;
                });
            }
        });

        items[i] = {
            data:``,
            size:{
                w:w,
                h:h
            },
            buildCallback:function(cell){
                cell.view.el.appendChild(img);
            }
        };
    }
    
    
}

grid.fastAddItems(genConfigList(15),0);

let is = new InfinityScroll(document.body,addItems,50);