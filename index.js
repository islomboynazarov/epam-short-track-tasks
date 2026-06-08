"use strict";
class TrieNode {
    constructor() {
        this.children = new Map();
        this.words = [];
    }
}
class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    insert(word) {
        let node = this.root;
        const lowerWord = word.toLowerCase();
        for (const char of lowerWord) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.words.push(word);
    }
    search(prefix) {
        if (!prefix) {
            return [];
        }
        const lowerPrefix = prefix.toLowerCase();
        let node = this.root;
        for (const char of lowerPrefix) {
            if (!node.children.has(char)) {
                return [];
            }
            node = node.children.get(char);
        }
        const results = [];
        this.collect(node, results);
        return results.sort();
    }
    collect(node, results) {
        for (const word of node.words) {
            results.push(word);
        }
        for (const child of node.children.values()) {
            this.collect(child, results);
        }
    }
}
//# sourceMappingURL=index.js.map