window.onload = function () {
    console.log("JavaScript is working!");

    const SIZE = 4;
    const CELL_SIZE = 25;

    var selectedX = 0;
    var selectedy = 0;

    document.onkeydown = function(e){
        console.log(e.keyCode);
        if(e.keyCode == 37){
            console.log("left");
            selectedX--;
            if(selectedX<0){
                selectedX++;
            }
            redrawGrid();
        }else if(e.keyCode == 39){
            console.log("right");
            selectedX++;
            if(selectedX>SIZE-1){
                selectedX--;
            }
            redrawGrid();
        }else if(e.keyCode == 38){
            console.log("up");
            selectedy--;
            if(selectedy<0){
                selectedy++;
            }
            redrawGrid();
        }else if(e.keyCode == 40){
            console.log("down");
            selectedy++;
            if(selectedy>SIZE-1){
                selectedy--;
            }
            redrawGrid();
        }
    }

    var myGrid = [];


    for (var y = 0; y < SIZE; y++) {
        myGrid[y] = [];
        for (var x = 0; x < SIZE; x++) {
            myGrid[y][x] = y + " , " + x;
        }
    }

    console.log(myGrid);

    function redrawGrid(){

        var gridDiv = document.getElementById("gridDiv");
        gridDiv.innerHTML = "";
        
        
        for (var y = 0; y < SIZE; y++) {
            var newRow = document.createElement("div");
            for (var x = 0; x < SIZE; x++) {
                var newCell = document.createElement("div");
                
                newCell.style.height = CELL_SIZE+"px";
                newCell.style.width = CELL_SIZE+"px";
                newCell.style.backgroundColor = "silver";
                newCell.style.display = "inline-block"
                newCell.style.border = "solid 1px black";
                
                newCell.textContent = y + "," + x;

                if(selectedX == x && selectedy == y){
                    newCell.style.border = "solid 1px red";
                }
                
                newRow.appendChild(newCell);
            }
            gridDiv.appendChild(newRow);
        }
        
    }
    redrawGrid();
}