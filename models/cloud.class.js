class Cloud extends MoveableObject {
    width = 2680;
    height = 700;        
    y = 40;
    speed = 0.3; 
    otherDirection = false;

    constructor(){
        super();
        this.loadImage('img/img_pollo_locco/img/5_background/new_clouds.png');
        this.x = Math.random() * 500;
        this.animate(); 
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);  
    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true; 
     
    }
}
