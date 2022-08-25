first_song = "";
second_song = "";

song1_status = "";
song2_status = "";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scorerightWrist = 0;
scoreleftWrist = 0;

function preload(){
    first_song = loadSound("Song1.mp3");
    second_song = loadSound("Song2.mp3");
}

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);

}

function draw(){
    image(video,0,0,600,530);

    song1_status = first_song.isPlaying();
    song2_status = second_song.isPlaying();
    fill = ("red");
    stroke = ("blue");
    if (scorerightWrist>0.2) {
        circle(rightWrist_x,rightWrist_y,20);
        second_song.stop();
        if (song1_status == false) {
            first_song.play();
            document.getElementById("song").innerHTML = "playing first song";
        }
    }

    if (scoreleftWrist>0.2) {
        circle(leftWrist_x,leftWrist_y,20);
        first_song.stop();
        if (song2_status == false) {
            second_song.play();
            document.getElementById("song").innerHTML = "playing second song";


        }
    }
}

function modelLoaded(){
    console.log("PoseNet Is initialized");
}

function gotPoses(results){
    if (results.lenght > 0){
        console.log(results);

        scorerightWrist = results[0].pose.keypoints[10].score;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scorerightWrist = "+ scorerightWrist+" scoreleftWritst = "+ scoreleftWrist);

        rightWrist_x = results[0].pose.rightWrist.x
        rightWrist_y = results[0].pose.rightWrist.y
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);

        leftWrist_x = results[0].pose.leftWrist.x
        leftWrist_y = results[0].pose.leftWrist.y
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);
    
    }
}

function play()  {
    first_song.play();
    first_song.setVolume(1);
    first_song.rate(1);
}
