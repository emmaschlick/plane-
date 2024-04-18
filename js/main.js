gsap.registerPlugin(MotionPathPlugin);


// **set initial screen number
let screenNum = 1;

// **total number of screens, get the screens then get the number
let allScreens = document.querySelectorAll("section");
let totalScreens = allScreens.length;
console.log(allScreens);
console.log(totalScreens);

// **transition duration
let dur = 1;

/**
 ** delay for starting screen animations
 ** make equal to duration... The time it takes content to transition off screen
 ** add more time to delay the build on a little more
*/
let delay = dur + 0.5;
// disables nav when transitioning from screen to screen
let navActive = true;
// vars used for nav
let currentScreen, prevScreen, nextScreen;
// hides all screens except for screen 1
allScreens.forEach((screen, num) =>{
    console.log(num);
    if(num!=0){
        console.log(`${num} should be hidden`);
        screen.style.opacity =0;
    }else{
        console.log(`${num} should not be hidden`);
    }
})


// set up main div on paused timeline until begin button clicked
let main = gsap.from("main", {
    duration: dur,
    opacity: 0
}).pause();

// set up begin button on paused timeline until page load
let begin = gsap.from("#btnContainer", {
    duration: dur,
    opacity: 0,
    onReverseComplete: function() {
        console.log("Reverse Complete");
        loadScreen1();
        // show the main div
        document.querySelector("main").style.display = "block";
        document.querySelector("main").style.opacity = 1;
        main.play();
    }
}).pause();

// preload all content and then reveal begin button
document.addEventListener("DOMContentLoaded",function(){
    console.log("LOADED!! Yo!");
    // fade out preloader GIF
    gsap.to("#loading", {
        duration: 3.5,
        opacity: 0,
        onComplete: function() {
            document.querySelector("#begin").style.opacity = 1;
            // when done show begin button
            begin.play(); 
        }
    });
});

// begin button click function
document.querySelector("#begin").addEventListener("click",function() {
    console.log("BEGIN the experiment!");
    begin.reverse();
});

// next and previous navigation functions
function showNextScreen(){
    // check if nav is active
    if(navActive){
        console.log("nextScreen");
        document.querySelector("#navBtn"+(screenNum)).style.opacity =0;
        document.querySelector("#navBtn"+(screenNum+1)).style.opacity =1;
        navActive = false;
        // ! Make sure you got that hashtag!
        // target the current
        currentScreen = `#screen${screenNum}`;
        console.log(currentScreen);
        // set the next screen number 
        screenNum++;
        showHideNav(screenNum);
        // target the next screen
        nextScreen = `#screen${screenNum}`;
        // transitions current screen out
        gsap.fromTo(currentScreen, {
            y: 0
        }, {
            duration: dur,
            delay: 0.5,
            y: -960,
            ease: "power2.inOut"
        });
        // show next screen
        document.querySelector(nextScreen).style.display = "block";
        document.querySelector(nextScreen).style.opacity = 1;
        gsap.fromTo(nextScreen, {
            y: 960
        }, {
            duration: dur,
            delay: 0.5,
            y: 0,
            ease: "power2.inOut",
            onComplete: function() {
                console.log("Next Screen Animation Finished");
                // hide current screen
                document.querySelector(currentScreen).style.opacity = 0;
                // re-enable nav
                navActive = true;
            }
        });
        // ! ACCESS FIELD OF AN OBJECT [] allows for a field but we have a variable
        // ! CAN CONCATENATE BUT ALSO RUN THE FUNCTION
        // load function to animate conents of the screen
        // set up off screen
        window[`loadScreen${screenNum}`]();
    }
}

