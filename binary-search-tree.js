// Before starting, copy and paste your guided practice work from
// `binary-search-tree.js` into this file

// Your code here

/* ------------------------------------------------------------------------------------------- */

const { Queue } = require('./abstract-data-structures/queue.js');

// Do not change this
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {

  constructor() {
    // Your code here
    this.root = null;
  }

  insert(val, currentNode = this.root) {
    // Your code here
    let node = new TreeNode(val);
    if (!this.root) {
      this.root = node;
    } else {
      let current = this.root;
      while (current) {
        if (node.val < current.val) {
          if (current.left) {
            current = current.left;
          } else {
            current.left = node;
            break;
          }
        } else if (node.val > current.val) {
          if (current.right) {
            current = current.right;
          } else {
            current.right = node;
            break;
          }
        }
      }
    }
  }

  search(val) {
    // Your code here
    let current = this.root;
    while (current) {
      if (current.val === val) return true;
      if (val < current.val) {
        current = current.left;
      }
      else if (val > current.val) {
        current = current.right;
      }
    }
    return false;
  }


  preOrderTraversal(currentNode = this.root) {
    // Your code here
    if (currentNode) {
      console.log(currentNode.val);
      this.preOrderTraversal(currentNode.left);
      this.preOrderTraversal(currentNode.right);
    }
  }


  inOrderTraversal(currentNode = this.root) {
    // Your code here
    if (currentNode) {
      this.inOrderTraversal(currentNode.left);
      console.log(currentNode.val);
      this.inOrderTraversal(currentNode.right)
    }
  }


  postOrderTraversal(currentNode = this.root) {
    // Your code here
    if (currentNode) {
      this.postOrderTraversal(currentNode.left);
      this.postOrderTraversal(currentNode.right);
      console.log(currentNode.val);
    }
  }

  // // Breadth First Traversal - Iterative
  breadthFirstTraversal() {
    // Your code here
    const queue = new Queue();
    queue.enqueue(this.root);

    while (queue.length > 0) {
      let node = queue.dequeue();
      console.log(node.val);

      if (node.left) queue.enqueue(node.left);
      if (node.right) queue.enqueue(node.right)
    }
  }


  // Depth First Traversal - Iterative
  depthFirstTraversal() {
    // your code here
    const stack = [];
    stack.push(this.root);

    while (stack.length > 0) {
      const node = stack.pop();
      console.log(node.val);

      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }
  }
}

module.exports = { BinarySearchTree, TreeNode };
