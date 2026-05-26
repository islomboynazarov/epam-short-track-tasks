System.register(["./utils/objectUtils"], function (exports_1, context_1) {
    "use strict";
    var objectUtils_1;
    var __moduleName = context_1 && context_1.id;
    function merge(target, ...sources) {
        for (let i = 0; i < sources.length; i++) {
            const source = sources[i];
            const keys = objectUtils_1.getKeys(source);
            for (let j = 0; j < keys.length; j++) {
                const key = keys[j];
                target[key] = source[key];
            }
        }
        return target;
    }
    exports_1("merge", merge);
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
//# sourceMappingURL=merge.js.map