Student: Islom
Task: TS-Custom-Lodash
Date: May 27, 2026

Developer’s Diary
In this task, I implemented a custom version of Lodash using TypeScript while strictly following all constraints — no Array.prototype.* or Object.prototype.* methods and no any type. I began by creating reusable utilities in the utils folder (forEach, filterArray, mapArray, and getKeys) and defined shared types in types.ts to maximize code reuse. Generics were used extensively across functions like filter<T>, map<T,U>, and pick<T,K> to ensure strong type safety. The biggest challenges were implementing dropWhile, zip, and object functions (pick/omit/pickBy) without built-in methods, which I solved using manual for loops and careful type handling. I learned a lot about strict TypeScript configuration, functional programming concepts, and the importance of clean code structure. Overall, the project helped me deeply understand generics, higher-order functions, and working under strict constraints.