// Wolf Island Run: Brain-Responsive game

let player;
let islands = [];
let islandSpawnTimer = 0;

let score = 0;
let gameOver = false;

// Time
let lastUpdateTime = 0;

// Jump input
let jumpPressed = false;

// Coyote time
let coyoteTime = 0;
const COYOTE_TIME_MAX = 0.15;

// Aurora animation state
let auroraOffset = 0;

function setup() {
  createCanvas(800, 600);
  colorMode(HSB, 360, 100, 100, 1);
  initGame();
}

function initGame() {
  gameOver = false;
  score = 0;
  lastUpdateTime = millis();
  coyoteTime = 0;

  // Create starting islands
  islands = [];
  let x = 100;
  let y = height - 150;
  
  for (let i = 0; i < 8; i++) {
    islands.push({
      x: x,
      y: y,
      w: 150,
      h: 30
    });
    x += 160;
    if (i > 2) {
      y += random(-25, 25);
      y = constrain(y, height - 240, height - 120);
    }
  }

  const firstIsland = islands[0];
  player = {
    x: firstIsland.x + 75,
    y: firstIsland.y - firstIsland.h - 30,
    w: 40,
    h: 60,
    vx: 0,
    vy: 0,
    onGround: true
  };

  islandSpawnTimer = 1.0;
}

function draw() {
  const now = millis();
  const dt = min((now - lastUpdateTime) / 1000, 0.05);
  lastUpdateTime = now;

  // Brain data
  let alpha     = constrain(eegData.alpha,      0, 1);
  let beta      = constrain(eegData.beta,       0, 1);
  let theta     = constrain(eegData.theta,      0, 1);
  let attention = constrain(eegData.attention,  0, 1);
  let med       = constrain(eegData.meditation, 0, 1);

  if (!gameOver) {
    updateGame(dt, attention, med);
  }

  drawWorld(attention, med, alpha, theta);
  drawHUD(attention, med, alpha, theta);

  if (gameOver) {
    drawGameOver();
  }

  jumpPressed = false;
}

function updateGame(dt, attention, meditation) {
  const brainGood = constrain((attention + meditation) / 2, 0, 1);

  // Capped abilities
  const baseSpeed = 4 + brainGood * 4;
  const moveSpeed = constrain(baseSpeed, 2, 10);
  
  const jumpStrength = constrain(-10 - brainGood * 10, -20, -8);
  const gravity = constrain(lerp(1.1, 0.75, brainGood), 0.5, 1.2);

  // Movement
  player.vx = 0;
  if (keyIsDown(LEFT_ARROW))  player.vx = -moveSpeed;
  if (keyIsDown(RIGHT_ARROW)) player.vx = moveSpeed;

  // Jump
  if (jumpPressed && (player.onGround || coyoteTime > 0)) {
    player.vy = jumpStrength;
    player.onGround = false;
    coyoteTime = 0;
  }

  // Apply gravity
  player.vy += gravity;
  player.vy = constrain(player.vy, -25, 25);

  // Move player horizontally first
  player.x += player.vx;
  player.x = constrain(player.x, player.w, width - player.w);

  // Then move vertically
  player.y += player.vy;

  // IMPROVED COLLISION DETECTION
  player.onGround = false;
  
  for (let isl of islands) {
    const platformTop = isl.y - isl.h;
    const platformBottom = isl.y;
    const platformLeft = isl.x;
    const platformRight = isl.x + isl.w;
    
    // Player bounds
    const playerLeft = player.x - player.w / 2;
    const playerRight = player.x + player.w / 2;
    const playerTop = player.y - player.h / 2;
    const playerBottom = player.y + player.h / 2;
    
    // Check horizontal overlap with generous margin
    const horizontalOverlap = playerRight > platformLeft + 5 && 
                              playerLeft < platformRight - 5;
    
    if (horizontalOverlap) {
      // Landing on top - generous collision window
      if (player.vy >= 0 && 
          playerBottom >= platformTop - 5 && 
          playerBottom <= platformTop + 20) {
        player.y = platformTop - player.h / 2;
        player.vy = 0;
        player.onGround = true;
        break;
      }
    }
  }

  // Coyote time
  if (player.onGround) {
    coyoteTime = COYOTE_TIME_MAX;
  } else {
    coyoteTime = max(0, coyoteTime - dt);
  }

  // Game over if fall off screen
  if (player.y > height + 100) {
    gameOver = true;
  }

  // Scroll islands
  const islandSpeed = constrain(lerp(6.5, 3.5, brainGood), 2, 8);
  
  for (let isl of islands) {
    isl.x -= islandSpeed * dt * 60;
  }
  
  islands = islands.filter(isl => isl.x + isl.w > -150);

  // Spawn new islands
  islandSpawnTimer -= dt;
  const spawnInterval = constrain(lerp(0.6, 1.0, brainGood), 0.4, 1.5);
  
  if (islandSpawnTimer <= 0) {
    spawnIsland(brainGood);
    islandSpawnTimer = spawnInterval;
  }

  score += islandSpeed * dt * 10;
}

