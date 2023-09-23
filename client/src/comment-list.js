const showMoreButtonElement = document.querySelector('.social__comments-loader');
const commentListElement = document.querySelector('.social__comments');
const commentTemlate = document.getElementById('comment')
    .content
    .querySelector('.social__comment');

const renderCommentList = (comments) => {
    commentListElement.innerHTML = '';

    if (comments.length <= 5) {
        showMoreButtonElement.classList.add('hidden');
    } else {
        showMoreButtonElement.classList.remove('hidden');
    }

    for (const comment of comments) {
        const commentElement = commentTemlate.cloneNode(true);
        commentElement.querySelector('.social__text').textContent = comment.message;
        commentElement.querySelector('.social__picture').setAttribute('src', comment.user.avatar);
        commentListElement.append(commentElement);
    }
};


export {renderCommentList};
