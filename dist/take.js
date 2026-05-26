System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function take(array, n = 1) {
        const result = [];
        const limit = Math.min(n, array.length);
        for (let i = 0; i < limit; i++) {
            result.push(array[i]);
        }
        return result;
    }
    exports_1("take", take);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=take.js.map