let inputVal = document.getElementById("input");
let searchBtn = document.getElementById("searchBtn");
let form = document.getElementById("form");
let photosDiv = document.getElementById("photosCont");
let mainDiv = document.getElementById("main");

let searchVal = "";
let searchPhotos = [];
let page = 1;

let moreBtn = document.createElement("button");
moreBtn.classList.add(
  "btn",
  "bg-teal-300",
  "w-[70px]",
  "h-[40px]",
  "rounded-lg",
  "text-xl",
  "font-semibold",
  "hover:bg-teal-400",
  "shadow-lg",
  "hidden"
);
moreBtn.id = "morebtn";
moreBtn.textContent = "more";
mainDiv.appendChild(moreBtn);

let photoCard = (item) => {
  let card = document.createElement("div");
  photosDiv.appendChild(card);

  let photo = document.createElement("img");
  photo.src = item.src;
  photo.id = item.id;
  photo.alt = item.alt;
  photo.classList.add("w-full", "rounded-lg", "shadow-md", "h-auto");
  card.appendChild(photo);
};

let displayPhotos = () => {
  if (searchPhotos.length !== 0) {
    photosDiv.innerHTML = "";
  }
  searchPhotos.forEach((item) => photoCard(item));
  if (searchPhotos.length !== 0) {
    moreBtn.classList.remove("hidden");
  }
};

let convertObj = (Obj, search) => {
  let data = Obj.photos.map((each) => ({
    alt: each.alt,
    id: each.id,
    photographer: each.photographer,
    src: each.src.original,
    url: each.url,
    identity: search + each.id,
  }));

  searchPhotos = [...searchPhotos, ...data];
  displayPhotos();
};

function getPhotos(search) {
  let url = `https://api.pexels.com/v1/search?page=${page}&per_page=25&query=${search}`;
  let AuthenticateApi =
    "X7N6LypEgJJx5dfB3Th6fv972BQ2oSntX1IkcSvAMBP6YE2N9R8H4vgy";
  let options = {
    method: "GET",
    headers: {
      Authorization: AuthenticateApi,
    },
  };
  fetch(url, options)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data) {
        convertObj(data, search);
      }
      inputVal.value = "";
    });
}

function clearAll() {
  searchPhotos = [];
  photosDiv.innerHTML = "";
  moreBtn.classList.add("hidden");
}

moreBtn.addEventListener("click", () => {
  page += 1;
  getPhotos(searchVal);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchVal = inputVal.value.trim();
  if (searchVal !== "") {
    clearAll();
    getPhotos(searchVal);
  }
});

inputVal.addEventListener("keydown", (e) => {
  searchVal = inputVal.value.trim();
  if (e.key === "Enter") {
    e.preventDefault();
    clearAll();
    getPhotos(searchVal);
  }
});

searchBtn.addEventListener("click", (e) => {
  searchVal = inputVal.value.trim();
  if (searchVal !== "") {
    e.preventDefault();
    clearAll();
    getPhotos(searchVal);
  }
});
