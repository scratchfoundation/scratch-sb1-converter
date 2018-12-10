/**
 * A numeric identifier for each possible class of {@link Field} that can be in
 * a `.sb` file.
 * @enum {number}
 */
const TYPES = {
    /** A `null` value. No data is stored after the class id. */
    NULL: 1,

    /** A `true` value. No data is stored after the class id. */
    TRUE: 2,

    /** A `false` value. No data is stored after the class id. */
    FALSE: 3,

    /** A small integer value. The next 4 bytes represent an integer. */
    SMALL_INT: 4,

    /** A small integer value. The next 2 bytes represent an integer. */
    SMALL_INT_16: 5,

    /** A large integer value. The value is a variable number of bytes. The
     * next byte defines the number of bytes after that represent the integer.
     * The integer's bytes are stored least value first (little endian). */
    LARGE_INT_POSITIVE: 6,

    /** A large integer value. The value is a variable number of bytes. The
     * next byte defines the number of bytes after that represent the integer.
     * The integer's bytes are stored least value first (little endian). */
    LARGE_INT_NEGATIVE: 7,

    /** A floating point value. The next 8 bytes are stored as a double
     * precision floating point value. */
    FLOATING: 8,

    /** A ascii string value. The next 4 bytes defines the number of following
     * bytes that make up the string. */
    STRING: 9,

    /** A ascii string value. The next 4 bytes defines the number of following
     * bytes that make up the string. */
    SYMBOL: 10,

    /** A sequence of bytes. The next 4 bytes defines the number of bytes in
     * the sequence. */
    BYTES: 11,

    /** A sequence of 16 bit samples. The next 4 bytes defines the number of
     * samples in the sequence. */
    SOUND: 12,

    /** A sequence of 32 bit color values. The next 4 bytes defines the number
     * of colors in the bitmap. */
    BITMAP: 13,

    /** A utf8 string value. The next 4 bytes defines the number of bytes used
     * by the string. */
    UTF8: 14,

    /** An array header. The next 4 bytes defines the following number of
     * fields in the array. */
    ARRAY: 20,

    /** An array header. The next 4 bytes defines the following number of
     * fields in the array. */
    ORDERED_COLLECTION: 21,

    /** An array header. The next 4 bytes defines the following number of
     * fields in the array. */
    SET: 22,

    /** An array header. The next 4 bytes defines the following number of
     * fields in the array. */
    IDENTITY_SET: 23,

    /** A dictionary header. The next 4 bytes defines the following number of
     * key/value field pairs in the dictionary. */
    DICTIONARY: 24,

    /** A dictionary header. The next 4 bytes defines the following number of
     * key/value field pairs in the dictionary. */
    IDENTITY_DICTIONARY: 25,

    /** A color value. The next 4 bytes represents the color. */
    COLOR: 30,

    /** A color value. The next 4 bytes represents the red, green, and blue
     * subpixels. The following byte represents the alpha. */
    TRANSLUCENT_COLOR: 31,

    /** A 2 field header. The next 2 fields are the x and y values of this
     * point. */
    POINT: 32,

    /** A 4 field rectangle header. The next 4 fields are the x, y, x2, y2
     * values of this rectangle. */
    RECTANGLE: 33,

    /** A 5 field image header. The next 5 fields are the width, height, bit
     * depth, unused, and bytes. */
    FORM: 34,

    /** A 6 field image header. The next 6 fields are the width, height, bit
     * depth, unsued, bytes and colormap. */
    SQUEAK: 35,

    /** An object reference to a position in the top level array of fields in a
     * block. */
    OBJECT_REF: 99,

    /** A variable field header. The next byte is the version of this object.
     * The following byte is the number of fields in this object. */
    MORPH: 100,

    /** A variable field header. The next byte is the version of this object.
     * The following byte is the number of fields in this object. */
    ALIGNMENT: 104,

    /** A variable field header. The next byte is the version of this object.
     * The following byte is the number of fields in this object.
     *
     * In Scratch 2 this is called String. To reduce confusion in the set of
     * types, this is called STATIC_STRING in this converter. */
    STATIC_STRING: 105,

    /** A variable field header. The next byte is the version of this object.
     * The following byte is the number of fields in this object. */
    UPDATING_STRING: 106,

    /** A variable field header. The next byte is the version of this object.
     * The following byte is the number of fields in this object. */
    SAMPLED_SOUND: 109,

    /** A variable field header. The next byte is the version of this object.
     * The following byte is the number of fields in this object. */
    IMAGE_MORPH: 110,

    /** A variable field header. The next byte is the version of this object.
     * The following byte is the number of fields in this object. */
    SPRITE: 124,

    /** A variable field header. The next byte is the version of this object.
     * The following byte is the number of fields in this object. */
    STAGE: 125,

    /** A variable field header. The next byte is the version of this object.
     * The following byte is the number of fields in this object. */
    WATCHER: 155,

    /** A variable field header. The next byte is the version of this object.
     * The following byte is the number of fields in this object. */
    IMAGE_MEDIA: 162,

    /** A variable field header. The next byte is the version of this object.
     * The following byte is the number of fields in this object. */
    SOUND_MEDIA: 164,

    /** A variable field header. The next byte is the version of this object.
     * The following byte is the number of fields in this object. */
    MULTILINE_STRING: 171,

    /** A variable field header. The next byte is the version of this object.
     * The following byte is the number of fields in this object. */
    WATCHER_READOUT_FRAME: 173,

    /** A variable field header. The next byte is the version of this object.
     * The following byte is the number of fields in this object. */
    WATCHER_SLIDER: 174,

    /** A variable field header. The next byte is the version of this object.
     * The following byte is the number of fields in this object. */
    LIST_WATCHER: 175
};

/**
 * A inverted map of TYPES. Map ids numbers to their string names.
 * @type {object.<number, string>}
 */
const TYPE_NAMES = Object.entries(TYPES)
    .reduce((carry, [key, value]) => {
        carry[value] = key;
        return carry;
    }, {});

export {TYPES, TYPE_NAMES};
