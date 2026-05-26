System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function drop(array, n = 1) {
        const result = [];
        for (let i = n; i < array.length; i++) {
            result.push(array[i]);
        }
        return result;
    }
    exports_1("drop", drop);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=drop.js.map