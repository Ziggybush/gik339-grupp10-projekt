console.log("Script loaded")

/* Skapar variabler för formuläret och listan */
const form = document.getElementById("newContactForm");
const list = document.getElementById("AddressList");

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

/* Skapar en post route till backend-endpoint /contacts och skickar det i JSON-format */
    await fetch("/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  
  /* Rensar formuläret efter inskickning och använder loadData för att uppdatera listan */
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

  list.innerHTML = "<li>TEST</li>";
  items.forEach(item => {
    const li = document.createElement("li");

    const h3 = document.createElement("h3");
    h3.textContent = `${item.firstName} ${item.lastName}`;

    const pPhone = document.createElement("p");
    pPhone.textContent = `Nummer: ${item.phone}`;

    const pAddress = document.createElement("p");
    pAddress.textContent = `Adress: ${item.address}`;

    const pCity = document.createElement("p");
    pCity.textContent = `${item.city} – ${item.postCode}`;

    const editButton = document.createElement("button");
    editButton.textContent = "Redigera";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Ta bort";

    // Lägg in allt i li
    li.append(h3, pPhone, pAddress, pCity, editButton, deleteButton);
    list.appendChild(li);
  });
}

loadData();