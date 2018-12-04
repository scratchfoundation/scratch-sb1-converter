class Packet {
    constructor (uint8a = new Uint8Array(this.size), offset = 0) {
        this.uint8a = uint8a;
        this.offset = offset;
    }

    equals (other) {
        for (const key in other) {
            if (this[key] !== other[key]) {
                return false;
            }
        }
        return true;
    }

    view () {
        const className = this.constructor.name;
        const obj = {
            toString () {
                return className;
            }
        };
        for (const key in this.shape) {
            obj[key] = this[key];
        }
        return obj;
    }

    static initConstructor (PacketConstructor) {
        PacketConstructor.size = PacketConstructor.prototype.size;
        return PacketConstructor;
    }

    static extend (shape) {
        const DefinedPacket = class extends Packet {
            get shape () {
                return shape;
            }
        };

        let position = 0;
        Object.keys(shape).forEach(key => {
            Object.defineProperty(DefinedPacket.prototype, key, shape[key].asPropertyObject(position));
            if (shape[key].size === 0) {
                throw new Error('Packet cannot be defined with variable sized members.');
            }
            position += shape[key].size;
        });

        DefinedPacket.prototype.size = position;
        DefinedPacket.size = position;

        return DefinedPacket;
    }
}

export {Packet};
