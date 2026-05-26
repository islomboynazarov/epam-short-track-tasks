System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function compact(array) {
        const result = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i] !== null && array[i] !== undefined && array[i] !== false && array[i] !== 0 && array[i] !== "") {
                result.push(array[i]);
            }
        }
        return result;
    }
    exports_1("compact", compact);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=compact.js.map