function spawnIsland(brainGood) {
  const w = 150;
  const h = 30;

  const last = islands.length > 0 ? islands[islands.length - 1] : { x: width, y: height - 180 };
  
  const minGap = lerp(200, 120, brainGood);
  const maxGap = lerp(320, 180, brainGood);
  const gap = random(minGap, maxGap);

  const newX = max(last.x + gap, width + 100);
  
  const verticalVariation = lerp(60, 35, brainGood);
  let newY = last.y + random(-verticalVariation, verticalVariation);
  newY = constrain(newY, height - 250, height - 100);

  islands.push({
    x: newX,
    y: newY,
    w: w,
    h: h
  });
}

function drawWorld(attention, meditation, alpha, theta) {
  // Smooth gradient sky
  const attentionDominant = attention > meditation + 0.1;
  const meditationDominant = meditation > attention + 0.1;
  
  let skyHue1, skyHue2, skyBrt1, skyBrt2;
  
  if (attentionDominant) {
    skyHue1 = 200 + attention * 15;
    skyHue2 = 180 + attention * 25;
    skyBrt1 = 12 + attention * 15;
    skyBrt2 = 20 + attention * 20;
  } else if (meditationDominant) {
    skyHue1 = 260 - meditation * 15;
    skyHue2 = 220 - meditation * 10;
    skyBrt1 = 10 + meditation * 10;
    skyBrt2 = 16 + meditation * 18;
  } else {
    skyHue1 = 190;
    skyHue2 = 200;
    skyBrt1 = 14;
    skyBrt2 = 20;
  }
  
  // Smooth gradient
  noStroke();
  const steps = 50;
  for (let i = 0; i < steps; i++) {
    const inter = i / steps;
    const c = lerpColor(
      color(skyHue1, 30 + alpha * 15, skyBrt1),
      color(skyHue2, 35 + theta * 15, skyBrt2),
      inter
    );
    fill(c);
    rect(0, i * height / steps, width, height / steps + 2);
  }

  drawStars(attention, meditation);

  const brainGood = (attention + meditation) / 2;
  if (brainGood > 0.35) {
    drawRealisticAurora(brainGood, attention, meditation, alpha, theta);
  }

  drawMountains(attention);

  for (let isl of islands) {
    drawIsland(isl);
  }

  drawWolf(attention, meditation);
}

function drawStars(attention, meditation) {
  const starCount = 60 + floor(meditation * 40);
  
  randomSeed(12345);
  for (let i = 0; i < starCount; i++) {
    const x = random(width);
    const y = random(height * 0.65);
    
    const twinkle = (sin(frameCount * 0.04 + i * 0.5) + 1) / 2;
    const brightness = twinkle * (0.4 + meditation * 0.6);
    
    stroke(0, 0, 100, brightness);
    strokeWeight(random(1, 2.5));
    point(x, y);
  }
  noStroke();
}

