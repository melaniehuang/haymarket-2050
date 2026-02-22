window.onload = () => {
    let aoc = getCookie("aoc");
    if (aoc != "") {
        document.getElementById("loading").style.display = 'none';
    } else {
        document.cookie = "aoc=seen";
    }

    let places = staticLoadPlaces();
    renderPlaces(places);

    let testEntityAdded = false;
    const el = document.querySelector("[gps-new-camera]");
    el.addEventListener("gps-camera-update-position", e => {
        if(!testEntityAdded) {
            document.getElementById("long").innerHTML = `${e.detail.position.longitude}`;
            document.getElementById("lat").innerHTML = `${e.detail.position.latitude}`;
        }
    });
};

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function staticLoadPlaces() {
    return [
        {
            name: 'position-1',
            location: {
                lat: -37.698789,
                lng: 145.022965,
            },
            color: 'red'
        }, {
            name: 'position-2',
            location: {
                lat: -37.698951,
                lng: 145.023111,
            },
            color: 'blue'
        }, {
            name: 'position-3',
            location: {
                lat: -37.698778,
                lng: 145.023243,
            },
            color: 'white'
        }
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');
    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;
        
        let model = document.createElement('a-gltf-model');
        model.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        //model.setAttribute('src', './assets/magnemite/textures/TCom_Gore_2K_albedo.jpg');
        model.setAttribute('src', './assets/models/MASCOT-2_81kPoly_compressed.glb');
        model.setAttribute('name', place.name);
        model.setAttribute('videoSrc', './assets/video/' + place.name + '.mp4');
        model.setAttribute('repeat', '2 2');
        model.setAttribute('normal-map', '#gore-NRM');
        model.setAttribute('normal-texture-repeat', '2 2');
        model.setAttribute('roughness', '0');
        model.setAttribute('color', place.color);
        model.setAttribute('radius', '2');
        model.setAttribute('scale', '5 5 5');
        model.setAttribute('position', '0 5 0');
        model.setAttribute('animation', "property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true");
        model.setAttribute('cursor-listener','');
        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}

AFRAME.registerComponent('cursor-listener', {
  init: function () {
        this.el.addEventListener('mouseenter', function (evt) {
            var elementHovered = evt.target;
            document.getElementById("clickStateStatus").innerHTML = elementHovered.getAttribute('name');
        });

        this.el.addEventListener('mouseleave', function (evt) {
            document.getElementById("clickStateStatus").innerHTML = "...";
        });

        this.el.addEventListener('click', function (evt) {
            var elementClicked = evt.target;   
            document.getElementById("videoSrc").src = elementClicked.getAttribute('videoSrc');
            openMedia('videoScreen');
        });
    }
});

function startAR(){
    document.getElementById("startScreen").style.display = 'none';
}

function openMedia(id){
    document.getElementById(id).style.display = 'flex';
}

function closeMedia(id){
    document.getElementById(id).style.display = 'none';
}