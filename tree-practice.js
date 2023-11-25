const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
const { Queue } = require('./abstract-data-structures/queue.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST(rootNode) {
    // Your code here
    if (!rootNode) return Infinity;
    const leftSide = findMinBST(rootNode.left);

    return Math.min(rootNode.val, leftSide);
}

function findMaxBST(rootNode) {
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

function findMinBT(rootNode) {
    // Your code here
    if (!rootNode) return Infinity;

    const leftSide = findMinBT(rootNode.left);
    const rightSide = findMinBT(rootNode.right);

    return Math.min(rootNode.val, leftSide, rightSide);
}

function findMaxBT(rootNode) {
    // Your code here
    if (!rootNode) return -1;
    let max = rootNode.val;
    const stack = [rootNode];

    while (stack.length > 0) {
        let currentNode = stack.pop();
        if (currentNode.val > max) max = currentNode.val;

        if (currentNode.left) stack.push(currentNode.left);
        if (currentNode.right) stack.push(currentNode.right);
    }
    return max;
}

function getHeight(rootNode) {
    // Your code here
    if (!rootNode) return -1;
    if (rootNode.left === null && rootNode.right === null) return 0;

    const leftSide = getHeight(rootNode.left);
    const rightSide = getHeight(rootNode.right);

    return Math.max(leftSide, rightSide) + 1;
}

function balancedTree(rootNode) {
    // Your code here
    // return ((leftHeight - rightHeight >= 0 && leftHeight - rightHeight <= 1) || (rightHeight - leftHeight >= 0 && rightHeight - leftHeight <= 1));
    if (rootNode.right === null && rootNode.left === null) return true;
    const leftHeight = getHeight(rootNode.left);
    const rightHeight = getHeight(rootNode.right);
    if ((rootNode.left && !rootNode.right) || (!rootNode.left && rootNode.right)) {
	if (Math.abs(leftHeight - rightHeight) <= 1) return true;
	return false;
    };
	return balancedTree(rootNode.left) && balancedTree(rootNode.right)
}

function countNodes(rootNode) {
    // Your code here
    let count = 0;
    if (!rootNode) return 0;
    //if (rootNode) return 1;
    const leftCount = countNodes(rootNode.left);
    const rightCount = countNodes(rootNode.right);
    count += (leftCount + rightCount) + 1;
    return count;
}

function getParentNode(rootNode, target) {
    // Your code here
    if (rootNode.val === target) return null;
    const stack = [rootNode];
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

function inOrderPredecessor(rootNode, target) {
    // Your code here
    function inOrderTraverse(node) {
        if (node) {
            inOrderTraverse(node.left);
            result.push(node.val);
            inOrderTraverse(node.right);
        }
    }
    const result = [];
    inOrderTraverse(rootNode)

    res = result[result.indexOf(target) - 1];
    return result[0] === target ? null : res;
}

/** inOrderPredecessor solution 2 **/
/*
function inOrderPredecessor (rootNode, target) {
    // Your code here
    if (!rootNode) return null;
    let predecessor = null;
    while (rootNode !== null) {
	if (target > rootNode.val) {
	    predecessor = rootNode;
	    rootNode = rootNode.right;
	} else {
	    rootNode = rootNode.left;
	}
    }
    return predecessor? predecessor.val : null;
}
*/

// function deleteNodeBST(rootNode, target) {
//     // Do a traversal to find the node. Keep track of the parent

//     // Undefined if the target cannot be found

//     // Set target based on parent

//     // Case 0: Zero children and no parent:
//     //   return null

//     // Case 1: Zero children:
//     //   Set the parent that points to it to null

//     // Case 2: Two children:
//     //  Set the value to its in-order predecessor, then delete the predecessor
//     //  Replace target node with the left most child on its right side, 
//     //  or the right most child on its left side.
//     //  Then delete the child that it was replaced with.

//     // Case 3: One child:
//     //   Make the parent point to the child
// }

function deleteNodeBST(rootNode, target) {
    const parentNode = getParentNode(rootNode, target);
    if (parentNode === undefined) return undefined;
    let targetNode = null;
    if (parentNode === null) targetNode = rootNode;
    else {
	targetNode = (parentNode.left?.val === target)? parentNode.left : parentNode.right;
    }
    const childCount = countChildren(targetNode);
    switch(childCount) {
    case 0:
	if (!parentNode) return null;
	else {
	    parentNode.left.val === target? parentNode.left = null : parentNode.right = null;
	    break;
	}
    case 1:
	// parentNode.left.val = targetNode.val? parentNode.left = (targetNode.left || targetNode.right) : parentNode.right = (targetNode.left || targetNode.right);
	let targetChild = (targetNode.left || targetNode.right)
	parentNode.left?.val === target? parentNode.left = targetChild : parentNode.right = targetChild;
	break;
    case 2:
	const INORDERPREDECESSOR = inOrderPredecessor(rootNode, target);
	//targetNode.val = INORDERPREDECESSOR;
	deleteNodeBST(targetNode, INORDERPREDECESSOR);
	targetNode.val = INORDERPREDECESSOR;
	break;
    default:
	;
    }
}

function findNode(rootNode, value) {
    let current = rootNode;
    //console.log('IN FIRST');
    while (current)  {
	if (current.val === value) return current;
	// console.log('Second');
	// console.log(value);
	// console.log(current, 'CURRENT');
	if (value < current.val) current = current.left;
	if (value > current.val) current = current.right;
    }
    return undefined;
}

function countChildren(node) {
    if (node.left === null && node.right === null) return 0;
    if ((node.left && node.right === null) || (node.left === null && node.right)) return 1;
    if (node.left && node.right) return 2;
}

/** SOLUTION 2 **/
/*
function deleteNodeBST(rootNode, target) {
  // Do a traversal to find the node. Keep track of the parent
  let parent = getParentNode(rootNode, target);
  let node;

  // Undefined if the target cannot be found

  // Set target based on parent
  parent? node = (parent.left && parent.left.val === target ? parent.left : parent.right) || undefined : node = rootNode;

  // Case 0: Zero children and no parent:
  //   return null
  
  // Case 1: Zero children:
  //   Set the parent that points to it to null
      if (!node.left && !node.right) {
	parent.left === node ? parent.left = null : parent.right = null;
    }

  // Case 3: One child:
  //   Make the parent point to the child
  else if (node.left === null || node.right === null) {
  let nodeChild = node.left || node.right;
	parent.left === node ? parent.left = nodeChild : parent.right = nodeChild;
    }

  // Case 2: Two children:
  //  Set the value to its in-order predecessor, then delete the predecessor
  //  Replace target node with the left most child on its right side, 
  //  or the right most child on its left side.
  //  Then delete the child that it was replaced with.
   else {
	let predecessor = inOrderPredecessor(rootNode, target);
	//node.val = predecessor;
	deleteNodeBST(node, predecessor);
	node.val = predecessor;
    }

}
*/

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
