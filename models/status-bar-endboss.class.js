class StatusBarEndboss extends DrawableObjekt {
    


    IMAGES_ENDBOSS = [
        'img/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue100.png'


    ]
    percentage = 100;

    constructor(){
        super();
        this.loadImages(this.IMAGES_ENDBOSS);
        this.x = 1120;
        this.y = 27;
        this.width = 220;
        this.height = 50;
        this.setpercentage(100);
        

    }

    setpercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES_ENDBOSS[this.resolveImageIndex()];
        this.img = this.imageCache[path];


    }
    resolveImageIndex(){
        if(this.percentage == 100) {
            return 5;
        }  else if (this.percentage > 80){
            return 4
        } else if (this.percentage > 60){
            return 3;
        }else if (this.percentage > 40){
            return 2;
        }else if (this.percentage > 20){
            return 1;
        }else {
            return 0;
    }
}

}

