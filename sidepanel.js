document.addEventListener("DOMContentLoaded", () => {
const container = document.getElementById("section-container");
const navButtons = document.querySelectorAll(".navbar button");
const usernameEl = document.getElementById("username");
const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");

// Initialize authentication state
initAuth();
navButtons.forEach(btn => {
btn.addEventListener("click", () => {
  const section = btn.dataset.section;
  loadSection(section);
});
});
loadSection("home");
function loadSection(section) {
container.innerHTML = "";
switch(section) {


    /* --- FOR HOME SECTION --- */

case "home":
 container.innerHTML = `
   <section class="home-card">
     <div class="home-header">
       <h2>FinePrint Contract Risk Report</h2>
       <div class="dropdown">
         <button class="dropbtn">Analyze Contract ▼</button>
         <div class="dropdown-content">
         <button id="fileInputBtn" style="font-weight: bold;">🖇️ Upload File</button>
         <button id="scanPage" style="font-weight: bold;">🔎 Scan Current Page</button>
         </div>
       </div>
       <input type="file" id="fileInput" style="display:none">
     </div>


     <p class="home-subtext">Ready to make smarter decisions? Start by analyzing a contract below.</p>


     <div id="status"></div>
     <div id="results"></div>
   </section>
 `;

 initScanSection();
 break;


 
    /* --- FOR PLATFORM SECTION --- */

   case "platforms":
 container.innerHTML = `
   <section class="toggle-section">
     <div class="toggle-header" data-target="setup-content">
       <h3>Setup</h3>
       <span class="toggle-arrow">▼</span>
     </div>
     <div id="setup-content" class="toggle-content">
       <div class="info-card">
         <h3>For Browser Extensions (Chrome, Safari, Edge, Firefox)</h3>
         <ol>
           <li>Go to your browser’s extension store.</li>
           <li>Search for “FinePrint.”</li>
           <li>Click Add / Install and confirm permissions.</li>
           <li>Pin the extension to your toolbar for quick access.</li>
           <li>Log in with your FinePrint account (or sign up if new).</li>
         </ol>
       </div>


       <div class="info-card">
         <h3>For Mobile App (iOS & Android)</h3>
         <ol>
           <li>Open the App Store or Google Play Store.</li>
           <li>Search for “FinePrint.”</li>
           <li>Download and install the app.</li>
           <li>Log in or sign up.</li>
           <li>Choose your plan (Free or Premium).</li>
         </ol>
       </div>
     </div>
   </section>


   <section class="toggle-section">
     <div class="toggle-header" data-target="howto-content">
       <h3>How to Use</h3>
       <span class="toggle-arrow">▼</span>
     </div>
     <div id="howto-content" class="toggle-content">
       <div class="info-card">
         <h3>Using the Browser Extension</h3>
         <ol>
           <li>Open a Terms of Service page or document in your browser.</li>
           <li>Click the FinePrint icon to scan it.</li>
           <li>See flagged clauses and AI summaries instantly.</li>
           <li>Save or export the report for legal consultation.</li>
         </ol>
       </div>


       <div class="info-card">
         <h3>Using the Mobile App</h3>
         <ol>
           <li>Upload or scan a contract file.</li>
           <li>FinePrint automatically analyzes and flags risky terms.</li>
           <li>Check your risk report with a clear clause breakdown.</li>
           <li>Export or share the results with trusted contacts.</li>
         </ol>
       </div>
     </div>
   </section>
 `;

 // Add toggle functionality
 const headers = container.querySelectorAll(".toggle-header");
 headers.forEach(header => {
   header.addEventListener("click", () => {
     const targetId = header.getAttribute("data-target");
     const content = document.getElementById(targetId);
     const arrow = header.querySelector(".toggle-arrow");
     content.classList.toggle("active");
     arrow.textContent = content.classList.contains("active") ? "▲" : "▼";
   });
 });
 break;


/* --- FOR FAQS SECTION --- */

case "faqs":
 container.innerHTML = `
   <section class="faq-section">
     <div class="faq-card">
       <div class="faq-header">
         <span class="faq-icon">📚</span>
         <span class="faq-title">About FinePrint</span>
         <span class="faq-toggle">▼</span>
       </div>
       <div class="faq-content">
         <p>FinePrint helps you understand contracts before you sign. It uses AI to scan and simplify terms, highlight hidden risks, and keep your information safe—so you can sign with confidence.</p>


         <div class="reviews-section" style="margin-top:15px; border-top:1px solid #ddd; padding-top:10px;">
           <h3>⭐ Reviews</h3>
           <ul style="list-style:none; padding-left:0;">
             <li>👤 <strong>A***m</strong>: ⭐⭐⭐⭐⭐ — “Helpful and easy to use for checking contracts quickly.”</li>
             <li>👤 <strong>J***n</strong>: ⭐⭐⭐⭐⭐ — “Love how everything runs locally. Great privacy protection!”</li>
             <li>👤 <strong>M***e</strong>: ⭐⭐⭐⭐☆ — “Good for quick risk checks, though could use more details.”</li>
           </ul>
         </div>
       </div>
     </div>


    <div class="faq-card">
 <div class="faq-header">
   <span class="faq-icon">🌟</span>
   <span class="faq-title">Leave a Review</span>
   <span class="faq-toggle">▼</span>
 </div>
 <div class="faq-content">
   <p>We’d love your feedback! Rate FinePrint and share your experience below.</p>


   <div class="review-box">
     <div class="star-rating">
       <span class="star" data-value="1">☆</span>
       <span class="star" data-value="2">☆</span>
       <span class="star" data-value="3">☆</span>
       <span class="star" data-value="4">☆</span>
       <span class="star" data-value="5">☆</span>
     </div>


     <textarea id="reviewComment" rows="3" placeholder="Write your feedback..."></textarea>


     <button id="submitReview">Submit Review</button>
   </div>
 </div>
</div>


 <div class="faq-card">
 <div class="faq-header">
   <span class="faq-icon">🗒️</span>
   <span class="faq-title">Terms of Service</span>
   <span class="faq-toggle">▼</span>
 </div>
 <div class="faq-content">
   <p><strong>Last Updated:</strong> October 2025</p>


   <p>Welcome to FinePrint! These Terms of Service (“Terms”) explain the rules for using our platform, website, and related services (“Services”). By using FinePrint, you agree to these Terms. Please read them carefully.</p>


   <h4>1. About FinePrint</h4>
   <p>FinePrint helps users scan, analyze, and understand digital contracts using AI. It highlights possible risks and simplifies complex terms but does <strong>not provide legal advice</strong>.</p>


   <h4>2. Using Our Services</h4>
   <ul>
     <li>You must be at least <strong>10 years old</strong> to use FinePrint.</li>
     <li>You agree to use FinePrint only for <strong>lawful purposes</strong>.</li>
     <li>You are responsible for the documents you upload and must ensure they do not contain <strong>illegal or copyrighted content</strong> without permission.</li>
   </ul>


   <h4>3. Data Privacy</h4>
   <p>Your uploaded files are analyzed locally or through encrypted channels to protect your privacy. We do not sell or share your data with third parties. For more details, please see our Privacy Policy.</p>


   <h4>4. AI Analysis Disclaimer</h4>
   <p>FinePrint provides automated insights using AI to help you understand contract terms. However, it should <strong>not replace professional legal review</strong>. We do our best to ensure accuracy, but FinePrint is <strong>not responsible</strong> for decisions made based on its results.</p>


   <h4>5. Account and Security</h4>
   <ul>
     <li>You are responsible for keeping your login credentials secure.</li>
     <li>Notify us immediately if you suspect any unauthorized access.</li>
   </ul>


   <h4>6. Limitations of Liability</h4>
   <p>FinePrint is provided “as is.” We do not guarantee that the Services will always be available or error-free. FinePrint and its developers are <strong>not liable</strong> for any damages or losses arising from your use of the Services.</p>


   <h4>7. Updates and Changes</h4>
   <p>We may update these Terms from time to time. When we do, we’ll post the updated version and change the “Last Updated” date. Continued use means you accept the new Terms.</p>


   <h4>8. Contact Us</h4>
   <p>If you have questions about these Terms, please contact us at:<br>
   📧 <strong>FinePrint@gmail.com</strong></p>
 </div>
</div>

   </section>
 `;

 // Add toggle logic for FAQ
 const faqHeaders = container.querySelectorAll(".faq-header");
 faqHeaders.forEach(header => {
   header.addEventListener("click", () => {
     const card = header.parentElement;
     card.classList.toggle("active");
     const toggleIcon = header.querySelector(".faq-toggle");
     toggleIcon.textContent = card.classList.contains("active") ? "▲" : "▼";
   });
 });


// review star rating interaction
const stars = container.querySelectorAll('.star');
let currentRating = 0;


stars.forEach(star => {
 star.addEventListener('mouseover', () => {
   const value = parseInt(star.getAttribute('data-value'));
   stars.forEach(s => s.classList.toggle('active', parseInt(s.getAttribute('data-value')) <= value));
 });


 star.addEventListener('mouseout', () => {
   stars.forEach(s => s.classList.toggle('active', parseInt(s.getAttribute('data-value')) <= currentRating));
 });


 star.addEventListener('click', () => {
   currentRating = parseInt(star.getAttribute('data-value'));
   stars.forEach(s => s.classList.toggle('active', parseInt(s.getAttribute('data-value')) <= currentRating));
 });
});


const submitBtn = container.querySelector('#submitReview');
if (submitBtn) {
 submitBtn.addEventListener('click', () => {
   const comment = container.querySelector('#reviewComment').value.trim();
   if (currentRating === 0) {
     alert('Please select a star rating before submitting.');
     return;
   }
   if (comment === "") {
     alert('Please write a short comment.');
     return;
   }
   alert(`Thank you! You rated FinePrint ${currentRating} stars and said:\n\n"${comment}"`);
   container.querySelector('#reviewComment').value = '';
   stars.forEach(s => s.classList.remove('active'));
   currentRating = 0;
 });
}
 break;


    /* --- FOR EXPORT SECTION --- */

case "export":
 container.innerHTML = `
   <section class="card">
     <div class="card-icon">🕓</div>
     <div class="card-body">
       <h2>History</h2>
       <div class="history-section">
         <div class="history-header" id="toggleHistory">
           View Your Past Reports
           <span class="history-toggle">▼</span>
         </div>
         <div id="historyList"></div>
       </div>
     </div>
   </section>
 `;
 initHistorySection();
 break;


/* --- FOR ANALYTICS SECTION --- */
case "analytics":
  container.innerHTML = `
    <section class="analytics-section">
      <h2>📊 Admin Analytics Dashboard</h2>

      <div class="analytics-grid">

        <div class="analytics-card">
          <div class="card-header">
            <h3>👥 Active Users</h3>
            <button class="toggle-btn">▼</button>
          </div>
          <p class="summary">4,250 <span class="change">(+12% from last month)</span></p>
          <div class="details hidden">
            <p>• 3,800 returning users</p>
            <p>• 450 new sign-ups this month</p>
            <p>• Peak activity: 7 PM - 9 PM</p>
          </div>
        </div>

        <div class="analytics-card">
          <div class="card-header">
            <h3>⚠️ Average Risk Levels</h3>
            <button class="toggle-btn">▼</button>
          </div>
          <p class="summary">High: 31% | Moderate: 47% | Low: 22%</p>
          <div class="details hidden">
            <p>• Trending increase in High-Risk users by 8%</p>
            <p>• Most flagged category: "Data Exposure"</p>
            <p>• Recommendation: Conduct quarterly risk reviews</p>
          </div>
        </div>

        <div class="analytics-card">
          <div class="card-header">
            <h3>📑 Reports Generated</h3>
            <button class="toggle-btn">▼</button>
          </div>
          <p class="summary">1,582 reports this month</p>
          <div class="details hidden">
            <p>• Most active department: Compliance (42%)</p>
            <p>• Avg. report accuracy: 93%</p>
            <p>• Avg. processing time: 3.2 seconds</p>
          </div>
        </div>

      </div>
    </section>
  `;

  // Add toggle functionality for detail sections
  document.querySelectorAll(".toggle-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const details = btn.parentElement.nextElementSibling.nextElementSibling;
      details.classList.toggle("hidden");
      btn.textContent = details.classList.contains("hidden") ? "▼" : "▲";
    });
  });
  break;



}
}


