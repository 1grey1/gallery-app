const scheme = 'http';
const host = 'localhost';
const port = '80';

const Url = {
    ACCESS_TOKEN: {
        POST: `${scheme}://${host}:${port}/token`,
        DELETE: `${scheme}://${host}:${port}/logout/`
    },
    COMMENT: {
        POST: `${scheme}://${host}:${port}/comment`
    },
    EFFECT: {
        GET: `${scheme}://${host}:${port}/effect`
    },
    LIKE: {
        POST: `${scheme}://${host}:${port}/like`,
        DELETE: `${scheme}://${host}:${port}/like/`
    },
    PICTURE: {
        GET: `${scheme}://${host}:${port}/picture`,
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

const AppStorage = {
    ACCESS_TOKEN: `gallery_${btoa('token')}`,
    EFFECTS: `gallery_${btoa('effects')}`,
    PICTURE: `gallery_${btoa('picture')}`
};

const Filter = {
    DEFAULT: 'default',
    RANDOM: 'random',
    DISCUSSED: 'discussed'
};

export {
    Url,
    AppStorage,
    Filter
};
