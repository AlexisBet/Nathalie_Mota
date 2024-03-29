jQuery(document).ready(function($) {
    // Récupérer l'élément de menu "Contact"
    const contactLink = $('.modale-contact');
    
    // Récupérer la modale
    const modal = $('.popup-overlay');
    
    // Fonction pour ouvrir la modale
    function openModal() {
        modal.css('display', 'flex');
    }
    
    // Fonction pour fermer la modale
    function closeModal() {
        modal.css('display', 'none');
    }
    
    // Ajouter un écouteur d'événement au clic sur le lien "Contact"
    contactLink.on('click', function(event) {
        // Empêcher le comportement par défaut du lien
        event.preventDefault();
        // Appeler la fonction pour ouvrir la modale
        openModal();
    });
    
    // Ajouter un écouteur d'événement pour fermer la modale lorsque l'utilisateur clique en dehors de celle-ci
    $(window).on('click', function(event) {
        if ($(event.target).is(modal)) {
            closeModal();
        }
    });


$(".modal-open").click(function() {
    $(".modal__content").animate({ height: "toggle", opacity: "toggle" }, 1000).toggleClass("open");
    $(".modal__burger").toggleClass("close");
    });
    
});

jQuery(document).ready(function($) {
    // Cacher l'image initialement
    $(".container-arrows .img-arrows").css("visibility", "hidden");

    // Événement au survol de la flèche précédente
    $(".arrow a").mouseenter(function() {
        $(".container-arrows .img-arrows").css("visibility", "visible"); // Rendre l'image visible
    }).mouseleave(function() {
        $(".container-arrows .img-arrows").css("visibility", "hidden"); // Rendre l'image invisible lorsque la souris quitte la flèche
    });

$('.modal__burger').click(function(){
    $('nav').toggleClass('active');
    $(this).toggleClass('open');

});

});

