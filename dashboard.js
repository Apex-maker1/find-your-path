function login(){
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if(user==="admin" && pass==="1234"){
    document.getElementById("loginCard").style.display="none";
    document.getElementById("dashboardPanel").style.display="block";
    loadDashboard();
  } else {
    alert("Wrong login");
  }
}

async function loadDashboard(){

  // 👥 VISITS
  let { data: visits } = await supabase.from("visits").select("*");
  document.getElementById("totalVisits").innerText = visits.length;

  // 📊 RESULTS
  let { data: results } = await supabase.from("results").select("*");

  let counts = { CS:0, BIO:0, ART:0, BUS:0 };

  results.forEach(r=>{
    if(counts[r.value] !== undefined){
      counts[r.value]++;
    }
  });

  new Chart(document.getElementById("chart"),{
    type:"bar",
    data:{
      labels:["CS","BIO","ART","BUS"],
      datasets:[{
        label:"Global Results",
        data:[counts.CS,counts.BIO,counts.ART,counts.BUS]
      }]
    }
  });

  // 💬 FEEDBACK
  let { data: feedback } = await supabase.from("feedback").select("*");

  const box = document.getElementById("feedbackBox");
  box.innerHTML = "";

  feedback.forEach(f=>{
    const p = document.createElement("p");
    p.textContent = "• " + f.message;
    box.appendChild(p);
  });
}
