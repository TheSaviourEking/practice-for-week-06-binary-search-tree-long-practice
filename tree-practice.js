const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
const { Queue } = require('./abstract-data-structures/queue.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST (rootNode) {
    // Your code here
    if (!rootNode) return Infinity;
    const leftSide = findMinBST(rootNode.left);

    return Math.min(rootNode.val, leftSide);
}

function findMaxBST (rootNode) {
    // Your code here
    if (!rootNode) return -1;
    let max = rootNode.val;
    const queue = new Queue();
    queue.enqueue(rootNode);

    while (queue.length > 0) {
	let current = queue.dequeue();

	if (current.val > max) max = current.val;

	if (current.right) queue.enqueue(current.right);
    }
    return max;
}

function findMinBT (rootNode) {
    // Your code here
    if (!rootNode) return Infinity;

    const leftSide = findMinBT(rootNode.left);
    const rightSide = findMinBT(rootNode.right);

    return Math.min(rootNode.val, leftSide, rightSide);
}

function findMaxBT (rootNode) {
    // Your code here
    if (!rootNode) return -1;
    let max = rootNode.val;
    const stack = [ rootNode ];

    while (stack.length > 0) {
	let currentNode = stack.pop();
	if (currentNode.val > max) max = currentNode.val;

	if (currentNode.left) stack.push(currentNode.left);
	if (currentNode.right) stack.push(currentNode.right);
    }
    return max;
}

function getHeight (rootNode) {
    // Your code here
    if (!rootNode) return -1;
    if (rootNode.left === null && rootNode.right === null) return 0;

    const leftSide = getHeight(rootNode.left);
    const rightSide = getHeight(rootNode.right);

    return Math.max(leftSide, rightSide) + 1;
}

function balancedTree (rootNode) {
    // Your code here
    const leftHeight = getHeight(rootNode.left);
    const rightHeight = getHeight(rootNode.right);

    return ((leftHeight - rightHeight >= 0 && leftHeight - rightHeight <= 1) || (rightHeight - leftHeight >= 0 && rightHeight - leftHeight <= 1));
}

function countNodes (rootNode) {
    // Your code here
    let count = 0;
    if (!rootNode) return 0;
    //if (rootNode) return 1;
    const leftCount = countNodes(rootNode.left);
    const rightCount = countNodes(rootNode.right);
    count += (leftCount + rightCount) + 1;
    return count;
}

function getParentNode (rootNode, target) {
    // Your code here
    if (rootNode.val === target) return null;
    const stack = [ rootNode ];
    while (stack.length > 0) {
	let currentNode = stack.pop();

	if (currentNode.left) {
	    if (currentNode.left.val === target) return currentNode;
	    else {
		stack.push(currentNode.left);
	    }
	}
	if (currentNode.right) {
	    if (currentNode.right.val === target) return currentNode;
	    else {
		stack.push(currentNode.right);
	    };
	}
    }
    return undefined;
}

function inOrderPredecessor (rootNode,/* target*/) {
    // Your code here
    //if (rootNode.val === target) return null;
    if (!rootNode) return null;

    inOrderPredecessor(rootNode.left);
    console.log(rootNode.val);
    inOrderPredecessor(rootNode.right);
}

function deleteNodeBST(rootNode, target) {
  // Do a traversal to find the node. Keep track of the parent

  // Undefined if the target cannot be found

  // Set target based on parent

  // Case 0: Zero children and no parent:
  //   return null

  // Case 1: Zero children:
  //   Set the parent that points to it to null

  // Case 2: Two children:
  //  Set the value to its in-order predecessor, then delete the predecessor
  //  Replace target node with the left most child on its right side, 
  //  or the right most child on its left side.
  //  Then delete the child that it was replaced with.

  // Case 3: One child:
  //   Make the parent point to the child

}

module.exports = {
    findMinBST,
    findMaxBST,
    findMinBT,
    findMaxBT,
    getHeight,
    countNodes,
    balancedTree,
    getParentNode,
    inOrderPredecessor,
    deleteNodeBST
}
