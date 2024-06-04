const keys=document.querySelectorAll('.formatasti');

const pianoSound=new Audio('./piano-mp3/key01.mp3');
keys.forEach((key) =>{
    key.addEventListener('click', (e) => {
        const clickkey=e.target.dataset.list;
        pianoSound.src= `./piano-mp3/key${clickkey}.mp3`;
        pianoSound.play();
    })
})
//bianchi
function changeColor (element){
    element.style.background="linear-gradient(aliceblue,#333)";
    setTimeout(function(){
        element.style.background="aliceblue";
    },1000);

    element.style.color="white";
    setTimeout(function(){
        element.style.color="black";
    },1000);

    element.style.boxShadow="0 0 1rem red";
    setTimeout(function(){
        element.style.boxShadow="none";
    },1000);
  }
// tasti neri
function changeColorBlack (element){
    element.style.background="linear-gradient(black,#333)";
    setTimeout(function(){
        element.style.background="#000";
    },1000);

    element.style.boxShadow="0 0 1rem red";
    setTimeout(function(){
        element.style.boxShadow="none";
    },1000);
}

const notes=document.querySelectorAll('.note');
/* const non si puo ridefinire */
const pianoSound2=new Audio('./piano-mp3/key01.mp3');
notes.forEach((key) =>{
    key.addEventListener('click', (e) => {
        const clickkey=e.target.dataset.list;
        pianoSound2.src= `./piano-mp3/key${clickkey}.mp3`;
        pianoSound2.play();
    })
})

// metronomo
let tempo;

const choiceBpm = function (input) {
  return eval(input);
}

const addBpb = function (ul, li, btn, length) {
  if (ul.childElementCount <= 7) {
    btn.appendChild(document.createTextNode(length) );
    btn.setAttribute("id", "beat-" + length);
    btn.setAttribute("class", "acctbtn noAccent");
    btn.setAttribute("value", 0);
	 li.setAttribute("class","butto");
    li.appendChild(btn);
    ul.appendChild(li);
  }
}

const bpbArray = function (btnClass) {
  let accentArray = [];
  Array.prototype.forEach.call (btnClass, function (btn) {
    accentArray.push(parseFloat(btn.value));
  });
  return accentArray;
}

const canvasAccent = function (currentBeat, ctx) {
  ctx.font = "100px Arial";
  ctx.fillStyle = "#f44336";
  ctx.textAlign = 'center';
  ctx.fillText(currentBeat, 125, 160);
}

const canvasNoAccent = function (currentBeat, ctx) {
  ctx.font = "100px Arial";
  ctx.fillStyle = "#fff";
  ctx.textAlign = 'center';
  ctx.fillText(currentBeat, 125, 160);
}

const playBeep = function (bpm, bpb, currentBeat, i, ctx, funcAccent, funcNoAccent) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (bpb[i] === 1 ) {
    // console.log("beep!");
    funcAccent(currentBeat, ctx);
    document.getElementById("accent").play();
    if (currentBeat >= bpb.length) {
        currentBeat = 1;
        i = 0;
    } else {
      currentBeat++;
      i = (currentBeat - 1);
    }
  } else if (currentBeat >= bpb.length) {
    // console.log("beep");
    canvasNoAccent(currentBeat, ctx);
    document.getElementById("noAccent").play();
    currentBeat = 1;
    i = 0;
  } else {
    canvasNoAccent(currentBeat, ctx);
    // console.log("beep");
    document.getElementById("noAccent").play();
    currentBeat++;
    i = (currentBeat - 1);
  }
  tempo = setTimeout( function() {playBeep(bpm, bpb, currentBeat, i, ctx, funcAccent, funcNoAccent)} , (60000 / bpm));

}

const changeValue = function (btn) {
  if (btn.value === "1") {
    btn.setAttribute("value", "0");
    btn.setAttribute("class", "acctbtn noAccent");
  } else {
    btn.setAttribute("value", "1");
    btn.setAttribute("class", "acctbtn accent");
  }
}

document.getElementById("addBpb").addEventListener("click", () => {
  let beatList = document.getElementById("beatList");
  let beat = document.createElement("li");
  let beatButton = document.createElement("button");
  let ulLength = document.getElementById("beatList").getElementsByTagName("li").length + 1;
  addBpb(beatList, beat, beatButton, ulLength);
});

document.getElementById("minusBpb").addEventListener("click", () => {
  let beatList = document.getElementById("beatList");
  let ulLength = document.getElementById("beatList").getElementsByTagName("li").length;
  if(ulLength > 1){
    beatList.removeChild(beatList.lastElementChild);
  }
});

document.getElementById("beatList").addEventListener("click", () => {
  let selectButton = event.target;
  changeValue(selectButton);
})

document.getElementById("start").addEventListener("click", () => {
  let startBtn = document.getElementById("start");
  let userBpmInput = document.getElementById("userBpm").value;
  let acctbtn = document.getElementsByClassName("acctbtn");
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  switch (startBtn.innerHTML) {
    case "Start":
      playBeep(choiceBpm(userBpmInput), bpbArray(acctbtn), 1, 0, ctx, canvasAccent, canvasNoAccent);
      startBtn.innerHTML = "Stop";
      break;
    case "Stop":
      clearTimeout(tempo);
      startBtn.innerHTML = "Start";
      console.log("Stopped!");
      break;
    }
});