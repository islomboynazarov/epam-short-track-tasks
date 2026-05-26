System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function includes(array, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return true;
            }
        }
        return false;
    }
    exports_1("includes", includes);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=includes.js.map