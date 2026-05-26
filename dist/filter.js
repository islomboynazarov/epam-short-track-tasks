System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function filter(array, predicate) {
        const result = [];
        for (let i = 0; i < array.length; i++) {
            if (predicate(array[i], i, array)) {
                result.push(array[i]);
            }
        }
        return result;
    }
    exports_1("filter", filter);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=filter.js.map