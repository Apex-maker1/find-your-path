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
  { q:"In a group you are:", options:[
    ["Problem solver","CS"],
    ["Researcher","BIO"],
    ["Designer","ART"],
    ["Leader","BUS"]
  ]},
  { q:"What motivates you?", options:[
    ["Logic & systems","CS"],
    ["Helping people","BIO"],
    ["Creativity","ART"],
    ["Success & money","BUS"]
  ]},
  { q:"Pick a hobby:", options:[
    ["Programming","CS"],
    ["Reading science","BIO"],
    ["Drawing","ART"],
    ["Selling ideas","BUS"]
  ]},
  { q:"You prefer working with:", options:[
    ["Computers","CS"],
    ["Living things","BIO"],
    ["Visual design","ART"],
    ["People","BUS"]
  ]},
  { q:"Ideal job style:", options:[
    ["Technical","CS"],
    ["Scientific","BIO"],
    ["Creative","ART"],
    ["Strategic","BUS"]
  ]},
  { q:"You enjoy:", options:[
    ["Problem solving","CS"],
    ["Research","BIO"],
    ["Creating","ART"],
    ["Leading","BUS"]
  ]},
  { q:"Future goal:", options:[
    ["Build tech","CS"],
    ["Help lives","BIO"],
    ["Express ideas","ART"],
    ["Run company","BUS"]
  ]}
];

// 🌍 TRACK VISIT
async function trackVisit(){
  await supabase.from("visits").insert([{}]);
}
trackVisit();

// START
function startQuiz(){
  index = 0;
  scores = { CS:0, BIO:0, ART:0, BUS:0 };
  render();
}

// RENDER QUESTION
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
      scores[o[1]]++;
      next();
    };

    box.appendChild(btn);
  });
}

// NEXT
function next(){
  index++;

  if(index >= questions.length){
    finish();
  } else {
    render();
  }
}

// FINISH
async function finish(){
  let best = "CS";

  for(let k in scores){
    if(scores[k] > scores[best]) best = k;
  }

  // 🌍 SAVE RESULT
  await supabase.from("results").insert([
    { value: best }
  ]);

  // SHOW RESULT + FEEDBACK UI
  document.getElementById("app").innerHTML = `
    <h1>Your Path</h1>
    <h2>${best}</h2>

    <p style="opacity:0.7;">Help us improve 👇</p>

    <textarea id="feedbackInput" placeholder="What did you think?" style="
      width:80%;
      height:80px;
      border-radius:8px;
      padding:10px;
      margin-top:10px;
    "></textarea>

    <br>

    <button onclick="submitFeedback()">Submit Feedback</button>
    <button onclick="startQuiz()">Restart</button>
  `;
}

// 💬 FEEDBACK
async function submitFeedback(){
  const input = document.getElementById("feedbackInput");
  const text = input.value.trim();

  if(!text){
    alert("Please enter feedback");
    return;
  }

  await supabase.from("feedback").insert([
    { message: text }
  ]);

  input.value = "";
  alert("Thanks for your feedback!");
}
