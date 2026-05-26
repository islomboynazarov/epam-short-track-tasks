System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function pick(object, ...paths) {
        const result = {};
        for (let i = 0; i < paths.length; i++) {
            const key = paths[i];
            if (key in object) {
                result[key] = object[key];
            }
        }
        return result;
    }
    exports_1("pick", pick);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=pick.js.map