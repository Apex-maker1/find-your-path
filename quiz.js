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
  { q:"Group projects you:", options:[
    ["Solve logic issues","CS"],
    ["Research science","BIO"],
    ["Design visuals","ART"],
    ["Organize team","BUS"]
  ]},
  { q:"What motivates you?", options:[
    ["Problem solving","CS"],
    ["Helping people","BIO"],
    ["Creativity","ART"],
    ["Success","BUS"]
  ]},
  { q:"Choose hobby:", options:[
    ["Programming","CS"],
    ["Reading science","BIO"],
    ["Drawing","ART"],
    ["Selling ideas","BUS"]
  ]},
  { q:"You prefer:", options:[
    ["Systems & logic","CS"],
    ["Nature & life","BIO"],
    ["Design & visuals","ART"],
    ["Strategy & money","BUS"]
  ]},
  { q:"Daily work:", options:[
    ["Write code","CS"],
    ["Research","BIO"],
    ["Create","ART"],
    ["Manage","BUS"]
  ]}
];

function trackVisit(){
  let v = JSON.parse(localStorage.getItem("visits")) || 0;
  localStorage.setItem("visits", JSON.stringify(v+1));
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
    <div class="card-inner">
      <h2>${q.q}</h2>
      <div id="options"></div>
      <p>Question ${index+1} / ${questions.length}</p>
    </div>
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

function finish(){
  let best = "CS";

  for(let k in scores){
    if(scores[k] > scores[best]) best = k;
  }

  let results = JSON.parse(localStorage.getItem("results")) || [];
  results.push(best);
  localStorage.setItem("results", JSON.stringify(results));

  document.getElementById("app").innerHTML = `
    <h1>Your Path</h1>
    <h2>${best}</h2>
    <p>Check dashboard for analytics</p>
    <button onclick="startQuiz()">Try Again</button>
  `;
}
