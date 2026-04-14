const app = document.getElementById("app");

const questions = [
  {
    q: "What do you enjoy most?",
    options: [
      { text: "Math / logic", type: "CS" },
      { text: "Biology", type: "BIO" },
      { text: "Art", type: "ART" },
      { text: "Business", type: "BUS" }
    ]
  },
  {
    q: "Pick one:",
    options: [
      { text: "Coding apps", type: "CS" },
      { text: "Studying cells", type: "BIO" },
      { text: "Designing visuals", type: "ART" },
      { text: "Leading teams", type: "BUS" }
    ]
  },
  {
    q: "Favorite subject?",
    options: [
      { text: "Math", type: "CS" },
      { text: "Science", type: "BIO" },
      { text: "Art", type: "ART" },
      { text: "Economics", type: "BUS" }
    ]
  }
];

let index = 0;
let score = { CS:0, BIO:0, ART:0, BUS:0 };

function start() {
  render();
}

function render() {
  let q = questions[index];

  app.innerHTML = `
    <h2>${q.q}</h2>
    <div id="options"></div>
    <p>Question ${index+1}/${questions.length}</p>
  `;

  let optionsDiv = document.getElementById("options");

  q.options.forEach(o => {
    let btn = document.createElement("button");
    btn.innerText = o.text;

    btn.onclick = () => {
      score[o.type]++;
      next();
    };

    optionsDiv.appendChild(btn);
  });
}

function next() {
  index++;

  if (index >= questions.length) {
    finish();
  } else {
    render();
  }
}

function finish() {
  let best = "CS";

  for (let k in score) {
    if (score[k] > score[best]) best = k;
  }

  const results = {
    CS: "Computer Science / Engineering",
    BIO: "Biology / Medicine",
    ART: "Design / Architecture",
    BUS: "Business / Entrepreneurship"
  };

  app.innerHTML = `
    <h1>Your Path</h1>
    <h2>${results[best]}</h2>
    <button onclick="location.reload()">Restart</button>
  `;
}
