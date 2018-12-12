import {assert} from '../util/assert';

class ByteStream {
    constructor (buffer, position = 0) {
        this.buffer = buffer;
        this.position = position;

        this.uint8a = new Uint8Array(this.buffer);
    }

    read (member) {
        const value = member.read(this.uint8a, this.position);
        if (member.size === 0) {
            this.position += member.sizeOf(this.uint8a, this.position);
        } else {
            this.position += member.size;
        }
        return value;
    }

    readStruct (StructType) {
        const obj = new StructType(this.uint8a, this.position);
        this.position += StructType.size;
        return obj;
    }

    resize (needed) {
        if (this.buffer.byteLength < needed) {
            const uint8a = this.uint8a;
            const nextPowerOf2 = Math.pow(2, Math.ceil(Math.log(needed) / Math.log(2)));
            this.buffer = new ArrayBuffer(nextPowerOf2);

            this.uint8a = new Uint8Array(this.buffer);
            this.uint8a.set(uint8a);
        }
    }

    write (member, value) {
        if (member.size === 0) {
            this.resize(this.position + member.writeSizeOf(value));
        } else {
            this.resize(this.position + member.size);
        }

        member.write(this.uint8a, this.position, value);
        if (member.size === 0) {
            this.position += member.writeSizeOf(this.uint8a, this.position);
        } else {
            this.position += member.size;
        }
        return value;
    }

    writeStruct (StructType, data) {
        this.resize(this.position + StructType.size);

        const st = Object.assign(new StructType(this.uint8a, this.position), data);
        this.position += StructType.size;
        return st;
    }

    writeBytes (bytes, start = 0, end = bytes.length) {
        assert(bytes instanceof Uint8Array, 'writeBytes must be passed an Uint8Array');

        this.resize(this.position + (end - start));

        for (let i = start; i < end; i++) {
            this.uint8a[this.position + i - start] = bytes[i];
        }
        this.position += end - start;
        return bytes;
    }
}

export {ByteStream};