function showPrevScreen(){
    // check if nav is active
    if(navActive){
        console.log("prevScreen");
        document.querySelector("#navBtn"+(screenNum-1)).style.opacity =1;
        document.querySelector("#navBtn"+(screenNum)).style.opacity =0;
        navActive = false;
        // ! Make sure you got that hashtag!
        // target the current
        currentScreen = `#screen${screenNum}`;
        // set the prev screen number 
        screenNum--;
        showHideNav(screenNum);
        // target the prev screen
        prevScreen = `#screen${screenNum}`;
        // transitions current screen out
        gsap.fromTo(currentScreen, {
            y: 0
        }, {
            duration: dur,
            delay: 0.5,
            y: 960,
            ease: "power2.inOut"
        });

        // show prev screen
        document.querySelector(prevScreen).style.opacity = 1;
        document.querySelector(prevScreen).style.display = "block";

        gsap.fromTo(prevScreen, {
            y: -960
        }, {
            duration: dur,
            delay: 0.5,
            y: 0,
            ease: "power2.inOut",
            onComplete: function() {
                console.log("Prev Screen Animation Finished");
                // hide current screen
                document.querySelector(currentScreen).style.opacity = 0;
                // re-enable nav
                navActive = true;
            }
        });

        // ! ACCESS FIELD OF AN OBJECT [] allows for a field but we have a variable
        // ! CAN CONCATENATE BUT ALSO RUN THE FUNCTION
        // load function to animate conents of the screen
        // set up off screen
        window[`loadScreen${screenNum}`]();
    
    }
}
// next and previous button clicks
document.querySelector("#next").addEventListener("click",showNextScreen);
document.querySelector("#prev").addEventListener("click", showPrevScreen);
// show/hide next/prev buttons
function showHideNav(currentScreen) {
    console.log("showHideNav reached");
    let nextBtn = document.querySelector("#next");
    let prevBtn = document.querySelector("#prev");
    if(currentScreen == 1) {
        console.log("should show just the next");
        gsap.to(prevBtn,{opacity: 0, duration: 1});
        gsap.to(nextBtn,{opacity: 1, duration: 1});
    } else if(currentScreen == totalScreens) {
        console.log("should show just the prev")
        gsap.to(prevBtn,{opacity: 1, duration: 1});
        gsap.to(nextBtn,{opacity: 0, duration: 1});
    }
    else {
        console.log("show all nav")
        gsap.to(prevBtn,{opacity: 1, duration: 1});
        gsap.to(nextBtn,{opacity: 1, duration: 1});
    }

}

// set up nav on page load
showHideNav(screenNum);

// functions for loading on content of each screen
// LOAD SCREEN 1 ///////////////////////////////////////////////
function loadScreen1() {
    // animate content on with delays
    gsap.from("#screen1 h1, #navBtn1", {
        duration: dur,
        delay: delay,
        opacity: 0
    });
    let plane = document.querySelector("#plane1");
    let intro_tl = new gsap.timeline();

    intro_tl.from(plane, {x: -1000,y: -300, duration:3, ease:"power2.inOut"})

    let plane_tl = new gsap.timeline({repeat:-1,yoyo:true,delay:2.7});

    //Forward 
    plane_tl.to(plane, {y:-20, duration:2, ease:"power2.inOut"})
    .to(plane, { y:20, duration:2, ease:"power2.inOut"})
    .to(plane, { y:-20, duration:2, ease:"power2.inOut"})
    .to(plane, { y:20, duration:2, ease:"power2.inOut"})
    .to(plane, { y:-20, duration:2, ease:"power2.inOut"})

    //Reverse
    // .to(plane, { top:"20px", duration:1, ease:"power2.inOut"})
    // .to(plane, { top:"0px", duration:1, ease:"power2.inOut"})
    // .to(plane, { top:"20px", duration:1, ease:"power2.inOut"})
    // .to(plane, { top:"0px", duration:1, ease:"power2.inOut"})
    // .to(plane, { top:"20px", duration:1, ease:"power2.inOut"})
}

// LOAD SCREEN 2 ///////////////////////////////////////////////
function loadScreen2() {
    // animate content on with delays
    gsap.from("#screen2 h1, #navBtn2", {
        duration: dur,
        delay: delay,
        opacity: 0
    });
}

