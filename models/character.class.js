class Character extends MoveableObject{
y = 100; 
speed = 10;
width = 100;
height = 360;


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

world;
walking_sound = new Audio('audio/walk_sound.mp3');
jumping_sound = new Audio('audio/jump.mp3');
coin_sound = new Audio ('audio/coin_collect.mp4');
bottle_sound = new Audio ('audio/bottle_collect.ogg')
collectedBottles = 0;



    constructor(){
        super().loadImage('img/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEPING);
        this.jumping_sound.volume = 0.5; // 50% Lautstärke
        this.applyGravity();
        this.animate();
    }
    collectBottle() {
        this.collectedBottles++; // Erhöht die Anzahl der gesammelten Flaschen
    }
    
    throwBottle() {
        if (this.collectedBottles > 0) {
           
            this.collectedBottles--; 
        }
    }
    
    animate() {
    setInterval(() => {
    // this.walking_sound.pause(); Falls der sound zu lang ist
    if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){
        this.moveRight();
        this.walking_sound.play();
    }
    if(this.world.keyboard.LEFT && this.x > 0){
     this.moveLeft();
        this.walking_sound.play();
    }
    if(this.world.keyboard.UP && !this.isAbovetheGround()) {
        this.jump();
    }   
      this.world.camera_x = -this.x +110;
    }, 1000/ 60);


        setInterval(() => {
            if(this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);
                document.getElementById('gameOverScreen').style.display = 'block'; // Zeigt den Game-Over-Bildschirm an
                
            } else if(this.isHurt()){
                this.playAnimation(this.IMAGES_HURT);
                this.jumping_sound.play();

            } else if(this.isAbovetheGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }  else {  
            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
            this.playAnimation(this.IMAGES_WALKING);
         }
       }
    },80);
    
}

    jump(){
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

