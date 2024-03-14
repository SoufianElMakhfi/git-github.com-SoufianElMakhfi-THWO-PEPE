class DrawableObjekt {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120; 
    y = 310;
    height = 250;
    width = 200;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx){
        if (this instanceof Character || this instanceof Chicken ){
        ctx.beginPath();
        // ctx.lineWidth = '5';
        // ctx.strokeStyle = 'blue';
        // ctx.rect(this.x , this.y +310, this.width , this.height -250);
        ctx.stroke();
        }

        if (this instanceof Endboss || this instanceof ThrowableObject){
            ctx.beginPath();
            // ctx.lineWidth = '5';
            // ctx.strokeStyle = 'red';
            // ctx.rect(this.x , this.y +50, this.width -250, this.height -150);
            ctx.stroke();
            }

            if (this instanceof Chicken || this instanceof Character){
                ctx.beginPath();
                // ctx.lineWidth = '2';
                // ctx.strokeStyle = 'green';
                // ctx.rect(this.x, this.y +50, this.width -50, this.height -150);
                ctx.stroke();
            }
            
    }
    
        loadImages(arr){
        arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    });

    }
    
}
