const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displyPhone(phones);
};

const displyPhone = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  const shoAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12) {
    shoAllContainer.classList.remove("hidden");
  } else {
    shoAllContainer.classList.add("hidden");
  }

  phones = phones.slice(0, 12);

  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-200 w-96 shadow-xl`;
    phoneCard.innerHTML = `<figure>
    <img class="pt-4"
      src="${phone.image}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>`;
    phoneContainer.appendChild(phoneCard);
  });
};

const handlePhone = () => {
  const searchField = document.getElementById("input-field");
  const searchText = searchField.value;

  loadPhone(searchText);
};

// loadPhone();
