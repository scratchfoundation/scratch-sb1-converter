const fs = require('fs');
const path = require('path');
const test = require('tap').test;

const {SB1File} = require('../..');

test('default', t => {
    const uri = path.resolve(__dirname, '../fixtures/valid/default.sb');
    const file = fs.readFileSync(uri);

    const sb1 = new SB1File(file);
    const json = sb1.json;

    t.type(json, Object);
    t.deepEqual(json.variables, []);
    t.deepEqual(json.lists, []);
    t.deepEqual(json.scripts, []);

    t.true(Array.isArray(json.costumes));
    t.equal(json.costumes[0].costumeName, 'background1');
    t.equal(json.costumes[0].baseLayerID, 0);
    t.equal(json.costumes[0].baseLayerMD5, 'be2aa84eeac485ab8d9ca51294cd926e.png');
    t.equal(json.costumes[0].bitmapResolution, 1);
    t.equal(json.costumes[0].rotationCenterX, 240);
    t.equal(json.costumes[0].rotationCenterY, 180);

    t.true(Array.isArray(json.sounds));
    t.equal(json.sounds[0].soundName, 'pop');
    t.equal(json.sounds[0].soundID, 0);
    t.equal(json.sounds[0].md5, '83a9787d4cb6f3b7632b4ddfebf74367.wav');
    t.equal(json.sounds[0].sampleCount, 258);
    t.equal(json.sounds[0].rate, 11025);
    t.equal(json.sounds[0].format, '');

    t.true(Array.isArray(json.children));
    t.equal(json.children[0].objName, 'Sprite1');
    t.equal(json.children[0].currentCostumeIndex, 0);
    t.equal(json.children[0].scratchX, 0);
    t.equal(json.children[0].scratchY, 0);
    t.equal(json.children[0].scale, 1);
    t.equal(json.children[0].direction, -270);
    t.equal(json.children[0].rotationStyle, 'normal');
    t.equal(json.children[0].isDraggable, false);
    t.equal(json.children[0].indexInLibrary, 0);
    t.equal(json.children[0].visible, true);
    t.deepEqual(json.children[0].variables, []);
    t.deepEqual(json.children[0].lists, []);
    t.deepEqual(json.children[0].scripts, []);
    t.deepEqual(json.children[0].costumes, [
        {
            baseLayerID: 1,
            baseLayerMD5: '87b6d14fce8842fb56155dc7f6496308.png',
            bitmapResolution: 1,
            costumeName: 'costume1',
            rotationCenterX: 47,
            rotationCenterY: 55
        },
        {
            baseLayerID: 2,
            baseLayerMD5: '07a12efdb3cd7ffc94b55563268367b1.png',
            bitmapResolution: 1,
            costumeName: 'costume2',
            rotationCenterX: 47,
            rotationCenterY: 55
        }
    ]);
    t.deepEqual(json.children[0].sounds, [
        {
            format: '',
            md5: '83c36d806dc92327b9e7049a565c6bff.wav',
            rate: 22050,
            sampleCount: 18688,
            soundID: 1,
            soundName: 'meow'
        }
    ]);

    t.equal(json.tempoBPM, 60);
    t.equal(json.currentCostumeIndex, 0);
    t.equal(json.videoAlpha, 0.5);
    t.type(json.info, Object);

    t.end();
});
