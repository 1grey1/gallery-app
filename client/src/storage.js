import {AppStorage} from './const.js';

const getUser = () => {
    const token = localStorage.getItem(AppStorage.ACCESS_TOKEN);
    return JSON.parse(token).user;
}

export {getUser};
