let visitCount = localStorage.getItem("visits");

if (!visitCount) {
  visitCount = 1;
} else {
  visitCount = Number(visitCount) + 1;
}

localStorage.setItem("visits", visitCount);
const app = document.getElementById("app");

let index = 0;

let scores = {
  CS: 0,
  BIO: 0,
  ART: 0,
  BUS: 0
};

const questions = [
  {
    q: "What do you enjoy most?",
    options: [
      ["Solving puzzles", "CS"],
      ["Studying living things", "BIO"],
      ["Drawing/designing", "ART"],
      ["Leading people", "BUS"]
    ]
  },
  {
    q: "What sounds most fun?",
    options: [
      ["Building apps", "CS"],
      ["Lab experiments", "BIO"],
      ["Creating art", "ART"],
      ["Starting a business", "BUS"]
    ]
  },
  {
    q: "Pick a subject:",
    options: [
      ["Math", "CS"],
      ["Biology", "BIO"],
      ["Art", "ART"],
      ["Economics", "BUS"]
    ]
  },
  {
    q: "In group projects you usually:",
    options: [
      ["Solve technical problems", "CS"],
      ["Understand the science", "BIO"],
      ["Design visuals", "ART"],
      ["Organize the group", "BUS"]
    ]
  },
  {
    q: "What do you prefer?",
    options: [
      ["Logical thinking", "CS"],
      ["Nature & science", "BIO"],
      ["Creativity", "ART"],
      ["Money & strategy", "BUS"]
    ]
  },
  {
    q: "Choose a hobby:",
    options: [
      ["Coding games", "CS"],
      ["Reading science facts", "BIO"],
      ["Editing videos", "ART"],
      ["Running a small business", "BUS"]
    ]
  },
  {
    q: "What motivates you most?",
    options: [
      ["Solving hard problems", "CS"],
      ["Helping people medically", "BIO"],
      ["Expressing creativity", "ART"],
      ["Building success/wealth", "BUS"]
    ]
  },
  {
    q: "What would you rather do daily?",
    options: [
      ["Write code", "CS"],
      ["Do research", "BIO"],
      ["Design things", "ART"],
      ["Make decisions", "BUS"]
    ]
  }
];

function startQuiz() {
  index = 0;
  scores = { CS:0, BIO:0, ART:0, BUS:0 };
  showQuestion();
}

function showQuestion() {
  const q = questions[index];

  app.innerHTML = `
    <div class="card-inner">
      <h2>${q.q}</h2>
      <div class="options"></div>
      <p class="progress">Question ${index + 1} / ${questions.length}</p>
    </div>
  `;

  const optionsDiv = document.querySelector(".options");

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt[0];

    btn.onclick = () => {
      scores[opt[1]]++;
      next();
    };

    optionsDiv.appendChild(btn);
  });
}

function next() {
  index++;
  if (index >= questions.length) {
    showResult();
  } else {
    showQuestion();
  }
}

function showResult() {
  let best = "CS";

  for (let key in scores) {
    if (scores[key] > scores[best]) best = key;
  }

  const results = {
    CS: {
      title: "Computer Science / Engineering",
      desc: "You think logically, enjoy solving problems, and like building systems."
    },
    BIO: {
      title: "Biology / Medicine",
      desc: "You enjoy understanding life, science, and helping others."
    },
    ART: {
      title: "Design / Creative Fields",
      desc: "You are creative, visual, and expressive."
    },
    BUS: {
      title: "Business / Entrepreneurship",
      desc: "You like leadership, strategy, and building success."
    }
  };

  app.innerHTML = `
    <div class="card-inner">
      <h1>Your Path</h1>
      <h2>${results[best].title}</h2>
      <p>${results[best].desc}</p>
      <button onclick="startQuiz()">Try Again</button>
    </div>
  `;
}
function submitFeedback() {
  const input = document.getElementById("feedbackInput");
  const status = document.getElementById("feedbackStatus");

  let feedback = input.value.trim();

  if (feedback === "") {
    status.innerText = "Please write something first.";
    return;
  }

  let allFeedback = JSON.parse(localStorage.getItem("feedbacks")) || [];

  allFeedback.push(feedback);

  localStorage.setItem("feedbacks", JSON.stringify(allFeedback));

  input.value = "";
  status.innerText = "Thanks for your feedback!";
}
function showFeedback() {
  let list = JSON.parse(localStorage.getItem("feedbacks")) || [];

  const div = document.getElementById("feedbackList");

  div.innerHTML = "<h3>Feedback</h3>";

  list.forEach(f => {
    div.innerHTML += `<p>• ${f}</p>`;
  });
}
