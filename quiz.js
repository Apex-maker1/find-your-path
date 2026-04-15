console.log("quiz.js LOADED");

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM READY");

  init();
});

const db = window.supabase;

let index = 0;
let scores = { CS:0, BIO:0, ART:0, BUS:0 };

// ---------------- QUESTIONS ----------------
const questions = [
  { q:"What do you enjoy most?", options:[
    ["Solving puzzles","CS"],
    ["Studying biology","BIO"],
    ["Designing art","ART"],
    ["Leading people","BUS"]
  ]},
  { q:"Pick an activity:", options:[
    ["Coding apps","CS"],
    ["Lab experiments","BIO"],
    ["Making graphics","ART"],
    ["Starting businesses","BUS"]
  ]},
  { q:"Favorite subject:", options:[
    ["Math","CS"],
    ["Biology","BIO"],
    ["Art","ART"],
    ["Economics","BUS"]
  ]},
  { q:"In a group you are:", options:[
    ["Problem solver","CS"],
    ["Researcher","BIO"],
    ["Designer","ART"],
    ["Leader","BUS"]
  ]},
  { q:"What motivates you?", options:[
    ["Logic","CS"],
    ["Helping people","BIO"],
    ["Creativity","ART"],
    ["Success","BUS"]
  ]},
  { q:"Pick a hobby:", options:[
    ["Programming","CS"],
    ["Science reading","BIO"],
    ["Drawing","ART"],
    ["Selling ideas","BUS"]
  ]},
  { q:"Preferred work:", options:[
    ["Tech systems","CS"],
    ["Biology/life","BIO"],
    ["Design","ART"],
    ["People/business","BUS"]
  ]},
  { q:"You enjoy:", options:[
    ["Problem solving","CS"],
    ["Research","BIO"],
    ["Creating","ART"],
    ["Leading","BUS"]
  ]},
  { q:"Future goal:", options:[
    ["Build tech","CS"],
    ["Help health","BIO"],
    ["Create art","ART"],
    ["Run company","BUS"]
  ]},
  { q:"Final choice:", options:[
    ["Engineer","CS"],
    ["Doctor","BIO"],
    ["Artist","ART"],
    ["Entrepreneur","BUS"]
  ]}
];

// ---------------- INIT ----------------
function init(){
  console.log("INIT RUNNING");

  if(!document.getElementById("app")){
    console.error("NO APP DIV FOUND");
    return;
  }

  trackVisit();
  startQuiz();
}

// ---------------- VISIT ----------------
async function trackVisit(){
  try {
    await db.from("visits").insert([{}]);
  } catch(e){
    console.log("visit ignored");
  }
}

// ---------------- START ----------------
function startQuiz(){
  index = 0;
  scores = { CS:0, BIO:0, ART:0, BUS:0 };
  render();
}

// ---------------- NEXT ----------------
function next(){
  index++;

  if(index >= questions.length){
    setTimeout(finish, 10);
    return;
  }

  setTimeout(render, 10);
}

// ---------------- RENDER (SAFE) ----------------
function render(){

  const app = document.getElementById("app");
  const q = questions[index];

  if(!app){
    console.error("APP MISSING");
    return;
  }

  if(!q){
    console.error("QUESTION MISSING");
    finish();
    return;
  }

  app.innerHTML = `
    <h2>${q.q}</h2>
    <div id="options"></div>
    <p>${index+1} / ${questions.length}</p>
  `;

  const box = document.getElementById("options");

  q.options.forEach(o => {
    const btn = document.createElement("button");

    btn.innerText = o[0];

    btn.onclick = () => {
      scores[o[1]]++;
      next();
    };

    box.appendChild(btn);
  });
}

// ---------------- FINISH ----------------
async function finish(){

  console.log("FINISH REACHED");

  let best = "CS";
  let max = -1;

  for(let k in scores){
    if(scores[k] > max){
      max = scores[k];
      best = k;
    }
  }

  try {
    await db.from("results").insert([
      { value: best }
    ]);
  } catch(e){
    console.log("results ignored");
  }

  document.getElementById("app").innerHTML = `
    <h1>Your Path</h1>
    <h2>${best}</h2>

    <textarea id="feedbackInput"
      style="width:80%;height:80px;"></textarea>

    <br>

    <button onclick="submitFeedback()">Submit</button>
    <button onclick="startQuiz()">Restart</button>
  `;
}

// ---------------- FEEDBACK ----------------
async function submitFeedback(){

  const input = document.getElementById("feedbackInput");
  const text = input.value.trim();

  if(!text){
    alert("Write feedback");
    return;
  }

  try {
    await db.from("feedback").insert([
      { message: text }
    ]);
  } catch(e){
    console.log("feedback ignored");
  }

  input.value = "";
  alert("Thanks!");
}
