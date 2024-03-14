class Chicken extends MoveableObject{
    width = 180;
    height = 160;
    y = 300;
    isDead = false;

    IMAGES_WALKING = [
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_000.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_001.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_002.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_003.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_004.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_005.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_006.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_007.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_008.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_009.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_010.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_011.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_012.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_013.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_014.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_015.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_016.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_017.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_018.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_019.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_020.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_021.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_022.png',
    'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Walking/0_Goblin_Walking_023.png'
    ];

    IMAGES_DEAD_ENEMY = [
        'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Dying/0_Goblin_Dying_006.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Dying/0_Goblin_Dying_007.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Dying/0_Goblin_Dying_008.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Dying/0_Goblin_Dying_009.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Goblin/PNG/PNG Sequences/Dying/0_Goblin_Dying_010.png'
    ]

    constructor(){
        super().loadImage('img/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD_ENEMY);
        
        this.x = 940 + Math.random() * 1800;
        this.speed = 0.10 + Math.random() * 0.3;
        this.animate();

    }
    animate() {
        this.movementInterval = setInterval(() => {
            if (!this.isDead) { // Bewegung nur, wenn das Huhn nicht tot ist
                this.moveLeft();
                this.otherDirection = true;
            }
        }, 1000 / 144);

        this.animationInterval = setInterval(() => {
            if (this.energy == 0 && !this.isDead) {
                this.playAnimation(this.IMAGES_DEAD_ENEMY);
                this.isDead = true; // Setze isDead auf true, nachdem die Todesanimation gestartet wurde
                // Warte bis die Todesanimation fertig ist, dann stoppe weitere Animationen
                setTimeout(() => {
                    clearInterval(this.animationInterval);
                }, this.calculateAnimationDuration(this.IMAGES_DEAD_ENEMY));
            } else if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100 / 60);
    }

    calculateAnimationDuration(images) {
        // Anpassen je nach tatsächlicher Dauer und Anzahl der Frames in der Todesanimation
        return images.length * (14000 / 144);
    }}