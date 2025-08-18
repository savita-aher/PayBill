// BOM: Show current time
const currentTime = document.getElementById("currentTime");
currentTime.textContent = "Current Time: " + new Date().toLocaleString();

// Cache elements
const form = document.getElementById("cardForm");
const cardName = document.querySelector("#cardName");
const dueDate = document.querySelector("#dueDate");
const cardLink = document.querySelector("#cardLink");
const tableBody = document.querySelector("#tableBody");
const formError = document.querySelector("#formError");

// Load from localStorage
let cards = JSON.parse(localStorage.getItem("cards")) || [];

// Form validation and submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!cardName.value || !dueDate.value || !cardLink.value) {
    formError.textContent = "All fields are required!";
    formError.classList.remove("hidden");
    return;
  }
  formError.classList.add("hidden");

  const card = {
    name: cardName.value,
    due: dueDate.value, // store as string
    link: cardLink.value,
    paid: false
  };

  cards.push(card);
  saveCards();
  renderTable();
  form.reset();
});

// Save to localStorage
function saveCards() {
  localStorage.setItem("cards", JSON.stringify(cards));
}

// Render table

function renderTable() {
  cards.sort((a, b) => new Date(a.due) - new Date(b.due));
  tableBody.innerHTML = "";

  const fragment = document.createDocumentFragment();
  const todayStr = new Date().toISOString().split("T")[0];

  cards.forEach((card, index) => {
    const tr = document.createElement("tr");
    const dueStr = new Date(card.due).toISOString().split("T")[0];

    // Apply row styling
    if (dueStr < todayStr && !card.paid) {
      tr.classList.add("overdue");
    }
    if (card.paid) {
      tr.classList.add("paid");
    }

    // Name cell
    const tdName = document.createElement("td");
    tdName.textContent = card.name;

    // Due date cell
    const tdDue = document.createElement("td");
    tdDue.textContent = new Date(card.due).toLocaleDateString();

    // Link cell
    const tdLink = document.createElement("td");
    const a = document.createElement("a");
    a.href = card.link;
    a.textContent = "Visit Site 🔗";
    a.target = "_blank";
    tdLink.appendChild(a);

    // Status cell
   const tdStatus = document.createElement("td");
let status = "Due";

if (card.paid) {
  status = "Paid";
} else if (dueStr < todayStr) {
  status = "Overdue";
}

tdStatus.textContent = status;
tdStatus.classList.add("status");

    // Action cell
    const tdAction = document.createElement("td");
    const btn = document.createElement("button");
    btn.textContent = "Mark Paid";
    btn.addEventListener("click", () => {
      card.paid = true;
      saveCards();
      renderTable();
    });
    tdAction.appendChild(btn);

    // Assemble row
    tr.appendChild(tdName);
    tr.appendChild(tdDue);
    tr.appendChild(tdLink);
    tr.appendChild(tdStatus);
    tr.appendChild(tdAction);

    fragment.appendChild(tr);
  });

  tableBody.appendChild(fragment);
}
// Initial render


renderTable();      