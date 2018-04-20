window.onload = function () {
    console.log("JavaScript is working!");
    var canvas = document.getElementById("mazecanvas");
    var ctx = canvas.getContext("2d");



    // const rows = prompt('Enter number of rows.');
    //  if(rows == null || rows == ""){
    //     rows = 9;
    //  }else{
    //      rows = (rows*2)+1;

    //  }
    // const cols = prompt('Enter number of cols');
    // if(cols == null || cols == ""){
    //    cols = 9;
    //  }else{
    //     cols = (cols*2)+1
    //  }
    // var mazeWidthANDHeight = prompt('Enter maze size');
    // if(mazeWidthANDHeight == null || mazeWidthANDHeight == ""){
    //     mazeWidthANDHeight = 1000;
    // }
    // document.getElementById('mazecanvas').width = mazeWidthANDHeight;
    // document.getElementById('mazecanvas').height = mazeWidthANDHeight;
    var numRowANDCol = prompt('Enter number of rows and cols. Must be an odd number');
    if (numRowANDCol == null || numRowANDCol == "") {
        numRowANDCol = 7;
    } else if (numRowANDCol % 2 == 0) {
        numRowANDCol = parseInt(numRowANDCol, 10);
        numRowANDCol = numRowANDCol + 1;
        numRowANDCol = String(numRowANDCol);

    }
    const rows = numRowANDCol;
    const cols = numRowANDCol;
    const CS = 700 / rows; //cellsize
    var gridArr = [];
    var cCell = {};
    var start = {};
    var end;
    var endIndex = 0;
    var trackPath = {};
    var visitedCells = [];
    var trackedPath = [];
    var visited = 0;
    var posEndingArr = [];
    var longestpath = [];

    function Coordinate(y, x, direction, visited, distance) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.visited = visited;
        this.distance = distance;
    }

    function genMazeArr() {
        for (var i = 0; i < cols; i++) {
            gridArr[i] = [];
            for (var j = 0; j < rows; j++) {
                gridArr[i][j] = 1;
                if (i % 2 != 0 && j % 2 != 0) {
                    gridArr[i][j] = 0;
                }

            }

        }
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                // if (i == 9) {
                //     break;
                // }
                if (gridArr[i][j] == 1) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(CS*i, CS*j, CS, CS);

                }
            }
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
        cCell = new Coordinate(starty, startx, "", true);
        start = new Coordinate(starty, startx, "", true, 0);
        console.log("x: " + cCell.x);
        console.log("y: " + cCell.y);
        gridArr[cCell.y][cCell.x] = 2;
        visitedCells.push([cCell.y, cCell.x]);
        trackedPath.push([cCell.y, cCell.x]);
        visited++;
        console.log("starting cell at: " + cCell.y + "," + cCell.x);
    }
    selStart();
    ctx.fillStyle = 'green';
    ctx.fillRect(CS * (start.x), CS * (start.y), CS, CS);
    for (var i = 0; i < cols; i++) {
        console.log(gridArr[i]);
    }

    function path() {

        do {


            console.log("Start: " + start.x, start.y);
            console.log(trackedPath[0]);
            var posPath = possPath();

            console.log("posspath length: " + posPath.length);
            if (posPath.length == 0) {

                console.log("if hit");
                if (trackedPath.length > longestpath.length) {
                    longestpath = trackedPath.slice();
                    end = new Coordinate(longestpath[longestpath.length - 1][0], longestpath[longestpath.length - 1][1], "End", true, longestpath.length);
                    posEndingArr.push(end);
                    console.log("endX: " + end.x);
                    console.log("endY: " + end.y);
                }

                //if visistedCell.length > end.distance
                // update end
                console.log(visitedCells[endIndex]);
                // if (endIndex < trackedPath.length - 1) {
                //     endIndex = trackedPath.length - 1;
                //     end.x = visitedCells[endIndex][0];
                //     end.y = visitedCells[endIndex][1];
                //     console.log("endX: "+end.x);
                //     console.log("endY: "+end.y);
                // }
                if (trackedPath.length > 1) {

                    trackedPath.pop();
                }
                var index = (trackedPath.length) - 1;
                // posPath.push(trackedPath[index]);
                posPath.push(new Coordinate(trackedPath[index][0], trackedPath[index][1], "", true));
                // console.log("possX: "+posPath[0].x);
                // console.log(posPath[0].y);
                // console.log(trackedPath[index][0]);
                // console.log(trackedPath[index][1]);
            }

            var index = Math.floor(Math.random() * posPath.length);
            console.log("index chosen is: " + index);

            gridArr[posPath[index].y][posPath[index].x] = 0;
            var there = false;
            for (var i = 0; i < visitedCells.length; i++) {
                if (posPath[index].y == visitedCells[i][0] && posPath[index].x == visitedCells[i][1]) {
                    there = false;
                    break;
                } else {
                    there = true;
                }
            }
            if (there) {
                visitedCells.push([posPath[index].y, posPath[index].x]);
                trackedPath.push([posPath[index].y, posPath[index].x]);
                visited++;


            }
            console.log("visitedX: " + [posPath[index].x]);
            console.log("visitedY: " + [posPath[index].y]);
            cCell.x = posPath[index].x;
            cCell.y = posPath[index].y;


            switch (posPath[index].direction) {
                case "up":
                    gridArr[posPath[index].y+1][posPath[index].x] = 0;
                    ctx.fillStyle = 'white';
                    ctx.fillRect(CS * (posPath[index].x), CS * (posPath[index].y+1), CS, CS);
                    // ctx.fillRect(CS * (posPath[index].y-1), CS * (posPath[index].x), CS, CS);
                    console.log("up")
                    break;
                case "down":
                    gridArr[posPath[index].y-1][posPath[index].x] = 0;
                    ctx.fillStyle = 'white';
                    ctx.fillRect(CS * (posPath[index].x), CS * (posPath[index].y-1), CS, CS);
                    // ctx.fillRect(CS * (posPath[index].y+1), CS * (posPath[index].x), CS, CS);
                    console.log("down")
                    break;
                case "left":
                    gridArr[posPath[index].y][posPath[index].x+1] = 0;
                    ctx.fillStyle = 'white';
                    ctx.fillRect(CS * (posPath[index].x+1), CS * (posPath[index].y), CS, CS);
                    // ctx.fillRect(CS * (posPath[index].y), CS * (posPath[index].x-1), CS, CS);
                    console.log("left")
                    break;
                case "right":
                    gridArr[posPath[index].y][posPath[index].x-1] = 0;
                    ctx.fillStyle = 'white';
                    ctx.fillRect(CS * (posPath[index].x-1), CS * (posPath[index].y), CS, CS);
                    // ctx.fillRect(CS * (posPath[index].x+1), CS * (posPath[index].x+1), CS, CS);
                    console.log("right")
                    break;
            }



            for (var i = 0; i < cols; i++) {
                console.log(gridArr[i]);
            }

            // }
            if (trackedPath[(trackedPath.length) - 1][0] == start.y && trackedPath[(trackedPath.length) - 1][1] == start.x) {
                console.log("true");
                break;
            } else {
                console.log("false");
            }
        } while (true);
        ctx.fillStyle = 'green';
        ctx.fillRect(CS * (start.x), CS * (start.y), CS, CS);
        ctx.fillStyle = 'red';
        ctx.fillRect(CS * (end.x), CS * (end.y), CS, CS);
        console.log("exit while loop");
        
    }
   

    path();

    redraw();

    function possPath() {
        var posPath = [];

        if (cCell.y - 2 >= 0 && gridArr[cCell.y - 2][cCell.x] == 0) { //up
            var good = false;
            for (var i = 0; i < visitedCells.length; i++) {
                if (cCell.y - 2 == visitedCells[i][0] && cCell.x == visitedCells[i][1]) {
                    good = false;
                    break;
                } else {
                    good = true;
                }
            }
            if (good) {
                posPath.push(new Coordinate(cCell.y - 2, cCell.x, "up", true));//up
            }
        }
        if (cCell.x + 2 < numRowANDCol && gridArr[cCell.y][cCell.x + 2] == 0) { //right
            var good = false;
            for (var i = 0; i < visitedCells.length; i++) {
                if (cCell.y == visitedCells[i][0] && cCell.x + 2 == visitedCells[i][1]) {
                    good = false;
                    break;
                } else {
                    good = true;
                }
            }
            if (good) {
                posPath.push(new Coordinate(cCell.y, cCell.x + 2, "right", true));//right


            }
        }
        if (cCell.y + 2 < numRowANDCol && gridArr[cCell.y + 2][cCell.x] == 0) { //down
            var good = false;
            for (var i = 0; i < visitedCells.length; i++) {
                if (cCell.y + 2 == visitedCells[i][0] && cCell.x == visitedCells[i][1]) {
                    good = false;
                    break;
                } else {
                    good = true;
                }
            }
            if (good) {
                posPath.push(new Coordinate(cCell.y + 2, cCell.x, "down", true));//down
            }
        }
        if (cCell.x - 2 >= 0 && gridArr[cCell.y][cCell.x - 2] == 0) { //left
            var good = false;
            for (var i = 0; i < visitedCells.length; i++) {
                if (cCell.y == visitedCells[i][0] && cCell.x - 2 == visitedCells[i][1]) {
                    good = false;
                    break;
                } else {
                    good = true;
                }
            }
            if (good) {
                posPath.push(new Coordinate(cCell.y, cCell.x - 2, "left", true));//left


            }
        }
        return posPath;
    }
    function colorBorder() {
        // for(var i = 0;i<rows;i++){
        //     for(var j = 0;j<cols;j++){
        //         if(gridArr[i][j]==1){
                    
        //         }
                
        //     }
        // }
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 63 * rows, 63);
        ctx.fillRect(0, 0, 63, 63 * cols);
        ctx.fillRect(0, 504, 63 * rows, 63);
        ctx.fillRect(504, 0, 63, 63 * cols);
    }
    // function colorWalls() {
    //     ctx.fillStyle = 'black';
    //     var a = 126;
    //     for (var i = 0; i < 6; i++) {
    //         ctx.fillRect(a, 63, 63, 63);
    //         a = a * 2;
    //     }
    //     // ctx.fillRect(126,63,63,63);
    //     // ctx.fillRect(252,63,63,63);
    //     // ctx.fillRect(378,63,63,63);
    // }
    // function colorNodes() {
    //     ctx.fillStyle = 'blue';
    //     ctx.fillRect(63, 63, 63, 63);
    // }
    // colorBorder();
    // colorWalls();
    // colorNodes();
    function redraw(){
        gridArr[start.y][start.x] = 2;
    
        // for (var i = 0; i < cols; i++) {
        //     gridArr[i] = [];
        //     for (var j = 0; j < rows; j++) {
        //         gridArr[i][j] = 1;
        //         if (j % 2 != 0 && i % 2 != 0) {
        //             gridArr[i][j] = 0;
        //         }
    
        //     }
    
        // }
        // for(var i = 0;i<numRowANDCol;i++){
            console.log(gridArr);
        // }
        for (var j = 0; j < cols; j++) {
            for (var i = 0; i < rows; i++) {
                // if (i == 9) {
                //     break;
                // }
                if (gridArr[j][i] == 1) {
                    ctx.fillStyle = 'blue';
                    ctx.fillRect(i * CS, j * CS, CS, CS);
    
                }
            }
        }
        // for (var i = 0; i < rows; i++) {
        //     for (var j = 0; j < cols; j++) {
        //         // if (i == 9) {
        //         //     break;
        //         // }
        //         if (gridArr[j][i] == 1) {
        //             ctx.fillStyle = 'black';
        //             ctx.fillRect(j * CS, i * CS, CS, CS);

        //         }
        //     }
        // }
    }
}