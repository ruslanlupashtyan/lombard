//! MAP
let map;
async function initMap() {
  const position = { lat: 48.26403532424799, lng: 25.928222491859717 };
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");
  map = new Map(document.querySelector("#map"), {
    zoom: 16,
    center: position,
    mapId: "DEMO_MAP_ID",
  });
  let directionsService = new google.maps.DirectionsService();
  let directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
  let markers = [
    ["Головна", 48.27456619246482, 25.944843728835497],
    ["Ентузіастів", 48.25881881416417, 25.950695872771263],
  ];
  for (let i = 0; i < markers.length; i++) {
    let mark = markers[i];
    new google.maps.Marker({
      position: { lat: mark[1], lng: mark[2] },
      map,
      title: mark[0],
    });
  }
  let currentSvgMarker = {
    path: "M18 0C8.05884 0 0 8.05884 0 18C0 33 18 48 18 48C18 48 36 33 36 18C36 8.05884 27.9412 0 18 0ZM18 24C14.6863 24 12 21.3137 12 18C12 14.6862 14.6863 12 18 12C21.3137 12 24 14.6862 24 18C24 21.3137 21.3137 24 18 24Z",
    fillColor: "blue",
    fillOpacity: 1,
    strokeWeight: 0,
    anchor: new google.maps.Point(15, 30),
  };
  function calculateAndDisplayRoute(
    directionsRenderer,
    directionsService,
    Dest,
    Curr
  ) {
    directionsService
      .route({
        origin: Curr,
        destination: Dest,
        travelMode: google.maps.TravelMode.WALKING,
      })
      .then((result) => {
        directionsRenderer.setDirections(result);
      })
      .catch((e) => {
        window.alert("Directions request failed due to " + e);
      });
  }
  let createDirection = document.querySelectorAll(".create-direction");
  createDirection.forEach((el) => {
    el.addEventListener("click", function () {
      let directionSelect = document.querySelector(".map .direction");
      console.log(this);
      navigator.geolocation.getCurrentPosition(function (position) {
        var currentLatitude = position.coords.latitude;
        var currentLongitude = position.coords.longitude;
        // if (!prevMarker) {
        //   prevMarker.setMap(null);
        // }
        let currentMarker = new google.maps.Marker({
          position: { lat: currentLatitude, lng: currentLongitude },
          map: map,
          icon: currentSvgMarker,
          center: map.setCenter(
            new google.maps.LatLng(currentLatitude, currentLongitude)
          ),
        });
        let Dest = JSON.parse(el.getAttribute("data-direction"));
        let Curr = { lat: currentLatitude, lng: currentLongitude };
        console.log(Dest);
        console.log(Curr);
        calculateAndDisplayRoute(
          directionsRenderer,
          directionsService,
          Dest,
          Curr
        );
      });
    });
  });
}
initMap();

// !Mobile Menu
document.querySelector(".hamburger").addEventListener("click", function () {
  document.querySelector(".header-mob").classList.toggle("show");
  document.querySelector("body").classList.toggle("hidden");
  document.querySelectorAll(".hamburger .line").forEach((el) => {
    el.classList.toggle("active");
  });
});

// !Video
if (
  document.querySelector(".video__play") !== null &&
  typeof (document.querySelector(".video__play") !== undefined)
) {
  document.querySelector(".video__play").addEventListener("click", function () {
    if (document.querySelector(".video__file").paused) {
      document.querySelector(".video__file").play();
    } else {
      document.querySelector(".video__file").pause();
    }
  });
}

// !Slider
let slider = new Swiper(".slider.swiper", {
  loop: true,
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
    draggable: true,
  },
});

// !Calculator
let tabs = document.querySelectorAll(".calculator .desktop .tabs a");
tabs.forEach((el) => {
  el.addEventListener("click", function () {
    if (el.classList.contains("active")) {
      return;
    } else {
      tabs.forEach((i) => {
        i.classList.remove("active");
      });
      el.classList.add("active");
      document.querySelectorAll(".calculator .items .item").forEach((i) => {
        i.classList.remove("active");
        if (
          i.getAttribute("data-type") === this.getAttribute("data-selector")
        ) {
          i.classList.add("active");
        }
      });
    }
  });
});

