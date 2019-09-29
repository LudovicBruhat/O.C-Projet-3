/*var diaporama = {
  slides: $('#slides .slide'),
  currentSlide: 0,

  nextSlide: function () { // fonction qui passe au slide suivant
    this.slides[this.currentSlide].className = 'slide'; // le slide courant n'est plus affiché.
    this.currentSlide = (this.currentSlide + 1) % this.slides.length; // 1, 2, 3, 4, 5, 1 ...
    this.slides[this.currentSlide].className = 'slide showing'; // Le slide suivant est affiché
  }

}

// La methode nextSlide() de diaporama est activée toute les 5 secondes
var animAuto = setInterval("diaporama.nextSlide()", 5000)

// Le carrousel stop lorsqu'on hover dessus
$('#slides').hover(function () {
  clearInterval(animAuto);
}, function () {
  animAuto = setInterval("diaporama.nextSlide()", 5000)
});*/



class diaporama {
  slides = $('#slides .slide');
  currentSlide = 0;

  constructor() {
  }

  nextSlide() { // fonction qui passe au slide suivant
    this.slides[this.currentSlide].className = 'slide'; // le slide courant n'est plus affiché.
    this.currentSlide = (this.currentSlide + 1) % this.slides.length; // 1, 2, 3, 4, 5, 1 ...
    this.slides[this.currentSlide].className = 'slide showing'; // Le slide suivant est affiché
  }

  prevSlide() { // fonction qui passe au slide précédent
    this.slides[this.currentSlide].className = 'slide';
    if(this.currentSlide === 0) { // si l'on est au premier slide
      this.currentSlide = 4; // un retour arrière nous renvois vers le dernier panel
    } else {
        this.currentSlide = (this.currentSlide - 1) % this.slides.length; // sinon, on affiche le slide précédent
    }
    this.slides[this.currentSlide].className = 'slide showing';
  }
}

diaporama = new diaporama()
var animAuto = setInterval("diaporama.nextSlide()", 5000)

$('#slides').hover(function () {
  clearInterval(animAuto);
}, function () {
  animAuto = setInterval("diaporama.nextSlide()", 5000)
});
