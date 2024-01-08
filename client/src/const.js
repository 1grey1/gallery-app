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

const EFFECTS = [
    {
        name: 'none',
        css_filter: null,
        range_min: null,
        range_max: null,
        step: null,
        start: null,
        unit: null
    },
    {
        name: 'chrome',
        css_filter: 'grayscale',
        range_min: 0,
        range_max: 1,
        step: 0.1,
        start: 1,
        unit: null
    },
    {
        name: 'sepia',
        css_filter: 'sepia',
        range_min: 0,
        range_max: 1,
        step: 0.1,
        start: 1,
        unit: null
    },
    {
        name: 'marvin',
        css_filter: 'invert',
        range_min: 0,
        range_max: 100,
        step: 1,
        start: 100,
        unit: '%'
    },
    {
        name: 'phobos',
        css_filter: 'blur',
        range_min: 0,
        range_max: 3,
        step: 0.1,
        start: 3,
        unit: 'px'
    },
    {
        name: 'heat',
        css_filter: 'brightness',
        range_min: 1,
        range_max: 3,
        step: 0.1,
        start: 3,
        unit: null
    }
];

const scheme = 'http';
const host = 'localhost';
const port = '80';

const Url = {
    USER: {
        POST: `${scheme}://${host}:${port}/user`
    },
    ACCESS_TOKEN: {
        POST: `${scheme}://${host}:${port}/token`,
        DELETE: `${scheme}://${host}:${port}/logout/`
    },
    EFFECT: {
        GET: `${scheme}://${host}:${port}/effect`
    },
    UPLOAD: {
        AVATAR: `${scheme}://${host}:${port}/uploads/avatars/`
    }
};

const Storage = {
    ACCESS_TOKEN: `gallary_${btoa('token')}`
}

export {
    Url,
    Storage,
    EFFECTS,
    USER_NAMES,
    COMMENT_MESSAGES,
    PICTURE_DESRIPTIONS,
};

