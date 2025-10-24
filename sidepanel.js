document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("section-container");
  const navButtons = document.querySelectorAll(".navbar button");

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
      case "home":
        container.innerHTML = `
          <section class="card">
            <div class="card-icon">🔍</div>
            <div class="card-body">
              <h2>Welcome to FinePrint</h2>
              <p>Scan contracts for risky clauses using our local AI heuristics. Your privacy is protected — all analysis happens on your device.</p>
              <button id="scanPage">🔎 Scan Current Page</button>
              <button id="fileInputBtn">📄 Upload File</button>
              <input type="file" id="fileInput" style="display:none">
              <div id="status"></div>
              <div id="results"></div>
            </div>
          </section>
        `;
        initScanSection();
        break;

      case "platforms":
        container.innerHTML = `
          <section class="card">
            <div class="card-icon">🧠</div>
            <div class="card-body">
              <h2>Platform Modules</h2>
              <ul>
                <li><strong>Analyzer</strong> – Scans for risky clauses using heuristics.</li>
                <li><strong>Crypto</strong> – Encrypts and decrypts local reports (AES-GCM).</li>
                <li><strong>Content</strong> – Extracts visible text from web pages.</li>
              </ul>
            </div>
          </section>
        `;
        break;

      case "faqs":
        container.innerHTML = `
          <section class="card">
            <div class="card-icon">❓</div>
            <div class="card-body">
              <h2>FAQs</h2>
              <p><strong>Q:</strong> Does FinePrint send my data anywhere?<br>
              <strong>A:</strong> No. Everything runs locally in your browser.</p>
              <p><strong>Q:</strong> Can I use this on PDF or image contracts?<br>
              <strong>A:</strong> Yes! Upload images and enable OCR (Tesseract.js required).</p>
              <p><strong>Q:</strong> Is this legal advice?<br>
              <strong>A:</strong> No — it’s an educational tool for awareness.</p>
            </div>
          </section>
        `;
        break;

      case "export":
        container.innerHTML = `
          <section class="card">
            <div class="card-icon">💾</div>
            <div class="card-body">
              <h2>Saved Reports</h2>
              <button id="viewReports">📁 View Encrypted Reports</button>
              <div id="reportList"></div>
            </div>
          </section>
        `;
        initExportSection();
        break;
    }
  }

  function initScanSection() {
    const statusEl = document.getElementById('status');
    const resultsEl = document.getElementById('results');
    const scanBtn = document.getElementById('scanPage');
    const fileInputBtn = document.getElementById('fileInputBtn');
    const fileInput = document.getElementById('fileInput');

    function setStatus(msg) { statusEl.textContent = msg; }

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

    async function analyzeAndRender(text, label) {
      setStatus("Analyzing...");
      const findings = Analyzer.scan(text);
      resultsEl.innerHTML = findings.length
        ? findings.map(f => `<div class="card"><strong>${f.title}</strong><br>${f.excerpt}</div>`).join("")
        : "<p>No risky clauses found.</p>";
      setStatus("Analysis complete.");
    }
  }

  function initExportSection() {
    const viewBtn = document.getElementById("viewReports");
    const reportList = document.getElementById("reportList");

    viewBtn.addEventListener("click", () => {
      chrome.storage.local.get(null, (items) => {
        reportList.innerHTML = "";
        const keys = Object.keys(items).filter(k => k.startsWith("report-"));
        if (keys.length === 0) {
          reportList.innerHTML = "<p>No saved reports.</p>";
          return;
        }
        keys.forEach(k => {
          const div = document.createElement("div");
          div.textContent = k;
          div.className = "report-item";
          div.onclick = () => alert("Decrypt feature coming soon!");
          reportList.appendChild(div);
        });
      });
    });
  }
});