System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function find(array, predicate) {
        for (let i = 0; i < array.length; i++) {
            if (predicate(array[i], i, array)) {
                return array[i];
            }
        }
        return undefined;
    }
    exports_1("find", find);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=find.js.map