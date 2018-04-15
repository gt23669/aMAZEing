window.onload = function () {
    console.log("JavaScript is working!");
    var canvas = document.getElementById("mazecanvas");
    var ctx = canvas.getContext("2d");

    //     // const rows = prompt('Enter number of rows');
    //     //  if(rows == null || rows == ""){
    //     //     rows = 4;
    //     //  }else{

    //     //  }
    //     // const cols = prompt('Enter number of cols');
    //     // if(cols == null || cols == ""){
    //     //    cols = 4;
    //     //  }else{

    //     //  }

    const rows = 9;
    const cols = 9;
    const CS = 10; //cellsize
    var gridArr = [];
    var cCell = {};
    var start = {};
    var end = {};
    var trackPath = {};
    var visitedCells = [];
    var trackedPath = [];
    var visited = 0;

    function Coordinate(x, y, direction, visited) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.visited = visited;
    }

    function genMazeArr() {
        for (var i = 0; i < cols; i++) {
            gridArr[i] = [];
            for (var j = 0; j < rows; j++) {
                gridArr[i][j] = 1;
                if (j % 2 != 0 && i % 2 != 0) {
                    gridArr[i][j] = 0;
                }

            }
            // console.log(gridArr[i]);
        }
    }
    genMazeArr();

    function selStart() {
        var startx;
        var starty;
        starty = Math.floor((Math.random() * (rows - 2)) + 1);
        startx = Math.floor((Math.random() * (cols - 2)) + 1);
        if (starty % 2 == 0) {
            starty = starty - 1;
        }
        if (startx % 2 == 0) {
            startx = startx - 1;
        }
        cCell = new Coordinate(startx, starty, "", true);
        start = new Coordinate(startx, starty, "", true);
        console.log("x: " + cCell.x);
        console.log("y: " + cCell.y);
        gridArr[cCell.x][cCell.y] = 2;
        visitedCells.push([cCell.x, cCell.y]);
        trackedPath.push([cCell.x, cCell.y]);
        visited++;
        console.log("starting cell at: " + cCell.x + "," + cCell.y);
    }
    selStart();
    for (var i = 0; i < cols; i++) {
        console.log(gridArr[i]);
    }

    function path() {

        do{

            // while (true) {
                console.log("Start: "+start.x,start.y);
                console.log(trackedPath[0]);
                possPath();
                
                console.log("posspath length: " + posPath.length);
                if (posPath.length == 0) {
                    console.log("if hit");
                    // for(var i = 0;i<trackPath.length;i++){
                        //     console.log("tracked path: "+trackPath[i]);
                        
                        // }
                        if(trackedPath.length>1){
                            
                            trackedPath.pop();
                        }
                        var index = (trackedPath.length) - 1;
                        // posPath.push(trackedPath[index]);
                        posPath.push(new Coordinate(trackedPath[index][0], trackedPath[index][1], "", true));
                        // posPath.push(trackedPath[index][0]);
                        // posPath[0][0] = trackedPath[index][0];
                        // posPath[0][1] = trackedPath[index][1];
                        console.log(posPath[0].x);
                        console.log(posPath[0].y);
                        console.log(trackedPath[index][0]);
                        console.log(trackedPath[index][1]);
                    }
                    
                    var index = Math.floor(Math.random() * posPath.length);
                    console.log("index chosen is: " + index);
                    
                    gridArr[posPath[index].x][posPath[index].y] = 0;
                    var there = false;
                    for (var i = 0; i < visitedCells.length; i++) {
                        if (posPath[index].x == visitedCells[i][0] && posPath[index].y == visitedCells[i][1]) {
                            there = false;
                            break;
                        } else {
                            there = true;
                        }
                    }
                    if (there) {
                        visitedCells.push([posPath[index].x, posPath[index].y]);
                        trackedPath.push([posPath[index].x, posPath[index].y]);
                        visited++;
                        
                        
                    }
                    console.log("visitedX: " + [posPath[index].x]);
                    console.log("visitedY: " + [posPath[index].y]);
                    cCell.x = posPath[index].x;
                    cCell.y = posPath[index].y;
                    
                    
                    switch (posPath[index].direction) {
                        case "up":
                    gridArr[posPath[index].x + 1][posPath[index].y] = 0;
                    console.log("up")
                    break;
                    case "down":
                    gridArr[posPath[index].x - 1][posPath[index].y] = 0;
                    console.log("down")
                    break;
                    case "left":
                    gridArr[posPath[index].x][posPath[index].y + 1] = 0;
                    console.log("left")
                    break;
                    case "right":
                    gridArr[posPath[index].x][posPath[index].y - 1] = 0;
                    console.log("right")
                    break;
                }
                
                
                
                for (var i = 0; i < cols; i++) {
                    console.log(gridArr[i]);
                }
                
            // }
            if(trackedPath[(trackedPath.length)-1][0]==start.x&&trackedPath[(trackedPath.length)-1][1]==start.y){
                console.log("true");
                break;
            }else{
                console.log("false");
            }
        }while(true);
            console.log("exit while loop");
            
        }
        
        path();

    function possPath() {
        posPath = [];

        if (cCell.x - 2 >= 0 && gridArr[cCell.x - 2][cCell.y] == 0) { //up
            var good = false;
            for (var i = 0; i < visitedCells.length; i++) {
                if (cCell.x - 2 == visitedCells[i][0] && cCell.y == visitedCells[i][1]) {
                    good = false;
                    break;
                } else {
                    good = true;
                }
            }
            if (good) {
                posPath.push(new Coordinate(cCell.x - 2, cCell.y, "up", true));//up


            }
        }

        if (cCell.y + 2 < rows && gridArr[cCell.x][cCell.y + 2] == 0) { //right
            var good = false;
            for (var i = 0; i < visitedCells.length; i++) {
                if (cCell.x == visitedCells[i][0] && cCell.y + 2 == visitedCells[i][1]) {
                    good = false;
                    break;
                } else {
                    good = true;
                }
            }
            if (good) {
                posPath.push(new Coordinate(cCell.x, cCell.y + 2, "right", true));//right


            }
        }

        if (cCell.x + 2 < cols && gridArr[cCell.x + 2][cCell.y] == 0) { //down
            var good = false;
            for (var i = 0; i < visitedCells.length; i++) {
                if (cCell.x + 2 == visitedCells[i][0] && cCell.y == visitedCells[i][1]) {
                    good = false;
                    break;
                } else {
                    good = true;
                }
            }
            if (good) {
                posPath.push(new Coordinate(cCell.x + 2, cCell.y, "down", true));//down


            }
        }

        if (cCell.y - 2 >= 0 && gridArr[cCell.x][cCell.y - 2] == 0) { //left
            var good = false;
            for (var i = 0; i < visitedCells.length; i++) {
                if (cCell.x == visitedCells[i][0] && cCell.y - 2 == visitedCells[i][1]) {
                    good = false;
                    break;
                } else {
                    good = true;
                }
            }
            if (good) {
                posPath.push(new Coordinate(cCell.x, cCell.y - 2, "left", true));//left


            }
        }
    }


    //     // var visitedCells = [];
    //     // var numGridCells = rows * cols;

    //     // maze(cols, rows);


    //     // function genMazeArr(x, y) {
    //     //     for (var i = 0; i < x; i++) {
    //     //         gridArr[i] = [];
    //     //         visitedCells[i] = [];
    //     //         for (var j = 0; j < y; j++) {
    //     //             gridArr[i][j] = {
    //     //                 n: false,
    //     //                 e: false,
    //     //                 s: false,
    //     //                 w: false
    //     //             };
    //     //             visitedCells[i][j] = false;
    //     //         }
    //     //     }

    //     // }
    //     // function maze(x, y) {

    //     //     var currentCellx = Math.floor(Math.random() * x);
    //     //     var currentCelly = Math.floor(Math.random() * y);
    //     //     var currentCell = [currentCellx, currentCelly];
    //     //     var path = [currentCell];

    //     //     visitedCells[currentCellx][currentCelly] = true;
    //     //     var visited = 1;
    //     //     var runCount = 0;
    //     //     var a = 0;
    //     //     while (a<1){
    //     //         a++;
    //         // while (visited < numGridCells) {

    //             var posPath = [];

    //             // posPath = [[currentCellx - 1, currentCelly], //left
    //             // [currentCellx, currentCelly + 1], //down
    //             // [currentCellx + 1, currentCelly], //right
    //             // [currentCellx, currentCelly - 1]]; //up

    //             if(currentCellx - 1>=0){
    //                 posPath.push(new coordinate(currentCellx - 1, currentCelly));//left
    //             }
    //             if(currentCelly + 1<=y){
    //                 posPath.push(new coordinate(currentCellx, currentCelly + 1));//down

    //             }
    //             if(currentCellx + 1, currentCelly){
    //                 posPath.push(new coordinate(currentCellx + 1, currentCelly));//right

    //             }
    //             if(currentCellx, currentCelly - 1){
    //                 posPath.push(new coordinate(currentCellx, currentCelly - 1));//up

    //             }
    //             console.log(posPath[0])
    //             console.log(posPath[1])
    //             console.log(posPath[2])
    //             console.log(posPath[3])


    //             runCount++;
    //             // console.log(runCount);
    //             if (runCount > 20) {
    //                 // console.log(posPath);
    //                 console.log("Hit break statment")
    //                 break;
    //             }
    //             var choosePosPath = [];

    //             // for (var i = 0; i < 4; i++) {
    //             //     var corX = posPath[i][0];
    //             //     var cory = posPath[i][1];
    //             // }


    //         }
    //     }

    //     // console.log(gridArr);
    //     // console.log(visitedCells);
    //     // console.log(posPath);





}