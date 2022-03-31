status = "";
objects= [];
img = "";

function preload(){
    img = loadImage("bathroom.jpg");
}

function setup(){
    canvas=createCanvas(640,420);
    canvas.position(350,250);
    objectDetector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
}

function modelLoaded() { 
    console.log(" Model Loaded! :)");
    status= true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results) {
    if(error){
        console.error(error);
    }
    console.log(results);
    objects= results;
}
function draw(){
    image(img,0,0,640,420);

    if(status != "")
    {
        for(i=0; i < objects.length; i++)
        {
            fill("#fc0f03");
            document.getElementById("status").innerHTML = "Status - Object Detected";
            percentage = floor(objects[i].confidence *100);
            text(objects[i].label+" "+percentage+ "%",objects[i].x+15,objects[i].y);
            noFill();
            stroke("#fc0f03");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            document.getElementById("number_of_objects").innerHTML = "Out of the 4 objects in the pictures, CoCoSSD model has detected 1 object but it is not appearing on the screen"
        }
    }
}