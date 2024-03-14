class World {
    character = new Character();
    endboss = new Endboss();
    bottle = new ThrowableObject();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarEndboss = new StatusBarEndboss();
    statusBarBottles = new StatusBarBottle();
    throwableObjects = [];
    BottleCollect = [new BottleCollect(), new BottleCollect(), new BottleCollect(), new BottleCollect(), new BottleCollect(), new BottleCollect(), new BottleCollect(), new BottleCollect(), new BottleCollect()];
    CoinCollect = [new CoinCollect(), new CoinCollect(), new CoinCollect(), new CoinCollect(), new CoinCollect(), new CoinCollect(), new CoinCollect(), new CoinCollect(), new CoinCollect(),new CoinCollect(), new CoinCollect(), new CoinCollect(), new CoinCollect(), new CoinCollect()];

    
    constructor(canvas, keyboard){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.coinCollectSound = new Audio('audio/coin_collect.mp3');
        this.bottleCollectSound = new Audio('audio/bottle_collect.mp3');

    }

    setWorld(){
        this.character.world = this;
    }

    run(){
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionBoss();
            this.collectCoins(); 
            this.collectBottles();

        }, 200);
    }

    checkThrowObjects(){
        if(this.keyboard.RBMOUSE){
            let bottle = new ThrowableObject (this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions(){
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)){
                if (enemy.energy > 0) {
                    if (this.character.isColliding(enemy) && this.character.isAbovetheGround() && this.character.speedY < 0) {
                        enemy.energy = 0;
                        // Startet einen Timer, um den Feind nach 3 Sekunden zu entfernen
                        setTimeout(() => {
                            this.level.enemies.splice(index, 1);
                        }, 3000);
                        this.character.speedY = +15;
    
                        let hitSound = new Audio('audio/goblin_hitted.mp3');
                        hitSound.volume = 0.5; // Lautstärke einstellen
                        hitSound.play();
                    } else {
                        // Verursacht Schaden nur, wenn der Feind noch lebt
                        this.character.hit();
                        this.statusBar.setpercentage(this.character.energy);
                    }
                }
            }
        });
    }
    
    collectCoins() {
        this.CoinCollect.forEach((collectible, index) => {
            if (this.character.isColliding(collectible)) {
                // Erzeuge eine neue Audio-Instanz für jede Münze
                let coinCollectSound = new Audio('audio/coin_collect.mp3');
                coinCollectSound.volume = 0.1;
                coinCollectSound.play();
                setTimeout(() => {
                    coinCollectSound.pause(); // Stoppe den Sound nach einer Sekunde
                }, 1000);
                this.CoinCollect.splice(index, 1); 
            }
        });
    }

    collectBottles() {
        this.BottleCollect.forEach((collectible, index) => {
            if (this.character.isColliding(collectible)) {
                // Erzeuge eine neue Audio-Instanz für jede Flasche
                let bottleCollectSound = new Audio('audio/bottle_collect.mp3');
                bottleCollectSound.volume = 0.2;
                bottleCollectSound.play();
                setTimeout(() => {
                    bottleCollectSound.pause(); // Stoppe den Sound nach einer Sekunde
                }, 1000);
    
                // Entferne die Flasche aus der Sammlung
                this.BottleCollect.splice(index, 1);
    
                setTimeout(() => {
                    //  addBottle() fügt die Flasche wieder hinzu
                    this.BottleCollect.push(collectible);
                }, 10000);
            }
        });
    }
    
    
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        
        // Space for fixed Objects
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarEndboss);
        this.addToMap(this.statusBarBottles);

        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character); 
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.BottleCollect);
        this.addObjectsToMap(this.CoinCollect);


        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo){ //moveable object
        if(mo.otherDirection){
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection){
            this.flipImageBack(mo);
        }
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width,0);
        this.ctx.scale(-1,1);
        mo.x  = mo.x * -1;
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
    
    checkCollisionBoss(){
        setInterval(() => {
            this.throwableObjects.forEach((bottle) => {
                if (this.endboss.isColliding(bottle)){
                    this.endboss.hittedBoss();
                    this.statusBarEndboss.setpercentage(this.endboss.health)
                    // Stellen Sie sicher, dass die Gesundheit des Endbosses nicht unter 0 fällt
                    console.log('collision Health', this.endboss.health);
                }
            });
        }, 1000);
    }
}
