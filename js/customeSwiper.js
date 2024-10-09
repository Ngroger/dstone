// Initialize Swiper
const swiper = new Swiper('#slideshow_1484331457896', {
  loop: true,
  navigation: {
    nextEl: '#slider_next_1484331457896',
    prevEl: '#slider_prev_1484331457896',
  },
  autoplay: {
    delay: 5000,
  },
  on: {
    slideChange: updatePagination,
  }
});

// Get buttons for custom pagination
const dots = document.querySelectorAll('.slider-swiper button');

function updatePagination() {
  // Clear existing active dots
  dots.forEach((dot, index) => {
    if (index === swiper.realIndex) {
      dot.classList.remove('slider-deactive-dot');
      dot.classList.add('slider-active-dot');
    } else {
      dot.classList.remove('slider-active-dot');
      dot.classList.add('slider-deactive-dot');
    }
  });
}

// Initial call to set the first dot as active
updatePagination();