function drawRealisticAurora(brainGood, attention, meditation, alpha, theta) {
  auroraOffset += 0.008 + meditation * 0.015;
  
  const intensity = map(brainGood, 0.35, 1, 0.3, 1, true);
  const baseY = height * 0.25;
  
  const numLayers = 4 + floor(alpha * 3);
  
  push();
  blendMode(ADD);

  for (let layer = 0; layer < numLayers; layer++) {
    const layerOffset = layer * 0.6;
    
    let hue;
    if (attention > meditation) {
      hue = 140 + layer * 25 + attention * 20;
    } else {
      hue = 90 + layer * 35 + meditation * 40;
    }
    
    const saturation = 40 + attention * 30 + theta * 25;
    const brightness = 50 + meditation * 35;
    const layerAlpha = (0.15 + layer * 0.05) * intensity;
    
    fill(hue, saturation, brightness, layerAlpha);
    noStroke();
    
    beginShape();
    for (let x = 0; x <= width; x += 12) {
      const wave1 = sin(auroraOffset + x * 0.008 + layerOffset) * (35 + theta * 45);
      const wave2 = sin(auroraOffset * 1.7 + x * 0.015 + layerOffset * 0.8) * (20 + alpha * 30);
      const wave3 = sin(auroraOffset * 0.6 + x * 0.005) * (15 + meditation * 25);
      
      const y = baseY + layer * 35 + wave1 + wave2 + wave3;
      vertex(x, y);
    }
    
    const curtainHeight = 100 + layer * 40 + alpha * 60;
    vertex(width, baseY + layer * 35 + curtainHeight);
    vertex(0, baseY + layer * 35 + curtainHeight);
    endShape(CLOSE);
    
    if (layer < 3) {
      stroke(hue, saturation - 20, brightness + 20, layerAlpha * 0.5);
      strokeWeight(1.5);
      noFill();
      
      beginShape();
      for (let x = 0; x <= width; x += 12) {
        const wave1 = sin(auroraOffset + x * 0.008 + layerOffset) * (35 + theta * 45);
        const wave2 = sin(auroraOffset * 1.7 + x * 0.015 + layerOffset * 0.8) * (20 + alpha * 30);
        const wave3 = sin(auroraOffset * 0.6 + x * 0.005) * (15 + meditation * 25);
        
        const y = baseY + layer * 35 + wave1 + wave2 + wave3;
        vertex(x, y);
      }
      endShape();
    }
  }
  
  blendMode(BLEND);
  pop();
}

function drawMountains(attention) {
  noStroke();
  const groundY = height * 0.85;
  
  fill(210, 20, 20, 0.5);
  for (let i = -1; i < 4; i++) {
    const baseX = i * 350;
    triangle(
      baseX, groundY,
      baseX + 175, groundY - 180,
      baseX + 350, groundY
    );
  }
  
  fill(210, 28, 15, 0.7);
  const offset = sin(frameCount * 0.004) * 2;
  for (let i = -1; i < 4; i++) {
    const baseX = i * 280 + 50 + offset;
    triangle(
      baseX, groundY,
      baseX + 140, groundY - 140,
      baseX + 280, groundY
    );
  }
}

function drawIsland(isl) {
  push();
  translate(isl.x, isl.y);
  
  noStroke();
  
  fill(35, 30, 45);
  rectMode(CORNER);
  rect(0, -isl.h, isl.w, isl.h, 6);
  
  fill(30, 35, 30, 0.35);
  rect(2, -8, isl.w - 4, 8);
  
  fill(110, 50, 60);
  rect(0, -isl.h, isl.w, 8, 4);
  
  fill(120, 60, 70, 0.5);
  rect(0, -isl.h, isl.w, 3);
  
  pop();
}

