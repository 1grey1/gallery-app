const scheme = 'http';
const host = 'localhost';
const port = '80';

const Url = {
    ACCESS_TOKEN: {
        POST: `${scheme}://${host}:${port}/token`,
        DELETE: `${scheme}://${host}:${port}/logout/`
    },
    COMMENT: {
        GET: `${scheme}://${host}:${port}/comment`,
        POST: `${scheme}://${host}:${port}/comment`
    },
    EFFECT: {
        GET: `${scheme}://${host}:${port}/effect`
    },
    LIKE: {
        POST: null,
        DELETE: null
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
    EFFECTS: `gallery_${btoa('effects')}`
}

export {
    Url,
    AppStorage,
};
