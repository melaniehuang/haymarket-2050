window.onload = () => {
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

function staticLoadPlaces() {
    return [
        {
            name: 'position-1',
            location: {
                lat: -37.69838009620836,
                lng: 145.02275136143385,
            },
            color: 'red'
        }, {
            name: 'position-2',
            location: {
                lat: -37.698897482821856,
                lng: 145.02287763502918,
            },
            color: 'blue'
        }, {
            name: 'position-3',
            location: {
                lat: -37.699077200463364,
                lng: 145.0232665464545,
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
        
        let model = document.createElement('a-sphere');
        model.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('src', './assets/magnemite/textures/TCom_Gore_2K_albedo.jpg');
        model.setAttribute('name', place.name);
        model.setAttribute('videoSrc', './assets/video/' + place.name + '.mp4');
        model.setAttribute('repeat', '2 2');
        model.setAttribute('normal-map', '#gore-NRM');
        model.setAttribute('normal-texture-repeat', '2 2');
        model.setAttribute('roughness', '0');
        model.setAttribute('color', place.color);
        model.setAttribute('radius', '2');
        model.setAttribute('position', '0 0 0');
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