const form = document.getElementById("newContactForm");
const list = document.getElementById("AddressList");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        phone: form.phone.value,
        address: form.address.value,
        postCode: form.postCode.value,
        city: form.city.value,
        category: form.category.value,
    };

    await fetch("/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  form.reset();
  loadData();
});

async function loadData() {
  const res = await fetch("/data");
  const items = await res.json();

list.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");

    const h3 = document.createElement("h3");
    h3.textContent = `${item.firstName} – ${item.lastName}`;

    const pPhone = document.createElement("p");
    pPhone.textContent = `Nummer: ${item.phone}`;

    const pAddress = document.createElement("p");
    pAddress.textContent = `Adress: ${item.address}`;

    const pCity = document.createElement("p");
    pCity.textContent = `${item.city} – ${item.postCode}`;

    // Lägg in allt i li
    li.append(h3, pPhone, pAddress, pCity);
    list.appendChild(li);
  });
}

loadData();