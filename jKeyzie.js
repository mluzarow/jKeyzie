/**
 * Image tag HTML generator.
 *
 * @param  {string}       source            Image source.
 * @param  {string|null}  [alternate=null]  Image alternative text.
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
