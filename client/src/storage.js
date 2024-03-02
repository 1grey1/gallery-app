import {AppStorage} from './const.js';

const getUser = () => {
    const token = localStorage.getItem(AppStorage.ACCESS_TOKEN);
    return JSON.parse(token).user;
}

const getCurrentPicture = () => {
    console.log(JSON.parse(localStorage.getItem('gallery_cGljdHVyZQ==')));
    return JSON.parse(localStorage.getItem(AppStorage.PICTURE));
}

export {
    getUser,
    getCurrentPicture
};
