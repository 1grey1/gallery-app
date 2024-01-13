import {renderPicturesList} from './picture-list.js';
import {renderEffectsList} from './effect-list.js';
import {setUploadFormSabmit} from './upload-form.js';
import {generatePictures} from './data.js';
import {start} from './start.js';
import './upload-modal.js';
import './user/main.js';

start();

const pictures = generatePictures(54);
renderPicturesList(pictures);
renderEffectsList();

setUploadFormSabmit();
