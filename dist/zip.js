System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function zip(...arrays) {
        if (arrays.length === 0)
            return [];
        let maxLength = 0;
        for (let i = 0; i < arrays.length; i++) {
            if (arrays[i].length > maxLength)
                maxLength = arrays[i].length;
        }
        const result = [];
        for (let i = 0; i < maxLength; i++) {
            const group = [];
            for (let j = 0; j < arrays.length; j++) {
                group.push(arrays[j][i]);
            }
            result.push(group);
        }
        return result;
    }
    exports_1("zip", zip);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=zip.js.map