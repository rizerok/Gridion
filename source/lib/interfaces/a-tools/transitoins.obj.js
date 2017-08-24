import ATools from '_interfaces/a-tools/a-tools.cls';
export default {
    add: {
        fadeOut: function (gridion, cells) {
            return new ATools.Transition(()=> {
                cells.forEach((cell)=> {
                    cell.view.el.classList.add('is-fade');
                    gridion.view.addItem(cell.view.el);
                    cell.updateSize();
                    cell.updatePosition();
                });
            }, ()=> {
                cells.forEach((cell)=> {
                    cell.view.el.classList.add('is-fading');
                    gridion.view.addItem(cell.view.el);
                });
            }, (callback)=> {
                let updatedItemsCount = cells.length;
                if (updatedItemsCount !== 0) {
                    cells.forEach((cell)=> {
                        ATools.teOnce(cell.view.el, ()=> {
                            cell.view.el.classList.remove('is-fading');
                            if (callback && !--updatedItemsCount) {
                                callback();
                            }
                        });
                        cell.view.el.classList.remove('is-fade');
                    });   
                } else {
                    callback && callback();
                }
            }, ()=> {

            });
        },
        scaleMax:function(gridion,cells){
            return new ATools.Transition(()=>{
                cells.forEach((cell)=>{
                    cell.view.el.classList.add('is-scaling');
                    gridion.view.addItem(cell.view.el);
                    cell.updateSize();
                    cell.updatePosition();
                });
                cells.forEach((cell)=>{
                    cell.view.transforms.addToElement(cell.view.el,{
                        scale:['0']
                    });
                });
            },()=>{
                
            },(callback)=>{
                let updatedItemsCount = cells.length;
                if(updatedItemsCount!==0){
                    cells.forEach((cell)=>{
                        ATools.teOnce(cell.view.el, ()=> {
                            if(!--updatedItemsCount && callback){
                                callback();
                            }
                        });
                        cell.view.transforms.addToElement(cell.view.el,{
                            scale:['1']
                        });
                    });
                }else{
                    callback && callback();
                }
            },()=>{
                cells.forEach((cell)=>{
                    cell.view.el.classList.remove('is-scaling');
                });
            });
        }
    },
    remove:{
        scaleMin:function(gridion,cells){
            return new ATools.Transition(()=>{
                cells.forEach((cell)=>{
                    cell.view.el.classList.add('is-scaling');
                });
            },()=>{
                cells.forEach((cell)=>{
                    cell.view.transforms.addToElement(cell.view.el,{
                        scale:['1']
                    });
                });
            },(callback)=>{
                let updatedItemsCount = cells.length;
                if(updatedItemsCount!==0){
                    cells.forEach((cell)=>{
                        cell.view.transforms.addToElement(cell.view.el,{
                            scale:['0']
                        });
                        cell.view.el.addEventListener('transitionend',()=>{
                            if(!--updatedItemsCount && callback){
                                callback();
                            }
                            cell.view.el.remove();
                        });
                    });
                }else{
                    callback && callback();
                }

            },()=>{
                
            });
        }
    },
    positioning:{             
        simpleTranslate:function(gridion,cells){
            return new ATools.Transition(()=>{

            },()=>{

            },(callback)=>{
                let updatedItemsCount = cells.length;
                if(updatedItemsCount!==0){
                    cells.forEach((cell)=>{
                        ATools.teOnce(cell.view.el,()=>{
                            
                            if(!--updatedItemsCount && callback){
                                callback();
                            }
                        });
                        cell.updateSize();
                        cell.updatePosition();
                    });
                }else{
                    callback && callback();
                }
            },()=>{

            });
        }
    },
    scaling:{
        scaleMax:function(gridion,cells){
            return new ATools.Transition(()=>{
                
                cells.forEach((cell)=>{
                    cell.view.el.classList.add('is-scaling');
                    cell.updateSize();
                    cell.updatePosition();
                });
            },()=>{
                
                cells.forEach((cell)=>{
                    cell.view.transforms.addToElement(cell.view.el,{
                        scale:['0']
                    });

                });
            },(callback)=>{
                let updatedItemsCount = cells.length;
                if(updatedItemsCount!==0){
                    cells.forEach((cell)=>{
                        cell.view.transforms.addToElement(cell.view.el,{
                            scale:['1']
                        });
                        
                        ATools.teOnce(cell.view.el, ()=> {  
                            
                            if(!--updatedItemsCount && callback){
                                callback();
                            }
                        });
                    });
                }else{
                    
                    callback && callback();
                }
            },()=>{
                
            });
        },
        scaleMin:function(gridion,cells){
            return new ATools.Transition(()=>{
                cells.forEach((cell)=>{
                    cell.view.el.classList.add('is-scaling');
                });
            },()=>{
                cells.forEach((cell)=>{
                    cell.view.transforms.addToElement(cell.view.el,{
                        scale:['1']
                    });
                });
            },(callback)=>{
                let updatedItemsCount = cells.length;
                if(updatedItemsCount!==0){
                    cells.forEach((cell)=>{
                        cell.view.transforms.addToElement(cell.view.el,{
                            scale:['0']
                        });
                        cell.view.el.addEventListener('transitionend',()=>{
                            if(!--updatedItemsCount && callback){
                                callback();
                            }
                        });
                    });
                }else{
                    callback && callback();
                }
            },()=>{
                
            });
        }
    }
};