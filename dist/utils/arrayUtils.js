System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function forEach(array, iteratee) {
        for (let i = 0; i < array.length; i++) {
            iteratee(array[i], i, array);
        }
    }
    exports_1("forEach", forEach);
    function filterArray(array, predicate) {
        const result = [];
        for (let i = 0; i < array.length; i++) {
            if (predicate(array[i], i)) {
                result.push(array[i]);
            }
        }
        return result;
    }
    exports_1("filterArray", filterArray);
    function mapArray(array, iteratee) {
        const result = [];
        for (let i = 0; i < array.length; i++) {
            result.push(iteratee(array[i], i));
        }
        return result;
    }
    exports_1("mapArray", mapArray);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=arrayUtils.js.map