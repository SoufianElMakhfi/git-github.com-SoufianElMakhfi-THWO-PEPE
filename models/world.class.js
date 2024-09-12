class World{
    character = new Character();
    endboss = new Endboss();
    bottle = new ThrowableObject();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarCoins = new StatusBarCoins();
    statusBar = new StatusBar();
    statusBarEndboss = new StatusBarEndboss();
    statusBarBottles = new StatusBarBottle();
    throwableObjects = [];
    BottleCollect = [new BottleCollect(), new BottleCollect(), new BottleCollect(), new BottleCollect(), new BottleCollect(), new BottleCollect(), new BottleCollect(), new BottleCollect(), new BottleCollect()];
    CoinCollect = [new CoinCollect(), new CoinCollect(), new CoinCollect(), new CoinCollect(), new CoinCollect()];
    gameOver = false;
    
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.coinCollectSound = new Audio('audio/coin_collect.mp3');
        this.bottleCollectSound = new Audio('audio/bottle_collect.mp3');
        this.endboss.character = this.character;
    }

    setWorld(){
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            if (!this.gameOver) {  // Spiel läuft nur, wenn gameOver false ist
                this.checkCollisions();
                this.checkThrowObjects();
                this.checkCollisionBoss();
                this.collectCoins();
                this.collectBottles();
                this.checkBossProximity();
                this.checkGameOver();  // Neue Methode zum Überprüfen, ob das Spiel vorbei ist
            }
        }, 200);
    }

    checkGameOver() {
        if (this.character.energy <= 0 || this.endboss.health <= 0) {
            this.gameOver = true;  // Das Spiel wird angehalten
            this.displayGameOverScreen();  // Zeigt den Game-Over-Bildschirm an
        }
    }

    displayGameOverScreen() {
        let gameOverText = this.character.energy <= 0 ? "Game Over!" : "You Win!";
        // Einfache Methode, um den Game-Over-Bildschirm zu zeigen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = "80px AlloyInk";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText(gameOverText, this.canvas.width / 2, this.canvas.height / 2);
    }


    checkBossProximity() {
        const distanceToCharacter = Math.abs(this.character.x - this.endboss.x);

        if (distanceToCharacter < 900 && !this.endboss.hasRunForward) {
            this.endboss.runForward();
            this.endboss.hasRunForward = true; // Verhindert, dass der Endboss mehrfach läuft
        }
    }

    checkThrowObjects() {
        // Überprüfen, ob der Füllstand der Flaschenstatusleiste mindestens 20 % beträgt
        if (this.keyboard.RBMOUSE && this.statusBarBottles.percentage >= 20) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
    
            // Reduziere den Füllstand der Flaschenstatusleiste um 20 %
            let newPercentage = Math.max(this.statusBarBottles.percentage - 20, 0);
            this.statusBarBottles.setpercentage(newPercentage);
        }
    }
    
    

    checkCollisions() {
    // Überprüfen der Kollision mit normalen Feinden
    this.level.enemies.forEach((enemy, index) => {
        if (this.character.isColliding(enemy)) {
            if (enemy.energy > 0) {
                if (this.character.isColliding(enemy) && this.character.isAbovetheGround() && this.character.speedY < 0) {
                    enemy.energy = 0;
                    // Startet einen Timer, um den Feind nach 3 Sekunden zu entfernen
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                    }, 1000);
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

    // Überprüfen der Kollision mit dem Endboss
    if (this.character.isColliding(this.endboss)) {
        if (this.character.isAbovetheGround() && this.character.speedY < 0) {
            // Der Endboss erhält keinen Schaden, wenn der Charakter von oben kommt
            this.character.speedY = +15; // Charakter springt weg
        } else {
            // Verursacht Schaden nur, wenn der Endboss noch lebt
            this.character.hit();
            this.statusBar.setpercentage(this.character.energy);
        }
    }
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
    
                // Entferne die Münze aus der Sammlung
                this.CoinCollect.splice(index, 1);
    
                // Erhöhe die Statusleiste um 20, aber max auf 100 begrenzen
                let newPercentage = Math.min(this.statusBarCoins.percentage + 20, 100);
                this.statusBarCoins.setpercentage(newPercentage);
            }
        });
    }
    

    collectBottles() {
        this.BottleCollect.forEach((collectible, index) => {
            if (this.character.isColliding(collectible)) {
                // Erzeuge eine neue Audio-Instanz für das Aufsammeln der Flasche
                let bottleCollectSound = new Audio('audio/bottle_collect.mp3');
                bottleCollectSound.volume = 0.2;
                bottleCollectSound.play();
                setTimeout(() => {
                    bottleCollectSound.pause(); // Stoppe den Sound nach einer Sekunde
                }, 1000);
    
                // Entferne die Flasche aus der Sammlung
                this.BottleCollect.splice(index, 1);
    
                // Fülle die Statusleiste auf
                let newPercentage = Math.min(this.statusBarBottles.percentage + 20, 100);
                this.statusBarBottles.setpercentage(newPercentage);
    
                setTimeout(() => {
                    // Füge die Flasche nach 10 Sekunden wieder zur Sammlung hinzu
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
        this.addToMap(this.statusBarCoins);

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
    
    checkCollisionBoss() {
        setInterval(() => {
            this.throwableObjects.forEach((bottle, index) => {
                if (this.endboss.isColliding(bottle)) {
                    this.endboss.hittedBoss();
                    this.statusBarEndboss.setpercentage(this.endboss.health);
    
                    // Ändere die Richtung und verlangsame die Flasche nach dem Treffer
                    bottle.speedY = 3; // Verlangsamt die Fallgeschwindigkeit
                    bottle.x -= 10; // Ändert die Richtung der Bewegung, sodass die Flasche zurückfliegt
                    bottle.y -= 20; // Leicht Erhöhung um den Abprall zu simulieren
                    
                    // Entfernt die Flasche nach einiger Zeit, damit sie nicht ewig bleibt
                    setTimeout(() => {
                        this.throwableObjects.splice(index, 1);
                    }, 10000);
                }
            });
        }, 1000);
    }
}    