import Node from "./Node.js";
class HashMap {
    constructor(initialCapacity = 16, loadFactorThreshold = 0.7) {
        this.loadFactorThreshold = loadFactorThreshold;
        this.capacity = initialCapacity;
       this.count = 0; // Initialize count to track number of elements
        this.bucket = new Array(this.capacity).fill(null).map(() => {});
    }
    hash(key){
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++){
            hashCode = (hashCode * primeNumber + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }
    resize(){
        this.capacity *= 2; // Double the capacity
        const oldBucket = this.bucket;
        this.bucket = new Array(this.capacity).fill(null).map(() => {}); // Create a new bucket with the new capacity
        this.count = 0; // Reset count after resizing
        for (let i = 0; i < oldBucket.length; i++) {
            let current = oldBucket[i];
            while (current) {
                this.set(current.key, current.value); // Rehash and set each existing node
                current = current.next;
            }
        }
    }
     length(){
        for (let i = 0; i < this.bucket.length; i++) {
            let current = this.bucket[i];
            while (current) {
                this.count++;
                current = current.next;
            }
        }
        return count; // Return the total number of nodes in the hashmap
    }
    set (key, value){
        const index = this.hash(key);
        const newNode = new Node(key, value);
     // Check if resizing is needed
        if (this.count / this.capacity >= this.loadFactorThreshold) {
            this.resize();
        }
        if(!this.bucket[index]){
            this.bucket[index] = newNode;
        }
        else{
            let current = this.bucket[index];
            while (current) {
                if (current.key === key) {
                    current.value = value; // Update value if key already exists
                    return;
                }
                if (!current.next) {
                    current.next = newNode; // Add new node at the end of the linked list
                    return;
                }
                current = current.next;
            }
        }
        this.count++; // Increment count after adding a new node
    }
    get (key){
        const index = this.hash(key);
        let current = this.bucket[index];
        for (let c = current; c !== null; c = c.next) {
            if (c.key === key) {
                return c.value; // Return value if key is found
            }
        }
        return null; // Return null if key is not found
    }
    remove (key){
        const index = this.hash(key);
        let current = this.bucket[index];
        let previous = null;
        if(current === null) return false; // If the bucket is empty
        if(current.next === null && current.key === key) {
            this.bucket[index] = null; // If there's only one node, set bucket to null
            return true;
        }
        while (current.key !== key) {
            previous = current;
            current = current.next;
            if (current === null) return false; // If key is not found
        }
        if (previous === null) {
            this.bucket[index] = current.next; // If the node to remove is the first node
        } else {
            previous.next = current.next; // Bypass the node to remove it
        }
    }
    
    clear(){
        this.bucket = new Array(this.capacity).fill(null).map(() => []); // Reset the bucket to empty
        return true; // Return true to indicate successful clearing
    }
    values(){
        let valuesArray = [];
        for(let i = 0; i < this.bucket.length; i++){
            let current = this.bucket[i];
            while (current) {
                valuesArray.push(current.value); // Collect all values in the hashmap
                current = current.next;
            }
        }
        return valuesArray; // Return the array of values
    }
    entries(){
        let entriesArray = [];
        for(let i = 0; i < this.bucket.length; i++){
            let current = this.bucket[i];
            while (current) {
                entriesArray.push([current.key, current.value]); // Collect all key-value pairs in the hashmap
                current = current.next;
            }
        }
        return entriesArray; // Return the array of entries
    }
    has(key){
        const index = this.hash(key);
        let current = this.bucket[index];
        while (current) {
            if (current.key === key) {
                return true; // Return true if key is found
            }
            current = current.next;
        }
        return false; // Return false if key is not found
    }
}
export default HashMap;