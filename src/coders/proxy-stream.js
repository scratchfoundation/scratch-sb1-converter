class ProxyStream {
    constructor (stream) {
        this.stream = stream;
    }

    get uint8a () {
        return this.stream.uint8a;
    }

    set uint8a (value) {
        this.stream.uint8a = value;
    }

    get position () {
        return this.stream.position;
    }

    set position (value) {
        this.stream.position = value;
    }

    writeStruct (StructType, data) {
        return this.stream.writeStruct(StructType, data);
    }

    writeBytes (bytes, start = 0, end = bytes.length) {
        return this.stream.writeBytes(bytes, start, end);
    }
}

export {ProxyStream};
