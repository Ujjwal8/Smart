$(".button-collapse").sideNav();
$('.control').click(function () {
  $('body').addClass('search-active');
  $('.input-search').focus();
});
$('.mainaddcomments').hide();
$('.icon-close').click(function () {
  $('body').removeClass('search-active');
});
$('li.addcomments').on('click tap', function () {

  $('.threadComment').hide();
  $('.mainaddcomments').show();

});

$('li.comments').on('click tap', function () {

  $('.threadComment').show();
  $('.mainaddcomments').hide();
});

/**
 * Firebase
 */
// Initialize Firebase
$(document).ready(function () {
  $('.collapsible').collapsible();
  $('#floatbtn').click(() => {

    $('.collapsible').toggle(function () {
      $(".collapsible").removeClass("active");

    }, function () {
      $(".collapsible").addClass("active");
    });
    $('.mainaddcomment').toggle(function () {
      $(".mainaddcomment").removeClass("active");

    }, function () {
      $(".mainaddcomment").addClass("active");
    });

  })
   

});


var config = {
  apiKey: "AIzaSyCOmubrc3gEd6LOW5UfRH5LVaL-GFgRCgk",
  authDomain: "not-so-awesome-project-45a2e.firebaseapp.com",
  databaseURL: "https://not-so-awesome-project-45a2e.firebaseio.com",
  projectId: "not-so-awesome-project-45a2e",
  storageBucket: "not-so-awesome-project-45a2e.appspot.com",
  messagingSenderId: "481329884022"
};
firebase.initializeApp(config);
firebase.database().ref('/emotions').remove()

/*
   SDK Needs to create video and canvas nodes in the DOM in order to function
   Here we are adding those nodes a predefined div.
*/
var divRoot = $("#affdex_elements")[0];

// The captured frame's width in pixels
var width = 320;

// The captured frame's height in pixels
var height = 240;

/*
   Face detector configuration - If not specified, defaults to
   affdex.FaceDetectorMode.LARGE_FACES
   affdex.FaceDetectorMode.LARGE_FACES=Faces occupying large portions of the frame
   affdex.FaceDetectorMode.SMALL_FACES=Faces occupying small portions of the frame
*/
var faceMode = affdex.FaceDetectorMode.LARGE_FACES;
var isPlaying = false
//Construct a CameraDetector and specify the image width / height and face detector mode.
var detector = new affdex.CameraDetector(divRoot, width, height, faceMode);
// * 
//   onImageResults success is called when a frame is processed successfully and receives 3 parameters:
//   - Faces: Dictionary of faces in the frame keyed by the face id.
//            For each face id, the values of detected emotions, expressions, appearane metrics 
//            and coordinates of the feature points
//   - image: An imageData object containing the pixel values for the processed frame.
//   - timestamp: The timestamp of the captured image in seconds.
// */


var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '400',
    width: '640',
    videoId: 'Xy_7q1xMnOg',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}






var engagement_arr = []
var joyness_arr = []
var keys = []
var key = 0
var radpoints = []
var low_engage = 0;
var isAlreadypoped = false




detector.addEventListener("onImageResultsSuccess", function (faces, image, timestamp) {

  if (faces['0'] != null && isPlaying) {
    var emotions1 = faces['0'].emotions;
    key = key + 1
    // firebase.database().ref('/emotions').push(emotions1);
    engagement_arr.push(emotions1.engagement)
    if (emotions1.engagement === 0) {
      low_engage = low_engage + 1;
    }

    if (low_engage === 35 && !isAlreadypoped) {
      isAlreadypoped = true
      document.getElementById('pepper-embed-badge').click();
      low_engage = 0;
      player.pauseVideo();
      setTimeout(() => {
        document.getElementById('pepper-embed-badge').click();
        player.playVideo()
      }, 10000);
    }
    joyness_arr.push(emotions1.joy);
    keys.push("");
    radpoints.push(0)

  }// emotions.

});
setInterval(() => low_engage = low_engage = 0, 15000);

/* 
  onImageResults success receives 3 parameters:
  - image: An imageData object containing the pixel values for the processed frame.
  - timestamp: An imageData object contain the pixel values for the processed frame.
  - err_detail: A string contains the encountered exception.
*/
detector.addEventListener("onImageResultsFailure", function (image, timestamp, err_detail) { });
detector.addEventListener("onWebcamConnectSuccess", function () {
  console.log("I was able to connect to the camera successfully.");
});

detector.addEventListener("onWebcamConnectFailure", function () {
  console.log("I've failed to connect to the camera :(");
});


detector.detectAllExpressions();
detector.detectAllEmotions();
detector.start();

var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.




// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  console.log(event);
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {

  if (event.data === 1) {
    isPlaying = true
    console.log('Playing');
  }
  if (event.data === 2) {
    isPlaying = false
    console.log('Paused')
  }
  if (event.data === 0) {
    isPlaying = false
    console.log('Ended')
    detector.stop();
  }
}
function stopVideo() {
  player.stopVideo();

}













var ctx = document.getElementById("myChart");
// console.log('Helll')
var LineChartSampleData = {
  labels: keys,
  datasets: [{
    label: 'engagement',
    data: engagement_arr,
    backgroundColor: [

      'rgba(255, 99, 132, 0.2)',
    ],
    borderColor: [

      'rgba(255, 99, 132, 1)',
    ],
    pointRadius: radpoints,
  }, {
    label: 'joy',
    data: joyness_arr,
    backgroundColor: [



      'rgba(54, 162, 235, 0.2)',

    ],
    borderColor: [


      'rgba(54, 162, 235, 1)',

    ],
    pointRadius: radpoints,
  }]
};



setInterval(function () {
  var myChart = new Chart(ctx, {
    type: 'line',
    data: LineChartSampleData,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      animation: {
        duration: 0
      }
    }
  });
}, 200);