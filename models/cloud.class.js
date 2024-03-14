class Cloud extends MoveableObject {
    width = 2680;
    height = 700;        
    y = 40;
    speed = 0.15;
    otherDirection = false;


    constructor(){
        super(); // Ruft den Konstruktor der Basisklasse ohne Bildpfad auf
        this.loadImage('img/img_pollo_locco/img/5_background/new_clouds.png'); // Lädt das Bild für die Wolke
        this.x = Math.random() * 500;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = true; 
        }, 100 / 160);
    }}