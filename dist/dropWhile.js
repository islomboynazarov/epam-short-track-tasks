System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function dropWhile(array, predicate) {
        let index = 0;
        for (let i = 0; i < array.length; i++) {
            if (!predicate(array[i], i, array)) {
                index = i;
                break;
            }
            index = i + 1;
        }
        const result = [];
        for (let i = index; i < array.length; i++) {
            result.push(array[i]);
        }
        return result;
    }
    exports_1("dropWhile", dropWhile);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=dropWhile.js.map