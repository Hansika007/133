img = "";
status1 = "";
objects = [];

function preload()
{
    img = loadImage("dog_cat.jpg");
}

function setup()
{
    canvas = createCanvas(640 , 440);
    canvas.center();
    objectDetector =ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML= "Status : Object Detecting";
}

function draw() 
{
    image(img, 0, 0, 640, 420);
    if(status1 !="")
    {
        for (i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML= "Status : Object Detected";
            fill("#f000ff")
            percent = floor(objects[i].confidence*100);
            console.log(percent);
            text(objects[i].label + " "+ percent +"%" , objects[i].x , objects[i].y );
            noFill();
            stroke("#00ff00");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
  
}

function modelLoaded()
{
    console.log("modelLoaded");
    status1 = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error , result)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(result);
        objects = result;
    }
}