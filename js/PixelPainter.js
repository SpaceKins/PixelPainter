	var drawContainer;
	var rowCount;
	var colCount;
	var currentRow;
	var gridAttributes;
	var attributeKeys;

	var thisCurrentColor='#12ef3f';
	var totalColors=parseInt('ffffff', 16);
	var totalColorStep;
	var currentColorInPicker=0;

function createGrid(val1,val2,val3){
	var rows;
	var cols;
	var attributes;

	validations(val1,val2,val3);

	/**** Set Correct Input Mapping *******/
	rows=val1;

	if(typeof val2 == "number")
	{
		cols=val2;
	}else if(typeof val2 == "object")
	{
		attributes=val2;
		cols=rows;
	}else if(val2 == undefined)
	{
		cols=rows;
	}

  if(attributes==undefined){
	attributes=(val3==undefined)?{}:val3;
	}

		drawContainer=document.createElement("div");
		setAttributes(drawContainer,{"class":"drawContainer"});
		createRows(rows,cols,attributes);

	return drawContainer;
}

function validations(val1,val2,val3){
	if(noValValidation(val1)){
		throw new Error();  //'no argument';
	};

	if(!numValidation(val1)){
		throw new Error();
	};

	if(!(numValidation(val2)|| objectValidation(val2) || noValValidation(val2))){
		throw new Error();
	};

	if(!(objectValidation(val3) || noValValidation(val3))){
		throw new Error();
	};
}

  function numValidation(number)
  {
  	var test=(typeof number == "number");
  	return (typeof number == "number" && number >-1);
  }

  function objectValidation(thisObject){
  	return (typeof thisObject == "object");
  }

  function noValValidation(thisVal){
  	return (thisVal == undefined);
  }

	function createRows_Prev(rows,columns,attributes){
		rows--;
		if(rows>=0){
			var newRow=document.createElement("div");
				drawContainer.appendChild(newRow);
				createCols(newRow,columns,attributes);
				createRows(rows,columns,attributes);			
			}
		}

		function createRows(rows, columns, attributes){
			while(rows>0){
				var newRow=document.createElement("div");
				drawContainer.appendChild(newRow);
				createCols(newRow,columns,attributes);
				rows--;
			}
		}

		function createCols(newRow,columns,attributes)
		{
			while(columns>0){
				var colSpan=document.createElement("div");
		//		colSpan.style.border = "thick solid #0000FF";
				setAttributes(colSpan,attributes);
				newRow.appendChild(colSpan);
				columns--;
			}
		}

		function createCols_Prev(newRow,columns,attributes)
		{
			if(columns>0){
			var colSpan=document.createElement("span");
			setAttributes(colSpan,attributes);
			newRow.appendChild(colSpan);
		//	console.log(columns);
			columns--;
				if(columns){
					createCols(newRow,columns,attributes);
					}
			}
		}

		function setAttributes(colSpan,attributes){
			if(attributes)
			{
			attributeKeys=Object.keys(attributes);
			for(var i=0;i<attributeKeys.length;i++){
				colSpan.setAttribute(attributeKeys[i],attributes[attributeKeys[i]]);
			}
			}			
		}

		function getRandomColor() {
		    var letters = '0123456789ABCDEF'.split('');
		    var color = '#';
		    for (var i = 0; i < 6; i++ ) {
		        color += letters[Math.floor(Math.random() * 16)];
		    }
			return color;
		}

		function getColorPhase() {

			var hexString = parseInt(currentColorInPicker).toString(16);
			var returnCSSHexString=String("000000" + hexString).slice(-6);
			currentColorInPicker+=totalColorStep;
			console.log(returnCSSHexString);
			return '#'+ returnCSSHexString;
		}

		function createButtons()
		{
			var buttonGrid=document.createElement('div');

			buttonGrid.appendChild(createButton("Clear",{'type':'button','onclick': 'setClear()'}));
			buttonGrid.appendChild(createButton("Erase",{'type':'button','onclick': "setErase()"}));


			var colorPickerEl=document.getElementById('colorPicker');
			colorPickerEl.appendChild(buttonGrid);

		}

		function createButton(btnText,attr){
			var btn=document.createElement('button');
			var btnText=document.createTextNode(btnText);

			setAttributes(btn,attr);
			btn.appendChild(btnText);
			return btn;
		}


		function setGetColorCellEvents()
		{
			var colorPickerGrid=document.getElementById('colorPicker');
			var colorCells=colorPickerGrid.getElementsByClassName('gridCell');

			for(var i=0;i<colorCells.length;i++){
				colorCells[i].addEventListener('click',getColorCell);
			}
		}

		function setColorPanel_Prev()
		{
			var colorPickerGrid=document.getElementById('colorPicker');
			var colorRows=colorPickerGrid.children;

			for(var i=0;i<colorRows.length;i++){
				var colorCols=colorRows[i].children;

				for(var j=0;j<colorCols.length;j++){
					if(colorCols[i])
					{
					var hexColor='#'+getColorPhase(colorRows.length,i)+getColorPhase(colorCols.length,j);
					setAttributes(colorCols[i],{'style':'background-color:'+hexColor});
					}
				}
			}
			/*
			var colorCells=colorPickerGrid.getElementsByClassName('gridCell');

			for(var i=0;i<colorCells.length;i++){
				//setAttributes(colorCells[i],{'style':'background-color:'+getRandomColor()});
				setAttributes(colorCells[i],{'style':'background-color:'+getColorPhase(colorCells.length,i)});
			}*/
		}

		function setColorPanel()
		{
			var colorPickerGrid=document.getElementById('colorPicker');
			var colorCells=colorPickerGrid.getElementsByClassName('gridCell');

			for(var i=0;i<colorCells.length;i++){
				//setAttributes(colorCells[i],{'style':'background-color:'+getRandomColor()});
				setAttributes(colorCells[i],{'style':'background-color:'+getColorPhase()});
			}
		}

		function setColorCellEvents()
		{
			var colorPickerGrid=document.getElementById('colorPanel');
			var colorCells=colorPickerGrid.getElementsByClassName('gridCell');

			for(var i=0;i<colorCells.length;i++){
			//	setAttributes(colorCells[i],{'onclick':"setColorCell.bind(this)()"});
				colorCells[i].addEventListener('click',setColorCell);
			//	colorCells[i].addEventListener('dragover',setColorCell);		
			//	colorCells[i].addEventListener('mousedown',setColorCell);	


			colorCells[i].addEventListener("dragstart", setColorCell);

			// While dragging the p element, change the color of the output text
		//	colorCells[i].addEventListener("drag", testDrag);

						// While dragging the p element, change the color of the output text
			colorCells[i].addEventListener("dragover", setColorCell);

			// Output some text when finished dragging the p element and reset the opacity
			colorCells[i].addEventListener("dragend", setColorCell);

			}
		}

		function getColorCell(event)
		{	
				var styleAttr=this.getAttribute('style');
				var styleValueArray=styleAttr.split(':');
				if(styleValueArray.length>1){
				thisCurrentColor=styleValueArray[1];
			}
		}


		function setColorCell(event)
		{	
				setAttributes(this,{'style':'background-color:'+ thisCurrentColor});
		//		console.log('test');
		}


		function setErase(){
			thisCurrentColor='#ffffff';
		}

		function setClear(){
			var colorPickerGrid=document.getElementById('colorPanel');
			var colorCells=colorPickerGrid.getElementsByClassName('gridCell');

			for(var i=0;i<colorCells.length;i++){
				setAttributes(colorCells[i],{'style':'background-color:#ffffff'});
			}
		}

		function setColorPhaseTotalStep(cols,rows)
		{
			totalColorStep=parseInt(totalColors/((cols*rows)-1));
		}



/**************************************/
var drawHere=document.getElementById('pixelPainter');
var tableRows=20;
var tableCols=30;
var colorPicker=createGrid(tableRows,tableCols,{class:'gridCell'});
setColorPhaseTotalStep(tableRows,tableCols);

setAttributes(colorPicker,{id:'colorPicker'});
drawHere.appendChild(colorPicker);

setGetColorCellEvents();

var spaceDiv=document.createElement('div');
setAttributes(spaceDiv,{id:'spaceDiv'});
drawHere.appendChild(spaceDiv);

var colorPanel=createGrid(10,5,{class:'gridCell'});
setAttributes(colorPanel,{id:'colorPanel'});
drawHere.appendChild(colorPanel);

createButtons();
setColorPanel();

setColorCellEvents();

//getColorPhase(16,4);

//console.log(totalColorStep);
//console.log(currentColorInPicker);