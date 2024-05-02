class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }
  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  buildTree = (array) => {
    array
      .sort((a, b) => a - b)
      .forEach((x, i) => {
        if (i === 0 || x !== array[i + 1]) {
          return (array[i] = new Node(x));
        } else {
          array.splice(i, 1);
          array[i] = new Node(x);
        }
      });

    function halving(arr) {
      if (arr.length === 0) return null;
      let mid = Math.floor(arr.length / 2);
      let root = arr[mid];

      const left = arr.slice(0, mid);
      const right = arr.slice(mid + 1);

      root.left = halving(left);
      root.right = halving(right);

      return root;
    }
    return halving(array);
  };
  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
    }

    let node = this.root;
    while (node) {
      if (node.data === value) return;
      if (node.data > value && node.left) {
        node = node.left;
      } else if (node.data < value && node.right) {
        node = node.right;
      } else {
        node.data > value
          ? (node.left = new Node(value))
          : (node.right = new Node(value));
        break;
      }
    }
  }
  find(value) {
    let node = this.root;
    while (node) {
      if (node.data === value) {
        return node;
      } else if (node.data > value) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
  }

  levelOrder(callback = () => {}) {
    const queue = [];
    let node = this.root;
    const arr = [];
    queue.push(node);
    while (queue.length > 0) {
      node = queue.shift();
      arr.push(node.data);
      callback(node);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    return arr;
  }
  inOrder(callback = () => {}) {
    const arr = [];
    let node = this.root;
    function rec(node) {
      if (node) {
        rec(node.left);
        arr.push(node.data);
        callback(node);
        rec(node.right);
      }
    }
    rec(node);
    return arr;
  }
  preOrder(callback = () => {}) {
    const arr = [];
    let node = this.root;
    function rec(node) {
      if (node) {
        arr.push(node.data);
        callback(node);
        rec(node.left);

        rec(node.right);
      }
    }
    rec(node);
    return arr;
  }
  postOrder(callback = () => {}) {
    const arr = [];
    let node = this.root;
    function rec(node) {
      if (node) {
        rec(node.left);

        rec(node.right);
        arr.push(node.data);
        callback(node);
      }
    }
    rec(node);
    return arr;
  }
  height(node) {
    if (!node) return -1;
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }
  depth(node) {
    return this.height(this.root) - this.height(node);
  }
  isBalanced(node = this.root) {
    const checkBalanced = (node) => {
      if (!node) return 0;
      const left = checkBalanced(node.left);
      if (left === -1) return -1; // early termination if left subtree is unbalanced
      const right = checkBalanced(node.right);
      if (right === -1) return -1; // early termination if right subtree is unbalanced
      const difference = Math.abs(left - right);
      if (difference > 1) return -1; // early termination if current node is unbalanced
      return Math.max(left, right) + 1; // return the height of the current node
    };

    return checkBalanced(node) !== -1;
  }
  rebalance() {
    this.root = this.buildTree(this.inOrder());
  }
}
