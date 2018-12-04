import {TYPE_NAMES} from './ids';

const toTitleCase = str => (
    str.toLowerCase().replace(/_(\w)/g, ([, letter]) => letter.toUpperCase())
);

class FieldObject {
    constructor ({classId, version, fields}) {
        this.classId = classId;
        this.version = version;
        this.fields = fields;
    }

    string (field) {
        return String(this.fields[field]);
    }

    number (field) {
        return +this.fields[field];
    }

    boolean (field) {
        return !!this.fields[field];
    }

    toString () {
        if (this.constructor === FieldObject) {
            return `${this.constructor.name} ${this.classId} ${TYPE_NAMES[this.classId]}`;
        }
        return this.constructor.name;
    }

    static define (FIELDS, Super = FieldObject) {
        class Base extends Super {
            get FIELDS () {
                return FIELDS;
            }

            get RAW_FIELDS () {
                return this.fields;
            }

            static get FIELDS () {
                return FIELDS;
            }
        }

        Object.keys(FIELDS).forEach(key => {
            const index = FIELDS[key];
            Object.defineProperty(Base.prototype, toTitleCase(key), {
                get () {
                    return this.fields[index];
                }
            });
        });

        return Base;
    }
}

export {FieldObject};
