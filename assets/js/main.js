 $(document).ready(function(){
   $(".floating-btn").tooltip();
   tour.end()
});


var patern = [];
var startTime;
var endTime;
var singleLevelTime = 0;
var totaLtime = 0;
disabledButtons();

async function generatePatern() {
    if (tour.ended() == false){
        // alert(tour.ended())
        $(".active").removeClass("active");
                        await sleep(1000);
                        $(".red-quarter").addClass("active");
                        document.getElementById("red-audio").play();
                        setTimeout(removeActiveClass, 500);
                        await sleep(1000);
                        enableButtons();
    }else
    {
    $("#tour-btn").addClass("hide")
    $("#start").addClass("disabled");
    $("#failed").addClass("disabled");
    await sleep(500);
    $("#failed").removeClass("disabled");
    $("#start").removeClass("disabled");
    $("#start").addClass("hide");
    $("#playing").removeClass("hide");
    var i = 0;
    var j = 0;
    var paternlength = patern.length + 1;
    for (i; i < 100; i++) {
        for (j; j < paternlength; j++) {
            var x = Math.floor((Math.random() * 4) + 1);
            patern.push(x);
            disabledButtons();
            $(".level-num").text(paternlength);
            // document.getElementById("demo").innerHTML = "[" + patern + "]";
            if (patern.length == paternlength) {

                for (var l = 0; l < 100; l++) {
                    if (patern[l] == 1) {
                        $(".active").removeClass("active");
                        $(".blue-quarter").addClass("active");
                        document.getElementById("blue-audio").play();
                        //   removeActiveClass(3000);
                        setTimeout(removeActiveClass, 500);
                        await sleep(1000);

                    }
                    else if (patern[l] == 2) {
                        $(".active").removeClass("active");
                        $(".red-quarter").addClass("active");
                        document.getElementById("red-audio").play();
                        setTimeout(removeActiveClass, 500);
                        await sleep(1000);
                    }
                    else if (patern[l] == 3) {
                        $(".active").removeClass("active");
                        $(".green-quarter").addClass("active");
                        document.getElementById("green-audio").play();
                        setTimeout(removeActiveClass, 500);
                        await sleep(1000);
                    }
                    else {
                        if (patern[l] == 4) {
                            $(".active").removeClass("active");
                            $(".yellow-quarter").addClass("active");
                            document.getElementById("yellow-audio").play();
                            setTimeout(removeActiveClass, 500);
                            await sleep(1000);
                        }

                    }
                }
            }

            startTime = new Date();

            enableButtons();
            return patern;
        }
    }
}
}

var inputPatern = [];

function getUserPatern(button) {
    
    var generatedPatern = patern;

    var redButton = document.getElementById("redButtonId");
    var greenButton = document.getElementById("greenButtonId");
    var blueButton = document.getElementById("blueButtonId");
    var orangeButton = document.getElementById("orangeButtonId");
    // if (button.id == redButton.id && tour.ended() == false){
    //     $("#performance").addClass("hide");
    // }
    if (button != null && button.id == redButton.id && tour.ended() == true) {
        // alert ("Red is clicked");
        document.getElementById("red-audio").play();
        inputPatern.push(2);
        checkPaternsLenght(inputPatern, generatedPatern);
        return inputPatern;
    }
    else
    if (button != null && button.id == greenButton.id) {
        //alert ("green is clicked");
        document.getElementById("green-audio").play();
        inputPatern.push(3);
        checkPaternsLenght(inputPatern, generatedPatern);
        return inputPatern;
    }
    else
    if (button != null && button.id == blueButton.id) {
        // alert ("Blue is clicked");
        document.getElementById("blue-audio").play();
        inputPatern.push(1);
        checkPaternsLenght(inputPatern, generatedPatern);
        return inputPatern;
    }
    else
    if (button != null && button.id == orangeButton.id) {
        // alert ("Orange is clicked");
        document.getElementById("yellow-audio").play();
        inputPatern.push(4);
        checkPaternsLenght(inputPatern, generatedPatern);
        return inputPatern;
    }
}


