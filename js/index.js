window.onload = function() {

    var uploadInput = document.getElementById("upload-input");
    uploadInput.onchange = function() {
        var file = this.files[0];
        var size = ((file.size/1000)/1000).toFixed(2);
        var filename = file.name;
        var url = URL.createObjectURL(file);

        //Declear all toolbar
        var playIcon = document.getElementById("play-icon");
        var muteIcon = document.getElementById("mute-icon");
        var loopIcon = document.getElementById("loop-icon");

        //Show filename
        var title = document.getElementById("title");
        title.innerHTML = filename;

        //Show filesize
        var sizeEl = document.getElementById("size");
        sizeEl.innerHTML = "Size :"+size+"Mb";

        //Creating Audio Tage
        var audio = document.createElement("audio");
        audio.src = url;
        audio.play();
        playIcon.className = "ri-pause-fill";

        // Enabling toolbar
        var toolbars = document.getElementsByClassName("toolbar");
        for(var i=0; i<toolbars.length; i++){
            toolbars[i].disabled = false;
        }

        // Play & Pause
        var playBtn = document.getElementById("play-btn");
        playBtn.onclick = function() {
            
            if (audio.paused) {
                playIcon.className = "ri-pause-fill";
                audio.play();
            }
            else {
                playIcon.className = "ri-play-fill";
                audio.pause();
            }
            
        }


        //Mute
        var muteBtn = document.getElementById("mute-btn");
        muteBtn.onclick = function() {
            if(audio.muted) 
            {
                audio.muted = false;
                muteIcon.className = "ri-volume-up-line";
            }
            else {
                audio.muted = true;
                muteIcon.className = "ri-volume-mute-line";
            }
            
        }


        //Loop
        var loopBtn = document.getElementById("loop-btn");
            loopBtn.onclick = function()
            {
                if(audio.loop)
                {
                    audio.loop = true;
                    loopIcon.className = "ri-repeat-2-line";
                }
                else {
                    audio.loop = true;
                    loopIcon.className = "ri-repeat-one-line";
                }
            }


        // Forward
        var forwardBtn = document.getElementById("forward-btn");
        forwardBtn.onclick = function() {
           var current = audio.currentTime;
           audio.currentTime = (current + 10);

        } 

        //Backward
        var backwardBtn = document.getElementById("backward-btn");
        backwardBtn.onclick = function() {
           var current = audio.currentTime;
           if(current > 10) audio.currentTime = (current - 10);
        } 


        // Show Full Duration
        audio.onloadedmetadata = function() {
            var duration = audio.duration;
            var minutes = Math.floor(duration/60);
            var seconds = Math.floor(duration%60);

            var fullDuration = document.getElementById("full-duration");
            fullDuration.innerHTML = minutes+':'+seconds;

        }


        //Progress & current Duration
        audio.ontimeupdate = function() {

            var totalDuration = audio.duration;
            var duration = audio.currentTime;
            var minutes = Math.floor(duration/60);
            var seconds = Math.floor(duration%60);

            var currentDuration = document.getElementById("current-duration");
            currentDuration.innerHTML = minutes+':'+seconds;
            var percentages = Math.floor((duration/totalDuration)*100);

            var progressBar = document.getElementById("progress-bar");
            progressBar.style.width = percentages +'%';

        }


        // forward and backward on progress click
        var progress = document.getElementById("progress");
        progress.onclick = function(event) {
            var mainProgress = progress.getBoundingClientRect();
            var clickMarginFromLeftSide = event.clientX;
            var progressMarginFromLeftSide = mainProgress.left;
            var offsetX = clickMarginFromLeftSide-progressMarginFromLeftSide;
            var approxDuration = offsetX/mainProgress.width;
            var newTime = approxDuration*audio.duration;
            audio.currentTime = newTime;
            audio.play();

        }


    }



}