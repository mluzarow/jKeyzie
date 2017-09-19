/**
 * Image tag HTML generator.
 *
 * @param  {string}       source     Image source.
 * @param  {string|null}  alternate  Image alternative text.
 *
 * @constructor
 */
function HTMLBuildImage (source, alternate = null) {
    /**
     * @var  {string}  source  Image source.
     */
    this.source = source;
    /**
     * @var  {string|null}  alternate  Image alternative text.
     */
    this.alternate = alternate;

    /**
     * HTML output builder.
     *
     * @return  {string}  HTML output.
     */
    this.render = function () {
        return (
            '<img ' +
                'src = "' + this.source + '"' +
                (this.alternate !== null ? ' alt = "' + this.alternate + '"': '') +
            ' />'
        );
    }
}

function Coordinate2D (x, y) {
    this.x = x;
    this.y = y;

    this.add = function (b) {
        return (new Coordinate2D (this.x + b.x, this.y + b.y));
    }

    this.sub = function (b) {
        return (new Coordinate2D (this.x - b.x, this.y - b.y));
    }

    this.distanceBetween = function (b) {
        return (
            Math.sqrt (
                Math.pow (this.x - b.x, 2) + Math.pow (this.y - b.y, 2)
            )
        );
    }

    this.slope = function (b) {
        return ((b.y - this.y) / (b.x - this.x));
    }

    this.toString = function () {
        return ('(' + x + ', ' + y + ')');
    }
}

function Plotter (containerElement, rows, columns) {
    this.containerElement = containerElement;
    this.rows = rows;
    this.columns = columns;

    var t = new Array ();

    for (i = 0; i < rows; i++) {
        t [i] = new Array ();

        for (k = 0; k < columns; k++) {
            t [i][k] = 0;
        }
    }

    this.plots = t;

    this.addPlot = function (plot, row, column) {
        this.plots [row][column] = plot;
    }

    this.newPlot = function (data) {
        return (new Plot ())
    }

    this.Plot = function () {

    }
}
