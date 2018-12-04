import {TextDecoder as JSTextDecoder} from 'text-encoding';

import {assert} from '../util/assert';

import {IS_HOST_LITTLE_ENDIAN, Int16BE, BytePrimitive, Uint8, Uint32BE} from '../coders/byte-primitives';

const BUFFER_TOO_BIG = 10 * 1024 * 1024;

let ReferenceBE;
if (IS_HOST_LITTLE_ENDIAN) {
    ReferenceBE = new BytePrimitive({
        size: 3,
        read (uint8, position) {
            return (
                (uint8[position + 0] << 16) |
                (uint8[position + 1] << 8) |
                uint8[position + 2]
            );
        }
    });
} else {
    ReferenceBE = new BytePrimitive({
        size: 3,
        read (uint8, position) {
            return (
                (uint8[position + 2] << 16) |
                (uint8[position + 1] << 8) |
                uint8[position + 0]
            );
        }
    });
}

const LargeInt = new BytePrimitive({
    sizeOf (uint8, position) {
        const count = Int16BE.read(uint8, position);
        return Int16BE.size + count;
    },
    read (uint8, position) {
        let num = 0;
        let multiplier = 0;
        const count = Int16BE.read(uint8, position);
        for (let i = 0; i < count; i++) {
            num = num + (multiplier * Uint8.read(uint8, position++));
            multiplier *= 256;
        }
        return num;
    }
});

const AsciiString = new BytePrimitive({
    sizeOf (uint8, position) {
        const count = Uint32BE.read(uint8, position);
        return Uint32BE.size + count;
    },
    read (uint8, position) {
        const count = Uint32BE.read(uint8, position);
        assert(count < BUFFER_TOO_BIG, 'asciiString too big');
        position += 4;
        let str = '';
        for (let i = 0; i < count; i++) {
            str += String.fromCharCode(uint8[position++]);
        }
        return str;
    }
});

const Bytes = new BytePrimitive({
    sizeOf (uint8, position) {
        return Uint32BE.size + Uint32BE.read(uint8, position);
    },
    read (uint8, position) {
        const count = Uint32BE.read(uint8, position);
        assert(count < BUFFER_TOO_BIG, 'bytes too big');
        position += Uint32BE.size;

        assert(count < BUFFER_TOO_BIG, 'uint8 array too big');
        return new Uint8Array(uint8.buffer, position, count);
    }
});

const SoundBytes = new BytePrimitive({
    sizeOf (uint8, position) {
        return Uint32BE.size + (Uint32BE.read(uint8, position) * 2);
    },
    read (uint8, position) {
        const samples = Uint32BE.read(uint8, position);
        assert(samples < BUFFER_TOO_BIG, 'sound too big');
        position += Uint32BE.size;

        const count = samples * 2;
        assert(count < BUFFER_TOO_BIG, 'uint8 array too big');
        return new Uint8Array(uint8.buffer, position, count);
    }
});

const Bitmap32BE = new BytePrimitive({
    sizeOf (uint8, position) {
        return Uint32BE.size + (Uint32BE.read(uint8, position) * Uint32BE.size);
    },
    read (uint8, position) {
        const count = Uint32BE.read(uint8, position);
        assert(count < BUFFER_TOO_BIG, 'bitmap too big');
        position += Uint32BE.size;

        assert(count < BUFFER_TOO_BIG, 'uint8 array too big');
        const value = new Uint32Array(count);
        for (let i = 0; i < count; i++) {
            value[i] = Uint32BE.read(uint8, position);
            position += Uint32BE.size;
        }
        return value;
    }
});

let decoder;
/* global TextDecoder:true */
if (typeof TextDecoder === 'undefined') {
    decoder = new JSTextDecoder();
} else {
    decoder = new TextDecoder();
}

const UTF8 = new BytePrimitive({
    sizeOf (uint8, position) {
        return Uint32BE.size + Uint32BE.read(uint8, position);
    },
    read (uint8, position) {
        const count = Uint32BE.read(uint8, position);
        assert(count < BUFFER_TOO_BIG, 'utf8 too big');
        position += Uint32BE.size;

        assert(count < BUFFER_TOO_BIG, 'uint8 array too big');
        return decoder.decode(new Uint8Array(uint8.buffer, position, count));
    }
});

const OpaqueColor = new BytePrimitive({
    size: 4,
    read (uint8, position) {
        const rgb = Uint32BE.read(uint8, position);
        const a = 0xff;
        const r = (rgb >> 22) & 0xff;
        const g = (rgb >> 12) & 0xff;
        const b = (rgb >> 2) & 0xff;
        return ((a << 24) | (r << 16) | (g << 8) | b) >>> 0;
    }
});

const TranslucentColor = new BytePrimitive({
    size: 5,
    read (uint8, position) {
        const rgb = Uint32BE.read(uint8, position);
        const a = Uint8.read(uint8, position);
        const r = (rgb >> 22) & 0xff;
        const g = (rgb >> 12) & 0xff;
        const b = (rgb >> 2) & 0xff;
        return ((a << 24) | (r << 16) | (g << 8) | b) >>> 0;
    }
});

export {
    BUFFER_TOO_BIG,
    ReferenceBE,
    LargeInt,
    AsciiString,
    Bytes,
    SoundBytes,
    Bitmap32BE,
    UTF8,
    OpaqueColor,
    TranslucentColor
};
