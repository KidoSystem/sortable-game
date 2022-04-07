(function () {
  let content = $(".content");
  let numberArr = [];
  let userArr = [];
  let shuffledArr = [];
  let finalArr = [];
  let rightAnswerP = 0;
  let btn = $(".check");
  let number = random(1, 90);
  let time = 0;
  let timeInterval;
  numberArr.push(number);
  shuffledArr.push(number);



  // Проверка на Массив есть ли он в localeStorage или нет


  //
  if (!localStorage.getItem("UserAnswer")) {
    for (let i = 0; i < 9; i++) {
      numberArr.push(numberArr[numberArr.length - 1] + 1);
    }

    localStorage.setItem("correctArr", JSON.stringify(numberArr));

    for (let i = 0; i < 9; i++) {
      shuffledArr.push(shuffledArr[shuffledArr.length - 1] + 1);
    }

    shuffle(shuffledArr);

    for (let i = 0; i < shuffledArr.length; i++) {
      let div = document.createElement("div");
      $(div).addClass("content__item");
      $(div).attr("data-idx", shuffledArr[i]);
      $(div).html(shuffledArr[i]);

      content.append(div);
    }

  } else {
    let arrFromLocaleStorage = JSON.parse(localStorage.getItem("UserAnswer"));
    let timeFromLocaleStorage = +localStorage.getItem("Time");

    timeInterval = setInterval(function () {
      timeFromLocaleStorage++;
      localStorage.setItem("Time", timeFromLocaleStorage);
    }, 1000);

    for (let i = 0; i < arrFromLocaleStorage.length; i++) {
      let div = document.createElement("div");
      $(div).addClass("content__item");
      $(div).attr("data-idx", arrFromLocaleStorage[i]);
      $(div).html(arrFromLocaleStorage[i]);

      content.append(div);
    }
  }

  $(btn).on("click", submitHandler);

  function submitHandler() {
    userArr.length = 0;
    let correctArr = JSON.parse(localStorage.getItem('correctArr'))

    $(".content__item").each(function (idx, item) {
      userArr.push(+item.getAttribute("data-idx"));
    });

    for (let key in userArr) {
      if (userArr[key] === numberArr[key]) {
        rightAnswerP++;
      }
    }


    rightAnswerP = rightAnswerP / 10;

    clearInterval(timeInterval);
    let timerFromLocaleStorageEnd = localStorage.getItem("Time");

    finalArr.push({ ...userArr }, +timerFromLocaleStorageEnd, {
      ...correctArr,
    });

    console.log(correctArr);
    localStorage.clear();
    console.log(finalArr);
  }



  $(content).sortable({
    axis: "x",
    start: function (event, ui) {
      if (!timeInterval) {
        startTimer();
      }
    },
    stop: function (event, ui) {
      if (!userArr.length) {
        $(".content__item").each(function (idx, item) {
          userArr.push(+item.getAttribute("data-idx"));
        });

        localStorage.setItem("UserAnswer", JSON.stringify(userArr));
      } else {
        userArr.length = 0;
        $(".content__item").each(function (idx, item) {
          userArr.push(+item.getAttribute("data-idx"));
        });

        localStorage.setItem("UserAnswer", JSON.stringify(userArr));
      }
    },
  });

  function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }
  function startTimer() {
    timeInterval = setInterval(function () {
      time++;

      localStorage.setItem("Time", time);
    }, 1000);
  }
})();


