function login(){
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  if(u==="admin" && p==="1234"){
    document.getElementById("login").style.display="none";
    document.getElementById("panel").style.display="block";
    load();
  } else {
    alert("Wrong login");
  }
}

function load(){
  let results = JSON.parse(localStorage.getItem("results")) || [];

  let counts = {CS:0,BIO:0,ART:0,BUS:0};

  results.forEach(r=>{
    counts[r]++;
  });

  new Chart(document.getElementById("chart"),{
    type:"bar",
    data:{
      labels:["CS","BIO","ART","BUS"],
      datasets:[{
        label:"Results",
        data:[counts.CS,counts.BIO,counts.ART,counts.BUS]
      }]
    }
  });

  let feedback = JSON.parse(localStorage.getItem("feedback")) || [];

  let box = document.getElementById("feedback");

  if(feedback.length===0){
    box.innerHTML="No feedback yet";
  } else {
    feedback.forEach(f=>{
      box.innerHTML += `<p>• ${f}</p>`;
    });
  }
}
