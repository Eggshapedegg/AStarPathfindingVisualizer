# AStarPathfindingVisualizer
Simple project done in p5.js, that visualizes the A* patfinding algorithm.

cells.js visualizes the grid, and contains a function that calculates the cell's neighbors.

sketch.js contains the algorithm, and the visualization of the process.
From the start point (upper left corner) the algorithm will try to find its way to end point (bottom right corner),
with the most efficient path as possible.
Random "walls" are created all over the map, giving the algorithm a different challenge every time.
A no-solution outcome is also possible.

