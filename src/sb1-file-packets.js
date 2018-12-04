import {assert} from './util/assert';

import {Packet} from './coders/byte-packets';
import {FixedAsciiString, Uint8, Uint32BE} from './coders/byte-primitives';

class SB1Signature extends Packet.extend({
    version: new FixedAsciiString(10),
    infoByteLength: Uint32BE
}) {
    validate () {
        assert(
            this.equals({version: 'ScratchV01'}) ||
            this.equals({version: 'ScratchV02'}),
            'Invalid Scratch file signature.'
        );
    }
}

Packet.initConstructor(SB1Signature);

class SB1Header extends Packet.extend({
    ObjS: new FixedAsciiString(4),
    ObjSValue: Uint8,
    Stch: new FixedAsciiString(4),
    StchValue: Uint8,
    numObjects: Uint32BE
}) {
    validate () {
        assert(
            this.equals({
                ObjS: 'ObjS',
                ObjSValue: 1,
                Stch: 'Stch',
                StchValue: 1
            }),
            'Invalid Scratch file info packet header.'
        );
    }
}

Packet.initConstructor(SB1Header);

export {SB1Signature, SB1Header};
