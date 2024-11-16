let req = new XMLHttpRequest();

req.onreadystatechange = function () {
  if ((this.status == 200) & (this.readyState == 4)) {
    let reqText = JSON.parse(this.responseText);
    let lettersContainer = document.querySelector(".letters");
    let wrongAttempts = 0;
    let rightAttempts = 0;

    let button = document.createElement("button");
    button.appendChild(document.createTextNode("Play Again"));
    button.className = "tryAgain";
    document.body.appendChild(button);

    let div = document.createElement("div");
    let divDiv = document.createElement("div");
    divDiv.className = "res";

    function game() {
      let letters = "abcdefghijklmnopqrstuvwxyz";
      let lettersArr = Array.from(letters);

      lettersArr.forEach((letter) => {
        let span = document.createElement("span");
        span.appendChild(document.createTextNode(letter));
        span.className = "letter-box";
        lettersContainer.appendChild(span);
      });

      let words = reqText[0];

      allKeys = Object.keys(words);
      randomPropMath = Math.floor(Math.random() * allKeys.length);
      randomPropName = allKeys[randomPropMath];
      randomPropVal = words[randomPropName];
      randomPropValLen = Math.random() * randomPropVal.length;
      randomValNum = Math.floor(randomPropValLen);
      randomValValue = randomPropVal[randomValNum];
      valValue = randomValValue;
      document.querySelector(".game-info .category span").innerHTML =
        randomPropName;
      choosenWordArr = Array.from(randomValValue);
      guessSpans = document.querySelectorAll(".letters-guess span");
      setTimeout(() => {
        guessSpans = document.querySelectorAll(".letters-guess span");
      }, 10);

      choosenWordArr.forEach((letter) => {
        let span = document.createElement("span");
        if (letter == " ") {
          span.className = "has-space";
        }
        document.querySelector(".letters-guess").appendChild(span);
      });

      let theDraw = document.querySelector(".hangman-draw");

      document.addEventListener("click", (e) => {
        if (e.target.className == "letter-box") {
          let theStatus = false;
          e.target.classList.add("clicked");
          let theClickedLetter = e.target.innerHTML.toLowerCase();
          choosenWordArr.forEach((letter, wordIndex) => {
            if (letter.toLowerCase() == theClickedLetter) {
              theStatus = true;
              guessSpans.forEach((span, spanIndex) => {
                if (wordIndex === spanIndex) {
                  span.innerHTML = theClickedLetter;
                }
              });
            }
          });
          // outSide The Loop
          let right = 0;
          document.querySelectorAll(".letters-guess span").forEach((span) => {
            if (span.textContent != "") {
              right++;
            }
            if (span.classList.contains("has-space")) {
              right++;
            }
          });
          if (theStatus != true) {
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            if (wrongAttempts == 8) {
              endGame();
              lettersContainer.classList.add("finished");
            }
          }
          if (theStatus == true) {
            rightAttempts++;
            if (randomValValue.length == right) {
              winGame();
              lettersContainer.classList.add("finished");
            }
          }

          function res(rightAns, length) {
            let span = document.createElement("span");
            if (rightAns == length) {
              span.innerHTML = "Perfect";
              span.style.color = "blue";
            } else if (rightAns == length / 2 && wrongAttempts > 0) {
              span.innerHTML = "Good";
              span.style.color = "rgb(25 213 58)";
            } else if (rightAns > length / 2 && wrongAttempts > 0) {
              span.innerHTML = "Good";
              span.style.color = "rgb(25 213 58)";
            } else if (rightAns < length / 2 && wrongAttempts > 0) {
              span.innerHTML = "Bad";
              span.style.color = "rgb(239 68 68 )";
            }

            const wintheword = document.createTextNode(
              `Game Over, The Word Is ${valValue},`
            );
            div.appendChild(wintheword);
            div.className = "popup";
            divDiv.appendChild(span);
            let winrightanswers = document.createTextNode(
              `You Answer ${rightAns} From ${length}`
            );
            divDiv.appendChild(winrightanswers);
            div.appendChild(divDiv);
            document.body.appendChild(div);
          }
          function endGame() {
            res(right, randomValValue.length);
            const wintheword = document.createTextNode(
              `Game Over, The Word Is ${valValue},`
            );
            wintheword.innerHTML = `Game Over, The Word Is ${randomValValue},`;
            div.classList.add("showpopup");
            button.classList.add("showtryagain");
            document.querySelector(".layout").classList.remove("hidden");
          }
          function winGame() {
            res(right, randomValValue.length);
            const wintheword = document.createTextNode(
              `Game Over, The Word Is ${valValue},`
            );
            wintheword.innerHTML = `You Win, The Word Is ${randomValValue},`;
            div.classList.add("showpopup");
            button.classList.add("showtryagain");
            document.querySelector(".layout").classList.remove("hidden");
          }
        }
      });
    }

    game();

    button.onclick = function () {
      document.querySelector(".layout").classList.add("hidden");
      div.classList.remove("showpopup");
      divDiv.innerHTML = "";
      button.classList.remove("showtryagain");
      lettersContainer.innerHTML = "";
      guessSpans.innerHTML = "";
      document.querySelector(".letters").classList.remove("finished");
      document.querySelector(".letters-guess").innerHTML = "";
      document.querySelector(".game-info .category span").innerHTML = "";
      document.querySelector(".hangman-draw .the-draw").style.display = "none";
      document.querySelector(".hangman-draw .the-stand").style.display = "none";
      document.querySelector(".hangman-draw .the-hang").style.display = "none";
      document.querySelector(".hangman-draw .the-rope").style.display = "none";
      document.querySelector(".hangman-draw .head").style.display = "none";
      document.querySelector(".hangman-draw .body").style.display = "none";
      document.querySelector(".hangman-draw .hands").style.display = "none";
      document.querySelector(".hangman-draw .legs").style.display = "none";
      for (let i = 0; i < 10; i++) {
        document.querySelector(".hangman-draw").classList.remove(`wrong-${i}`);
      }
      wrongAttempts = 0;
      rightAttempts = 0;
      theStatus = false;
      div.innerHTML = "";
      game();
    };
  }
};

req.open("GET", "game_words.json", true);
req.send();
