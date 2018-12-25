/* A tiny JavaScript debugging utility.
 *
 * |Name  |Type    |Desc                           |
 * |------|--------|-------------------------------|
 * |name  |string  |Namespace                      |
 * |return|function|Function to print decorated log|
 */

/* example
 * var d = debug('test');
 * d('doing lots of uninteresting work');
 * d.enabled = false;
 */

/* module
 * env: all
 * test: all
 */

/* typescript
 * export declare function debug(name: string): any;
 */

_('toArr now format ms isBrowser strHash');

exports = function(name) {
    var prevTime;

    function debug() {
        if (!debug.enabled) return;

        var args = toArr(arguments);

        var cur = now(),
            duration = ms(cur - (prevTime || cur));
        prevTime = cur;

        var content = format.apply(null, args);

        /* eslint-disable no-console */
        if (isBrowser) {
            var style = 'color:' + debug.color,
                inherit = 'color:inherit';
            console.log(
                '%c' + name + ' %c' + content + ' %c+' + duration,
                style,
                inherit,
                style
            );
        } else {
            console.log(name + ': ' + content + ' +' + duration);
        }
    }

    debug.enabled = true;
    if (isBrowser) debug.color = selectColor(name);

    return debug;
};

var colors = [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33'
];

function selectColor(name) {
    return colors[strHash(name) % colors.length];
}