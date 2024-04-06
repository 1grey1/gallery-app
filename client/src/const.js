const scheme = 'http';
const port = 80;
const host = `localhost:${port}`;

const Url = {
    ACCESS_TOKEN: {
        POST: `${scheme}://${host}/token`,
        DELETE: `${scheme}://${host}/logout/`
    },
    COMMENT: {
        POST: `${scheme}://${host}/comment`
    },
    EFFECT: {
        GET: `${scheme}://${host}/effect`
    },
    LIKE: {
        POST: `${scheme}://${host}/like`,
        DELETE: `${scheme}://${host}/like/`
    },
    PICTURE: {
        GET: `${scheme}://${host}/picture`,
        POST: `${scheme}://${host}/picture`
    },
    USER: {
        POST: `${scheme}://${host}/user`
    },
    UPLOAD: {
        AVATAR: `${scheme}://${host}/uploads/avatars/`,
        PICTURE: `${scheme}://${host}/uploads/pictures/`
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
