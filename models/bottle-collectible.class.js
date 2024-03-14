class BottleCollect extends DrawableObjekt {
    width = 80;
    height = 60;
    x = -10;
    y = 420;

    IMAGES_COLLECT_BOTTLES = [
        'img/img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        'img/img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        'img/img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
        ];

      


    constructor(){
        super().loadImage('img/img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_COLLECT_BOTTLES);
        this.x = 740 + Math.random() * 400;
    
    }

}