// LOAD SCREEN 3 ///////////////////////////////////////////////
function loadScreen3() {
    // animate content on with delays
    gsap.from("#screen3 h1, #navBtn3", {
        duration: dur,
        delay: delay,
        opacity: 0
    });
    let part1 = document.querySelector("#part1");
    let part2 = document.querySelector("#part2");
    let part3 = document.querySelector("#part3");
    let part4 = document.querySelector("#part4");
    let part5 = document.querySelector("#part5");

    let part_tl = new gsap.timeline({repeat:0,yoyo:false,delay:1});
    let part2_tl = new gsap.timeline({repeat:0,yoyo:false,delay:1.2});
    let part3_tl = new gsap.timeline({repeat:0,yoyo:false,delay:1.4});
    let part4_tl = new gsap.timeline({repeat:0,yoyo:false,delay:1.6});
    let part5_tl = new gsap.timeline({repeat:0,yoyo:false,delay:1.8});

    part_tl.to(part1, {top:31 , duration:0.5, ease:"power2.inOut"})
    .to(part1, { top:0 , duration:0.5, ease:"power2.inOut"})
    .to(part1, { top:31 , duration:0.5, ease:"power2.inOut"})

    part2_tl.to(part2, {top:109 , duration:0.5, ease:"power2.inOut"})
    .to(part2, { top:79 , duration:0.5, ease:"power2.inOut"})
    .to(part2, { top:109 , duration:0.5, ease:"power2.inOut"})

    part3_tl.to(part3, {top:109 , duration:0.5, ease:"power2.inOut"})
    .to(part3, { top:79 , duration:0.5, ease:"power2.inOut"})
    .to(part3, { top:109 , duration:0.5, ease:"power2.inOut"})

    part4_tl.to(part4, {top:109 , duration:0.5, ease:"power2.inOut"})
    .to(part4, { top:79 , duration:0.5, ease:"power2.inOut"})
    .to(part4, { top:109 , duration:0.5, ease:"power2.inOut"})
    
    part5_tl.to(part5, {top:122 , duration:0.5, ease:"power2.inOut"})
    .to(part5, { top:92 , duration:0.5, ease:"power2.inOut"})
    .to(part5, { top:122 , duration:0.5, ease:"power2.inOut"})

    part1.onmouseover = function(){
      TweenMax.fromTo(document.querySelector('#comp'), 1, {opacity: 0, x: -50}, {opacity: 1, x: 0});
    }
    part2.onmouseover = function(){
      TweenMax.fromTo(document.querySelector('#al'), 1, {opacity: 0, x: 50}, {opacity: 1, x: 0});
    }
    part3.onmouseover = function(){
      TweenMax.fromTo(document.querySelector('#ti'), 1, {opacity: 0, x: 50}, {opacity: 1, x: 0});
    }
    part4.onmouseover = function(){
      TweenMax.fromTo(document.querySelector('#steel'), 1, {opacity: 0, x: 50}, {opacity: 1, x: 0});
    }
    part5.onmouseover = function(){
      TweenMax.fromTo(document.querySelector('#other'), 1, {opacity: 0, x: 50}, {opacity: 1, x: 0});
    }

    gsap.to("#graphText1", { innerText: 65, delay: 2, duration: 3, 
      snap: {
        innerText:1
      } 
      });

      gsap.to(".circular-pbar", {
        delay: 2,
        "--p": '65%',
        duration: 4,
        ease: 'expo.out'
    });

    gsap.fromTo(".people", {
      opacity:0,
      duration: 2,
      x: 50,
      ease: "power2.inOut"
    },{
      delay: 3.8,
      opacity:1,
      x: 0,
      duration: 2,
      ease: "power2.inOut"
    });

    gsap.fromTo(".people2", {
      opacity:0,
      duration: 2,
      x: 50,
      ease: "power2.inOut"
    },{
      delay: 3.5,
      opacity:1,
      x: 0,
      duration: 2,
      ease: "power2.inOut"
    });

    gsap.fromTo("#large", {
      opacity:0,
      duration: 2,
      x: -50,
      ease: "power2.inOut"
    },{
      delay: 2.5,
      opacity:1,
      x: 0,
      duration: 2,
      ease: "power2.inOut"
    });
      
    
}

