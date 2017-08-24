export default class InfinityScroll{
	constructor(container,resizeContainer,offset = 0){
		this.c = container;
		this.offset = offset;
		this.handling = false;
		this.resizeContainer = resizeContainer;
			
		if(container===document.body){
			document.addEventListener('scroll',()=>{
				this.checking();
			});	
		}else{
			this.c.addEventListener('scroll',()=>{
				this.checking();
			});	
		}
	}
	checking(){
		if(!this.handling){
			let bottomScroll = this.c.scrollTop + this.c.offsetHeight;
			let lastLine = this.c.scrollHeight - this.offset;			
						
			if(bottomScroll >= lastLine){
				this.handle();
			}
		}	
	}
	handle(){
		this.handling = true;
		this.resizeContainer(this);
	}
	valueOf(){
		return this.c;
	}
}