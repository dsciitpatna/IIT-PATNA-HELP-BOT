/* the node that bubbles will appear inside */
var insideNode = "#bubbleContainer";    // type this as you would in css: #id, .class, element
/* the total amount of bubbles to appear inside the node */
var totalBubbles = 6;
/* maximum time to move the bubble from x to y in milliseconds */
var maxTimeToMove = 3500;
/* minimum time to move the bubble from x to y in milliseconds */
var minTimeToMove = 3500;

STOP = false;
$(document).ready(function() {
    if (totalBubbles == 0)  // just make sure there's at least one bubble.
        totalBubbles = 1;

    // did you decide to add a border to this bubble?
    var borderWidth = $(".bubble").css("border-left-width").slice(0, -2) * 2;

    boundsX = $(insideNode).width() - $(".bubble").width() - borderWidth;
    boundsY = $(insideNode).height() - $(".bubble").height() - borderWidth;

    /* restarts the animation when the page has been resized */
    function restartAnimation() {
        boundsX = $(insideNode).width() - $(".bubble").width() - borderWidth;
        boundsY = $(insideNode).height() - $(".bubble").height() - borderWidth;
        $(".bubble").stop(true); // stop the animations 
        moveBubbles();   // restart the animations within the new bounds
    };
    arr = ["FACULTY","TRANSPORT","SPORTS","STUDENT","HOSPITAL","EMERGENCY"];
    
    links = ["http://localhost:3000/faculty","http://localhost:3000/transport","http://localhost:3000/Spbooking","http://localhost:3000/students","http://localhost:3000/hospi","http://localhost:3000/emergency"];
    $(".bubble").text(arr[0]);
    $(".bubble").attr("onclick",'window_location="'+links[0]+'";');
    $(".bubble").attr("id",'trn1');
    $(".bubble").attr("value",'Faculty');
    // creates the bubbles
    for (i = 0; i < totalBubbles - 1; i++) {
        var link = 'window_location="'+links[i+1]+'";';
        $(insideNode).prepend("<div class='bubble' style='' id=\"trn"+(i+2)+"\" onclick='"+link+"' value='"+arr[i+1]+"'> " + arr[1+i]+ " </div>");
    }
    $(".bubble").click(function(e) {
    	if(STOP)
    		return;
    	$(".bubble").hide();
    	$(this).clearQueue();
    	$(this).show();
      STOP = true;
      $(this).animate(
      {
        left:$(this).parent().width() / 2 - $(this).width() ,
        top: $(this).parent().height() / 2 - $(this).height() ,
        height: $(this).height()*2,
        width: $(this).width()*2,
    },2000,function() {
            	// setTimeout(function() {
            		window.location = window_location;
            	// },1000);
            });

		// $(this).addClass("open");
		
	});
    // start at a random x coordinate
    $(".bubble").css("left", Math.floor(Math.random() * boundsX) + "px");

    // resize! we should update the bounds!
    $(window).resize(restartAnimation);
    moveBubbles();
});

/* moves each individual bubble around */
function moveBubbles() {
    var curr;
    for (var i = 0; i < totalBubbles; i++) {
        curr = document.getElementsByClassName("bubble")[i];
        $(curr).animate(
        {
            left: Math.floor(Math.random() * boundsX),
            top: Math.floor(Math.floor(Math.random() * (boundsY)))
        },
        Math.floor((Math.random() * maxTimeToMove) + minTimeToMove),
        function() {
         if(!STOP)
            moveBubbles();
    });
    }
}

/* makes selected bubble bigger in size*/
function resizeSelectBubbles() {

}
function translation(text)
{

}