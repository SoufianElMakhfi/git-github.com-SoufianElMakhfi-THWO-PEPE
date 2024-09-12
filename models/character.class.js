class Character extends MoveableObject{
y = 100; 
speed = 10;
width = 100;
height = 360;
lastActionTime = new Date().getTime(); // Zeitpunkt der letzten Aktion
idleImageIndex = 120; // Bildindex für die Idle-Animation
idleCounter = 0; // Zählvariable für Idle-Frames
idlePlaying = false;

IMAGES_WALKING = [
'img/img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
'img/img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
'img/img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
'img/img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
'img/img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
'img/img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
];

IMAGES_JUMPING = [
'img/img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',
'img/img_pollo_locco/img/2_character_pepe/3_jump/J-32.png',
'img/img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
'img/img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
'img/img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
'img/img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
'img/img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
'img/img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',
'img/img_pollo_locco/img/2_character_pepe/3_jump/J-31.png'
];

IMAGES_DEAD = [
'img/img_pollo_locco/img/2_character_pepe/5_dead/D-51.png',
'img/img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
'img/img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
'img/img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
'img/img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
'img/img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
'img/img_pollo_locco/img/2_character_pepe/5_dead/D-57.png',
'img/img_pollo_locco/img/2_character_pepe/5_dead/D-57.png'


];

IMAGES_HURT = [
'img/img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
'img/img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
'img/img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png'

];

IMAGES_SLEEPING = [
    'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png'
];
IMAGES_IDLE = [
    'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png',
];

world;
walking_sound = new Audio('audio/walk_sound.mp3');
jumping_sound = new Audio('audio/jump.mp3');
coin_sound = new Audio ('audio/coin_collect.mp4');
bottle_sound = new Audio ('audio/bottle_collect.ogg')
collectedBottles = 0;
idle_sound = new Audio ('audio/snoring.mp3');



    constructor(){
        super().loadImage('img/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEPING);
        this.jumping_sound.volume = 0.5; // 50% Lautstärke
        this.idle_sound.volume = 0.3; 
        this.idle_sound.loop = true;  // Idle-Sound in eine Schleife setzen

        this.applyGravity();
        this.animate();
    }
    resetActionTimer() {
        this.lastActionTime = new Date().getTime(); // Timer zurücksetzen
    }

    checkInactivity() {
        let currentTime = new Date().getTime();
        let timeSinceLastAction = currentTime - this.lastActionTime;

        if (timeSinceLastAction >= 2500) { 
            this.playIdleAnimation(); // Langsame Idle-Animation aufrufen
            this.playIdleSound();
        }
    }
    playIdleSound() {
        if (!this.idlePlaying) { // Prüfen, ob der Idle-Sound schon läuft
            this.idle_sound.play();
            this.idlePlaying = true; // Flag setzen, dass der Sound läuft
        }
    
    }

    stopIdleSound() {
        if (this.idlePlaying) { // Nur stoppen, wenn der Sound läuft
            this.idle_sound.pause();
            this.idle_sound.currentTime = 0; // Zurückspulen des Sounds
            this.idlePlaying = false; // Flag zurücksetzen
        }
    }

    collectBottle() {
        this.collectedBottles++; // Erhöht die Anzahl der gesammelten Flaschen
    }
    
    throwBottle() {
        if (this.collectedBottles > 0) {
            this.collectedBottles--; 
        }
    }
    playIdleAnimation() {
        if (this.idleCounter % 15 == 0) { // Verlangsamt den Bildwechsel 
            this.playAnimation(this.IMAGES_IDLE);
            this.idleImageIndex++;
            if (this.idleImageIndex >= this.IMAGES_IDLE.length) {
                this.idleImageIndex = 0; // Zurücksetzen, wenn das Ende der Animation erreicht ist
            }
        }
        this.idleCounter++; // Erhöht den Frame-Zähler
    }

    animate() {
        setInterval(() => {
            if (!this.isDead() && !this.world.gameOver) { // Überprüfen, ob der Charakter nicht tot ist und das Spiel läuft
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.walking_sound.play();
                    this.resetActionTimer();
                    this.idleCounter = 0; // Zähler zurücksetzen, wenn der Charakter aktiv ist
                    this.idle_sound.pause(); // Idle-Sound stoppen
                }
                if (this.world.keyboard.LEFT && this.x > 0) {
                    this.moveLeft();
                    this.walking_sound.play();
                    this.resetActionTimer();
                    this.idleCounter = 0; // Zähler zurücksetzen, wenn der Charakter aktiv ist
                    this.stopIdleSound(); // Idle-Sound stoppen
                }
                if (this.world.keyboard.UP && !this.isAbovetheGround()) {
                    this.jump();
                    this.resetActionTimer();
                    this.idleCounter = 0; // Zähler zurücksetzen, wenn der Charakter aktiv ist
                    this.idle_sound.pause(); // Idle-Sound stoppen
                }
            } else {
                this.walking_sound.pause(); // Bewegung stoppen, wenn der Charakter tot ist
                this.idle_sound.pause(); // Idle-Sound stoppen, wenn das Spiel vorbei ist
            }
    
            this.world.camera_x = -this.x + 110;
            this.checkInactivity(); // Überprüfe, ob der Charakter inaktiv ist
        }, 1000 / 60);
    
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                document.getElementById('gameOverScreen').style.display = 'block';
                this.stopIdleSound(); // Stoppe Idle-Sound beim Tod
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.jumping_sound.play();
            } else if (this.isAbovetheGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 80);
    }

    jump() {
        this.jumping_sound.play();
        this.speedY = 25;
    }


    checkCollisions() {
        super.checkCollisions(); // Behält bestehende Kollisionsprüfungen bei
        // Erweitert die Kollisionsprüfung für das Einsammeln von Flaschen
        this.world.bottleCollectibles.forEach((bottle, index) => {
            if (this.isColliding(bottle)) {
                this.world.bottleCollectibles.splice(index, 1); // Entfernt die eingesammelte Flasche aus der Welt
                this.collectBottle(); // Aktualisiert die Anzahl der gesammelten Flaschen
            }
        });
    }

    isColliding(collectible) {
        return this.x < collectible.x + collectible.width &&
               this.x + this.width > collectible.x &&
               this.y < collectible.y + collectible.height &&
               this.y + this.height > collectible.y;
    }


}

