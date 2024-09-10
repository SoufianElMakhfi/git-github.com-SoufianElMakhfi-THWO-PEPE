class CoinCollect extends DrawableObjekt {
    width = 80;
    height = 60;
    x = -30;
    y = 420;

    IMAGES_COLLECT_COINS = [
        'img/img_pollo_locco/img/8_coin/coin_1.png',
    ];

    constructor(){
        super().loadImage('img/img_pollo_locco/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COLLECT_COINS);
        this.x = 540 + Math.random() * 3400; // Adjusted range to fit between 300 and 2000
        this.y = 50 + Math.random() * 150;
    }
}
