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

jQuery(document).ready(function($) {
    var currentPage = 1; // Initialiser la page à charger

    $('.load-more-photos').on('click', function() {
        currentPage++; // Incrémenter le numéro de page

        var nonce = $(this).data('nonce'); // Récupérer le nonce
        var action = $(this).data('action'); // Récupérer l'action
        var ajaxurl = $(this).data('ajaxurl'); // Récupérer l'URL du script de gestion Ajax

        // Envoyer la requête Ajax
        $.ajax({
            type: 'POST',
            url: ajaxurl,
            dataType: 'html',
            data: {
                action: action,
                nonce: nonce,
                paged: currentPage // Passer le numéro de page à charger
            },
            success: function(response) {
                // Ajouter les nouvelles photos chargées à la fin de la section img-gallery
                $('.img-gallery').append(response);
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log('Erreur Ajax : ' + errorThrown);
            }
        });
    });
});