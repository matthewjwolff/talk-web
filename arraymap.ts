export default class ArrayMap<K, V> {
    // TODO: make the map and array private
    readonly array: V[]
    readonly map: Map<K, V>
    private readonly keyMapper: (value: V) => K

    constructor(keyMapper: (value: V) => K) {
        this.keyMapper = keyMapper
        this.array = []
        this.map  = new Map()
    }

    add(v: V) {
        this.array.push(v)
        var key:K = this.keyMapper(v)
        this.map.set(key, v)
    }

    remove(v: V) {
        this.array.splice(this.array.indexOf(v), 1)
        this.map.delete(this.keyMapper(v))
    }
}