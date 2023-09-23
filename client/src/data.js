import {PICTURE_DESRIPTIONS, USER_NAMES, COMMENT_MESSAGES} from './const.js';
import {getRandomInt, getRandomArrayElement} from './util.js';

const MAX_COMMENT_COUNT = 20;
const MAX_LIKE_COUNT = 200;

const usedComentIds = [];
const usedPictureIds = [];

const generateUser = () => ({
    id: getRandomInt(1, 6),
    name: getRandomArrayElement(USER_NAMES),
    avatar: `./img/avatars/1600w-WsQ560IKaR0.webp`
});

const generateComment = (maxPictureId) => {
    let comentId;
    do {
        comentId = getRandomInt(1, maxPictureId * MAX_COMMENT_COUNT);
    } while (usedComentIds.includes(comentId));
    usedComentIds.push(comentId);

    return {
        id: comentId,
        message: getRandomArrayElement(COMMENT_MESSAGES),
        user: generateUser()
    }
};

const generatePicture = (maxPictureId) => {
    let picturesId;
    do {
        picturesId = getRandomInt(1, maxPictureId);
    } while (usedPictureIds.includes(picturesId));
    usedPictureIds.push(picturesId);

    const comments = [];
    for (let i = 0; i < getRandomInt(5, MAX_COMMENT_COUNT); i++) {
        comments.push(generateComment(maxPictureId));
    }

    return {
        id: picturesId,
        url: `./photos/${getRandomInt(1, 25)}.jpg`,
        description: getRandomArrayElement(PICTURE_DESRIPTIONS),
        likes: getRandomInt(0, MAX_LIKE_COUNT),
        comments: comments
    }
};

const generatePictures = (count) => {
    const pictures = [];
    for (let i = 0; i < count; i++) {
        pictures.push(generatePicture(count));
    }

    return pictures;
};

export {generatePictures};
