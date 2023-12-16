import {Adler32} from './adler32';
import {DEFLATE_BLOCK_SIZE_MAX, DeflateHeader, DeflateChunkStart, DeflateEnd} from './deflate-packets';
import {ProxyStream} from './proxy-stream';

class DeflateStream extends ProxyStream {
    constructor (stream) {
        super(stream);

        this.stream.writeStruct(DeflateHeader, {
            cmf: 0b00001000,
            flag: 0b00011101
        });

        this.adler = new Adler32();

        this.chunk = this.stream.writeStruct(DeflateChunkStart, {
            lastPacket: 0,
            length: 0,
            lengthCheck: 0 ^ 0xffff
        });
    }

    get _deflateIndex () {
        return this.chunk.length;
    }

    set _deflateIndex (value) {
        this.chunk.length = value;
        this.chunk.lengthCheck = value ^ 0xffff;
    }

    writeStruct (StructType, data) {
        this.writeBytes(Object.assign(new StructType(), data).uint8a);
    }

    writeBytes (bytes, start = 0, end = bytes.length) {
        let chunkStart = start;
        while (end - chunkStart > 0) {
            if (this._deflateIndex === DEFLATE_BLOCK_SIZE_MAX) {
                this.chunk = this.stream.writeStruct(DeflateChunkStart, {
                    lastPacket: 0,
                    length: 0,
                    lengthCheck: 0 ^ 0xffff
                });
            }

            const chunkLength = Math.min(
                end - chunkStart,
                DEFLATE_BLOCK_SIZE_MAX - this._deflateIndex
            );
            this.stream.writeBytes(bytes, chunkStart, chunkStart + chunkLength);
            this._deflateIndex += chunkLength;
            chunkStart += chunkLength;
        }

        this.adler.update(bytes, start, end - start);
    }

    finish () {
        this.chunk.lastPacket = 1;

        this.stream.writeStruct(DeflateEnd, {
            checksum: this.adler.digest
        });
    }

    static estimateSize (bodySize) {
        const packets = Math.ceil(bodySize / DEFLATE_BLOCK_SIZE_MAX);
        return (
            DeflateHeader.size +
            (packets * DeflateChunkStart.size) +
            DeflateEnd.size +
            bodySize
        );
    }
}

export {DeflateStream};
