const PICTURE_DESRIPTIONS = [
    'desription-1',
    'desription-2',
    'desription-3',
    'desription-4',
    'desription-5'
];

const USER_NAMES = [
    'name-1',
    'name-2',
    'name-3',
    'name-4',
    'name-5',
    'name-6'
];

const COMMENT_MESSAGES = [
    'message-1',
    'message-2',
    'message-3',
    'message-4',
    'message-5'
];

const scheme = 'http';
const host = 'localhost';
const port = '80';

const Url = {
    ACCESS_TOKEN: {
        POST: `${scheme}://${host}:${port}/token`,
        DELETE: `${scheme}://${host}:${port}/logout/`
    },
    COMMENT: {
        POST: null,
    },
    EFFECT: {
        GET: `${scheme}://${host}:${port}/effect`
    },
    LIKE: {
        POST: null,
        DELETE: null
    },
    PICTURE: {
        GET: null,
        POST: `${scheme}://${host}:${port}/picture`
    },
    USER: {
        POST: `${scheme}://${host}:${port}/user`
    },
    UPLOAD: {
        AVATAR: `${scheme}://${host}:${port}/uploads/avatars/`,
        PICTURE: `${scheme}://${host}:${port}/uploads/pictures/`
    }
};

const Storage = {
    ACCESS_TOKEN: `gallery_${btoa('token')}`,
    EFFECTS: `gallery_${btoa('effects')}`
}

export {
    Url,
    Storage,
    USER_NAMES,
    COMMENT_MESSAGES,
    PICTURE_DESRIPTIONS,
};
