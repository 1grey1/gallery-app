import {generatePictures} from './data.js';
import {renderPicturesList} from './pictures-list.js';
import './upload-modal.js';

const pictures = generatePictures(50);
renderPicturesList(pictures);
