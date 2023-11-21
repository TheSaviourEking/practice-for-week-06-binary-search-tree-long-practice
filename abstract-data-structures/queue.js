class SinglyLinkedNode {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0
    }

    enqueue(val) {
        let newNode = new SinglyLinkedNode(val);
        if (this.length <= 0) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
        return this.length;
    }

    dequeue() {
        if (this.length <= 0) return null;
        let dequeued = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = this.head;
        } else {
            this.head = this.head.next;
        }

        this.length--;
        return dequeued.value;
    }
}

// let queue = new Queue();
// queue.enqueue(2)
// console.log(queue);
module.exports = { Queue, SinglyLinkedNode };
