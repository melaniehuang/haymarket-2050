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
            name: 'Mel house',
            model: './assets/models/Mascot-White_ForAR_compressed.glb',
            vsrc: 'https://melhuangbuntine.com/position-0.mp4',
            fsrc: 'https://my.culturevault.com/mint/4Aa4Show/0x25F08ac3aA1E0cDcd70837f28b8FeBE46Fff4939/0/embed?title=Collect%204A%20Character&image=https://cdn.culturevault.com/fa141316fd9500f5a4a1ced8d4f16c38.png',
            location: {
                lat: -37.698789,
                lng: 145.022965,
            }
        }, {
            name: '4A Gallery',
            model: './assets/models/GACHAPON_AR_compressed.glb',
            vsrc: 'https://melhuangbuntine.com/position-1.mp4',
            fsrc: 'https://my.culturevault.com/mint/4Aa4Show/0x25F08ac3aA1E0cDcd70837f28b8FeBE46Fff4939/0/embed?title=Collect%204A%20Character&image=https://cdn.culturevault.com/fa141316fd9500f5a4a1ced8d4f16c38.png',
            location: {
                lat: -33.8799646,
                lng: 151.2014678,
            }
        }, {
            name: 'Market City',
            model: './assets/models/Mascot-Red_ForAR_compressed.glb',
            vsrc: 'https://melhuangbuntine.com/position-2.mp4',
            fsrc: 'https://my.culturevault.com/mint/4Aa4Show/0x25F08ac3aA1E0cDcd70837f28b8FeBE46Fff4939/0/embed?title=Collect%204A%20Character&image=https://cdn.culturevault.com/fa141316fd9500f5a4a1ced8d4f16c38.png',
            location: {
                lat: -33.8796149,
                lng: 151.2045894,
            }
        }, {
            name: 'Ceremonial Gate',
            model: './assets/models/Mascot-Black_ForAR_compressed.glb',
            vsrc: 'https://melhuangbuntine.com/position-0.mp4',
            fsrc: 'https://my.culturevault.com/mint/4Aa4Show/0x25F08ac3aA1E0cDcd70837f28b8FeBE46Fff4939/0/embed?title=Collect%204A%20Character&image=https://cdn.culturevault.com/fa141316fd9500f5a4a1ced8d4f16c38.png',
            location: {
                lat: -33.8793504,
                lng: 151.204183,
            }
        }, {
            name: 'Ching Yip Cafe',
            model: './assets/models/Mascot-Blue_compressed.glb',
            vsrc: 'https://melhuangbuntine.com/position-1.mp4',
            fsrc: 'https://my.culturevault.com/mint/4Aa4Show/0x25F08ac3aA1E0cDcd70837f28b8FeBE46Fff4939/0/embed?title=Collect%204A%20Character&image=https://cdn.culturevault.com/fa141316fd9500f5a4a1ced8d4f16c38.png',
            location: {
                lat: -33.8788058,
                lng: 151.2048132,
            }
        }, {
            name: 'Harbour City Twin Cinema',
            model: './assets/models/Mascot-White_ForAR_compressed.glb',
            vsrc: 'https://melhuangbuntine.com/position-2.mp4',
            fsrc: 'https://my.culturevault.com/mint/4Aa4Show/0x25F08ac3aA1E0cDcd70837f28b8FeBE46Fff4939/0/embed?title=Collect%204A%20Character&image=https://cdn.culturevault.com/fa141316fd9500f5a4a1ced8d4f16c38.png',
            location: {
                lat: -33.8788425,
                lng: 151.1996007,
            }
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
        model.setAttribute('src', place.model);
        model.setAttribute('name', place.name);
        model.setAttribute('videoSrc', place.vsrc);
        model.setAttribute('frameSrc', place.fsrc);
        model.setAttribute('roughness', '0');
        model.setAttribute('scale', '5 5 5');
        model.setAttribute('position', '0 5 0');
        model.setAttribute('animation', "property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true");
        model.setAttribute('cursor-listener','');
        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
            document.getElementById("loaderContainer").style.display = 'none';
            document.getElementById("enterButton").style.display = 'inline';
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
            document.getElementById("frameSrc").src = elementClicked.getAttribute('frameSrc');
            openMedia('videoScreen');
        });
    }
});

function hideAOC(){
    console.log('cookies detected. aoc hidden.');
    document.getElementById("loading").style.display = 'none';
}

function startAR(){
    document.getElementById("startScreen").style.display = 'none';
}

function openMedia(id){
    document.getElementById(id).style.display = 'flex';
}

function closeMedia(id){
    document.getElementById(id).style.display = 'none';
}