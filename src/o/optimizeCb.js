/* Used for function context binding.
 */

/* module
 * env: all
 * test: all
 */

/* typescript
 * export declare function optimizeCb(fn: Function, ctx: any, argCount?: number): Function;
 */

_('isUndef');

exports = function(fn, ctx, argCount) {
    if (isUndef(ctx)) return fn;

    switch (argCount == null ? 3 : argCount) {
        case 1:
            return function(val) {
                return fn.call(ctx, val);
            };
        case 3:
            return function(val, idx, collection) {
                return fn.call(ctx, val, idx, collection);
            };
        case 4:
            return function(accumulator, val, idx, collection) {
                return fn.call(ctx, accumulator, val, idx, collection);
            };
    }

    return function() {
        return fn.apply(ctx, arguments);
    };
};
