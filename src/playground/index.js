import {SB1File} from '../..';
import {SB1View} from './view';

import {ArrayRenderer} from './array';
import {FieldRenderer} from './field';
import {JSPrimitiveRenderer} from './js-primitive';
import {ObjectRenderer} from './object';
import {ViewableRenderer} from './viewable';

SB1View.register(ArrayRenderer);
SB1View.register(FieldRenderer);
SB1View.register(JSPrimitiveRenderer);
SB1View.register(ObjectRenderer);
SB1View.register(ViewableRenderer);

let last = null;
const readFile = f => {
    const reader = new FileReader();
    reader.onload = function (event) {
        if (last) {
            last.forEach(document.body.removeChild, document.body);
        }
        const sb1 = new SB1File(event.target.result);
        last = [
            new SB1View(sb1, 'file').element,
            new SB1View(Array.from(sb1.infoRaw()), 'raw - info').element,
            new SB1View(Array.from(sb1.dataRaw()), 'raw - data').element
        ];
        last.forEach(document.body.appendChild, document.body);
    };
    reader.readAsArrayBuffer(f);
};

Array.from(document.getElementsByClassName('file')).forEach(el => {
    el.addEventListener('change', () => {
        Array.from(el.files).forEach(readFile);
    });
});

document.body.addEventListener('drop', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    document.getElementsByClassName('file')[0].files = e.dataTransfer.files;
});

document.body.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
});
