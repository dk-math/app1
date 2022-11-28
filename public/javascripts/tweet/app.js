window.addEventListener("load", () => {
    let username = localStorage.getItem("username");
    if (!username) {
        username = window.prompt("What is your name?");
        localStorage.setItem("username", username);
    }

    window.bookSite = {};
    bookSite.tweetList = [];

    const modal = new Modal();
    const tweet = new Tweet();

    modal.setFormModalOpenBtnEvent();
    modal.setFormModalCloseBtnEvent();
    modal.setFormModalCloseOutsideEvent();
    modal.setConfirmModalBtnEvent();
    modal.setConfirmModalCancelBtnEvent();
    tweet.setEvaluateBookEvent();
    setTweetEvent(username);

    function setTweetEvent(username) {
        document.getElementById("confirm-btn").addEventListener("click", () => {
            const newTweet = tweet.generateTweet(username);
            bookSite.tweetList.unshift(newTweet);
            tweet.postTweet(0);
            tweet.setAddGoodCountEvent();
            tweet.resetBookEvaluation();
            modal.closeFormModal();
            modal.closeConfirmModal();
            document.getElementById("post-form").reset();
            return false;
        });
    }
})