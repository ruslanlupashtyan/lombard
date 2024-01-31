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
  setTimeout(() => {
    console.log(probe);
  }, 10000);
  console.log(target.closest(".item"));
}

document.querySelector("a.gold-calculate").addEventListener("click", (e) => {
  probeinit();
  Calculate(e.target, goldValues);
});

document.querySelector("a.silver-calculate").addEventListener("click", (e) => {
  probeinit();
  Calculate(e.target, silverValues);
});
