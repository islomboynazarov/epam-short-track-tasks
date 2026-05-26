System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function getKeys(obj) {
        const keys = [];
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                keys.push(key);
            }
        }
        return keys;
    }
    exports_1("getKeys", getKeys);
    function getValues(obj) {
        const values = [];
        const keys = getKeys(obj);
        for (let i = 0; i < keys.length; i++) {
            values.push(obj[keys[i]]);
        }
        return values;
    }
    exports_1("getValues", getValues);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=objectUtils.js.map