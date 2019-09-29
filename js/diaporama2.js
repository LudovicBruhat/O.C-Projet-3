class Diaporama {
    constructor(containerSelector, itemSelector, interval) {

        var _containerSelector = containerSelector;
        var _itemSelector = itemSelector;
        var _interval = interval;

        var _slides = $('#slides .slide');
        var _currentSlide = 0;

        
    }

    get slides() {
        return this._slides;
    }

    set slides(value) {
        this._slides = value;
    }

    get currentSlide() {
        return this._currentSlide;
    }

    set currentSlide(value) {
        this._slid_currentSlidees = value;
    }

    get containerSelector() {
        return this._containerSelector;
    }

    get itemSelector() {
        return this._itemSelector;
    }

    get interval() {
        return this._interval;
    }

    nextSlide() {
        slides[currentSlide].className = this.itemSelector;
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].className = this.itemSelector + ' showing';
    }

    setSlideInterval() {
        setInterval(this.nextSlide(), this.interval);
    }
    setSlideInterval();
}
//instance
var mySlide = new Diaporama('#slides', '.slide', 5000);