let currentHorizontalIndex = 0;
const horizontalSlides = document.querySelectorAll('.carousel.horizontal .slide');
const totalHorizontalSlides = horizontalSlides.length;

document.querySelector('.carousel.horizontal').addEventListener('touchstart', handleSwipeStart, false);
document.querySelector('.carousel.horizontal').addEventListener('touchend', handleSwipeEnd, false);

function handleSwipeStart(e) {
    startX = e.changedTouches[0].clientX;
}

function handleSwipeEnd(e) {
    let endX = e.changedTouches[0].clientX;
    let distanceX = startX - endX;

    if (Math.abs(distanceX) > 50) {
        if (distanceX > 0) {
            // Swiped to the left
            if (currentHorizontalIndex < totalHorizontalSlides - 1) {
                currentHorizontalIndex++;
            }
        } else {
            // Swiped to the right
            if (currentHorizontalIndex > 0) {
                currentHorizontalIndex--;
            }
        }
        updateHorizontalPosition();
    }
}

function updateScaling() {
    horizontalSlides.forEach((slide, index) => {
        if (index === currentHorizontalIndex) {
            slide.style.transform = "scale(2)"; // Centered image is larger
        } else {
            slide.style.transform = "scale(1)"; // Others are at their normal size
        }
    });
}

function updateHorizontalPosition() {
    const offset = currentHorizontalIndex * window.innerWidth;
    document.querySelector('.carousel.horizontal').scrollTo({ left: offset, behavior: 'smooth' });
    updateScaling();
}