// Authentication functions
async function initAuth() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    usernameEl.innerHTML = `
      <span style="font-size:18px; font-weight:bold;">FinePrint</span><br>
      <span style="font-size:14px; color:#000;">Welcome ${currentUser}!</span>
    `;
    loginButton.style.display = "none";
    logoutButton.style.display = "block";
  } else {
    usernameEl.textContent = "FinePrint";
    loginButton.style.display = "block";
    logoutButton.style.display = "none";
  }

  // Attach event listeners (only once)
  loginButton.addEventListener("click", handleLogin);
  logoutButton.addEventListener("click", handleLogout);
}


// --- LOGIN / SIGNUP WITH PASSWORD --- //
async function handleLogin() {
  const username = prompt("Enter your username:");
  if (!username || username.trim() === "") {
    alert("Username cannot be empty.");
    return;
  }

  const password = prompt("Enter your password:");
  if (!password || password.trim() === "") {
    alert("Password cannot be empty.");
    return;
  }

  const data = await new Promise((resolve) => {
    chrome.storage.local.get(["accounts"], (res) => resolve(res.accounts || []));
  });

  
// --- ADMIN ACCOUNT --- //
  if (!data.find(acc => acc.username === "admin")) {
    data.push({ username: "admin", password: "1234", role: "admin" });
    await chrome.storage.local.set({ accounts: data });
  }

  // Look for existing user
  const existingUser = data.find(acc => acc.username === username.trim());

  if (existingUser && existingUser.password === password) {
    // Successful login
    await chrome.storage.local.set({ currentUser: username.trim() });
    localStorage.setItem("currentUser", username.trim()); // ✅ keep in sync

    if (existingUser.role === "admin") {
      alert(`Welcome back, Admin ${username.trim()}!`);
      localStorage.setItem("isAdmin", "true");
    } else {
      localStorage.removeItem("isAdmin");
      alert(`Welcome back, ${username.trim()}!`);
    }

    location.reload();
  } else {
    // Create new user account
    data.push({ username: username.trim(), password, role: "user" });
    await chrome.storage.local.set({ accounts: data });
    await chrome.storage.local.set({ currentUser: username.trim() });
    localStorage.setItem("currentUser", username.trim()); // ✅ added
    localStorage.removeItem("isAdmin");
    alert("Account created successfully!");
    location.reload();
  }
}

