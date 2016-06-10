var expect=chai.expect;

describe('createGrid', function () {
    it('should be a function',function(){
        console.log('In should ONLY');
        expect(createGrid).to.be.a('function');
        expect(createGrid).to.be.an.instanceof(Function);
    });
});

describe('rows', function () {
    it('should be a valid non-negative number',function(){
        expect(createGrid.bind(null)).to.throw(Error);  //'no argument'
        console.log('1');
        expect(createGrid.bind(null,{})).to.throw(Error);
        console.log('1');
        expect(createGrid.bind(null,-1)).to.throw(Error);
        console.log('1');
        expect(createGrid.bind(null,1)).to.not.throw(Error);
        console.log('1');
    });

    it('should return an HTMLElement',function(){
        var thiscreateGrid=createGrid(2);

        var thisElement=thiscreateGrid.nodeName;
        if(typeof(thisElement)=='string')
        {
            thisElement=thisElement.toLowerCase();
        }
        expect(thisElement).equal('section');
    })

    it('should ONLY accept number child',function(){
    	console.log('In should ONLY child');
        expect(createGrid(1).children.length).to.equal(1);
        expect(createGrid(10).children.length).to.equal(10);
    });
});

describe('columns', function () {
    it('Columns should equal Row 1',function(){
        var rows=createGrid(1).children;
        var rowCols=rows[0].children;
        expect(rowCols.length).to.equal(1);
        console.log('1');
    });

        it('Columns should equal Row 10',function(){
        var rows=createGrid(10).children;
        var rowCols=rows[0].children;
        expect(rowCols.length).to.equal(10);
        console.log('1');
    });

        it('Columns should equal Row 10',function(){
        var rows=createGrid(1,10).children;
        var rowCols=rows[0].children;
        expect(rowCols.length).to.equal(10);
        console.log('1');
    });

        it('Columns should equal Row 10',function(){
        var rows=createGrid(10,5).children;
        var rowCols=rows[0].children;
        expect(rowCols.length).to.equal(5);
        console.log('1');
    });
});

describe('attributes No Column provided', function () {
    it('Columns should equal Row 1',function(){

        var rows=createGrid(1,{}).children;
        var rowCols=rows[0].children;
        expect(rowCols.length).to.equal(1);

        var attrs=rowCols[0].attributes;

        expect(attrs.length).to.equal(0);
        console.log('1');
    });

        it('Columns should HTML element with 10 rows, 10 columns and class "grid"',function(){

        var rows=createGrid(10,{'class':'grid'}).children;
        var rowCols=rows[0].children;

        expect(rows.length).to.equal(10);
        expect(rowCols.length).to.equal(10);

        var isClassGrid=true;

        for(var i=0;i<rows.length;i++){
            var rowCols=rows[i].children;
            for(var j=0;j<rowCols.length;j++){
                var attrName=rowCols[j].getAttribute('class');
                expect(attrName).to.equal('grid');
            }
        }
    });

    it('Columns should HTML element with 10 rows, 10 columns and class "grid" and style:',function(){

        var rows=createGrid(10,{'class':'grid', 'style': 'background-color: black'}).children;
        var rowCols=rows[0].children;

        expect(rows.length).to.equal(10);
        expect(rowCols.length).to.equal(10);

        var isClassGrid=true;

        for(var i=0;i<rows.length;i++){
            var rowCols=rows[i].children;
            for(var j=0;j<rowCols.length;j++){
                var attrClass=rowCols[j].getAttribute('class');
                expect(attrClass).to.equal('grid');
                var attrClass=rowCols[j].getAttribute('style');
                expect(attrClass).to.equal('background-color: black');
            }
        }
    });
});

describe('attributes Column provided', function () {
    it('Columns should return class of grid',function(){

        var rows=createGrid(10,5,{'class':'grid'}).children;
        var rowCols=rows[0].children;

        expect(rows.length).to.equal(10);
        expect(rowCols.length).to.equal(5);

        var isClassGrid=true;

        for(var i=0;i<rows.length;i++){
            var rowCols=rows[i].children;
            for(var j=0;j<rowCols.length;j++){
                var attrClass=rowCols[j].getAttribute('class');
                expect(attrClass).to.equal('grid');
            }
        }
    });
});

/*

        var rows=createGrid(1,{}).children;
        var rowCols=rows[0].children;
        expect(rowCols.length).to.equal(1);

        var attrs=rowCols[0].attributes;

        expect(attrs).to.be(null);
        console.log('1');

        */