async function checkPaternsLenght(userPatern, generatedPatern) {
    var userPaternLenght = userPatern.length;
    var generatedPaternLength = generatedPatern.length;


    if (userPaternLenght == generatedPaternLength) {
        //alert ("length is equals");
        // alert(generatedPatern.toString());
        // alert(userPatern.toString());
        if (generatedPatern.toString() == userPatern.toString()) {
            //alert("Success");
            // $(".level").append("<i class='fas fa-check'></i>");
            disabledButtons();
            $("#result-icon").removeClass("hide");
            $(".level").addClass("hide");
            await sleep(1000);
            $("#result-icon").addClass("hide");
            $(".level").removeClass("hide");
            // $(this).children("i").remove();
            inputPatern = [];
            generatedPatern = [];
            endTime = new Date();
            var levelTime = endTime - startTime;
            singleLevelTime = (levelTime - 1000) / 1000;
            totaLtime += singleLevelTime;
            // console.log(totaLtime);
            $(".list-group-flush").append("<li class='list-group-item'><i class='fas fa-check text-success mr-2'></i>Level " + userPaternLenght + " - " + singleLevelTime + "<sub>s</sub></li>");
            generatePatern();

        }
        else {
            $("#playing").addClass("hide");
            $("#failed").removeClass("hide");
            disabledButtons();
            // alert("Not");
            wrongInput();
            //document.getElementById("demo").innerHTML = "";
            inputPatern = [];
            generatedPatern = [];
            patern = [];
            $(".list-group-flush").append("<li class='list-group-item'><i class='fas fa-times text-danger mr-2'></i>Level " + generatedPaternLength + "</li>");
            if (generatedPaternLength - 1 == 1) {
                $(".total-result").html("<strong>" + (generatedPaternLength - 1) + "</strong>" + " level - during " + "<strong>" + totaLtime.toFixed(2) + "<sub>s</sub></strong>");
            }
            else if (generatedPaternLength - 1 < 1) {
                $(".total-result").html("No level have been solved");
                $(".card-header.total-result").css("background-color", "red")
            }
            else {
                $(".total-result").html("<strong>" + (generatedPaternLength - 1) + "</strong>" + " levels - during " + "<strong>" + totaLtime.toFixed(2) + "<sub>s</sub></strong>");
            }
            $("#performance").removeClass("hide");
            $('#performance-modal').modal('show');

            //document.getElementById("start").disabled = false;
        }

    }
    else {
        var k = 0;
        for (k; k < userPaternLenght; k++) {
            if (generatedPatern[k] == userPatern[k]) {
                getUserPatern();
            }

            else {
                $("#playing").addClass("hide");
                disabledButtons();
                $("#failed").removeClass("hide");
                result = (generatedPaternLength - 1) + " level - during " + totaLtime.toFixed(2) + "s";
                //alert("wrong input");
                wrongInput();
                
                $(".list-group-flush").append("<li class='list-group-item'><i class='fas fa-times text-danger mr-2'></i>Level " + generatedPaternLength + "</li>");
                if (generatedPaternLength - 1 == 1) {
                    $(".total-result").html("<strong>" + (generatedPaternLength - 1) + "</strong>" + " level - during " + "<strong>" + totaLtime.toFixed(2) + "<sub>s</sub></strong>");
                }
                else if (generatedPaternLength - 1 < 1) {
                    $(".total-result").html("No level have been solved");
                    $(".card-header.total-result").css("background-color", "red")
                }
                else {
                    $(".total-result").html("<strong>" + (generatedPaternLength - 1) + "</strong>" + " levels - during " + "<strong>" + totaLtime.toFixed(2) + "<sub>s</sub></strong>");


                }

                $("#performance").removeClass("hide");
                $('.modal').modal('show');
                generatedPatern = [];
                inputPatern = [];
                patern = [];

                // document.getElementById("demo").innerHTML = "";
                //document.getElementById("start").disabled = false;

            };
        }

    }
}

