window.onload = function () {
    console.log("JavaScript is working!");
    var canvas = document.getElementById("mazecanvas");
    var ctx = canvas.getContext("2d");

    
    document.onkeydown = function (e) {
        // console.log(e.keyCode);
        if (e.keyCode == 65 || e.keyCode == 37) {
            // console.log("left");
            lastPlayerCell.y = playerCell.y;
            lastPlayerCell.x = playerCell.x;
            playerCell.x--;
            if (gridArr[playerCell.y][playerCell.x] === 1) {
                playerCell.x++;
            }
            // console.log("current cell: "+playerCell)
            // console.log("Last cell: "+lastPlayerCell)
            ctx.fillStyle = 'white';
            ctx.fillRect(CS * (lastPlayerCell.x), CS * (lastPlayerCell.y), CS, CS);
            ctx.fillStyle = 'purple';
            ctx.fillRect(CS * (playerCell.x), CS * (playerCell.y), CS, CS);
            ctx.fillStyle = 'green';
            ctx.fillRect(CS * (start.x), CS * (start.y), CS, CS);
            ctx.fillStyle = 'red';
            ctx.fillRect(CS * (end.x), CS * (end.y), CS, CS);
            redraw();
        } else if (e.keyCode == 68 || e.keyCode == 39) {
            // console.log("right");
            lastPlayerCell.y = playerCell.y;
            lastPlayerCell.x = playerCell.x;
            playerCell.x++;
            if (gridArr[playerCell.y][playerCell.x] === 1) {
                playerCell.x--;
            }
            // console.log("current cell: "+playerCell)
            // console.log("Last cell: "+lastPlayerCell)
            ctx.fillStyle = 'white';
            ctx.fillRect(CS * (lastPlayerCell.x), CS * (lastPlayerCell.y), CS, CS);
            ctx.fillStyle = 'purple';
            ctx.fillRect(CS * (playerCell.x), CS * (playerCell.y), CS, CS);
            ctx.fillStyle = 'green';
            ctx.fillRect(CS * (start.x), CS * (start.y), CS, CS);
            ctx.fillStyle = 'red';
            ctx.fillRect(CS * (end.x), CS * (end.y), CS, CS);

            redraw();
        } else if (e.keyCode == 87 || e.keyCode == 38) {
            // console.log("up");
            lastPlayerCell.y = playerCell.y;
            lastPlayerCell.x = playerCell.x;
            playerCell.y--;
            if (gridArr[playerCell.y][playerCell.x] === 1) {
                playerCell.y++;
            }
            // console.log("current cell: "+playerCell)
            // console.log("Last cell: "+lastPlayerCell)
            ctx.fillStyle = 'white';
            ctx.fillRect(CS * (lastPlayerCell.x), CS * (lastPlayerCell.y), CS, CS);
            ctx.fillStyle = 'purple';
            ctx.fillRect(CS * (playerCell.x), CS * (playerCell.y), CS, CS);
            ctx.fillStyle = 'green';
            ctx.fillRect(CS * (start.x), CS * (start.y), CS, CS);
            ctx.fillStyle = 'red';
            ctx.fillRect(CS * (end.x), CS * (end.y), CS, CS);

            redraw();
        } else if (e.keyCode == 83 || e.keyCode == 40) {
            // console.log("down");
            lastPlayerCell.y = playerCell.y;
            lastPlayerCell.x = playerCell.x;
            playerCell.y++;
            if (gridArr[playerCell.y][playerCell.x] === 1) {
                playerCell.y--;
            }
            // console.log("current cell: "+playerCell)
            // console.log("Last cell: "+lastPlayerCell)
            ctx.fillStyle = 'white';
            ctx.fillRect(CS * (lastPlayerCell.x), CS * (lastPlayerCell.y), CS, CS);
            ctx.fillStyle = 'purple';
            ctx.fillRect(CS * (playerCell.x), CS * (playerCell.y), CS, CS);
            ctx.fillStyle = 'green';
            ctx.fillRect(CS * (start.x), CS * (start.y), CS, CS);
            ctx.fillStyle = 'red';
            ctx.fillRect(CS * (end.x), CS * (end.y), CS, CS);

            redraw();
        }
    }
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
    var playerCell = {};
    var lastPlayerCell = {};

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

                if (gridArr[i][j] == 1) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(CS * i, CS * j, CS, CS);

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
        playerCell = new Coordinate(starty, startx);
        lastPlayerCell = new Coordinate(playerCell.y, playerCell.x);
        // console.log("x: " + cCell.x);
        // console.log("y: " + cCell.y);
        gridArr[cCell.y][cCell.x] = 2;
        visitedCells.push([cCell.y, cCell.x]);
        trackedPath.push([cCell.y, cCell.x]);
        visited++;
        // console.log("starting cell at: " + cCell.y + "," + cCell.x);
    }
    selStart();
    ctx.fillStyle = 'green';
    ctx.fillRect(CS * (start.x), CS * (start.y), CS, CS);
    for (var i = 0; i < cols; i++) {
        // console.log(gridArr[i]);
    }

    function path() {

        do {
            // console.log("Start: " + start.x, start.y);
            // console.log(trackedPath[0]);
            var posPath = possPath();
            // console.log("posspath length: " + posPath.length);
            if (posPath.length == 0) {
                // console.log("if hit");
                if (trackedPath.length > longestpath.length) {
                    longestpath = trackedPath.slice();
                    end = new Coordinate(longestpath[longestpath.length - 1][0], longestpath[longestpath.length - 1][1], "End", true, longestpath.length);
                    posEndingArr.push(end);
                    // console.log("endX: " + end.x);
                    // console.log("endY: " + end.y);
                }
                // console.log(visitedCells[endIndex]);
                if (trackedPath.length > 1) {
                    trackedPath.pop();
                }
                var index = (trackedPath.length) - 1;
                posPath.push(new Coordinate(trackedPath[index][0], trackedPath[index][1], "", true));
            }
            var index = Math.floor(Math.random() * posPath.length);
            // console.log("index chosen is: " + index);
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
            // console.log("visitedX: " + [posPath[index].x]);
            // console.log("visitedY: " + [posPath[index].y]);
            cCell.x = posPath[index].x;
            cCell.y = posPath[index].y;

            switch (posPath[index].direction) {
                case "up":
                    gridArr[posPath[index].y + 1][posPath[index].x] = 0;
                    ctx.fillStyle = 'white';
                    ctx.fillRect(CS * (posPath[index].x), CS * (posPath[index].y + 1), CS, CS);
                    // console.log("up")
                    break;
                case "down":
                    gridArr[posPath[index].y - 1][posPath[index].x] = 0;
                    ctx.fillStyle = 'white';
                    ctx.fillRect(CS * (posPath[index].x), CS * (posPath[index].y - 1), CS, CS);
                    // console.log("down")
                    break;
                case "left":
                    gridArr[posPath[index].y][posPath[index].x + 1] = 0;
                    ctx.fillStyle = 'white';
                    ctx.fillRect(CS * (posPath[index].x + 1), CS * (posPath[index].y), CS, CS);
                    // console.log("left")
                    break;
                case "right":
                    gridArr[posPath[index].y][posPath[index].x - 1] = 0;
                    ctx.fillStyle = 'white';
                    ctx.fillRect(CS * (posPath[index].x - 1), CS * (posPath[index].y), CS, CS);
                    // console.log("right")
                    break;
            }
            // for (var i = 0; i < cols; i++) {
            //     console.log(gridArr[i]);
            // }
            if (trackedPath[(trackedPath.length) - 1][0] == start.y && trackedPath[(trackedPath.length) - 1][1] == start.x) {
                // console.log("true");
                break;
            } else {
                // console.log("false");
            }
        } while (true);
        ctx.fillStyle = 'green';
        ctx.fillRect(CS * (start.x), CS * (start.y), CS, CS);
        ctx.fillStyle = 'red';
        ctx.fillRect(CS * (end.x), CS * (end.y), CS, CS);
        // console.log("exit while loop");
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

    function redraw() {
        gridArr[start.y][start.x] = 2;

        // for(var i = 0;i<numRowANDCol;i++){
        //     console.log(gridArr[i]);
        // }
        for (var j = 0; j < rows; j++) {
            for (var i = 0; i < cols; i++) {

                if (gridArr[j][i] == 1) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(i * CS, j * CS, CS, CS);
                }
            }
        }
    }

    document.getElementById("botButton").addEventListener("click", function(){bot();});
    
    function bot() {

        // document.getElementById("timer").innerHTML = "Timer: " ;

        for (var b = 0; longestpath.length > b; b++) {
            ctx.fillStyle = 'cyan';
            if (b == 0) {
                ctx.fillStyle = 'green';
                ctx.fillRect(longestpath[b][1] * CS, longestpath[b][0] * CS, CS, CS);
            } if (b == longestpath.length - 1) {
                ctx.fillStyle = 'red';
                ctx.fillRect(longestpath[b][1] * CS, longestpath[b][0] * CS, CS, CS);
            } else
                ctx.fillRect(longestpath[b][1] * CS, longestpath[b][0] * CS, CS, CS);
        }
    }

}
