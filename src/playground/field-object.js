import {FieldObject} from '../squeak/field-object';

import {ObjectRenderer} from './object';

const allPropertyDescriptors = prototype => {
    if (prototype === null) return {};
    return Object.assign(
        allPropertyDescriptors(Object.getPrototypeOf(prototype)),
        Object.getOwnPropertyDescriptors(prototype)
    );
};

class FieldObjectRenderer {
    static check (data) {
        return data instanceof FieldObject;
    }

    render (data, view) {
        new ObjectRenderer().render(
            Object.assign(() => (
                Object.entries(
                    allPropertyDescriptors(Object.getPrototypeOf(data))
                )
                    .filter(([, desc]) => desc.get)
                    .reduce((carry, [key]) => {
                        Object.defineProperty(carry, key, {
                            enumerable: true,
                            get () {
                                return data[key];
                            }
                        });
                        return carry;
                    }, {})
            ), {
                toString () {
                    return data.toString();
                }
            }),
            view
        );
    }
}

export {FieldObjectRenderer};
