const urls = [
  "./images/apple.svg",
  "./images/apple.svg",
  "./images/netlify.svg",
  "./images/netlify.svg",
  "./images/facebook.webp",
  "./images/facebook.webp",
  "./images/youtube.webp",
  "./images/youtube.webp",
  "./images/github.png",
  "./images/github.png",
  "./images/google.png",
  "./images/google.png",
];

const MAX_TRY = urls.length / 2;

let wrapper = document.querySelector(".wrapper");
let moves = document.querySelector(".moves");
let matches = document.querySelector(".matches");

(function game() {
  let cards = document.querySelectorAll(".card");

  for (let i = 0; i < cards.length; i++) {
    cards[i].remove();
  }

  moves.textContent = 0;

  matches.textContent = 0;

  let gameOver = false;

  let randoms = [];

  let clickedCards = [];

  let waiting = false;

  for (let i = 0; i < urls.length; i++) {
    let r = Math.floor(Math.random() * 12);
    while (randoms.includes(r)) {
      r = Math.floor(Math.random() * 12);
    }
    randoms.push(r);
    let url = urls[r];

    let img = document.createElement("img");
    img.setAttribute("src", url);

    let cardImg = document.createElement("div");
    cardImg.classList.add("card-img");
    cardImg.append(img);

    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("open");
    card.setAttribute("data-card-id", r);
    card.append(cardImg);

    wrapper.append(card);

    setTimeout(() => {
      card.classList.remove("open");
    }, 1000);

    card.addEventListener("click", (e) => {
      if (!e.target.classList.contains("card") || waiting) {
        return;
      }

      if (gameOver) {
        setTimeout(() => {
          let regame = confirm("Yutqazdiz. Qayta oynisizmi?");

          if (regame) {
            game();
          }
        }, 100);
        return;
      }

      card.classList.add("open");
      clickedCards.push(card);

      if (clickedCards.length % 2 === 0) {
        waiting = true;
        let url1 = urls[clickedCards[0].getAttribute("data-card-id")];
        let url2 = urls[clickedCards[1].getAttribute("data-card-id")];

        if (url1 === url2) {
          matches.textContent++;
          clickedCards.shift();
          clickedCards.shift();
          if (+matches.textContent === 6) {
            setTimeout(() => {
              let regame = confirm("Tabriklimiz. Yuttiz. Qayta oynisizmi?");

              if (regame) {
                game();
              }
            }, 100);
          }
          waiting = false;
        } else {
          moves.textContent++;

          if (+moves.textContent === MAX_TRY) {
            waiting = false;
            gameOver = true;
            setTimeout(() => {
              let regame = confirm("Yutqazdiz. Qayta oynisizmi?");

              if (regame) {
                game();
              }
            }, 100);
            return;
          }
          setTimeout(() => {
            clickedCards[0].classList.remove("open");
            clickedCards[1].classList.remove("open");
            clickedCards.shift();
            clickedCards.shift();
            waiting = false;
          }, 1000);
        }
      }
    });
  }
})();

/*
      <div class="card">
        <div class="card-img">
          <img src="./images/apple.svg" alt="" />
        </div>
      </div>
*/
