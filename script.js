let startX = 0;
let startY = 0;
const horizontalCarousel = document.querySelector('.carousel.horizontal');

horizontalCarousel.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].clientX;
    startY = e.changedTouches[0].clientY;
});

horizontalCarousel.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;

    let distanceX = startX - endX;
    let distanceY = startY - endY;

    if (Math.abs(distanceX) > Math.abs(distanceY) && Math.abs(distanceX) > 50) {
        // Horizontal Swipe
        if (distanceX > 0) {
            // Swiped to left
            horizontalCarousel.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
        } else {
            // Swiped to right
            horizontalCarousel.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
        }
    }
});