function removeActiveClass() {
    $(".active").removeClass("active");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

$("#failed").on("click", function() {
    $(".total-result").html("");
    $("ul").html("");
    $("#performance").addClass("hide");
    totaLtime = 0;
    if ($("#sound-btn").hasClass("selected")){
    document.getElementById("red-audio").muted = true;
    document.getElementById("blue-audio").muted = true;
    document.getElementById("green-audio").muted = true;
    document.getElementById("yellow-audio").muted = true;
    document.getElementById("wrong-audio").muted = true;
    }
    else{
    document.getElementById("red-audio").muted = false;
    document.getElementById("blue-audio").muted = false;
    document.getElementById("green-audio").muted = false;
    document.getElementById("yellow-audio").muted = false;
    document.getElementById("wrong-audio").muted = false;
    }
    generatePatern();
});


function disabledButtons() {
    $(".blue-quarter").removeAttr("onclick");
    $(".blue-quarter").attr("disabled", "disabled");

    $(".red-quarter").removeAttr("onclick");
    $(".red-quarter").attr("disabled", "disabled");

    $(".green-quarter").removeAttr("onclick");
    $(".green-quarter").attr("disabled", "disabled");

    $(".yellow-quarter").removeAttr("onclick");
    $(".yellow-quarter").attr("disabled", "disabled");
}

function enableButtons() {
    $(".blue-quarter").attr("onclick", "getUserPatern(this)");
    $(".blue-quarter").removeAttr("disabled", "disabled");

    $(".red-quarter").attr("onclick", "getUserPatern(this)");
    $(".red-quarter").removeAttr("disabled", "disabled");

    $(".green-quarter").attr("onclick", "getUserPatern(this)");
    $(".green-quarter").removeAttr("disabled", "disabled");

    $(".yellow-quarter").attr("onclick", "getUserPatern(this)");
    $(".yellow-quarter").removeAttr("disabled", "disabled");
}

/////////////////

$("#btn-setting").on("click", function () {
    $(".floating-btn").toggleClass("up",1000);
});

$("#solid-grey").on("click", function() {
    $("body").css("background-image", "none");
    $("body").css("background-color", "#D1D1D1");
    
    
});

$("#gradient-grey").on("click", function() {
    $("body").css("background-image", "linear-gradient(to right bottom, #414141, #5a5a5a, #757575, #909090, #adadad, #adadad, #aeaeae, #aeaeae, #929292, #777777, #5d5d5d, #444444)")
});

$("#gradient-colored").on("click", function() {
    $("body").css("background-image", "linear-gradient(to right bottom, #e84b3a, #ed467a, #d45eb1, #a37ad6, #6490e2, #08a0e1, #00abd2, #00b3bb, #19bc98, #69be65, #adb92c, #f4a610)");
});

$("#gradient-greenBlue").on("click", function() {
    $("body").css("background-image", "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)")
});

var menu = document.getElementById("bg-menu");
var btns = menu.getElementsByClassName("bg-menu-item");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("selected");
  current[0].className = current[0].className.replace("selected", "");
  this.className += " selected";
  });
}

function wrongInput(){
    document.getElementById("red-audio").muted = true;
    document.getElementById("blue-audio").muted = true;
    document.getElementById("green-audio").muted = true;
    document.getElementById("yellow-audio").muted = true;
    document.getElementById("wrong-audio").play();
}

$("#sound-btn").on("click", function() {
    $(this).toggleClass("selected");
    if ($(this).hasClass("selected")){
        document.getElementById("red-audio").muted = true;
    document.getElementById("blue-audio").muted = true;
    document.getElementById("green-audio").muted = true;
    document.getElementById("yellow-audio").muted = true;
    document.getElementById("wrong-audio").muted = true;
    }
    else {
        document.getElementById("red-audio").muted = false;
        document.getElementById("blue-audio").muted = false;
        document.getElementById("green-audio").muted = false;
        document.getElementById("yellow-audio").muted = false;
        document.getElementById("wrong-audio").muted = false;
        
    }
});

$(".container-fluid").on("click", function() {
    if ($(".floating-btn").hasClass("up"))
    {
        $(".floating-btn").removeClass("up");
    }
});

///////////////////////////
var hideBtns = function(){
    $("[data-role='next'],[data-role='prev'],[data-role='pause-resume'],.popover .arrow").hide();
};

var hideRightLeftBtn = function(){
   $("[data-role='next'],[data-role='prev'],[data-role='pause-resume']").hide();
};

var tour = new Tour({

    steps: [
      {
        element: "#game-tools",
        title: "Simon Game online",
        content: "In this game you have to use your memory to match the colores that appear on the colored weel",
        placement:"top"
      },
      {
        title: "First Step",
        element: ".middle-box",
        content: "Press Here to start the game",
        reflex: true,
        onShown: hideRightLeftBtn,
        placement:"top"
      },
      {
        title: "second Step",
        element: "#redButtonId",
        content: "Wait a second to see the color then press on it to match",
        reflex: true,
        onShown: hideRightLeftBtn,
        placement:"top"
      },
      {
        
        element: "#end-tour",
        content: "Note: The sequence will increase by one in every correct match you made. GOOD JOB!! now you are ready to play",
        onShown: hideBtns
      }
      
    ],
     backdrop: true,
     storage: false
});
    $("#tour-btn").on("click", function() {
        tour.init();
        tour.start(true);
        
});

