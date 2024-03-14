class ThrowableObject extends MoveableObject {
    THROW_BOTTLE = [
        'img/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    
    throw_sound = new Audio('audio/throw.m4a');
    currentImageIndex = 0; // Zähler für das aktuelle Bild

    constructor(x, y){
        super();
        this.loadImages(this.THROW_BOTTLE);
        this.img = this.imageCache[this.THROW_BOTTLE[0]]; // Setze this.img auf das erste Bild
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 40;
        this.throw_sound.volume = 0.05; // 50% Lautstärke
        this.throw();
    }

    throw() {
        this.throw_sound.play();
      setInterval(() => {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.THROW_BOTTLE.length;
            this.img = this.imageCache[this.THROW_BOTTLE[this.currentImageIndex]];
        }, 200);

        this.speedY = 15;
        this.applyGravity();
        setInterval(() => {
            this.x += 20;
        }, 20);
    }}
