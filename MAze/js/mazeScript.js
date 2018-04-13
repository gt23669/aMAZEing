window.onload = function () {
    console.log("JavaScript is working!");

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

    const rows = 10;
    const cols = 10;
    const CS = 10; //cellsize
    var start = {};
    var end = {};
    var gridArr = [];

    function Coordinate(x, y) {
        this.x = x;
        this.y = y;
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
            console.log(gridArr[i]);
        }
    }
    genMazeArr();

    function selStart() {
        var startX;
        var starty;
        starty = Math.floor((Math.random()*(rows - 2)) + 1);
        startX = Math.floor((Math.random()*(cols - 2)) + 1);
        if (starty % 2 == 0) {
            starty = starty - 1;
        }
        if (startX % 2 == 0) {
            startX = startX - 1;
        }
        console.log(startX);
        console.log(starty);
        start = new Coordinate(startX, starty);
        gridArr[start.x][start.y] = 2;
    }
    selStart();
    for (var i = 0; i < cols; i++) {
        console.log(gridArr[i]);
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