console.log("Script loaded");

/* Skapar variabler för formuläret och listan */
const form = document.getElementById("newContactForm");
const list = document.getElementById("AddressList");

let editingId = null;

/* Skapar en event listener för formulärets submit-event som hanterar inskickning av nya kontakter samt stopar att sidan laddas om */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  /* Hämtar värden från formuläret som ska skickas till servern */
  const data = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    phone: form.phone.value,
    address: form.address.value,
    postCode: form.postCode.value,
    city: form.city.value,
    category: form.category.value,
  };

  const method = editingId ? "PUT" : "POST";
  const url = editingId ? `/contacts/${editingId}` : "/contacts";

  /* Skapar en post route till backend-endpoint /contacts och skickar det i JSON-format */
  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  showModal(
  editingId ? "Kontakt uppdaterad" : "Kontakt skapad",
  editingId
    ? "Kontakten har uppdaterats korrekt."
    : "Kontakten har sparats i adressboken.",
  "success"
 );


  /* Rensar formuläret efter inskickning och använder loadData för att uppdatera listan */
  editingId = null;
  form.reset();
  loadData();
});

/* Skapar en funktion som hämtar data från backend och uppdaterar listan */
async function loadData() {
  const res = await fetch("/contacts");
  if (!res.ok) {
    console.error("Fetch failed");
    return;
  }
  const items = await res.json();

  list.innerHTML = "";
  list.className = "list-group";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "list-group-item";

    const card = document.createElement("div");
    card.className = "card";

    if (item.category === "family") {
      card.classList.add("bg-success-subtle");
    } else if (item.category === "friends") {
      card.classList.add("bg-warning-subtle");
    } else if (item.category === "work") {
      card.classList.add("bg-danger-subtle");
    }

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.textContent = `${item.firstName} ${item.lastName}`;

    const pPhone = document.createElement("p");
    pPhone.textContent = `Nummer: ${item.phone}`;

    const pAddress = document.createElement("p");
    pAddress.textContent = `Adress: ${item.address}`;

    const pCity = document.createElement("p");
    pCity.textContent = `${item.city} – ${item.postCode}`;

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "d-flex gap-2";

    const editButton = document.createElement("button");
    editButton.className = "btn btn-sm btn-warning";
    editButton.textContent = "Redigera";

    editButton.addEventListener("click", () => {
      form.firstName.value = item.firstName;
      form.lastName.value = item.lastName;
      form.phone.value = item.phone;
      form.address.value = item.address;
      form.postCode.value = item.postCode;
      form.city.value = item.city;
      form.category.value = item.category;
      editingId = item.id;
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-sm btn-danger";
    deleteButton.textContent = "Ta bort";

    deleteButton.addEventListener("click", async () => {
      if (!confirm("Ta bort kontakten?")) return;
      await fetch(`/contacts/${item.id}`, { method: "DELETE" });

     showModal(
      "Kontakt borttagen",
      "Kontakten har tagits bort.",
      "danger"
      );

      loadData();
    });

    buttonGroup.append(editButton, deleteButton);
    cardBody.append(h5, pPhone, pAddress, pCity, buttonGroup);
    card.appendChild(cardBody);
    li.appendChild(card);
    list.appendChild(li);
  });
}

function showModal(title, message, type = "success") {
  const modalEl = document.getElementById("feedbackModal");
  const modalTitle = document.getElementById("feedbackTitle");
  const modalBody = document.getElementById("feedbackBody");

  modalTitle.textContent = title;
  modalBody.textContent = message;

  modalTitle.className = modal-title text-${type};

  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

loadData();
