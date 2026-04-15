let index = 0;

let scores = { CS:0, BIO:0, ART:0, BUS:0 };

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
  { q:"Group role:", options:[
    ["Problem solver","CS"],
    ["Researcher","BIO"],
    ["Designer","ART"],
    ["Leader","BUS"]
  ]}
];

// 🌍 GLOBAL VISIT TRACK
async function trackVisit(){
  await supabase.from("visits").insert([{}]);
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
    <p>${index+1}/${questions.length}</p>
  `;

  const box = document.getElementById("options");

  q.options.forEach(o=>{
    const btn = document.createElement("button");
    btn.innerText = o[0];

    btn.onclick = ()=>{
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
  let best = "CS";

  for(let k in scores){
    if(scores[k] > scores[best]) best = k;
  }

  // 🌍 SAVE RESULT
  await supabase.from("results").insert([
    { value: best }
  ]);

  document.getElementById("app").innerHTML = `
    <h1>Your Path</h1>
    <h2>${best}</h2>

    <input id="feedbackInput" placeholder="Leave feedback...">

    <button onclick="submitFeedback()">Submit Feedback</button>

    <button onclick="startQuiz()">Restart</button>
  `;
}

// 💬 GLOBAL FEEDBACK
async function submitFeedback(){
  const input = document.getElementById("feedbackInput");
  const text = input.value.trim();

  if(!text) return;

  await supabase.from("feedback").insert([
    { message: text }
  ]);

  input.value = "";
  alert("Feedback submitted!");
}
