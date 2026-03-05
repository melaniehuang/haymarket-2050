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
            vsrc: 'https://melhuangbuntine.com/4A-GALLAERY-HAYMARKET-2050_web.mp4',
            fsrc: 'https://www.culturevault.com/mint/injury/0xc5f6df1bfc815cba5d0c480b02ddd179d46ef702/4/embed?title=Haymarket%202050%20FREEDOM&image=https://cdn.culturevault.com/injury/FREEDOM.jpg',
            location: {
                lat: -37.698789,
                lng: 145.022965,
            }
        }, {
            name: '4A Gallery: FREEDOM',
            model: './assets/models/GACHAPON_AR_compressed.glb',
            vsrc: 'https://melhuangbuntine.com/4A-GALLAERY-HAYMARKET-2050_web.mp4',
            fsrc: 'https://www.culturevault.com/mint/injury/0xc5f6df1bfc815cba5d0c480b02ddd179d46ef702/4/embed?title=Haymarket%202050%20FREEDOM&image=https://cdn.culturevault.com/injury/FREEDOM.jpg',
            location: {
                lat: -33.8798603410519,
                lng: 151.20587206365576,
            }
        }, {
            name: 'Market City: VITALITY',
            model: './assets/models/Mascot-Red_ForAR_compressed.glb',
            vsrc: 'https://melhuangbuntine.com/MARKET-CITY-HAYMARKET-2050_web.mp4',
            fsrc: 'https://www.culturevault.com/mint/injury/0xc5f6df1bfc815cba5d0c480b02ddd179d46ef702/1/embed?title=Haymarket%202050%20VITALITY&image=https://cdn.culturevault.com/injury/VITALITY.png',
            location: {
                lat: -33.87962836960876,
                lng: 151.20452544607548,
            }
        }, {
            name: 'Ceremonial Gate: GROWTH',
            model: './assets/models/Mascot-Black_ForAR_compressed.glb',
            vsrc: 'https://melhuangbuntine.com/CREMONIAL-GATE-HAYMARKET-2050_web.mp4',
            fsrc: 'https://www.culturevault.com/mint/injury/0xc5f6df1bfc815cba5d0c480b02ddd179d46ef702/2/embed?title=Haymarket%202050%20GROWTH&image=https://cdn.culturevault.com/injury/GROWTH.png',
            location: {
                lat: -33.87931167904098,
                lng: 151.20415631635544,
            }
        }, {
            name: 'Ching Yip Cafe: NATURE',
            model: './assets/models/Mascot-Blue_compressed.glb',
            vsrc: 'https://melhuangbuntine.com/CHINGYIPCAFE-HAYMARKET-2050_web.mp4',
            fsrc: 'https://www.culturevault.com/mint/injury/0xc5f6df1bfc815cba5d0c480b02ddd179d46ef702/0/embed?title=Haymarket%202050%20NATURE&image=https://cdn.culturevault.com/injury/NATURE.png',
            location: {
                lat: -33.87880314008585,
                lng: 151.2048506112996,
            }
        }, {
            name: 'Harbour City Twin Cinema: STARLIGHT',
            model: './assets/models/Mascot-White_ForAR_compressed.glb',
            vsrc: 'https://melhuangbuntine.com/CINEMA-HAYMARKET-2050_web.mp4',
            fsrc: 'https://www.culturevault.com/mint/injury/0xc5f6df1bfc815cba5d0c480b02ddd179d46ef702/3/embed?title=Haymarket%202050%20STARLIGHT&image=https://cdn.culturevault.com/injury/STARLIGHT.png',
            location: {
                lat: -33.87632840778945,
                lng: 151.2038878582812,
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
        model.setAttribute('scale', '4 4 4');
        model.setAttribute('position', '0 4 0');
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
    document.getElementById("debugInfo").style.display = 'flex';
}

function openMedia(id){
    document.getElementById(id).style.display = 'flex';
    if (id == "videoScreen"){
        let vid = document.getElementById("videoSrc");
        vid.currentTime = 0;
        vid.play();
    }  
    document.getElementById("debugInfo").style.display = 'none';
}

function closeMedia(id){
    document.getElementById(id).style.display = 'none';
    if (id == "videoScreen"){
        let vid = document.getElementById("videoSrc");
        vid.pause();
        document.getElementById("debugInfo").style.display = 'flex';
    }  
}