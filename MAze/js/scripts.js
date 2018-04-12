window.onload = function () {
    console.log("JavaScript is working!");
    
    var canvas = document.getElementById("mazecanvas");
    var ctx = canvas.getContext("2d");
    // ctx.fillStyle = "black";
    // ctx.fillRect(0,0,500,500);
    
    const SIZE = 4;
    const CELL_SIZE = 25;
    newMaze(SIZE,SIZE);

    function newMaze(SIZEx,SIZEy){
        var totalCells = SIZEx*SIZEy;
        var myGrid = [];
        var isVisited = [];

        for (var y = 0; y < SIZEy; y++) {
            myGrid[y] = [];
            isVisited[y] = [];
            for (var x = 0; x < SIZEx; x++) {
                myGrid[y][x] = [0,0,0,0]
                isVisited[y][x] = false;
            }
        }
        var randStart = [Math.floor(Math.random()*SIZEy), Math.floor(Math.random()*SIZEx)];
        var randStart0 = randStart[0];
        var randStart1 = randStart[1];
        var path = [randStart];
        isVisited[randStart0][randStart1] = true;
        var visited = 1;

        while(visited<totalCells){
            var potential = [[randStart0-1, randStart1,0,2],
                            [randStart0, randStart1+1,1,3],
                             [randStart0+1,randStart1,2,0],
                             [randStart0, randStart1-1,3,1]];

            var nextCell = [];

            for(var i = 0; i <4;i++){
                var pos1 = potential[i][0];
                var pos2 = potential[i][1];
                var VisitedPOS = isVisited[pos1][pos2];
                console.log("VisitedPOS = "+VisitedPOS);
                if(potential[i][0]>-1 && potential[i][0]<SIZEy && potential[i][1]>-1 && potential[i][1]<SIZEx){
                    if(isVisited[pos1][pos2]==false){

                        nextCell.push(potential[i]);
                    } 
                    

                
                }
            }
            if(nextCell.length){
                var next = nextCell[Math.floor(Math.random()*nextCell.length)];
                myGrid[randStart0][randStart1][next[2]] = 1;
                myGrid[next[0]][next[1]][next[3]] = 1;
                isVisited[next[0]][next[1]] = true;
                visited++;
                randStart = [next[0],next[1]];
                path.push(randStart);
            }else{
                randStart = path.pop();
            }
        }

        return myGrid;

    }
    console.log(myGrid);

    // var selectedX = 0;
    // var selectedy = 0;





    // function redrawGrid(){

    //     var gridDiv = document.getElementById("gridDiv");
    //     gridDiv.innerHTML = "";
        
        
        // for (var y = 0; y < SIZE; y++) {
        //     var newRow = document.createElement("div");
        //     for (var x = 0; x < SIZE; x++) {
        //         var newCell = document.createElement("div");
                
        //         newCell.style.height = CELL_SIZE+"px";
        //         newCell.style.width = CELL_SIZE+"px";
        //         newCell.style.backgroundColor = "silver";
        //         newCell.style.display = "inline-block"
        //         newCell.style.border = "solid 1px black";
                
        //         newCell.textContent = y + "," + x;

        //         if(selectedX == x && selectedy == y){
        //             newCell.style.border = "solid 1px red";
        //         }
                
        //         newRow.appendChild(newCell);
        //     }
        //     gridDiv.appendChild(newRow);
        // }
        
    // }
    // redrawGrid();
}