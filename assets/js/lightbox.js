jQuery(document).ready(function($) {
    const imageUrls = [];
    let currentImageIndex = 0;

    // Ouvrir la lightbox lorsque l'image est cliquée
    $(document).on('click', '.fullscreen, img.fullscreen', function() {
        const container = $(this).closest('.container-galerie');
        const clickedImageIndex = imageUrls.indexOf(container.find('img.photo').attr('src'));
        openLightbox(clickedImageIndex);
    });

    // Fonction pour ouvrir la lightbox avec l'index de l'image
    function openLightbox(index) {
        $(".img-fullscreen").attr("src", imageUrls[index]);
        currentImageIndex = index;
        updateImageInfo();
        $('.container-lightbox').show();
    }

    // Gérer le clic sur les flèches précédentes et suivantes
    $('.prev-image').click(function() {
        currentImageIndex = (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
        $(".img-fullscreen").attr("src", imageUrls[currentImageIndex]);
        updateImageInfo();
    });

    $('.next-image').click(function() {
        currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
        $(".img-fullscreen").attr("src", imageUrls[currentImageIndex]);
        updateImageInfo();
    });

    // Gérer la fermeture de la lightbox
    $('.close-fullscreen').click(function() {
        $('.container-lightbox').hide();
    });

    // Fonction pour mettre à jour les informations de l'image affichée
    function updateImageInfo() {
        const category = $('.container-galerie').eq(currentImageIndex).find('.categorie').text();
        const reference = $('.container-galerie').eq(currentImageIndex).find('.reference').text();
        $('.fullscreen-photo h6').text(category);
        $('.fullscreen-photo h5').text(reference);
    }

    // Récupérer les URLs des images au chargement de la page
    $('.container-galerie img.photo').each(function() {
        imageUrls.push($(this).attr('src'));
    });
});
