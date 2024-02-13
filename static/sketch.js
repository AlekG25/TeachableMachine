// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
let img;
let img2;
let img3;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/FoE5wPdPs/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
// BOOLEAN TO CLASSIFY VARIABLE
let videoIsOn = true;

// Load the model first
function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
    img = loadImage('https://c2.staticflickr.com/2/1870/44460302931_4a3d42d01d_b.jpg');
    img2 = loadImage('https://upload.wikimedia.org/wikipedia/commons/b/b0/Raising_the_Flag_on_Iwo_Jima%2C_larger_-_edit1.jpg');
    img3 = loadImage('https://media.licdn.com/dms/image/C4E12AQHoMOGm_NhEkQ/article-cover_image-shrink_720_1280/0/1646173980342?e=2147483647&v=beta&t=CB1H7ywUjIORDpWBgdgy5HHSNZorYs_z4ljC6ucDQO4');
}

function setup() {
    // createCanvas(450, 338);
    var canvas = createCanvas(700, 440);
    canvas.parent('sketch-holder');

    img.resize(700, 0);
    img2.resize(545, 0);
    img3.resize(657, 0);
    // Create the video
    video = createCapture(VIDEO);
    video.size(700, 410);
    video.hide();

    flippedVideo = ml5.flipImage(video)
    // Start classifying
    classifyVideo();
}

function draw() {
    if (videoIsOn) {
        background(0);
        image(flippedVideo, 0, 0);
        // Draw the video
        if (label === 'Polish Złoty (Rzeczpospolita Polska)') {
            image(img, 0, 0);
        }
        if (label === 'United States Dollar') {
            image(img2, 80, 0);
        }
        if (label === 'Ukraine') {
            image(img3, 20, 0);
        }
    } else {
        background(50);
        fill(255);
        textSize(16);
        textAlign(CENTER);
        text("Click to start video", width / 2, height / 2);
    }
    // Draw the label
    fill(97, 201, 125);
    textSize(30);
    textStyle(BOLD);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
}

function mousePressed() {
    videoIsOn = !videoIsOn;
    if (videoIsOn) video.play();
    else video.stop();
}

// Get a prediction for the current video frame
function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
    // If there is an error
    if (error) {
        console.error(error);
        return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    classifyVideo();
}