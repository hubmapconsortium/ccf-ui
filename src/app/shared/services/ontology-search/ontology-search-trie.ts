import { Ontology } from './ontology-search.service';

class TrieNode {
  ontology: Ontology;
  children: Map<string, TrieNode> = new Map<string, TrieNode>();
}

export class OntologySearchTrie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string, ontology: Ontology): void {
    let cur: TrieNode = this.root;
    for (let i = 0; i < word.length; i++) {
      const c = word.charAt(i);
      if (!cur.children.get(c)) {
        // insert a new node if the path does not exist
        const k = new TrieNode();
        k.ontology = ontology;
        cur.children.set(c, k);
      }
      cur = cur.children.get(c);
    }
  }

  /** Returns if there is any word in the trie that starts with the given prefix. */
  startsWith(prefix: string): boolean {
    let cur: TrieNode = this.root;
    for (let i = 0; i < prefix.length; i++) {
      const c = prefix.charAt(i);
      if (!cur.children.get(c)) {
        return false;
      }
      cur = cur.children.get(c);
    }
    return true;
  }
}

