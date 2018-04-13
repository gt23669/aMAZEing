window.onload = function () {
    console.log("JavaScript is working!");

    // const rows = prompt('Enter number of rows');
    //  if(rows == null || rows == ""){
    //     rows = 4;
    //  }else{

    //  }
    // const cols = prompt('Enter number of cols');
    // if(cols == null || cols == ""){
    //    cols = 4;
    //  }else{

    //  }

    const rows = 4;
    const cols = 4;
    const CS = 25; //cellsize
    var gridArr = [];
    var visitedCells = [];
    var numGridCells = rows * cols;

    genMazeArr(rows, cols);


    function genMazeArr(x, y) {
        for (var i = 0; i < y; i++) {
            gridArr[i] = [];
            visitedCells[i] = [];
            for (var j = 0; j < x; j++) {
                gridArr[i][j] = {
                    n: false,
                    e: false,
                    s: false,
                    w: false
                };
                visitedCells[i][j] = false;
            }
        }

    }
    function maze() {

        var currentCelly = Math.floor(Math.random()*y);
        var currentCellx = Math.floor(Math.random()*x);
        var currentCell = [currentCelly,currentCellx];
        var path = [currentCell];

        gridArr[currentCelly][currentCellx] = true;
        isVisited[randStart0][randStart1] = true;
        var visited = 1;
    }

    console.log(gridArr);




}