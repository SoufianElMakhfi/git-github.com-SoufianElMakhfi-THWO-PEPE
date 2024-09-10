let canvas;
let world;
let keyboard = new Keyboard();


function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    // Füge die Event-Listener für die mobilen Buttons hinzu
    document.getElementById('mobile_leftBtn').addEventListener('touchstart', () => {
        keyboard.LEFT = true; // Bewegung nach links aktivieren, wenn der linke Button berührt wird
    });

    document.getElementById('mobile_leftBtn').addEventListener('touchend', () => {
        keyboard.LEFT = false; // Bewegung nach links deaktivieren, wenn der linke Button losgelassen wird
    });

    document.getElementById('mobile_rightBtn').addEventListener('touchstart', () => {
        keyboard.RIGHT = true; // Bewegung nach rechts aktivieren, wenn der rechte Button berührt wird
    });

    document.getElementById('mobile_rightBtn').addEventListener('touchend', () => {
        keyboard.RIGHT = false; // Bewegung nach rechts deaktivieren, wenn der rechte Button losgelassen wird
    });

    document.getElementById('mobile_jumpBtn').addEventListener('touchstart', () => {
        keyboard.UP = true; // Springen aktivieren, wenn der Sprung-Button berührt wird
    });

    document.getElementById('mobile_jumpBtn').addEventListener('touchend', () => {
        keyboard.UP = false; // Springen deaktivieren, wenn der Sprung-Button losgelassen wird
    });

    document.getElementById('mobile_throwBtn').addEventListener('touchstart', () => {
        keyboard.RBMOUSE = true; // Werfen aktivieren, wenn der Werfen-Button berührt wird
    });

    document.getElementById('mobile_throwBtn').addEventListener('touchend', () => {
        keyboard.RBMOUSE = false; // Werfen deaktivieren, wenn der Werfen-Button losgelassen wird
    });
}

window.addEventListener("keydown", (event) => {
    if(event.code == 'KeyD') {
        keyboard.RIGHT = true;
    }
    if (event.code == 'KeyA') {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 115) {
        keyboard.DOWN = true;
    }
    if (event.code == 'Space'){
        keyboard.UP = true;
    }
    if (event.code == 'KeyW'){
        keyboard.RBMOUSE = true;
    }

});

window.addEventListener("keyup", (event) => {
    if(event.code == 'KeyD') {
        keyboard.RIGHT = false;
    }
    if (event.code == 'KeyA') {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 115) {
        keyboard.DOWN = false;
    }
    if (event.code == 'Space'){
        keyboard.UP = false;
    }
    if (event.code == 'KeyW'){
        keyboard.RBMOUSE = false;
    }

});
function refreshPage() {
    document.getElementById('gameOverScreen').style.display = 'none'; 
    window.location.reload();
}
function toggleMute() {
    let allAudioElements = document.querySelectorAll('audio');
    allAudioElements.forEach(audio => {
        audio.muted = !audio.muted; // Umkehrung des Mute-Status für jedes Audio-Element
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('muteBtn').addEventListener('click', toggleMute);
});