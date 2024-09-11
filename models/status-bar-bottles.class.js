class StatusBarBottle extends DrawableObjekt {

    
    IMAGES_BOTTLES = [
        'img/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 20;
        this.y = 70;
        this.width = 220;
        this.height = 50;
        this.setpercentage(0);
    }

    setpercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
