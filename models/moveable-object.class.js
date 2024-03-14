class MoveableObject extends DrawableObjekt {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    lastHit = 0;

    applyGravity(){
        setInterval(() => {
        if(this.isAbovetheGround() || this.speedY > 0 ) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;    
      }
    },1000 / 25);
    }
    isAbovetheGround(){
        if(this instanceof ThrowableObject){ // Throwable Objects should always fall
            return true;
        }else{
        return this.y < 110;
     }
}
isCollidingEnemy(mo){
    return this.x + this.width > mo.x &&
    this.y + this.height > mo.y &&
    this.x < mo.x &&
    this.y < mo.y + mo.height;
}

    // character.isCollidign(chicken);
    isColliding(mo){
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height;
    }

    hit(){
        this.energy -= 20;
        if (this.energy < 0){
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }

    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // difference in sec.
        return timepassed < 0.5;
    }

    isDead(){
        return this.energy == 0; 
    }
   
    playAnimation(images){
        let i = this.currentImage % images.length;    // Modulu der Mathematische rest
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    moveRight() {
        this.x += this.speed;  
        this.otherDirection = false;
        
    }    
    moveLeft() {
            this.x -= this.speed;
            this.otherDirection = true; 
       }
       jump(){
        this.speedY = 15;
       }

    }
    