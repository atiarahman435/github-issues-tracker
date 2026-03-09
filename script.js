const loginBtn = document.getElementById("login-btn");
const loginSection = document.getElementById("login-section");
const appSection = document.getElementById("app-section");
const issuesContainer = document.getElementById("issues-container");
const issueCount = document.getElementById("issue-count");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const tabs = document.querySelectorAll(".tab");
const loader = document.getElementById("loader");

const issueModal = document.getElementById("issue-modal");
const closeModalBtn = document.getElementById("close-modal");

const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalStatus = document.getElementById("modal-status");
const modalAuthor = document.getElementById("modal-author");
const modalPriority = document.getElementById("modal-priority");
const modalLabel = document.getElementById("modal-label");
const modalCreated = document.getElementById("modal-created");

let allIssues = [];
let currentTab = "all";

loginBtn.addEventListener("click", function () {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "admin" && password === "admin123") {
    loginSection.classList.add("hidden");
    appSection.classList.remove("hidden");
    loadIssues();
  } else {
    alert("Wrong username or password");
  }
});

async function loadIssues() {
  try {
    showLoader();

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    allIssues = data.data || [];
    renderByTab(currentTab);
  } catch (error) {
    issuesContainer.innerHTML = "<p>Failed to load issues.</p>";
  } finally {
    hideLoader();
  }
}

function renderIssues(issues) {
  issuesContainer.innerHTML = "";
  issueCount.textContent = `${issues.length} Issues`;

  if (issues.length === 0) {
    issuesContainer.innerHTML = "<p>No issues found.</p>";
    return;
  }

  issues.forEach(function (issue) {
    const card = document.createElement("div");
    card.classList.add("issue-card");

    if (issue.status === "closed") {
      card.classList.add("closed");
    }

    card.innerHTML = `
      <h3>${issue.title || "No title"}</h3>
      <p class="desc">${issue.description || "No description available."}</p>
      <div class="issue-meta">
        <p><strong>Status:</strong> ${issue.status || "N/A"}</p>
        <p><strong>Author:</strong> ${issue.author || "N/A"}</p>
        <p><strong>Priority:</strong> ${issue.priority || "N/A"}</p>
        <p><strong>Label:</strong> ${issue.label || "N/A"}</p>
        <p><strong>Created:</strong> ${formatDate(issue.createdAt)}</p>
      </div>
    `;

    card.addEventListener("click", function () {
      openModal(issue);
    });

    issuesContainer.appendChild(card);
  });
}

function renderByTab(status) {
  currentTab = status;

  if (status === "all") {
    renderIssues(allIssues);
    return;
  }

  const filteredIssues = allIssues.filter(function (issue) {
    return (issue.status || "").toLowerCase() === status;
  });

  renderIssues(filteredIssues);
}

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    tabs.forEach(function (item) {
      item.classList.remove("active");
    });

    this.classList.add("active");
    const status = this.dataset.status;
    renderByTab(status);
  });
});

searchBtn.addEventListener("click", async function () {
  const searchText = searchInput.value.trim();

  if (searchText === "") {
    renderByTab(currentTab);
    return;
  }

  try {
    showLoader();

    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${encodeURIComponent(searchText)}`
    );
    const data = await res.json();

    renderIssues(data.data || []);
  } catch (error) {
    issuesContainer.innerHTML = "<p>Search failed.</p>";
  } finally {
    hideLoader();
  }
});

function openModal(issue) {
  modalTitle.textContent = issue.title || "No title";
  modalDescription.textContent = issue.description || "No description";
  modalStatus.textContent = issue.status || "N/A";
  modalAuthor.textContent = issue.author || "N/A";
  modalPriority.textContent = issue.priority || "N/A";
  modalLabel.textContent = issue.label || "N/A";
  modalCreated.textContent = formatDate(issue.createdAt);

  issueModal.classList.remove("hidden");
}

closeModalBtn.addEventListener("click", function () {
  issueModal.classList.add("hidden");
});

issueModal.addEventListener("click", function (event) {
  if (event.target === issueModal) {
    issueModal.classList.add("hidden");
  }
});

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

function formatDate(dateString) {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString();
}