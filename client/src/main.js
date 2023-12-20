import {generatePictures} from './data.js';
import {renderPicturesList} from './pictures-list.js';
import {renderEffectsList} from './effects-list.js';
import './upload-modal.js';
import './upload-form.js';
import './effects.js';

const pictures = generatePictures(54);
renderPicturesList(pictures);
renderEffectsList();