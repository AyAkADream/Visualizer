let song, analyzer, fft;
var sample = [];
var animation;

function preload() {
    song = loadSound('assets/m1.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);

    sample[0] = loadSound('assets/se01.mp3');
    sample[1] = loadSound('assets/se02.mp3');
    sample[2] = loadSound('assets/se03.mp3');
    sample[3] = loadSound('assets/se04.mp3');

    background(91,109,144);

    textAlign(CENTER, CENTER);
    textSize(50);

    angleMode(DEGREES);

    // 新しいAmplitudeアナライザーを作成する
    analyzer = new p5.Amplitude();

    fft = new p5.FFT();
    fft.setInput(song);

    // ボタン
    const button1 = setButton('START', {
        x: windowWidth-200,
        y: windowHeight-100
    });

    button1.mousePressed(() => {
        if (song.isPlaying()) {
            song.pause();
            button1.html('LOOP');
        }
        else {
            song.loop();
            // 入力を音量アナライザーにあてがう
            analyzer.setInput(song);
            button1.html('PAUSE');
        }
    });
}

function draw() {

    // 音量を0と1の範囲におさめる
    let volume = map(mouseX, 0, width, 0, 1);
    volume = constrain(volume, 0, 1);
    song.amp(volume);

    // レートを0.01と4の範囲におさめる
    // レートの変更によってピッチが変わる
    let speed = map(mouseY, 0.1, height, 0, 2);
    speed = constrain(speed, 0.01, 4);
    song.rate(speed);

    background(91,109,144);
    if(animation){
        animation.draw();
    }
    
    showcircle();
    showSpectrum(fft);
    showStr();
}

function setButton(label, pos) {
    const button = createButton(label);
    button.size(100, 30);
    button.position(pos.x, pos.y);
    return button;
}

function showSpectrum(fft) {
    let spectrum = fft.analyze();
  
    noFill();
    stroke(255);
    strokeWeight(2);
    beginShape();

    if (key == "1") {
        stroke(178,215,182);
    } else if (key == "2") {
        stroke(175,192,227);
    } else if (key == "3") {
        stroke(55,161,200);
    } else if (key == "4") {
        stroke(155,108,172);
    } else if (key == "5") {
        stroke(91,109,144);
    } else if (key == "6") {
        stroke(175,192,227);
    } else if (key == "7") {
        stroke(55,161,200);
    } else if (key == "8") {
        stroke(178,215,182);
    } else if (key == "9") {
        stroke(175,192,227);
    }

    for (i = 0; i < spectrum.length; i++) {
      vertex((i * width) / spectrum.length, map(spectrum[i], 0, 255, height - 10, height * 0.4));
    }
    endShape();
}


function showcircle(){
    fill(255);

    if (key == "1") {
        background(0,85,129);
        fill(178,215,182);
        stroke(255);
    } else if (key == "2") {
        background(26,166,146);
        fill(175,192,227);
        stroke(255);
    } else if (key == "3") {
        background(178,215,182);
        fill(55,161,200);
        stroke(255);
    } else if (key == "4") {
        background(175,192,227);
        fill(155,108,172);
        stroke(255);
    } else if (key == "5") {
        background(165,201,195);
        fill(91,109,144);
        stroke(255);
    } else if (key == "6") {
        background(155,108,172);
        fill(175,192,227);
        stroke(255);
    } else if (key == "7") {
        background(91,109,144);
        fill(55,161,200);
        stroke(255);
    } else if (key == "8") {
        background(55,161,200);
        fill(178,215,182);
        stroke(255);
    } else if (key == "9") {
        background(239,242,247);
        fill(175,192,227);
        stroke(255);
    }

    // 平均振幅(二乗平均平方根、RMS)を得る
    let rms = analyzer.getLevel();;

    // 音量にもとづいたサイズの円を描く
    ellipse(width*1/6, height / 2, 10 + rms * 200, 10 + rms * 200);
    ellipse(width*2/6, height / 2, 10 + rms * 200, 10 + rms * 200);
    ellipse(width*3/6, height / 2, 10 + rms * 200, 10 + rms * 200);
    ellipse(width*4/6, height / 2, 10 + rms * 200, 10 + rms * 200);
    ellipse(width*5/6, height / 2, 10 + rms * 200, 10 + rms * 200);
    ellipse(width*1/6, height / 3, 10 + rms * 200, 10 + rms * 200);
    ellipse(width*2/6, height / 3, 10 + rms * 200, 10 + rms * 200);
    ellipse(width*3/6, height / 3, 10 + rms * 200, 10 + rms * 200);
    ellipse(width*4/6, height / 3, 10 + rms * 200, 10 + rms * 200);
    ellipse(width*5/6, height / 3, 10 + rms * 200, 10 + rms * 200);

}

function showStr(){
    fill(89,69,103);
    translate(windowWidth-70, windowHeight-80);

    // キー入力された文字をテキストとして表示
    text(key, 0, 0);
}

function keyTyped() {
    if (key == 'a') {
      sample[0].play();
      animation = new Anim_a();
    }
    if (key == 's') {
      sample[1].play();
      animation = new Anim_s();
    }
    if (key == 'd') {
      sample[2].play();
      animation = new Anim_d();
    }
    if (key == 'f') {
      sample[3].play();
      animation = new Anim_f();
    }
  }