// LOAD SCREEN 4 ///////////////////////////////////////////////
function loadScreen4() {
    // animate content on with delays
    gsap.from("#screen4 h1, #navBtn4", {
        duration: dur,
        delay: delay,
        opacity: 0
    });
}

// LOAD SCREEN 5 ///////////////////////////////////////////////
function loadScreen5() {
    // animate content on with delays
    gsap.from("#screen5 h1, #navBtn5", {
        duration: dur,
        delay: delay,
        opacity: 0
    });

    gsap.to("#graphText2", { innerText: 20, delay: 2, duration: 3, 
      snap: {
        innerText:1
      } 
      });

      gsap.to("#graphText3", { innerText: 25, delay: 3, duration: 3, 
        snap: {
          innerText:1
        } 
        });

    gsap.to(".circular-pbar2", {
      delay: 2,
      "--p": '20%',
      duration: 4,
      ease: 'expo.out'
  });

  gsap.to(".circular-pbar3", {
    delay: 3,
    "--p": '25%',
    duration: 4,
    ease: 'expo.out'
});
}

// LOAD SCREEN 6 ///////////////////////////////////////////////
function loadScreen6() {
    // animate content on with delays
    gsap.from("#screen6 h1, #navBtn6", {
        duration: dur,
        delay: delay,
        opacity: 0
    });
    let pass1 = document.querySelector("#pass1");
    let pass2 = document.querySelector("#pass2");
    let pass3 = document.querySelector("#pass3");



    document.querySelector("#pass4").addEventListener("mouseover", function () {
      console.log("mous");
      pass1.style.zIndex = "5";
      gsap.fromTo("#pass1", {
        top: 250,
        left: 25,
        rotate: -80,
        scale: 1,
        duration:0.5,
        ease: "power2.inOut"
      },{
        top:137,
        left: 300,
        opacity:1,
        rotate: 0,
        scale: 1.5,
        duration:0.5,
        ease: "power2.inOut"
      });
    })

    document.querySelector("#pass4").addEventListener("mouseout", function () {
      pass1.style.zIndex = "4";
      gsap.fromTo("#pass1", {
        top:137,
        left: 300,
        opacity:1,
        rotate: 0,
        scale: 1.5,
        duration:0.5,
        ease: "power2.inOut"
      },{
        top: 250,
        left: 25,
        rotate: -80,
        scale: 1,
        duration:0.5,
        ease: "power2.inOut"
      });
    })


    document.querySelector("#pass5").addEventListener("mouseover", function () {
      console.log("mous");
      pass2.style.zIndex = "5";
      gsap.fromTo("#pass2", {
        top: 230,
        left: 300,
        rotate: -80,
        scale: 1,
        duration:0.5,
        ease: "power2.inOut"
      },{
        top:137,
        left: 300,
        opacity:1,
        rotate: 0,
        scale: 1.5,
        duration:0.5,
        ease: "power2.inOut"
      });
    })

    document.querySelector("#pass5").addEventListener("mouseout", function () {
      pass2.style.zIndex = "4";
      gsap.fromTo("#pass2", {
        top:137,
        left: 300,
        opacity:1,
        rotate: 0,
        scale: 1.5,
        duration:0.5,
        ease: "power2.inOut"
      },{
        top: 230,
        left: 300,
        rotate: -80,
        scale: 1,
        duration:0.5,
        ease: "power2.inOut"
      });
    })

    document.querySelector("#pass6").addEventListener("mouseover", function () {
      console.log("mous");
      pass3.style.zIndex = "5";
      gsap.fromTo("#pass3", {
        top: 250,
        left: 570,
        rotate: -80,
        scale: 1,
        duration:0.5,
        ease: "power2.inOut"
      },{
        top:137,
        left: 300,
        opacity:1,
        rotate: 0,
        scale: 1.5,
        duration:0.5,
        ease: "power2.inOut"
      });
    })

    document.querySelector("#pass6").addEventListener("mouseout", function () {
      pass3.style.zIndex = "4";
      gsap.fromTo("#pass3", {
        top:137,
        left: 300,
        opacity:1,
        rotate: 0,
        scale: 1.5,
        duration:0.5,
        ease: "power2.inOut"
      },{
        top: 250,
        left: 570,
        rotate: -80,
        scale: 1,
        duration:0.5,
        ease: "power2.inOut"
      });
    })
}














