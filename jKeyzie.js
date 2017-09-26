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

/**
 * A coordinate pair (x, y) on a cartesian plane.
 *
 * @param  {float} x X-axis value.
 * @param  {float} y Y-axis value.
 *
 * @constructor
 */
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

    this.Plot = function (data, Xmax = null, Xmin = null, Ymax = null, Ymin = null) {
        this.data = data;
        this.Xmax = Xmax;
        this.Xmin = Xmin;
        this.Xdelta = 0;
        this.Ymax = Ymax;
        this.Ymin = Ymin;
        this.Ydelta = 0;

        this.findAxisSpacing = function () {
            // Grab all x values and sort them
            var Xvalues = new Array ();
            var Yvalues = new Array ();
            for (var i = 0; i < this.data.length; i++) {
                Xvalues [i] = this.data [i].x;
                Yvalues [i] = this.data [i].y;
            }
            Xvalues.sort ();
            Yvalues.sort ();

            if (this.Xmin == null) {
                this.Xmin = Xvalues [0];
            }
            if (this.Xmax == null) {
                this.Xmax = Xvalues [Xvalues.length - 1];
            }
            if (this.Ymin == null) {
                this.Ymin = Yvalues [0];
            }
            if (this.Ymax == null) {
                this.Ymax = Yvalues [Yvalues.length - 1];
            }
        }

        this.findAxisSpacing ();
    }

    /**
     * Create a new Plot.
     *
     * @param  {Array}  data  Array of data in the form of coordinates
     *
     * @return  {Plot}  The created Plot.
     */
    this.newPlot = function (data) {
        return (new Plot (data))
    }

    /**
     * Add a plot to the plotter layout in the given slot.
     *
     * @param  {Plot}  plot    The plot to be added.
     * @param  {int}   row     The row into which the plot should be inserted.
     * @param  {int}   column  The column into which the plot should be inserted.
     */
    this.addPlot = function (plot, row, column) {
        this.plots [row][column] = plot;
    }
}
