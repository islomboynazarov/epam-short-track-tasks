System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function map(array, iteratee) {
        const result = [];
        for (let i = 0; i < array.length; i++) {
            result.push(iteratee(array[i], i));
        }
        return result;
    }
    exports_1("map", map);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=map.js.map