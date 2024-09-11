class Endboss extends MoveableObject {
height = 600;
width = 350;
y = -40;
health = 100;
speed = 1;

    IMAGES_WALKING_ENDBOSS = [
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Kicking/0_Orc_Kicking_000.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Kicking/0_Orc_Kicking_001.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Kicking/0_Orc_Kicking_002.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Kicking/0_Orc_Kicking_003.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Kicking/0_Orc_Kicking_004.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Kicking/0_Orc_Kicking_005.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Kicking/0_Orc_Kicking_006.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Kicking/0_Orc_Kicking_007.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Run Slashing/0_Orc_Run Slashing_000.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Run Slashing/0_Orc_Run Slashing_001.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Run Slashing/0_Orc_Run Slashing_002.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Run Slashing/0_Orc_Run Slashing_003.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Run Slashing/0_Orc_Run Slashing_004.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Run Slashing/0_Orc_Run Slashing_005.png'
    ];

    IMAGES_DEAD_ENDBOSS = [
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Dying/0_Orc_Dying_009.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Dying/0_Orc_Dying_010.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Dying/0_Orc_Dying_011.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Dying/0_Orc_Dying_012.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Dying/0_Orc_Dying_013.png',
        'img/img_pollo_locco/img/Assets_2D/goblin/Orc/PNG/PNG Sequences/Dying/0_Orc_Dying_014.png'
    ];   


    constructor() {
        super().loadImage(this.IMAGES_WALKING_ENDBOSS[0]);
        this.loadImages(this.IMAGES_WALKING_ENDBOSS);
        this.loadImages(this.IMAGES_DEAD_ENDBOSS);
        this.x = 3440;
        this.isDead = false;
        this.animate();
        this.hasRunForward = false;
    }

    isBossDead() {
        return this.health <= 20;
    }

    hittedBoss() {
        this.health -= 2;
        if (this.health < 0) {
            this.health = 0;
        }
    }
    moveTowardsCharacter(characterX) {
        if (this.x < characterX) {
            this.x += this.speed; // Bewege den Endboss nach rechts
        } else {
            this.x -= this.speed; // Bewege den Endboss nach links
        }
    }
   
    runForward() {
        const fastSpeed = 10;
        const runDuration = 1000; // Zeitdauer in Millisekunden (2 Sekunden)
        const intervalDuration = 1000 / 60; // 60 FPS

        const startTime = Date.now(); // Startzeit speichern

        const runInterval = setInterval(() => {
            // Berechne die verstrichene Zeit
            const elapsedTime = Date.now() - startTime;

            if (elapsedTime < runDuration) {
                this.x -= fastSpeed; // Bewege nach vorne
            } else {
                clearInterval(runInterval); // Stoppe das Intervall, wenn die Zeit abgelaufen ist
            }
        }, intervalDuration);
    }

    
    animate() {
        let animationInterval = setInterval(() => {
            if (this.isBossDead() && !this.isDead) {
                this.isDead = true;  // Endboss stirbt jetzt
                this.playAnimation(this.IMAGES_DEAD_ENDBOSS);  // Startet die Sterbe-Animation
                clearInterval(animationInterval);  // Stoppt die Animation
    
                // Verzögert die Anzeige des "Win"-Screens um 1 Sekunde
                setTimeout(() => {
                    document.getElementById("winscreen").style.display = "block";
                }, 1500); 
                
            } else if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING_ENDBOSS);  // Spielt nur, wenn der Endboss lebt
                this.otherDirection = true; // Beispiel: der Boss bewegt sich
            }
        }, 1000 / 60);  // 60 FPS für die Animation
    
        // Bewege den Endboss nur, wenn er nicht tot ist
        setInterval(() => {
            if (!this.isDead) {
                this.moveTowardsCharacter(this.character.x);
            }
        }, 1000 / 60); // 60 FPS für die Bewegung
    }
}
    