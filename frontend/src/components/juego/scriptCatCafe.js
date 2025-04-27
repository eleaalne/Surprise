// canvas
const canvas = document.getElementById("canvasGame");
const ctx = canvas.getContext("2d");

// cat image
const catImg = new Image();
catImg.src = "catPic.png";

// fish image 
const fishImg = new Image();
fishImg.src = "fish.png"; 


let cat = { x: 50, y: 50, size: 80, speed: 5 }; // cat object
let fish = { x: 200, y: 200, size: 40 }; // fish object
let score = 0; // score
let imagesLoaded = 0; // images loaded

catImg.onload = fishImg.onload = () => { // images loaded
    imagesLoaded++; // increment images loaded
    if (imagesLoaded === 2) { // if images loaded is 2 (cat and fish)
        gameLoop(); // start game loop
    }
};


let keys = {}; // keys pressed
document.addEventListener("keydown", (event) => { // keydown event
    keys[event.key] = true; // key pressed
});

document.addEventListener("keyup", (event) => { // keyup event
    keys[event.key] = false; // key released
});


function update() {
    if (keys["ArrowUp"]) cat.y -= cat.speed; // move cat up
    if (keys["ArrowDown"]) cat.y += cat.speed; // move cat down
    if (keys["ArrowLeft"]) cat.x -= cat.speed; // move cat left
    if (keys["ArrowRight"]) cat.x += cat.speed; // move cat right

    cat.x = Math.max(0, Math.min(canvas.width - cat.size, cat.x)); // cat x position
    cat.y = Math.max(0, Math.min(canvas.height - cat.size, cat.y)); // cat y position

    if ( // if cat eats fish
        cat.x < fish.x + fish.size &&
        cat.x + cat.size > fish.x &&
        cat.y < fish.y + fish.size &&
        cat.y + cat.size > fish.y
    ) {
        score += 10; // increment score
        fish.x = Math.random() * (canvas.width - fish.size); // random x position for fish
        fish.y = Math.random() * (canvas.height - fish.size); // random y position for fish
    }
}


function draw() { // draw cat, fish and score
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas

    ctx.drawImage(fishImg, fish.x, fish.y, fish.size, fish.size); // draw fish
    ctx.drawImage(catImg, cat.x, cat.y, cat.size, cat.size); // draw cat

    ctx.fillStyle = "584738"; // color
    ctx.font = "20px Arial"; // font
    ctx.fillText("Puntos: " + score, 10, 30); // score text
    ctx.fillText("Eat the fish!", 10, 60); // instructions text
}

// Loop del juego
function gameLoop() {
    update(); 
    draw();
    requestAnimationFrame(gameLoop);
}
