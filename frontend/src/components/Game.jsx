import React, { useEffect } from 'react';

const Game = () => {
  useEffect(() => {
    const canvas = document.getElementById("canvasGame");
    const ctx = canvas.getContext("2d");

    // Load images for cat and fish
    const catImg = new Image();
    catImg.src = "/images/leah.png";
    const fishImg = new Image();
    fishImg.src = "/images/ele.png"; 

    let cat = { x: 200, y: 200, size: 40, speed: 6 }; // cat object
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

      ctx.fillStyle = "black"; // color
      ctx.font = "20px Arial"; // font
      
      ctx.fillText("Try to get a kiss 👩🏻‍❤️‍💋‍👩🏼", 10, 60); // instructions text
    }

    // Loop del juego
    function gameLoop() {
      update(); 
      draw();
      requestAnimationFrame(gameLoop);
    }
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <canvas id="canvasGame" width="500" height="500"></canvas>
    </div>
  );
};

export default Game;
