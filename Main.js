class HashMap {
    constructor(initialCapacity = 16, loadFactorThreshold = 0.7) {
        this.loadFactorThreshold = loadFactorThreshold;
        this.capacity = initialCapacity;
        this.bucket = new Array(this.capacity).fill(null).map(() => []);
    }
    hash(key){
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++){
            hashCode = (hashCode * primeNumber + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }
    set (key, value){
        const index = this.hash(key);
        this.bucket[index] = this.bucket[index] || [];
        this.bucket[index].push([key, value]);
    }
}