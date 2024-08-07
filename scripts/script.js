// This script is responsible for the picture sliders on the about page

// Image Slider class that makes it so the page can have multiple sliders
class ImageSlider {
    constructor(sliderContainer) { // Constructor
        this.sliderContainer = sliderContainer; // Get the container element
        this.slider = sliderContainer.querySelector('.slider');
        this.sliderImages = sliderContainer.querySelectorAll('.slider img'); // Get all slider images
        this.prevBtn = sliderContainer.parentElement.querySelector('.left'); // Get the left button from the parent 
        this.nextBtn = sliderContainer.parentElement.querySelector('.right'); // Get the right button from the parent 

        this.size = this.sliderImages[0].clientWidth; // The current width of the slider image
        this.counter = 1; // Start at the first actual image, after clone

        // Initial setup, move the slider to the first image that is not a clone
        this.slider.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';

        this.initEvents();
    }

    initEvents() { // Linking methods to event listeners
        this.nextBtn.addEventListener('click', () => this.moveToNext());
        this.prevBtn.addEventListener('click', () => this.moveToPrev());
        this.slider.addEventListener('transitionend', () => this.checkClone());

        window.addEventListener('resize', () => this.updateSize());
    }

    moveToNext() {
        if (this.counter >= this.sliderImages.length - 1) return;
        this.slider.style.transition = 'transform 0.4s ease-in-out'; // Add transition to slider
        this.counter++; // Add 1 to counter
        this.slider.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
    }

    moveToPrev() {
        if (this.counter <= 0) return;
        this.slider.style.transition = 'transform 0.4s ease-in-out'; // Add transition to slider
        this.counter--; // Subtract 1 from counter
        this.slider.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
    }

    checkClone() {
        if (this.sliderImages[this.counter].id === 'lastClone') {
            this.slider.style.transition = 'none';
            this.counter = this.sliderImages.length - 2;
            this.slider.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
        }

        if (this.sliderImages[this.counter].id === 'firstClone') {
            this.slider.style.transition = 'none';
            this.counter = 1;
            this.slider.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
        }
    }

    updateSize() {
        this.size = this.sliderImages[0].clientWidth; // Update size on window resize
        this.slider.style.transition = 'none'; // Temporarily remove transition for smooth resizing
        this.slider.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
    }
}

// Initialize sliders
const sliders = document.querySelectorAll('.slider-container');
sliders.forEach(sliderContainer => new ImageSlider(sliderContainer));