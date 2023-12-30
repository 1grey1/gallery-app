import {generatePictures} from './data.js';
import {renderPicturesList} from './picture-list.js';
import {renderEffectsList} from './effect-list.js';
import {updatePageHeader} from './user/page_header.js';
import './upload-modal.js';
import './user/main.js';

updatePageHeader();

const pictures = generatePictures(54);
renderPicturesList(pictures);
renderEffectsList();
