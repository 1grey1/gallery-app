const showPictureHastags = (hashtags) => {
    const message = hashtags.length ? `: ${hashtags.join(', ')}` : ' отсутствуют';
    alert(`Хештаги${message}`);
};

export {showPictureHastags};
