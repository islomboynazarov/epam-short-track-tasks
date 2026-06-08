class TrieNode {
  readonly children: Map<string, TrieNode> = new Map();
  words: string[] = [];
}

class Trie {
  private readonly root: TrieNode = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    const lowerWord = word.toLowerCase();
    for (const char of lowerWord) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.words.push(word);
  }

  search(prefix: string): string[] {
    if (!prefix) {
      return [];
    }
    const lowerPrefix = prefix.toLowerCase();
    let node = this.root;
    for (const char of lowerPrefix) {
      if (!node.children.has(char)) {
        return [];
      }
      node = node.children.get(char)!;
    }
    const results: string[] = [];
    this.collect(node, results);
    return results.sort();
  }

  private collect(node: TrieNode, results: string[]): void {
    for (const word of node.words) {
      results.push(word);
    }
    for (const child of node.children.values()) {
      this.collect(child, results);
    }
  }
}

function createAutoComplete(data: string[]): (prefix: string) => string[] {
  const trie = new Trie();
  for (const word of data) {
    trie.insert(word);
  }
  return (prefix: string): string[] => trie.search(prefix);
}

export { createAutoComplete };