// --- Logout ---
async function handleLogout() {
 await chrome.storage.local.remove("currentUser");
 alert("You have been logged out.");
 location.reload();
}


async function handleLogout() {
await chrome.storage.local.remove("currentUser");
location.reload();  // Reload to update UI
}
async function getUsers() {
return new Promise((resolve) => {
  chrome.storage.local.get("users", (result) => {
    resolve(result.users || []);
  });
});
}
async function getCurrentUser() {
return new Promise((resolve) => {
  chrome.storage.local.get("currentUser", (result) => {
    resolve(result.currentUser || null);
  });
});
}
async function setCurrentUser(username) {
await chrome.storage.local.set({ currentUser: username });
}
// --- Analyze and Render Function (Moved outside for clarity) ---
async function analyzeAndRender(text, label) {
 const statusEl = document.getElementById('status');
 const resultsEl = document.getElementById('results');


 function setStatus(msg) {
   if (statusEl) statusEl.textContent = msg;
 }

 setStatus("Analyzing...");


 // Prepare container
 resultsEl.innerHTML = "";

 // Run local analyzer (once) AI
 const findings = Analyzer.scan(text);
 const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
 const riskScore = Math.floor(Math.random() * 40) + 60;
 const riskLevel = riskScore > 75 ? "High Risk ⚠️" : riskScore > 50 ? "Moderate ⚠️" : "Low ✅";


 // Filter by severity (early, for scope)
 const safe = findings.filter(f => f.severity === "safe");
 const caution = findings.filter(f => f.severity === "caution");
 const risky = findings.filter(f => f.severity === "risky");


 // --- HEADER CARD ---
 const headerCard = document.createElement("div");
 headerCard.className = "card vertical";
 headerCard.innerHTML = `
   <h3>Document Analyzed</h3>
   <p><strong>Name:</strong> ${label}</p>
   <p><strong>Date:</strong> ${date}</p>
   <p><strong>Overall Risk Score:</strong> ${riskScore}/100 (${riskLevel})</p>
   <p><strong>Summary:</strong> This contract contains clauses that could pose financial or legal risks. FinePrint recommends reviewing highlighted sections carefully before signing.</p>
 `;
 resultsEl.appendChild(headerCard);


 // --- ANALYSIS SECTION ---
 const analysisTitle = document.createElement("h3");
 analysisTitle.innerHTML = 'Detailed Analysis: <button id="toggleAnalysis" style="font-size:12px; margin-left:10px; background:none; border:none; color:#666; cursor:pointer;">[Toggle Details]</button>';
 analysisTitle.style.marginTop = "15px";
 resultsEl.appendChild(analysisTitle);


 const analysisContainer = document.createElement("div");
 analysisContainer.id = "analysisDetails";
 analysisContainer.style.display = "block"; // Initially visible
 resultsEl.appendChild(analysisContainer);


 // Add toggle event (fixed: proper button reference and text update)
 const toggleBtn = document.getElementById("toggleAnalysis");
 toggleBtn.onclick = function() {
   const details = document.getElementById("analysisDetails");
   details.style.display = details.style.display === "none" ? "block" : "none";
   this.textContent = details.style.display === "none" ? "[Show Details]" : "[Hide Details]";
 };


 function renderClauses(icon, title, clauses) {
   if (!clauses.length) return "";
   return `
     <div class="card vertical clause-section">
       <h4 class="clause-title">${icon} ${title}</h4>
       ${clauses.map(f => `
         <div class="clause">
           <p class="clause-header"><strong>${f.title}</strong></p>
           <p class="excerpt">“${f.excerpt}”</p>
           <p class="explanation"><em>Plain language:</em> ${f.explanation}</p>
           <p class="suggestion">${f.suggestion}</p>
         </div>
       `).join("<hr class='clause-divider'>")}
     </div>
   `;
 }


 const analysisHTML = `
   ${renderClauses("✅", "Safe Clauses", safe)}
   ${renderClauses("⚠️", "Caution Clauses", caution)}
   ${renderClauses("❌", "Risky Clauses", risky)}
 `;
 analysisContainer.innerHTML = analysisHTML;


 // --- EXPORT BUTTON ---
 const exportBtn = document.createElement("button");
 exportBtn.textContent = "📤 Export Report";
 exportBtn.className = "export-btn";
 exportBtn.addEventListener("click", async () => {
   const report = {
     label,
     date,
     riskScore,
     summary: "Local analysis complete. Consult a professional for full review.",  // Static message (no AI)
     findings, // For detailed clauses
   };
    // Save to local storage (unchanged)
   const key = "report-" + Date.now();
   await chrome.storage.local.set({ [key]: report });
    // Generate and download PDF
   try {
     const { jsPDF } = window.jspdf; // Access jsPDF
     const doc = new jsPDF();
  
     // Title
     doc.setFontSize(20);
     doc.text("FinePrint Contract Analysis Report", 20, 20);
  
     // Document info
     doc.setFontSize(12);
     doc.text(`Document: ${label}`, 20, 40);
     doc.text(`Date: ${date}`, 20, 50);
     doc.text(`Risk Score: ${riskScore}/100 (${riskScore > 75 ? "High" : riskScore > 50 ? "Moderate" : "Low"} Risk)`, 20, 60);
  
     // Detailed Analysis (abridged for PDF; starts right after info, no AI section)
     let yPos = 80;
     doc.text("Detailed Analysis:", 20, yPos);
     yPos += 10;
  
     // Safe
     if (safe.length > 0) {
       doc.text("✅ Safe Clauses:", 20, yPos);
       yPos += 10;
       safe.slice(0, 2).forEach(f => { // Limit to 2 for space
         const clauseText = doc.splitTextToSize(`- ${f.title}: ${f.explanation}`, 170);
         doc.text(clauseText, 20, yPos);
         yPos += clauseText.length * 5;
       });
     }
  
     // Caution
     if (caution.length > 0) {
       doc.text("⚠️ Caution Clauses:", 20, yPos);
       yPos += 10;
       caution.slice(0, 2).forEach(f => {
         const clauseText = doc.splitTextToSize(`- ${f.title}: ${f.explanation} (${f.suggestion})`, 170);
         doc.text(clauseText, 20, yPos);
         yPos += clauseText.length * 5;
       });
     }
  
     // Risky
     if (risky.length > 0) {
       doc.text("❌ Risky Clauses:", 20, yPos);
       yPos += 10;
       risky.slice(0, 2).forEach(f => {
         const clauseText = doc.splitTextToSize(`- ${f.title}: ${f.explanation} (${f.suggestion})`, 170);
         doc.text(clauseText, 20, yPos);
         yPos += clauseText.length * 5;
       });
     }
  
     // Footer
     doc.setFontSize(10);
     doc.text("Generated by FinePrint — For educational use only. Consult a lawyer.", 20, 280);
  
     // Download
     doc.save(`FinePrint-Report-${new Date().toISOString().slice(0,10)}.pdf`);
   } catch (pdfErr) {
     console.error("PDF generation error:", pdfErr);
     alert("Local save successful, but PDF download failed. Ensure jsPDF is loaded.");
   }
    alert("Report saved locally and PDF downloaded!");
 });
 resultsEl.appendChild(exportBtn);

 setStatus("Analysis complete.");
}


