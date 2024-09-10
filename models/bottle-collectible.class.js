class BottleCollect extends DrawableObjekt {
    width = 80;
    height = 60;
    x = -10;
    y = 420;

    IMAGES_COLLECT_BOTTLES = [
        'img/img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
       
    ];

    isCollected = false; // add this property

    constructor(){
        super().loadImage('img/img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_COLLECT_BOTTLES);
        this.x = 540 + Math.random() * 3400;
        this.isCollected = true; // set to true when collected
    }

    // add a method to reset the collected state
    resetCollectedState() {
        this.isCollected = false;
    }
}