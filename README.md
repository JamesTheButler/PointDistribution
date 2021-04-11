# Algorithms for scattering 2D Points

*An implementation of different algorithms for scattering points in 2D.*

<a href="http://tom.ille-web.de/PointDistribution/index.html"> To the Project </a>

## Random
The points are randomly scattered across the image. The scatter is very uneven. There are large clumps of points and areas of very low point density.

## Randomized Grid
My Custom Algorithm. The image is discretized into a uniform grid. One point gets randomly placed within each cell. This scatter is overall much more even than the random scatter.  Points can still be generated close together in clumps of up to four points.

## Poisson-Disc Sampling
<a href="https://www.jasondavies.com/poisson-disc/"> Based on Jason Davies' implementation </a>
Poisson-Disc ensures a minimal distance between each point. Whenever a new point is considered, it is checked against its neighbours to ensure the minimal distance. To reduce the computational cost a grid is used in the background. New points then have to only be checked against close grid cells. This method produces a very even scatter without any clumps.

<p align="center">
<img src="/media/PointDistribution.gif">
</p>
