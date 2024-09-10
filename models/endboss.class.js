class Endboss extends MoveableObject {
height = 600;
width = 350;
y = -40;
health = 150;


    IMAGES_WALKING_ENDBOSS = [
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Kicking/0_Orc_Kicking_000.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Kicking/0_Orc_Kicking_001.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Kicking/0_Orc_Kicking_002.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Kicking/0_Orc_Kicking_003.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Kicking/0_Orc_Kicking_004.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Kicking/0_Orc_Kicking_005.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Kicking/0_Orc_Kicking_006.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Kicking/0_Orc_Kicking_007.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Run Slashing/0_Orc_Run Slashing_000.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Run Slashing/0_Orc_Run Slashing_001.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Run Slashing/0_Orc_Run Slashing_002.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Run Slashing/0_Orc_Run Slashing_003.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Run Slashing/0_Orc_Run Slashing_004.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Run Slashing/0_Orc_Run Slashing_005.png'
    ];

    IMAGES_DEAD_ENDBOSS = [
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Dying/0_Orc_Dying_009.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Dying/0_Orc_Dying_010.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Dying/0_Orc_Dying_011.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Dying/0_Orc_Dying_012.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Dying/0_Orc_Dying_013.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Dying/0_Orc_Dying_014.png'
    ];   


    constructor(){
        super().loadImage(this.IMAGES_WALKING_ENDBOSS[0]);
        this.loadImages(this.IMAGES_WALKING_ENDBOSS);
        this.loadImages(this.IMAGES_DEAD_ENDBOSS);
        this.x = 3440;
        this.animate();
    }
    

    isBossDead() {
        return this.health <= 0;
    }
    
    hittedBoss(){
        this.health -= 2;
        if(this.health < 0){
            this.health = 0;
        }
    }

    animate() {
        let animationInterval = setInterval(() => {
            if (this.isBossDead()) {
                this.playAnimation(this.IMAGES_DEAD_ENDBOSS);
                clearInterval(animationInterval); 
                document.getElementById("winscreen").style.display = "block"; 
            } else {
                this.playAnimation(this.IMAGES_WALKING_ENDBOSS);
                this.otherDirection = true; 
            }
    
        }, 4000 / 60);
    }
}