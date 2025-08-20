class HashMap {
    constructor(initialCapacity = 10, loadFactorThreshold = 0.7) {
        this.loadFactorThreshold = loadFactorThreshold;
        this.capacity = initialCapacity;
        this.bucket = new Array(this.capacity).fill(null).map(() => []);
    }
}