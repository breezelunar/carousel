let currentHorizontalIndex = 0;
const horizontalSlides = document.querySelectorAll('.carousel.horizontal .slide');
const totalHorizontalSlides = horizontalSlides.length;
let verticalIndices = {};

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
            slide.style.transform = "scale(2.0)"; // Centered image is larger
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

document.querySelectorAll('.arrow.right').forEach(arrow => {
    arrow.addEventListener('click', function() {
        if (currentHorizontalIndex < totalHorizontalSlides - 1) {
            currentHorizontalIndex++;
            updateHorizontalPosition();
        }
    });
});

document.querySelectorAll('.arrow.left').forEach(arrow => {
    arrow.addEventListener('click', function() {
        if (currentHorizontalIndex > 0) {
            currentHorizontalIndex--;
            updateHorizontalPosition();
        }
    });
});

// Add event listeners for vertical carousels and their respective arrows.
document.querySelectorAll('.carousel.vertical').forEach((carousel, idx) => {
    // Initially set the index for each vertical carousel to 0
    verticalIndices[idx] = 0;

    let verticalSlides = carousel.querySelectorAll('.slide');
    let totalVerticalSlides = verticalSlides.length;

    carousel.querySelectorAll('.arrow.top').forEach(arrow => {
        arrow.addEventListener('click', function() {
            if (verticalIndices[idx] > 0) {
                verticalIndices[idx]--;
                updateVerticalPosition(carousel, verticalIndices[idx]);
            }
        });
    });

    carousel.querySelectorAll('.arrow.bottom').forEach(arrow => {
        arrow.addEventListener('click', function() {
            if (verticalIndices[idx] < totalVerticalSlides - 1) {
                verticalIndices[idx]++;
                updateVerticalPosition(carousel, verticalIndices[idx]);
            }
        });
    });
});

// Implement the function to update the vertical position.
function updateVerticalPosition(carousel, index) {
    const offset = index * window.innerHeight;
    carousel.scrollTo({ top: offset, behavior: 'smooth' });
}
