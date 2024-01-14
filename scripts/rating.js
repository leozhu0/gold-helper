let course = document.querySelectorAll('.courseSearchItem > .row.session');
for (var i = 0; i < course.length; i++) {
    let containerEle = course[i].parentElement;
    containerEle.style.position = "relative";
    let ratingEle = document.createElement("div");
    ratingEle.style.position = "absolute";
    ratingEle.style.top = "0";
    ratingEle.style.left = "-100px";
    ratingEle.style.fontWeight = "bold";
    rating = ((Math.floor(Math.random() * 500)/10)%3 + 3).toFixed(1);
    if (rating > 5) {
        rating = 5;
    }
    ratingEle.innerHTML = "Rating: " + String(rating);
    containerEle.appendChild(ratingEle);
}
