//Get elements
const player = document.querySelector('.player');
const video = player.querySelector('video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const full = player.querySelector('[data-full]');

//Add functionalities
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '▋▋';
    toggle.textContent = icon;
}

function updateRange() {
    video[this.name] = this.value;
}

function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
    console.log(progressBar.style.width);
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function fullScreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    }
}

//Add eventListeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);
toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => {
    button.addEventListener('click', function() {
        video.currentTime += parseFloat(this.dataset.skip);
    });
});

ranges.forEach(range => {
    range.addEventListener('change', updateRange);
    range.addEventListener('mousemove', updateRange);
});

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

full.addEventListener('click', fullScreen);