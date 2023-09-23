const commentListElement = document.querySelector('.social__comments');
const commentTemlate = document.getElementById('comment')
    .content
    .querySelector('.social__comment');

const renderCommentList = (comments) => {
    commentListElement.innerHTML = '';

    for (const comment of comments) {
        const commentElement = commentTemlate.cloneNode(true);
        commentElement.querySelector('.social__text').textContent = comment.message;
        commentElement.querySelector('.social__picture').setAttribute('src', comment.user.avatar);
        commentListElement.append(commentElement);
    }
};


export {renderCommentList};
