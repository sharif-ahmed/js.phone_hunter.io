const searchInput = document.getElementById('search-text-input');
const searchButton = document.getElementById('search-btn');
const showAllButton = document.getElementById('show-all-btn');
const showDetailsButton = document.getElementById('show-details-btn');
const productsContainer = document.getElementById('products-container');
const dataLoading = document.getElementById('data-loading');

function searchButtonClick() {
    productsContainer.innerHTML = '';
    let inputText = searchInput.value;
    loadPhones(inputText, true);
}

const loadPhones = async (searchText, show) => {
    showLoader(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const dataSize = data.data.length;
    displayPhones(data.data, dataSize, show);
}

const displayPhones = (items, dataSize, show) => {
    if (dataSize > 12 && show) {
        items = items.slice(0, 12);
        showAll(show);
    } else {
        showAll(false);
    }

    for (const item of items) {
        const productCard = document.createElement('div');
        productCard.classList = `card card-compact rounded-xl shadow-xl p-4`;
        productCard.innerHTML = `<figure class="flex justify-center bg-[#0d6efd0d] m-5 p-5 rounded-xl">
                                        <img src="${item.image}" alt="Shoes" />
                                </figure>
                                <div class="card-body text-center">
                                    <h2 class="card-title text-2xl font-bold text-[#403F3F]">${item.phone_name}</h2>
                                    <p class="text-[#706F6F] text-lg leading-[30px] my-3">There are many variations of passages
                                        of available, but the majority have suffered</p>
                                    <p class="text-[#403F3F] text-[25px] font-bold">$999</p>
                                    <button id="show-details-btn" class="text-white bg-[#0D6EFD] text-xl font-semibold
                                    rounded-lg py-[9px] px-[35px] my-4">Show details</button>
                                </div>`;
        productsContainer.appendChild(productCard);
    }
    showLoader(false);
}


const showLoader = (isShow) => {
    if (isShow)
        dataLoading.classList.remove("hidden");
    else
        dataLoading.classList.add("hidden");
}

const showAll = (isShow) => {
    if (isShow)
        showAllButton.classList.remove("hidden");
    else
        showAllButton.classList.add("hidden");
}