function initScanSection() {
 const statusEl = document.getElementById('status');
 const resultsEl = document.getElementById('results');
 const scanBtn = document.getElementById('scanPage');
 const fileInputBtn = document.getElementById('fileInputBtn');
 const fileInput = document.getElementById('fileInput');


 function setStatus(msg) {
   if (statusEl) statusEl.textContent = msg;
 }


 scanBtn.addEventListener("click", () => {
   setStatus("Requesting page text...");
   chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
     chrome.tabs.sendMessage(tabs[0].id, { type: "GET_PAGE_TEXT" }, (resp) => {
       if (!resp || !resp.text) {
         setStatus("No text found on page.");
         return;
       }
       analyzeAndRender(resp.text, resp.url);
     });
   });
 });


 fileInputBtn.addEventListener("click", () => fileInput.click());
 fileInput.addEventListener("change", async (e) => {
   const file = e.target.files[0];
   if (!file) return;
   const reader = new FileReader();
   reader.onload = async (ev) => {
     analyzeAndRender(ev.target.result, file.name);
   };
   reader.readAsText(file);
 });
}


/* ===== HISTORY REPORTS SECTION ===== */

function initHistorySection() {
 const historyList = document.getElementById("historyList");
 const toggleBtn = document.getElementById("toggleHistory");
 const toggleIcon = toggleBtn.querySelector(".history-toggle");
 const currentUser = localStorage.getItem("currentUser");


 // Load reports from localStorage
 const reports = JSON.parse(localStorage.getItem(`reports_${currentUser}`) || "[]");


 // Populate the history list
 if (reports.length === 0) {
   historyList.innerHTML = `<p style="color:#666;">No past reports found. Try scanning a page first.</p>`;
 } else {
   historyList.innerHTML = reports
     .map(
       (r, i) => `
       <div class="history-item">
         <strong>📄 ${r.fileName || "Unnamed Document"}</strong><br>
         <small>${r.date || "Unknown date"}</small>
       </div>
     `
     )
     .join("");
 }


 // Toggle visibility
 toggleBtn.addEventListener("click", () => {
   historyList.classList.toggle("show");
   toggleIcon.classList.toggle("open");
 });
}


 // Highlight active navbar button (adds visual "active" state)
 document.querySelectorAll('.navbar button').forEach(btn => {
   btn.addEventListener('click', () => {
     document.querySelectorAll('.navbar button').forEach(b => b.classList.remove('active'));
     btn.classList.add('active');
   });
 });


 // --- ADMIN ANALYTICS BUTTON ---
 const navbar = document.querySelector(".navbar");
 if (navbar && !navbar.querySelector("[data-section='analytics']")) {
   const analyticsBtn = document.createElement("button");
   analyticsBtn.dataset.section = "analytics";
   analyticsBtn.classList.add("admin-only");
   analyticsBtn.style.display = "none"; // hidden unless admin
   analyticsBtn.textContent = "Analytics";
   navbar.appendChild(analyticsBtn);

   // make analytics button work like other tabs
   analyticsBtn.addEventListener("click", () => {
     document.querySelectorAll(".navbar button").forEach(b => b.classList.remove("active"));
     analyticsBtn.classList.add("active");
     loadSection("analytics");
   });
 }


 // --- SHOW ADMIN BUTTON IF ADMIN IS LOGGED IN ---
 chrome.storage.local.get(["accounts", "currentUser"], (data) => {
   const currentUser = data.currentUser;
   const accounts = data.accounts || [];
   const user = accounts.find(acc => acc.username === currentUser);


   if (user && user.role === "admin") {
     document.querySelectorAll(".admin-only").forEach(el => {
       el.style.display = "inline-block";
     });
   }
 });


});



