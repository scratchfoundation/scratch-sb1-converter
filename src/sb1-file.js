import {ByteStream} from './coders/byte-stream';

import {ByteTakeIterator} from './squeak/byte-take-iterator';
import {FieldIterator} from './squeak/field-iterator';

import {SB1Header, SB1Signature} from './sb1-file-packets';

class SB1File {
    constructor (buffer) {
        this.buffer = buffer;
        this.stream = new ByteStream(buffer);

        this.signature = this.stream.readStruct(SB1Signature);
        this.signature.validate();

        this.infoHeader = this.stream.readStruct(SB1Header);
        this.infoHeader.validate();

        this.stream.position += this.signature.infoByteLength - SB1Header.size;

        this.dataHeader = this.stream.readStruct(SB1Header);
        this.dataHeader.validate();
    }

    view () {
        return {
            signature: this.signature,
            infoHeader: this.infoHeader,
            dataHeader: this.dataHeader,
            toString () {
                return 'SB1File';
            }
        };
    }

    infoRaw () {
        return new ByteTakeIterator(
            new FieldIterator(this.buffer, this.infoHeader.offset + SB1Header.size),
            this.signature.infoByteLength + SB1Signature.size
        );
    }

    dataRaw () {
        return new ByteTakeIterator(
            new FieldIterator(this.buffer, this.dataHeader.offset + SB1Header.size),
            this.stream.uint8.length
        );
    }
}

export {SB1File};
