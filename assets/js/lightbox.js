jQuery(document).ready(function($) {
    let currentImageIndex = 0;
    let imageUrls = [];

    // Ouvrir la lightbox lorsque l'image est cliquée
    $(document).on('click', '.fullscreen, img.fullscreen', function() {
        const container = $(this).closest('.container-galerie');
        const clickedImageIndex = container.index();
        openLightbox(clickedImageIndex);
    });

    // Fonction pour ouvrir la lightbox avec l'index de l'image
    function openLightbox(index) {
        const imageUrl = $('.container-galerie').eq(index).find('img.photo').attr('src');
        $(".img-fullscreen").attr("src", imageUrl);
        currentImageIndex = index;
        updateImageInfo();
        $('.container-lightbox').show();
    }

    // Gérer le clic sur les flèches précédentes et suivantes
    $('.prev-image').click(function() {
        currentImageIndex = (currentImageIndex - 1 + $('.container-galerie').length) % $('.container-galerie').length;
        const imageUrl = $('.container-galerie').eq(currentImageIndex).find('img.photo').attr('src');
        $(".img-fullscreen").attr("src", imageUrl);
        updateImageInfo();
    });

    $('.next-image').click(function() {
        currentImageIndex = (currentImageIndex + 1) % $('.container-galerie').length;
        const imageUrl = $('.container-galerie').eq(currentImageIndex).find('img.photo').attr('src');
        $(".img-fullscreen").attr("src", imageUrl);
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

    // Fonction pour récupérer les URLs des images
    function updateImageUrls() {
        $('.container-galerie img.photo').each(function() {
            const imageUrl = $(this).attr('src');
            if (!imageUrl) return; // S'assurer que l'URL de l'image est définie
            if ($('.container-galerie img.photo').index(this) >= imageUrls.length) {
                imageUrls.push(imageUrl);
            }
        });
    }

    // Mettre à jour les URLs des images au chargement de la page
    updateImageUrls();

});
