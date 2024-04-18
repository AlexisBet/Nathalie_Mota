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
    $(document).on('click', function(event) {
        if ($(event.target).is(modal)) {
            closeModal();
        }
    });

    $('.modale-contact').click(function(){
        // Récupérez la référence de la photo en cours de consultation
        const referenceText = $('.container-photo').find('.informations-photo p:nth-of-type(1)').text();
        
        // Extrait la valeur de la référence (supprime le texte "RÉFÉRENCE:")
        const referenceValue = referenceText.split(':')[1];

        // Pré-remplissez le champ de référence dans la popup de contact avec la valeur extraite
        $('input[name="ref"]').val(referenceValue);
    });

    $(".container-arrows .img-arrows").css("visibility", "hidden");
    $(".arrow-previous a").hover(function() {
        $(this).closest('.arrow-previous').find('.img-arrows').css("visibility", "visible"); // Rendre l'image de la flèche précédente visible
    }, function() {
        $(this).closest('.arrow-previous').find('.img-arrows').css("visibility", "hidden"); // Rendre l'image de la flèche précédente invisible lorsque la souris quitte
    });
    
    // Événement au survol de la flèche suivante
    $(".arrow-next a").hover(function() {
        $(this).closest('.arrow-next').find('.img-arrows').css("visibility", "visible"); // Rendre l'image de la flèche suivante visible
    }, function() {
        $(this).closest('.arrow-next').find('.img-arrows').css("visibility", "hidden"); // Rendre l'image de la flèche suivante invisible lorsque la souris quitte
    });

    $('.modal__burger').click(function(){
        $('nav').toggleClass('active');
        $(this).toggleClass('open');
    });

    let currentPage = 1; // Initialiser la page à charger
    const ajaxurl = ajax_params.ajax_url; 
    const action = 'load_more_photos_action';

    $('.load-more-photos').on('click', function() {
        currentPage++;

        const nonce = ajax_params.nonce;

        const categorie = $('.category-filter .selected-option').attr('data-value');
        const format = $('.form-filter .selected-option').attr('data-value');
        const tri = $('.date-filter .selected-option').attr('data-value');

        // Envoyer la requête Ajax
        $.ajax({
            type: 'POST',
            url: ajaxurl,
            dataType: 'html',
            data: {
                action: action,
                nonce: nonce,
                paged: currentPage,
                categorie: categorie,
                format: format, 
                tri: tri
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

    // Fonction pour charger les photos avec les filtres sélectionnés
    function loadFilteredPhotos() {
        let categorie = $('.category-filter .selected-option').attr('data-value');
        let format = $('.form-filter .selected-option').attr('data-value');
        let tri = $('.date-filter .selected-option').attr('data-value');
    
        $.ajax({
            type: 'POST',
            url: ajax_params.ajax_url, 
            data: {
                action: 'load_filtered_photos_action',
                categorie: categorie,
                format: format,
                tri: tri,
            },
            success: function(response) {
                $('.img-gallery').html(response);
                currentPage = 1;
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log('Erreur Ajax : ' + errorThrown);
            }
        });
    }
    
    $(document).ready(function() {
        loadFilteredPhotos();
    });
    
    // Écouter les clics sur les éléments li pour les filtres
    $('.custom-ul li').on('click', function() {
        let selectedOption = $(this).text();
        let selectedValue = $(this).attr('data-value');
        $(this).closest('.custom-select').find('.selected-option').text(selectedOption).attr('data-value', selectedValue);
        loadFilteredPhotos();
    });

    // Afficher ou masquer la liste déroulante personnalisée lors du clic sur le sélecteur
    $('.custom-select').on('click', function() {
        $(this).find('.custom-ul').toggle();
    });
    
    // Masquer la liste déroulante personnalisée lors du clic en dehors de celle-ci
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.custom-select').length) {
            $('.custom-ul').hide();
        }
    });
    
    // Vérifier la hauteur de l'élément container-photo
    let containerHeight = $(".container-photo").height();

    console.log("Container height:", containerHeight);

    // Appliquer le style en fonction de la hauteur
    if (containerHeight < 1255) {
        $(".arrow-previous .img-arrows, .arrow-next .img-arrows").css("top", "60%");
    } else if (containerHeight < 1284) {
        $(".arrow-previous .img-arrows, .arrow-next .img-arrows").css("top", "64%");
    } else if (containerHeight < 1330) {
        $(".arrow-previous .img-arrows, .arrow-next .img-arrows").css("top", "67%");
    } else if (containerHeight < 1500) {
        $(".arrow-previous .img-arrows, .arrow-next .img-arrows").css("top", "73%");
    }

    $('.custom-select').on('click', function() {
        $(this).toggleClass('open');
        const icon = $(this).find('i');
        icon.toggleClass('fa-chevron-down fa-chevron-up');
    });
    
    // Ajoutez une condition pour vérifier si l'élément cliqué est à l'intérieur du menu
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.custom-select').length) {
            $('.custom-select').removeClass('open');
            $('.custom-select i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
        }
    });    

});