let position = [null, null];
position[0] = ["48px","293px",""];
position[1] = ["177px","177px",""];


// Get the modal
var modal = document.querySelector("#myModal");

// Get the button that opens the modal
var btn = document.querySelector("#Btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close1")[0];

// function playAudio(url) {
//   new Audio(url).play();
// }

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  // playAudio("audio/Modal1_01.mp3");
  gsap.to("#planeSmall", {
    duration: 4,
    motionPath: {
      path: "#mainPath",
      align: "#mainPath",
      alignOrigin: [0.5, 0.5],
      start:0,
      end:0.05,
      autoRotate: true
    },
    ease: "power3.inOut"
  });
  console.log("clicked");
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  console.log("clicked");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    console.log("clicked");
  }
}


// Get the modal
var modal2 = document.querySelector("#myModal2");

// Get the button that opens the modal
var btn2 = document.querySelector("#Btn2");

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close2")[0];


// When the user clicks on the button, open the modal
btn2.onclick = function() {
  modal2.style.display = "block";
  // playAudio("audio/Modal2_01.mp3");
  gsap.to("#planeSmall", {
    duration: 4,
    motionPath: {
      path: "#mainPath",
      align: "#mainPath",
      alignOrigin: [0.5, 0.5],
      start:0.05,
      end:0.18,
      autoRotate: true
    },
    ease: "power3.inOut"
  });
}

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
  modal2.style.display = "none";
  console.log("clicked");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
    console.log("clicked");
  }
}

// Get the modal
var modal3 = document.querySelector("#myModal3");

// Get the button that opens the modal
var btn3 = document.querySelector("#Btn3");

// Get the <span> element that closes the modal
var span3 = document.getElementsByClassName("close3")[0];

// When the user clicks on the button, open the modal
btn3.onclick = function() {
  // modal3.style.display = "block";
  playAudio("audio/Modal3_01.mp3");
  gsap.to("#planeSmall", {
    duration: 4,
    motionPath: {
      path: "#mainPath",
      align: "#mainPath",
      alignOrigin: [0.5, 0.5],
      start:0.18,
      end:0.3,
      autoRotate: true
    },
    ease: "power3.inOut"
  });
  console.log("clicked");
}

// When the user clicks on <span> (x), close the modal
span3.onclick = function() {
  modal3.style.display = "none";
  console.log("clicked");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal3) {
    modal3.style.display = "none";
    console.log("clicked");
  }
}

// Get the modal
var modal4 = document.querySelector("#myModal4");

// Get the button that opens the modal
var btn4 = document.querySelector("#Btn4");

// Get the <span> element that closes the modal
var span4 = document.getElementsByClassName("close4")[0];

// When the user clicks on the button, open the modal
btn4.onclick = function() {
  modal4.style.display = "block";
  // playAudio("audio/Modal4_01.mp3");
  gsap.to("#planeSmall", {
    duration: 4,
    motionPath: {
      path: "#mainPath",
      align: "#mainPath",
      alignOrigin: [0.5, 0.5],
      start:0.30,
      end:0.425,
      autoRotate: true
    },
    ease: "power3.inOut"
  });
  console.log("clicked");
}

// When the user clicks on <span> (x), close the modal
span4.onclick = function() {
  modal4.style.display = "none";
  console.log("clicked");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal4) {
    modal4.style.display = "none";
    console.log("clicked");
  }
}

// Get the modal
var modal5 = document.querySelector("#myModal5");

// Get the button that opens the modal
var btn5 = document.querySelector("#Btn5");

