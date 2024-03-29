import {deleteToken} from './user-api.js';
import {blockButton, unblockButton} from './util.js';
import {AppStorage} from '../const.js';

const logoutBtnElement = document.getElementById('logout-btn');

const setLogoutBtnClick = (onSuccess) => {
    logoutBtnElement.addEventListener('click', () => {
        if (!localStorage.getItem(AppStorage.ACCESS_TOKEN)){
            return;
        }

        const {token, id} = JSON.parse(localStorage.getItem(AppStorage.ACCESS_TOKEN));

        blockButton(logoutBtnElement, 'Выход');
        window.setTimeout(() => {
            deleteToken(token, id, () => {
                onSuccess();
                unblockButton(logoutBtnElement);
            });
        }, 2000);
    })
}

export {setLogoutBtnClick};
