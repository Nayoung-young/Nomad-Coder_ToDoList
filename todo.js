const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoTodayBtn = toDoForm.querySelector(".js-todayBtn"),
  toDoLaterBtn = toDoForm.querySelector(".js-laterBtn"),
  toDoListToday = document.querySelector(".js-toDoListToday"),
  toDoListLater = document.querySelector(".js-toDoListLater");

const TODOTODAY_LS = 'toDoToday',
  TODOLATER_LS = 'toDoLater',
  TODODONE_LS_today = 'toDoDone_today',
  TODODONE_LS_later = 'toDoDone_later';

let toDosToday = [],
  toDosLater = [],
  toDosDone_Today = [],
  toDosDone_Later = [];

function moveToDo(event) {
  const toDoDiv = event.target.parentNode.parentNode,
    toDoTextDiv = toDoDiv.firstChild,
    toDoList = toDoDiv.parentNode,
    text = toDoTextDiv.innerText;

    // 현재 상태 확인
    if (toDoList.classList.contains("js-toDoListToday")) {
      var today = true; 
    } else {
      var today = false;
    }

    if (toDoTextDiv.classList.contains("toDosDone")) {
      var done = true; 
    } else {
      var done = false;
    }
    
    //delete 
    toDoList.removeChild(toDoDiv);

    if (today && !done) {
      const cleanToDos = toDosToday.filter(function (toDo) {
        return toDo.id !== parseInt(toDoDiv.id);
      });
      toDosToday = cleanToDos;

      var newId = toDosLater.length + 1;
      //console.log('today && !done');
    } else if (!today && !done) {
      const cleanToDos = toDosLater.filter(function (toDo) {
        return toDo.id !== parseInt(toDoDiv.id);
      });
      toDosLater = cleanToDos;

      var newId = toDosToday.length + 1; 
      //console.log('!today && !done');
    } else if (today && done) {
      const cleanToDos = toDosDone_Today.filter(function (toDo) {
        return toDo.id !== parseInt(toDoDiv.id);
      });
      toDosDone_Today = cleanToDos;

      var newId = toDosDone_Later.length + 1; 
      //console.log('today && done');
    } else {
      const cleanToDos = toDosDone_Later.filter(function (toDo) {
        return toDo.id !== parseInt(toDoDiv.id);
      });
      toDosDone_Later = cleanToDos;

      var newId = toDosDone_Today.length + 1; 
      //console.log('!today && done');
    }

    //add
    paintToDo(text, !today, done);

    //save
  saveToDos(true, done);
  saveToDos(false, done);
}

function doneToDo(event) {
  const toDoDiv = event.target.parentNode.parentNode,
    toDoDivId = toDoDiv.id,
    toDoTextDiv = toDoDiv.firstChild,
    toDoList = toDoDiv.parentNode,
    text = toDoTextDiv.innerText;

  if (toDoTextDiv.classList.contains("toDosDone")) {
    var done = true; 
    toDoTextDiv.classList.remove("toDosDone");
  } else {
    var done = false; 
    toDoTextDiv.classList.add("toDosDone");
  }

  if (toDoList.classList.contains("js-toDoListToday")) {
    var today = true;
  } else {
    var today = false;
  }

  const toDoObj = {
    id: toDoDivId,
    text: text,
  };

  if (today && !done) {
    toDosDone_Today.push(toDoObj);
    const cleanToDos = toDosToday.filter(function (toDo) {
      return toDo.id !== parseInt(toDoDiv.id);
    });
    toDosToday = cleanToDos;

  } else if (!today && !done) {
    toDosDone_Later.push(toDoObj);
    const cleanToDos = toDosLater.filter(function (toDo) {
      return toDo.id !== parseInt(toDoDiv.id);
    });
    toDosLater = cleanToDos;
  } else if (today && done) {
    toDosToday.push(toDoObj);
    const cleanToDos = toDosToday.filter(function (toDo) {
      return toDo.id !== parseInt(toDoDiv.id);
    });
    toDosDone_Today = cleanToDos;
  } else {
    toDosLater.push(toDoObj);
    const cleanToDos = toDosToday.filter(function (toDo) {
      return toDo.id !== parseInt(toDoDiv.id);
    });
    toDosDone_Later = cleanToDos;
  }

  saveToDos(today, true);
  saveToDos(today, false);
}


function deleteToDo(event) {
  const btn = event.target,
    toDoDiv = btn.parentNode.parentNode,
    toDoTextDiv = toDoDiv.firstChild,
    toDoList = toDoDiv.parentNode;

  toDoList.removeChild(toDoDiv);

  if (toDoList.classList.contains("js-toDoListToday")) {
    var today = true;

    if (toDoTextDiv.classList.contains('toDosDone')) {
      var done = true;
      const cleanToDos = toDosDone_Today.filter(function (toDo) {
        return toDo.id !== parseInt(toDoDiv.id);
      });
      toDosDone_Today = cleanToDos;
    } else {
      var done = false;
      const cleanToDos = toDosToday.filter(function (toDo) {
      return toDo.id !== parseInt(toDoDiv.id);
    });
      toDosToday = cleanToDos;
    }
  } else {
    var today = false;

    if (toDoTextDiv.classList.contains('toDosDone')) {
      var done = true;
      const cleanToDos = toDosDone_Later.filter(function (toDo) {
        return toDo.id !== parseInt(toDoDiv.id);
      });
      toDosDone_Later = cleanToDos;
    } else {
      var done = false;
      const cleanToDos = toDosLater.filter(function (toDo) {
        return toDo.id !== parseInt(toDoDiv.id);
      });
      toDosLater = cleanToDos;
    }
  }
  saveToDos(today, done);

  if (today) {
    alert("toDo in Today deleted!");
  } else {
    alert("toDo in Later deleted!");
  }
}