function drawWolf(attention, meditation) {
  push();
  translate(player.x, player.y);

  const baseHue = lerp(210, 45, meditation);
  const furSat = 35 + attention * 20;
  const furBrt = 55 + meditation * 15;
  
  rectMode(CENTER);
  noStroke();

  // Body
  fill(baseHue, furSat, furBrt);
  rect(0, 0, player.w + 20, player.h - 15, 10);
  
  fill(baseHue, furSat - 10, furBrt + 15, 0.5);
  rect(0, -8, player.w + 18, player.h / 3, 10);

  // Animated tail
  push();
  translate(-player.w / 2 - 15, -8);
  const tailWag = sin(frameCount * 0.1) * 8;
  rotate(radians(-20 + tailWag));
  fill(baseHue, furSat + 10, furBrt - 5);
  rect(0, 0, 28, 11, 6);
  fill(baseHue + 10, furSat + 15, furBrt + 10);
  ellipse(14, 0, 8, 9);
  pop();

  // Head
  push();
  translate(player.w / 2 + 10, -player.h / 2 + 10);
  
  fill(baseHue, furSat, furBrt);
  rect(0, 0, 32, 26, 8);
  
  fill(baseHue + 5, furSat - 5, furBrt - 10);
  rect(16, 5, 20, 14, 7);
  
  fill(0, 0, 10);
  ellipse(24, 5, 5, 4);
  
  fill(baseHue, furSat + 15, furBrt + 5);
  triangle(-10, -16, -2, -28, 6, -16);
  
  fill(baseHue + 15, 40, furBrt + 15);
  triangle(-7, -16, -2, -24, 3, -16);
  
  fill(0, 0, 0);
  ellipse(6, -5, 5, 5);
  fill(0, 0, 100);
  ellipse(7, -6, 2, 2);
  
  pop();

  // Legs
  fill(baseHue, furSat + 10, furBrt - 15);
  const legW = 11;
  const legH = 26;
  rect(-14, player.h / 2 - 5, legW - 1, legH, 4);
  rect(10, player.h / 2 - 5, legW - 1, legH, 4);
  
  fill(baseHue, furSat + 5, furBrt - 10);
  rect(-8, player.h / 2 - 5, legW, legH, 4);
  rect(16, player.h / 2 - 5, legW, legH, 4);
  
  fill(baseHue + 10, furSat, furBrt - 20);
  ellipse(-8, player.h / 2 + 8, 12, 8);
  ellipse(16, player.h / 2 + 8, 12, 8);

  // Focus aura
  const focusLevel = (attention + meditation) / 2;
  if (focusLevel > 0.5) {
    noFill();
    
    for (let i = 0; i < 3; i++) {
      const auraHue = 50 + attention * 100;
      stroke(auraHue, 70, 90, 0.22 - i * 0.07);
      strokeWeight(2 - i * 0.5);
      const r = 45 + focusLevel * 28 + i * 8 + sin(frameCount * 0.07 + i) * 4;
      ellipse(0, -10, r, r * 0.9);
    }
    noStroke();
    
    if (focusLevel > 0.7 && abs(player.vx) > 3) {
      const auraHue = 50 + attention * 100;
      for (let i = 1; i < 4; i++) {
        fill(auraHue, 60, 80, 0.1 / i);
        ellipse(-player.vx * i * 2, 0, (player.w + 15) / i, (player.h - 10) / i, 10);
      }
    }
  }

  pop();
}

function drawHUD(attention, meditation, alpha, theta) {
  noStroke();
  fill(0, 0, 0, 0.6);
  rect(10, 10, 340, 155, 8);

  fill(0, 0, 100);
  textSize(14);
  textAlign(LEFT, TOP);
  text(" Wolf Island Run", 20, 18);

  textSize(11);
  const state = eegData.connected ? "EEG Connected" : "Simulation Mode";
  const brainGood = (attention + meditation) / 2;
  const difficulty = brainGood > 0.6 ? "Easy " : brainGood > 0.4 ? "Medium" : "Hard ";
  
  text(
    "State: " + state +
    "\nScore: " + floor(score) +
    " | Difficulty: " + difficulty +
    "\n\nAttention: " + attention.toFixed(2) +
    "   Meditation: " + meditation.toFixed(2) +
    "\nAlpha: " + alpha.toFixed(2) +
    "     Theta: " + theta.toFixed(2),
    20, 40
  );

  const speed = constrain(4 + brainGood * 4, 2, 10).toFixed(1);
  const jump = constrain(10 + brainGood * 10, 8, 20).toFixed(1);
  
  text(
    "\n Abilities: Speed " + speed + " | Jump " + jump +
    "\n\nControls: left right arrow keys move | up arrow jump | R restart" +
    "\n Stay focused for super powers!",
    20, 90
  );
}

function drawGameOver() {
  fill(0, 0, 0, 0.75);
  rect(width / 2 - 210, height / 2 - 100, 420, 200, 12);

  fill(0, 0, 100);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Game Over", width / 2, height / 2 - 40);
  textSize(20);
  text("Final Score: " + floor(score), width / 2, height / 2 + 5);
  textSize(14);
  text("Press R to restart", width / 2, height / 2 + 50);
}

function keyPressed() {
  if (keyCode === UP_ARROW || key === ' ') {
    jumpPressed = true;
  }
  if (key === 'r' || key === 'R') {
    initGame();
  }
}