let mobileTabs = document.querySelectorAll(
  ".calculator .mobile .item .item__head"
);
let mobileItems = document.querySelectorAll(".calculator .mobile .item");
mobileTabs.forEach((el) => {
  el.addEventListener("click", function () {
    mobileItems.forEach((i) => {
      i.classList.remove("active");
    });
    el.closest(".item").classList.add("active");
  });
});

let goldValues;
let silverValues;

function probeinit() {
  goldValues = goldSelect.getSelected();
  silverValues = silverSelect.getSelected();
}

function Calculate(target, probe) {
  let count =
    probe * target.closest(".item").querySelector("input").value + " грн";
  target.closest(".item").querySelector(".total__count p").innerHTML = count;
  console.log(probe);
}

document.querySelectorAll("a.gold-calculate").forEach((el) => {
  el.addEventListener("click", (e) => {
    probeinit();
    Calculate(e.target, goldValues);
  });
});

document.querySelectorAll("a.silver-calculate").forEach((el) => {
  el.addEventListener("click", (e) => {
    probeinit();
    Calculate(e.target, silverValues);
  });
});

// ! iMask

let maskOption = {
  mask: "+{380}(00) 000-00-00",
};
// !!! Desktop
let techPhoneNumb = document.querySelector(".calculator #desktop-tech");
let hometechPhoneNumb = document.querySelector(".calculator #desktop-hometech");
let toolsPhoneNumb = document.querySelector(".calculator #desktop-tools");
let carPhoneNumb = document.querySelector(".calculator #desktop-car");
let otherPhoneNumb = document.querySelector(".calculator #desktop-other");

let techMask = IMask(techPhoneNumb, maskOption);
let honeMask = IMask(hometechPhoneNumb, maskOption);
let toolsMask = IMask(toolsPhoneNumb, maskOption);
let carMask = IMask(carPhoneNumb, maskOption);
let otherMask = IMask(otherPhoneNumb, maskOption);

// !!! Mobile
let mobTechPhoneNumb = document.querySelector(".calculator #m-desktop-tech");
let mobHometechPhoneNumb = document.querySelector(
  ".calculator #m-desktop-hometech"
);
let mobToolsPhoneNumb = document.querySelector(".calculator #m-desktop-tools");
let mobCarPhoneNumb = document.querySelector(".calculator #m-desktop-car");
let mobOtherPhoneNumb = document.querySelector(".calculator #m-desktop-other");

let mTechMask = IMask(mobTechPhoneNumb, maskOption);
let mHomeMask = IMask(mobHometechPhoneNumb, maskOption);
let mToolsMask = IMask(mobToolsPhoneNumb, maskOption);
let mCarMask = IMask(mobCarPhoneNumb, maskOption);
let mOtherMask = IMask(mobOtherPhoneNumb, maskOption);

//! BOT
let techForms = document.querySelectorAll(".calculator form.item.tech");
let carForm = document.querySelectorAll(".calculator form.item.car");
let otherForm = document.querySelectorAll(".calculator form.item.other");

const TOKEN = "7059803646:AAFEUefw_Rouk3Vno-iTUoLC-bpp504rlgs";
const CHAT_ID = "-1002077169505";
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

techForms.forEach((el) => {
  el.addEventListener("submit", sendTechForm);
});

carForm.forEach((el) => {
  el.addEventListener("submit", sendCarForm);
});

otherForm.forEach((el) => {
  el.addEventListener("submit", sendOtherForm);
});

