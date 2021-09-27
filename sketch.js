function removeFromArray(arr, elt) 
{
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

// Calculates the distance between start and end
function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  // var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

// Size of the grid
var cols = 50;
var rows = 50;

var grid = new Array(cols);

var openSet = [];
var closedSet = [];

var start;
var end;

// Width and height of each cell of grid
var w, h;

var path = [];

function setup() {
  createCanvas(400, 400);
  console.log('A*');

  w = width / cols;
  h = height / rows;

  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new cell(i, j);
    }
  }

  // Gets the neighbors
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }
  
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;

  openSet.push(start);
}

function draw() {

  // Checks if the algorithm is still searching
  if (openSet.length > 0) {

    var nextStep = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[nextStep].f) {
        nextStep = i;
      }
    }
    var current = openSet[nextStep];

    if (current === end) {
      noLoop();
      console.log("DONE!");
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    // Check all the neighbors
    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      // Checks if next spot is valid
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + heuristic(neighbor, current);

        // Check if this is the best path
        var newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        // If yes
        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }

    }
    // In the event that there is no path to the end
  } else {
    console.log('no solution');
    noLoop();
    return;
  }

  background(255);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
  
  //colors searched tiles
  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(0, 255, 0, 75));
  }
  
  //colors open tiles
  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 255, 50));
  }

  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  // Draws the path
  noFill();
  stroke(255, 0, 100);
  strokeWeight(w / 5);
  beginShape();
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
  }
  endShape();



}