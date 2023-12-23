import {generatePictures} from './data.js';
import {renderPicturesList} from './picture-list.js';
import {renderEffectsList} from './effect-list.js';
import './upload-modal.js';
import './user/main.js';

const pictures = generatePictures(54);
renderPicturesList(pictures);
renderEffectsList();
