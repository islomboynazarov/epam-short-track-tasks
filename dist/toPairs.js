System.register(["./utils/objectUtils"], function (exports_1, context_1) {
    "use strict";
    var objectUtils_1;
    var __moduleName = context_1 && context_1.id;
    function toPairs(object) {
        const result = [];
        const keys = objectUtils_1.getKeys(object);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            result.push([key, object[key]]);
        }
        return result;
    }
    exports_1("toPairs", toPairs);
    return {
        setters: [
            function (objectUtils_1_1) {
                objectUtils_1 = objectUtils_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=toPairs.js.map