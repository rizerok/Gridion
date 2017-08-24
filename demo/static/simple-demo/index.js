let grid = new Gridion('body',3);

let gridConfig = [
	{
		data:'1',
		size:{w:1,h:2}
	},
	{
		data:'2',
		size:{w:1,h:1}
	},
	{
		data:'3',
		size:{w:1,h:2}
	},
	{
		data:'4',
		size:{w:1,h:1}
	}
];

grid.addItems(gridConfig);