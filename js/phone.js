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
    <div class="card-actions justify-center">
      <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>`;
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
};

const handlePhone = () => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("input-field");
  const searchText = searchField.value;

  loadPhone(searchText);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingspinner = document.getElementById("load-spinner");
  if (isLoading) {
    loadingspinner.classList.remove("hidden");
  } else {
    loadingspinner.classList.add("hidden");
  }
};

const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showDetails(phone);
};

const showDetails = (phone) => {
  console.log(phone);
  const showDetailsContainer = document.getElementById("showDetailsContainer");
  showDetailsContainer.innerHTML = `
  <h2 class="text-3xl font-bold">${phone.name}</h2>
  <img src="${phone.image}" alt="">
      <h3>Storage: ${phone?.mainFeatures?.storage}</h3>
      <h3>Display Size: ${phone?.mainFeatures?.displaySize}</h3>
      <h3>Chip Set: ${phone?.mainFeatures?.chipSet}</h3>
      <h3>Memory : ${phone?.mainFeatures?.memory}</h3>
      <h3>Slug: ${phone?.slug}</h3>
      <h3>Realize data: ${phone?.releaseDate}</h3>
      <h3>Brand: ${phone?.brand}</h3>
      <h3>GPS: ${phone?.others?.GPS}</h3>
      
  `;
  show_details_modal.showModal();
};
// loadPhone();
