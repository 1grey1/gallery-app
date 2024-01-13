const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;

const VALIDATION_ERROR_KEYS = [
    'Хэштег должен начинаться c символа "#".',
    'Строка после решётки, должна состоять только из букв и чисел.',
    'Хэштег не может состоять только из одной решётки.',
    `Максимальная длина хэштега - ${MAX_HASHTAG_LENGTH} символов (включая решётку).`,
    'Один и тот же хэштег, не может быть использован дважды.',
    'Нельзя указать больше пяти хэштегов.'
];

const VALIDATORS = [
    {
        callback: (hashtag) => hashtag[0] !== '#',
        error: VALIDATION_ERROR_KEYS[0],
    },
    {
        callback: (hashtag) => hashtag.length > 1 && !/^#[A-Za-zА-Яа-я0-9]{1,19}$/.test(hashtag),
        error: VALIDATION_ERROR_KEYS[1],
    },
    {
        callback: (hashtag) => hashtag === '#',
        error: VALIDATION_ERROR_KEYS[2],
    },
    {
        callback: function (hashtag, uniqueHashtags, errorAddition) {
            if (hashtag.length > MAX_HASHTAG_LENGTH) {
                const message = ` Удалите лишние ${hashtag.length - MAX_HASHTAG_LENGTH} симв.`;
                errorAddition[this.error] = message;
                return true;
            }
            return false;
        },
        error: VALIDATION_ERROR_KEYS[3], 
    },
    {
        callback: function (hashtag, uniqueHashtags, errorAddition) {
            const isNotUnique = uniqueHashtags.has(hashtag.toLowerCase());
            uniqueHashtags.add(hashtag.toLowerCase());
            return isNotUnique;
        },
        error: VALIDATION_ERROR_KEYS[4],
    },
    {
        callback: function (hashtag, uniqueHashtags, errorAddition) {
            if (uniqueHashtags.size > MAX_HASHTAG_COUNT) {
                const message = ` Удалите лишние ${uniqueHashtags.size - MAX_HASHTAG_COUNT} хешт.`;
                errorAddition[this.error] = message;
                return true;
            }
            return false;
        },
        error: VALIDATION_ERROR_KEYS[5],
    },
]

export {
    VALIDATION_ERROR_KEYS,
    VALIDATORS
};