// Get the <span> element that closes the modal
var span5 = document.getElementsByClassName("close5")[0];

// When the user clicks on the button, open the modal
btn5.onclick = function() {
  modal5.style.display = "block";
  // playAudio("audio/Modal5_01.mp3");
  gsap.to("#planeSmall", {
    duration: 4,
    motionPath: {
      path: "#mainPath",
      align: "#mainPath",
      alignOrigin: [0.5, 0.5],
      start:0.425,
      end:0.56,
      autoRotate: true
    },
    ease: "power3.inOut"
  });
  console.log("clicked");
}

// When the user clicks on <span> (x), close the modal
span5.onclick = function() {
  modal5.style.display = "none";
  console.log("clicked");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal5) {
    modal5.style.display = "none";
    console.log("clicked");
  }
}

// Get the modal
var modal6 = document.querySelector("#myModal6");

// Get the button that opens the modal
var btn6 = document.querySelector("#Btn6");

// Get the <span> element that closes the modal
var span6 = document.getElementsByClassName("close6")[0];

// When the user clicks on the button, open the modal
btn6.onclick = function() {
  modal6.style.display = "block";
  // playAudio("audio/Modal6_01.mp3");
  gsap.to("#planeSmall", {
    duration: 4,
    motionPath: {
      path: "#mainPath",
      align: "#mainPath",
      alignOrigin: [0.5, 0.5],
      start:0.56,
      end:0.7,
      autoRotate: true
    },
    ease: "power3.inOut"
  });
  console.log("clicked");
}

// When the user clicks on <span> (x), close the modal
span6.onclick = function() {
  modal6.style.display = "none";
  console.log("clicked");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal6) {
    modal6.style.display = "none";
    console.log("clicked");
  }
}



// Get the modal
var modal7 = document.querySelector("#myModal7");

// Get the button that opens the modal
var btn7 = document.querySelector("#Btn7");

// Get the <span> element that closes the modal
var span7 = document.getElementsByClassName("close7")[0];

// When the user clicks on the button, open the modal
btn7.onclick = function() {
  modal7.style.display = "block";
  // playAudio("audio/Modal7_01.mp3");
  gsap.to("#planeSmall", {
    duration: 4,
    motionPath: {
      path: "#mainPath",
      align: "#mainPath",
      alignOrigin: [0.5, 0.5],
      start:0.7,
      end:0.88,
      autoRotate: true
    },
    ease: "power3.inOut"
  });
  console.log("clicked");
}

// When the user clicks on <span> (x), close the modal
span7.onclick = function() {
  modal7.style.display = "none";
  console.log("clicked");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal7) {
    modal7.style.display = "none";
    console.log("clicked");
  }
}










// Get the modal
var modal8 = document.querySelector("#myModal8");

// Get the button that opens the modal
var btn8 = document.querySelector("#Btn8");

// Get the <span> element that closes the modal
var span8 = document.getElementsByClassName("close8")[0];

// When the user clicks on the button, open the modal
btn8.onclick = function() {
  modal8.style.display = "block";
  console.log("clicked");
}

// When the user clicks on <span> (x), close the modal
span8.onclick = function() {
  modal8.style.display = "none";
  console.log("clicked");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal8) {
    modal8.style.display = "none";
    console.log("clicked");
  }
}

// Get the modal
var modal9 = document.querySelector("#myModal9");

// Get the button that opens the modal
var btn9 = document.querySelector("#Btn9");

// Get the <span> element that closes the modal
var span9 = document.getElementsByClassName("close9")[0];

// When the user clicks on the button, open the modal
btn9.onclick = function() {
  modal9.style.display = "block";
  console.log("clicked");
}

// When the user clicks on <span> (x), close the modal
span9.onclick = function() {
  modal9.style.display = "none";
  console.log("clicked");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal9) {
    modal9.style.display = "none";
    console.log("clicked");
  }
}

// Get the modal
var modal10 = document.querySelector("#myModal10");

// Get the button that opens the modal
var btn10 = document.querySelector("#Btn10");

