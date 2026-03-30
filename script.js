// =======================
// PROFILE & AGE
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
}

function doneProfile() {
  const name = document.getElementById("name").value.trim();
  const dob = document.getElementById("dob").value;
  const school = document.getElementById("school").value.trim();
  const className = document.getElementById("class").value.trim();
  const address = document.getElementById("address").value.trim();
  const gender = document.getElementById("gender").value;
  if (!name || !dob || !school || !className || !address || !gender) {
    alert("Please fill all fields.");
    return;
  }
  const profile = { name, dob, school, class: className, address: address.toLowerCase(), gender };
  localStorage.setItem("profile", JSON.stringify(profile));
  window.location.href = "quizzes.html";
}

// =======================
// COMPETITIONS DATA
const competitions = [
  // ----- International -----
  { name:"International Math Olympiad (IMO)", city:"any", minAge:6, maxAge:18, link:"https://www.imo-official.org/" },
  { name:"International Physics Olympiad (IPhO)", city:"any", minAge:14, maxAge:18, link:"https://en.wikipedia.org/wiki/International_Physics_Olympiad" },
  { name:"International Chemistry Olympiad (IChO)", city:"any", minAge:14, maxAge:18, link:"https://en.wikipedia.org/wiki/International_Chemistry_Olympiad" },
  { name:"International Biology Olympiad (IBO)", city:"any", minAge:14, maxAge:18, link:"https://en.wikipedia.org/wiki/International_Biology_Olympiad" },
  { name:"International Olympiad in Informatics (IOI)", city:"any", minAge:10, maxAge:18, link:"https://ioinformatics.org/" },
  { name:"International Junior Science Olympiad (IJSO)", city:"any", minAge:8, maxAge:15, link:"https://en.wikipedia.org/wiki/International_Junior_Science_Olympiad" },

  // ----- India Nationals -----
  { name:"Junior Science Olympiad (JSO)", city:"india", minAge:10, maxAge:16, link:"https://olympiads.hbcse.tifr.res.in/jso" },
  { name:"Indian Olympiad Qualifier in Mathematics (IOQM)", city:"india", minAge:13, maxAge:18, link:"https://ioqmexam.in/" },
  { name:"Indian National Math Olympiad (INMO)", city:"india", minAge:14, maxAge:18, link:"https://olympiads.hbcse.tifr.res.in/" },
  { name:"Indian Computing Olympiad (INOI)", city:"india", minAge:6, maxAge:18, link:"https://www.iarcs.org.in/inoi/" },
  { name:"NSEJS (Junior Science Olympic qualifier)", city:"india", minAge:10, maxAge:15, link:"https://olympiads.hbcse.tifr.res.in/" },
  { name:"NSEP (Physics)", city:"india", minAge:14, maxAge:18, link:"https://olympiads.hbcse.tifr.res.in/" },
  { name:"NSEC (Chemistry)", city:"india", minAge:14, maxAge:18, link:"https://olympiads.hbcse.tifr.res.in/" },
  { name:"NSEB (Biology)", city:"india", minAge:14, maxAge:18, link:"https://olympiads.hbcse.tifr.res.in/" },
  { name:"NSEA (Astronomy)", city:"india", minAge:14, maxAge:18, link:"https://olympiads.hbcse.tifr.res.in/" },

  // ----- Ireland -----
  { name:"Irish Mathematical Olympiad (IrMO)", city:"ireland", minAge:14, maxAge:18, link:"https://www.irmo.ie/" },
  { name:"Young Scientist & Technology Exhibition", city:"ireland", minAge:12, maxAge:19, link:"https://www.yste.ie/" },

  // ----- Other Countries -----
  { name:"UK Mathematics Trust Math Olympiads", city:"uk", minAge:8, maxAge:18, link:"https://www.ukmt.org.uk/" },
  { name:"AMC/AIME/USAMO (USA Math)", city:"usa", minAge:8, maxAge:18, link:"https://maa.org/math-competitions" },
  { name:"Canadian Open Math Challenge", city:"canada", minAge:8, maxAge:18, link:"https://www.cemc.uwaterloo.ca/" },
  { name:"Australian Mathematics Competition", city:"australia", minAge:8, maxAge:18, link:"https://www.amt.edu.au/" },
  { name:"Singapore Mathematical Olympiad", city:"singapore", minAge:8, maxAge:18, link:"https://www.singaporematholympiad.sg/" },
  { name:"German Math Olympiad (BMO)", city:"germany", minAge:8, maxAge:18, link:"https://www.mathematikolympiade.de/" }
];

// =======================
// LOAD QUIZZES
function loadQuizzes() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  const quizList = document.getElementById("quizList");
  const welcome = document.getElementById("welcome");

  if (!profile) {
    quizList.innerHTML = "<p>Create your profile first.</p>";
    return;
  }

  welcome.innerHTML = `Hello, <span style="color:#38bdf8;">${profile.name}</span>!<br>Here are competitions for you.`;
  welcome.style.opacity = 0;
  fadeIn(welcome);

  const age = calculateAge(profile.dob);
  const userCity = profile.address.toLowerCase();

  const majorIndianCities = ["kolkata","delhi","mumbai","bangalore","chennai","hyderabad","pune"];
  const irishCities = ["dublin","cork","galway","limerick"];
  let found = false;
  quizList.innerHTML = "";

  competitions.forEach(c => {
    const cityLower = c.city.toLowerCase();
    const isInternational = cityLower === "any";
    const isNationalIndia = cityLower === "india" && majorIndianCities.some(city => userCity.includes(city));
    const isNationalIreland = cityLower === "ireland" && irishCities.some(city => userCity.includes(city));

    if (age >= c.minAge && age <= c.maxAge && (isInternational || isNationalIndia || isNationalIreland)) {
      found = true;
      quizList.innerHTML += `
        <div class="card">
          <h3>${c.name}</h3>
          <p>City/Country: ${isInternational ? "International" : c.city}</p>
          <p>Recommended Ages: ${c.minAge}-${c.maxAge}</p>
          <button onclick="window.open('${c.link}', '_blank')">Participate</button>
        </div>
      `;
    }
  });

  if (!found) quizList.innerHTML = "<p>No competitions found for your city and age.</p>";
}

// =======================
// FADE-IN
function fadeIn(el) {
  let op = 0;
  const timer = setInterval(() => {
    if (op >= 1) clearInterval(timer);
    el.style.opacity = op;
    op += 0.02;
  }, 20);
}

if (window.location.pathname.includes("quizzes.html")) loadQuizzes();