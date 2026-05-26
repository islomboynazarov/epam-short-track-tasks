System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function chunk(array, size = 1) {
        if (size < 1 || !array.length)
            return [];
        const result = [];
        let temp = [];
        for (let i = 0; i < array.length; i++) {
            temp.push(array[i]);
            if (temp.length === size || i === array.length - 1) {
                result.push(temp);
                temp = [];
            }
        }
        return result;
    }
    exports_1("chunk", chunk);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=chunks.js.map