// Get the <span> element that closes the modal
var span10 = document.getElementsByClassName("close10")[0];

// When the user clicks on the button, open the modal
btn10.onclick = function() {
  modal10.style.display = "block";
  console.log("clicked");
}

// When the user clicks on <span> (x), close the modal
span10.onclick = function() {
  modal10.style.display = "none";
  console.log("clicked");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal10) {
    modal10.style.display = "none";
    console.log("clicked");
  }
}

// Get the modal
var modal11 = document.querySelector("#myModal11");

// Get the button that opens the modal
var btn11 = document.querySelector("#Btn11");

// Get the <span> element that closes the modal
var span11 = document.getElementsByClassName("close11")[0];

// When the user clicks on the button, open the modal
btn11.onclick = function() {
  modal11.style.display = "block";
  console.log("clicked");
}

// When the user clicks on <span> (x), close the modal
span11.onclick = function() {
  modal11.style.display = "none";
  console.log("clicked");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal11) {
    modal11.style.display = "none";
    console.log("clicked");
  }
}

// Get the modal
var modal12 = document.querySelector("#myModal12");

// Get the button that opens the modal
var btn12 = document.querySelector("#Btn12");

// Get the <span> element that closes the modal
var span12 = document.getElementsByClassName("close12")[0];

// When the user clicks on the button, open the modal
btn12.onclick = function() {
  modal12.style.display = "block";
  console.log("clicked");
}

// When the user clicks on <span> (x), close the modal
span12.onclick = function() {
  modal12.style.display = "none";
  console.log("clicked");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal12) {
    modal12.style.display = "none";
    console.log("clicked");
  }
}

// Get the modal
var modal13 = document.querySelector("#myModal13");

// Get the button that opens the modal
var btn13 = document.querySelector("#Btn13");

// Get the <span> element that closes the modal
var span13 = document.getElementsByClassName("close13")[0];

// When the user clicks on the button, open the modal
btn13.onclick = function() {
  modal13.style.display = "block";
  console.log("clicked");
}

// When the user clicks on <span> (x), close the modal
span13.onclick = function() {
  modal13.style.display = "none";
  console.log("clicked");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal13) {
    modal13.style.display = "none";
    console.log("clicked");
  }
}

// Get the modal
var modal14 = document.querySelector("#myModal14");

// Get the button that opens the modal
var btn14 = document.querySelector("#Btn14");

// Get the <span> element that closes the modal
var span14 = document.getElementsByClassName("close14")[0];

// When the user clicks on the button, open the modal
btn14.onclick = function() {
  modal14.style.display = "block";
  console.log("clicked");
}

// When the user clicks on <span> (x), close the modal
span14.onclick = function() {
  modal14.style.display = "none";
  console.log("clicked");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal14) {
    modal14.style.display = "none";
    console.log("clicked");
  }
}

// Get the modal
var modal15 = document.querySelector("#myModal15");

// Get the button that opens the modal
var btn15 = document.querySelector("#Btn15");

// Get the <span> element that closes the modal
var span15 = document.getElementsByClassName("close15")[0];

// When the user clicks on the button, open the modal
btn15.onclick = function() {
  modal15.style.display = "block";
  console.log("clicked");
}

// When the user clicks on <span> (x), close the modal
span15.onclick = function() {
  modal15.style.display = "none";
  console.log("clicked");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal15) {
    modal15.style.display = "none";
    console.log("clicked");
  }
}

// Get the modal
var modal16 = document.querySelector("#myModal16");

// Get the button that opens the modal
var btn16 = document.querySelector("#Btn16");

// Get the <span> element that closes the modal
var span16 = document.getElementsByClassName("close16")[0];

// When the user clicks on the button, open the modal
btn16.onclick = function() {
  modal16.style.display = "block";
  console.log("clicked");
}

// When the user clicks on <span> (x), close the modal
span16.onclick = function() {
  modal16.style.display = "none";
  console.log("clicked");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal16) {
    modal16.style.display = "none";
    console.log("clicked");
  }
}












