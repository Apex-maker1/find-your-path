let index = 0;

let scores = { CS:0, BIO:0, ART:0, BUS:0 };

console.log("quiz loaded");

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
    ["Doctor path","BIO"],
    ["Artist path","ART"],
    ["Entrepreneur","BUS"]
  ]}
];

// 🌍 TRACK VISIT (non-blocking)
async function trackVisit(){
  try {
    await supabase.from("visits").insert([{}]);
  } catch(e){
    console.log("visit error ignored", e);
  }
}
trackVisit();

function startQuiz(){
  index = 0;
  scores = { CS:0, BIO:0, ART:0, BUS:0 };
  render();
}

function render(){
  const q = questions[index];

  document.getElementById("app").innerHTML = `
    <h2>${q.q}</h2>
    <div id="options"></div>
    <p>Question ${index+1} / ${questions.length}</p>
  `;

  const box = document.getElementById("options");

  q.options.forEach(o=>{
    const btn = document.createElement("button");
    btn.innerText = o[0];

    btn.onclick = ()=>{
      console.log("clicked:", o);

      scores[o[1]]++;
      next();
    };

    box.appendChild(btn);
  });
}

function next(){
  index++;

  if(index >= questions.length){
    finish();
  } else {
    render();
  }
}

async function finish(){

  console.log("FINISH CALLED");

  // determine result safely
  let best = "CS";
  let max = -1;

  for(let k in scores){
    if(scores[k] > max){
      max = scores[k];
      best = k;
    }
  }

  console.log("RESULT:", best);

  // save result (DO NOT block UI if it fails)
  try {
    await supabase.from("results").insert([
      { value: best }
    ]);
  } catch(e){
    console.log("result save failed (ignored)", e);
  }

  // ALWAYS render result
  const app = document.getElementById("app");

  app.innerHTML = `
    <h1>Your Path</h1>
    <h2>${best}</h2>

    <p style="opacity:0.7;">Leave feedback below 👇</p>

    <textarea id="feedbackInput"
      style="width:80%;height:80px;margin-top:10px;"></textarea>

    <br>

    <button id="fbBtn">Submit Feedback</button>
    <button onclick="startQuiz()">Restart</button>
  `;

  document.getElementById("fbBtn").onclick = submitFeedback;
}

// 💬 FEEDBACK (safe)
async function submitFeedback(){
  const input = document.getElementById("feedbackInput");
  const text = input.value.trim();

  if(!text){
    alert("Please write something");
    return;
  }

  try {
    await supabase.from("feedback").insert([
      { message: text }
    ]);
  } catch(e){
    console.log("feedback failed", e);
  }

  input.value = "";
  alert("Thanks for feedback!");
}
