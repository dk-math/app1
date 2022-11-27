class Tweet {
    constructor() {
        this.goodNum = 0;
    }

    generateTweet(username) {
        const timestamp = new Date();
        moment.locale("ja");
        const newTweet = {
            userIcon: "/images/user.jpeg",
            userName: username,
            bookTitle: document.getElementById("book-title").value,
            bookImg: "/images/book.jpg",
            evalutaion: document.getElementsByClassName("active-star")[0].value,
            comment: document.getElementById("book-comment").value,
            goodCount: 0,
            time: moment(timestamp).fromNow(),
        };
        return newTweet;
    }

    postTweet(index) {
        const containerEl = document.querySelector("#all-tweet"); 
        const card = bookSite.tweetList[index];

        const cardEl = document.createElement("li");
        cardEl.className = "card";

        const userEl = document.createElement("div");
        userEl.className ="card-user";

        const userIconEl = document.createElement("img");
        userIconEl.className = "card-user-icon"
        userIconEl.src = card.userIcon;
        userEl.append(userIconEl)

        const userNameEl = document.createElement("div");
        userNameEl.className = "card-user-name";
        userNameEl.innerHTML = card.userName;
        userEl.append(userNameEl);
        cardEl.append(userEl);

        const bookEl = document.createElement("div");
        bookEl.className = "card-book";

        const bookTitleEl = document.createElement("div");
        bookTitleEl.className = "card-book-title";
        bookTitleEl.innerHTML = card.bookTitle;
        bookEl.append(bookTitleEl);

        const bookImgEl = document.createElement("img");
        bookImgEl.className = "card-book-image"
        bookImgEl.src = card.bookImg;
        const bookImgBlockEl = document.createElement("div");
        bookImgBlockEl.className = "card-book-image-block";
        bookImgBlockEl.append(bookImgEl);
        bookEl.append(bookImgBlockEl);
        cardEl.append(bookEl);

        const bookEvalEl = document.createElement("div");
        bookEvalEl.className = "card-book-evaluation";

        const bookEvalIconEl = document.createElement("img");
        bookEvalIconEl.className = "card-book-evaluation-icon";
        bookEvalIconEl.src = "/images/star.png";
        bookEvalEl.append(bookEvalIconEl);

        const bookEvalPointEl = document.createElement("div");
        bookEvalPointEl.className = "card-book-evaluation-point";
        bookEvalPointEl.innerHTML = card.evalutaion;
        bookEvalEl.append(bookEvalPointEl);
        bookEl.append(bookEvalEl);

        const underEl = document.createElement("div");
        underEl.className = "card-under";

        const goodEl = document.createElement("div");
        goodEl.className = "card-good";

        const goodIconEl = document.createElement("i");
        goodIconEl.className = `fa-regular fa-thumbs-up ${this.goodNum}`;
        this.goodNum ++;
        goodEl.append(goodIconEl);

        const goodCountEl = document.createElement("div");
        goodCountEl.className = "good-count";
        goodCountEl.innerHTML = 0;
        goodEl.append(goodCountEl);
        underEl.append(goodEl);

        const timeEl = document.createElement("div");
        timeEl.className = "time";
        timeEl.innerHTML = card.time;
        underEl.append(timeEl);
        cardEl.append(underEl);

        containerEl.prepend(cardEl);
    }

    setEvaluateBookEvent() {
        const stars = document.getElementsByClassName("star");
        for(let i = 0; i < stars.length; i++) {
            stars[i].addEventListener("click", function() {
                document.getElementsByClassName("active-star")[0].classList.remove("active-star");
                this.classList.add("active-star");
            }, false);
        }
    }

    resetBookEvaluation() {
        document.getElementsByClassName("active-star")[0].classList.remove("active-star");
        const zeroStarEl = document.getElementById("star0");
        zeroStarEl.classList.add("active-star");
    }

    setAddGoodCountEvent() {
        const goods = document.getElementsByClassName("fa-thumbs-up");
        goods[0].addEventListener("click", function() {
            const goods = document.getElementsByClassName("fa-thumbs-up");
            const arrayGoods = Array.prototype.slice.call(goods);
            const index = arrayGoods.indexOf(this);
            if (Array.prototype.slice.call(this.classList).indexOf("good-active") >= 0) {
                this.classList.remove("good-active");
                bookSite.tweetList[index].goodCount --;
            } else {
                this.classList.add("good-active");
                bookSite.tweetList[index].goodCount ++;
            }
            document.getElementsByClassName("good-count")[index].innerHTML = bookSite.tweetList[index].goodCount;
        }, false);
    }
}

window.Tweet = Tweet;