//progress.js
const progress = progressBar.querySelector(".js-progress"); 
function updateProgress () {
    var numOfDones =  toDosDone_Today.length + toDosDone_Later.length, 
      allOfToDos = numOfDones + toDosToday.length + toDosLater.length;
      var percent = (numOfDones/allOfToDos) * 100;
    progress.style.width = percent.toString()+"%"; 
    console.log(`numOfDones: ${numOfDones}, allOfToDos: ${allOfToDos}`);
}

function saveToDos(today, done) {
  if (today && !done) {
    localStorage.setItem(TODOTODAY_LS, JSON.stringify(toDosToday));
  } else if (!today && !done) {
    localStorage.setItem(TODOLATER_LS, JSON.stringify(toDosLater));
  } else if (today && done) {
    localStorage.setItem(TODODONE_LS_today, JSON.stringify(toDosDone_Today));
  } else {
    localStorage.setItem(TODODONE_LS_later, JSON.stringify(toDosDone_Later));
  }

  updateProgress();
}


function paintToDo(text, today, done) {
  //console.log("paintToDo Start!");

  //Div 생성
  const toDoDiv = document.createElement("div"),
    toDoBtnDiv = document.createElement("div"),
    toDoTextDiv = document.createElement("div");

  //Btn 생성
  const doneBtn = document.createElement("button"),
    delBtn = document.createElement("button"),
    moveBtn = document.createElement("button");

  if (today) {
    var newId = toDosToday.length + 1;
    moveBtn.innerText = "🔜";
  } else {
    var newId = toDosLater.length + 1;
    moveBtn.innerText = "🔙";
  }

  doneBtn.innerText = '✔';
  delBtn.innerText = "❌";

  delBtn.addEventListener("click", deleteToDo);
  doneBtn.addEventListener("click", doneToDo)
  moveBtn.addEventListener("click", moveToDo);

  toDoTextDiv.innerText = text;

  //만들어둔 Btn, Div을 div 안에 넣기
  if (done) {
    toDoTextDiv.classList.add("toDosDone");
  }

  toDoBtnDiv.appendChild(doneBtn)
  toDoBtnDiv.appendChild(delBtn);
  toDoBtnDiv.appendChild(moveBtn);

  toDoDiv.appendChild(toDoTextDiv);
  toDoDiv.appendChild(toDoBtnDiv);

  //toDoDiv에게 id, class 추가
  toDoDiv.id = newId;
  toDoDiv.classList.add("toDos");

  // 만든 toDoDiv를 toDoList 안에 넣기
  if (today) {
    toDoListToday.appendChild(toDoDiv);
  } else {
    toDoListLater.appendChild(toDoDiv);
  }

  const toDoObj = {
    id: newId,
    text: text,
  };

  if (today && !done) {
    toDosToday.push(toDoObj);
  } else if (!today && !done) {
    toDosLater.push(toDoObj);
  } else if (today && done) {
    toDosDone_Today.push(toDoObj);
  } else {
    toDosDone_Later.push(toDoObj);
  }

  saveToDos(today, done);
  //console.log("paintToDo End!");
}

function handleSubmit(event) {
  //console.log("handleSubmit Start!");
  event.preventDefault();

  const currentValue = toDoInput.value;

  if (event.target.value === "Today") {
    paintToDo(currentValue, true, false);
  }
  else {
    paintToDo(currentValue, false, false);
  }

  toDoInput.value = "";
  //console.log("handleSubmit End!");
}

function loadToDos() {
  //console.log("loadToDos Start!");
  const loadedToDosToday = localStorage.getItem(TODOTODAY_LS);
  if (loadedToDosToday !== null) {
    let parsedToDos = JSON.parse(loadedToDosToday);

    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text, true, false);
    }
    );
  }

  const loadedToDosLater = localStorage.getItem(TODOLATER_LS);
  if (loadedToDosLater !== null) {
    let parsedToDos = JSON.parse(loadedToDosLater);

    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text, false, false);
    }
    );
  }

  const loadedDone_later = localStorage.getItem(TODODONE_LS_later);
  if (loadedDone_later !== null) {
    let parsedToDos = JSON.parse(loadedDone_later);

    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text, false, true);
    }
    );
  }

  const loadedDone_today = localStorage.getItem(TODODONE_LS_today);
  if (loadedDone_today !== null) {
    let parsedToDos = JSON.parse(loadedDone_today);

    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text, true, true);
    }
    );
  }

  //console.log("loadToDos End!");
}

function init() {
  loadToDos();

  toDoTodayBtn.addEventListener("click", handleSubmit);
  toDoLaterBtn.addEventListener("click", handleSubmit);
}

init();