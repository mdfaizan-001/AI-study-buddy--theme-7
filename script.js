// ================= USER =================
function saveName(){
  let name = document.getElementById("username").value;
  localStorage.setItem("name", name);
  document.getElementById("welcome").innerText = "Welcome " + name;
}

// ================= FULL CBSE DATA =================
let data = {
  Maths: [
    "Real Numbers",
    "Polynomials",
    "Pair of Linear Equations in Two Variables",
    "Quadratic Equations",
    "Arithmetic Progressions",
    "Triangles",
    "Coordinate Geometry",
    "Trigonometry",
    "Applications of Trigonometry",
    "Circles",
    "Surface Areas and Volumes",
    "Statistics",
    "Probability"
  ],
  Science: [
    "Chemical Reactions and Equations",
    "Acids Bases and Salts",
    "Metals and Non-metals",
    "Carbon and its Compounds",
    "Life Processes",
    "Control and Coordination",
    "How do Organisms Reproduce",
    "Heredity and Evolution",
    "Light Reflection and Refraction",
    "Human Eye and Colourful World",
    "Electricity",
    "Magnetic Effects of Electric Current",
    "Sources of Energy"
  ],
  English: [
    "A Letter to God",
    "Nelson Mandela Long Walk to Freedom",
    "Two Stories About Flying",
    "From the Diary of Anne Frank",
    "The Hundred Dresses",
    "Glimpses of India",
    "Mijbil the Otter",
    "Madam Rides the Bus",
    "The Sermon at Benares",
    "The Proposal"
  ],
  Hindi: [
    "Kshitij Chapter 1",
    "Kshitij Chapter 2",
    "Kshitij Chapter 3",
    "Kshitij Chapter 4",
    "Kshitij Chapter 5",
    "Sparsh Chapter 1",
    "Sparsh Chapter 2",
    "Sparsh Chapter 3"
  ],
  SST: [
    "Rise of Nationalism in Europe",
    "Nationalism in India",
    "The Making of a Global World",
    "Print Culture and the Modern World",
    "Resources and Development",
    "Forest and Wildlife Resources",
    "Water Resources",
    "Agriculture",
    "Minerals and Energy Resources",
    "Manufacturing Industries",
    "Lifelines of National Economy",
    "Power Sharing",
    "Federalism",
    "Democracy and Diversity",
    "Gender Religion and Caste",
    "Political Parties",
    "Outcomes of Democracy",
    "Development",
    "Sectors of the Indian Economy",
    "Money and Credit",
    "Globalisation and the Indian Economy"
  ],
  Computer: [
    "Computer Basics",
    "HTML Basics",
    "CSS Basics",
    "JavaScript Basics",
    "Cyber Safety",
    "Networking",
    "Digital Tools"
  ]
};

// ================= SUBJECT =================
function selectSubject(sub){
  document.getElementById("selectedSubject").innerText = sub;

  let html = "";
  data[sub].forEach(ch=>{
    html += `
      <div class="card">
        <h3>${ch}</h3>

        <button onclick="openNotes('${sub}','${ch}')"> Notes</button>
        <button onclick="openQuiz('${sub}','${ch}')"> Quiz</button>
        <button onclick="openLecture('${ch}')"> Lecture</button>
        <button onclick="markDone('${ch}')"> Done</button>

      </div>
    `;
  });
  document.getElementById("chapters").innerHTML = html;
}

// ================= LINKS =================
function openNotes(sub,ch){
  let query = `${sub} ${ch} class 10 CBSE notes pdf`;
  window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
}

function openQuiz(sub,ch){
  let query = `${sub} ${ch} class 10 CBSE mcq test`;
  window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
}

function openLecture(ch){
  let query = `${ch} class 10 CBSE full explanation`;
  window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`);
}

// ================= PROGRESS =================
function markDone(ch){
  let done = JSON.parse(localStorage.getItem("done")) || [];
  let skill = parseInt(localStorage.getItem("skill")) || 0;

  if(!done.includes(ch)){
    done.push(ch);
    localStorage.setItem("done", JSON.stringify(done));
    skill = Math.min(100, skill + 2);
    localStorage.setItem("skill", skill);
  }
  updateStats();
}

function updateStats(){
  let done = JSON.parse(localStorage.getItem("done")) || [];
  let skill = parseInt(localStorage.getItem("skill")) || 0;
  document.getElementById("completedCount").innerText = done.length;
  document.getElementById("skillScore").innerText = skill + "%";
}

// ================= TIMER =================
let timer = null;
let sec = 0;
function startTimer(){
  if(timer) return;
  timer = setInterval(()=>{
    sec++;
    let m = Math.floor(sec/60);
    let s = sec % 60;
    document.getElementById("timer").innerText =
      String(m).padStart(2,'0') + ":" + String(s).padStart(2,'0');
  },1000);
}

function pauseTimer(){
  clearInterval(timer);
  timer = null;
}
function resetTimer(){
  clearInterval(timer);
  timer = null;
  sec = 0;
  document.getElementById("timer").innerText = "00:00";
}

// ================= SCHEDULE =================
function showSchedule(){
  document.getElementById("selectedSubject").innerText = " Weekly Schedule";
  document.getElementById("chapters").innerHTML = `
    <div class="card">
      <h3>Weekly Study Plan</h3>

      <p>Mon: Maths → Science → English</p>
      <p>Tue: Science → Hindi → Computer</p>
      <p>Wed: SST → Maths → Revision</p>
      <p>Thu: Maths → Science → Practice</p>
      <p>Fri: English → SST → Revision</p>
      <p>Sat: Mock Test + Full Revision</p>
      <hr>
      <p><b>Rule:</b> 45 min study + 10 min break</p>
    </div>
  `;
}

// ================= LOAD =================
window.onload = updateStats;