function sendTechForm(e) {
  e.preventDefault();

  let message = `<b>ЗАМОВЛЕННЯ:</b>\n`;
  let select = this.querySelector(".ss-single").innerHTML;
  let model = this.querySelector("input[name='model']");
  let rating = this.querySelector("input[name='rating']:checked");
  let name = this.querySelector("input[name='name']");
  let phone = this.querySelector("input[name='phone']");

  if (rating == null) {
    alert("Поставте оцінку товару");
  }

  let inputs = this.querySelectorAll(".require");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      inputs[i].classList.add("err");
    } else {
      inputs[i].classList.remove("err");
    }
  }

  message += `
    <b>Тип техніки:</b>  ${select}
    <b>Модель:</b>  ${model.value}
    <b>Оцінка:</b>  ${rating.value}
    <b>Ім'я замовника:</b>  ${name.value}
    <b>Телефон:</b>  ${phone.value}
  `;
  // message += `
  //   <b>TYPE:</b>  ${select}
  //   <b>MODEL:</b>  ${model.value}
  //   <b>MARK:</b>  ${rating.value}
  //   <b>NAME:</b>  ${name.value}
  //   <b>PHONE:</b>  ${phone.value}
  // `;

  if (name.value == "" || model.value == "" || phone.value == "") {
    console.error("Empty values");
  } else if (phone.value.length !== 18) {
    console.error("Invalid phone numb");
  } else {
    // console.log(model.value);
    // console.log(rating.value);
    // console.log(name.value);
    // console.log(phone.value);
    axios
      .post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: message,
      })
      .then((res) => {
        model.value = "";
        name.value = "";
        rating.value = "";
        phone.value = "";
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => {
        console.log("form sent");
      });
  }
}

function sendCarForm(e) {
  e.preventDefault();

  let message = `<b>ЗАМОВЛЕННЯ:</b>\n`;
  let maker = this.querySelector("input[name='maker']");
  let model = this.querySelector("input[name='model']");
  let select = this.querySelector(".ss-single").innerHTML;
  let miles = this.querySelector("input[name='miles']");

  let name = this.querySelector("input[name='name']");
  let phone = this.querySelector("input[name='phone']");

  let inputs = this.querySelectorAll(".require");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      inputs[i].classList.add("err");
    } else {
      inputs[i].classList.remove("err");
    }
  }

  message += `

    <b>Виробник:</b>  ${maker.value}
    <b>Модель:</b>  ${model.value}
    <b>Рік випуску:</b>  ${select}
    <b>Пробіг:</b>  ${miles.value}
    <b>Ім'я:</b>  ${name.value}
    <b>Телефон:</b>  ${phone.value}
  `;
  // message += `
  //   <b>TYPE:</b>  ${select}
  //   <b>MODEL:</b>  ${model.value}
  //   <b>MARK:</b>  ${rating.value}
  //   <b>NAME:</b>  ${name.value}
  //   <b>PHONE:</b>  ${phone.value}
  // `;

  if (name.value == "" || model.value == "" || phone.value == "") {
    console.error("Empty values");
  } else if (phone.value.length !== 18) {
    console.error("Invalid phone numb");
  } else {
    // console.log(model.value);
    // console.log(rating.value);
    // console.log(name.value);
    // console.log(phone.value);
    axios
      .post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: message,
      })
      .then((res) => {
        maker.value = "";
        model.value = "";
        miles.value = "";
        name.value = "";
        phone.value = "";
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => {
        console.log("form sent");
      });
  }
}

function sendOtherForm(e) {
  e.preventDefault();

  let message = `<b>ЗАМОВЛЕННЯ:</b>\n`;
  let model = this.querySelector("input[name='model']");

  let name = this.querySelector("input[name='name']");
  let phone = this.querySelector("input[name='phone']");

  let inputs = this.querySelectorAll(".require");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      inputs[i].classList.add("err");
    } else {
      inputs[i].classList.remove("err");
    }
  }

  message += `
    <b>Модель:</b>  ${model.value}
    
    <b>Ім'я замовника:</b>  ${name.value}
    <b>Телефон:</b>  ${phone.value}
  `;

  if (name.value == "" || model.value == "" || phone.value == "") {
    console.error("Empty values");
  } else if (phone.value.length !== 18) {
    console.error("Invalid phone numb");
  } else {
    axios
      .post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: message,
      })
      .then((res) => {
        model.value = "";
        name.value = "";
        phone.value = "";
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => {
        console.log("form sent");
      });
  }
}
