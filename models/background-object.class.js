class backgroundObject extends MoveableObject {

    width = 1448;
    height = 720;
    constructor(imagePath, x, y){
        super().loadImage(imagePath);
    this.x = x;
    this.y = y;
    }



}