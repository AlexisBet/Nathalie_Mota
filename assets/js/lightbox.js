jQuery(document).ready(function($) {
    const imageUrls = []; // Tableau pour stocker les URLs des images
    let currentImageIndex = 0;

    // Utilisation de la délégation d'événement pour les images fullscreen
    $(document).on('click', 'img.fullscreen', function() {
        const container = $(this).closest('.container-galerie');
        const clickedImageIndex = container.index();

        const filteredImageContainers = $('.container-galerie');
        const filteredImageUrls = filteredImageContainers.find('img.photo').map(function() {
            return $(this).attr('src');
        }).get();

        imageUrls.length = 0; // Réinitialiser le tableau
        Array.prototype.push.apply(imageUrls, filteredImageUrls); // Mettre à jour les URLs d'images filtrées
        openLightbox(clickedImageIndex);
    });

    // Fonction pour ouvrir la lightbox avec l'index de l'image
    function openLightbox(index) {
        $(".img-fullscreen").attr("src", imageUrls[index]);
        currentImageIndex = index;
        updateImageInfo(); // Mettre à jour les informations de l'image affichée
        $('.container-lightbox').show();
    }
      // Utilisation de la délégation d'événement pour les icônes de plein écran
      $(document).on('click', '.fullscreen', function() {
        const clickedImageIndex = imageUrls.indexOf($(this).closest('.container-galerie').find('img.photo').attr('src'));
        openLightbox(clickedImageIndex);
    });

    // Fonction pour mettre à jour la liste d'URLs d'images
    function updateImageUrls() {
        imageUrls.length = 0; // Réinitialiser le tableau
        $('.container-galerie').each(function() {
            const imageUrl = $(this).find('img').attr('src');
            imageUrls.push(imageUrl);
        });
    }

    // Appeler la fonction pour la première fois au chargement de la page
    updateImageUrls();

    $('.fullscreen').click(function(e) {
        $(".img-fullscreen").attr("src", e.target.parentElement.parentElement.children[0].src);
        currentImageIndex = imageUrls.indexOf(e.target.parentElement.parentElement.children[0].src);
        updateImageInfo(); // Mettre à jour les informations de l'image affichée
        $('.container-lightbox').show();
    });

    $('.prev-image').click(function() {
        currentImageIndex = (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
        $(".img-fullscreen").attr("src", imageUrls[currentImageIndex]);
        updateImageInfo(); // Mettre à jour les informations de l'image affichée
    });

    $('.next-image').click(function() {
        currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
        $(".img-fullscreen").attr("src", imageUrls[currentImageIndex]);
        updateImageInfo(); // Mettre à jour les informations de l'image affichée
    });

    $('.close-fullscreen').click(function() {
        $('.container-lightbox').hide();
    });

    // Fonction pour mettre à jour les informations de l'image affichée
    function updateImageInfo() {
        const category = getImageCategory(currentImageIndex); // Obtenir la catégorie de l'image
        const reference = getImageReference(currentImageIndex); // Obtenir la référence de l'image
        $('.fullscreen-photo h6').text(category);
        $('.fullscreen-photo h5').text(reference);
    }

    // Fonction pour obtenir la catégorie de l'image
    function getImageCategory(index) {
        return $('.container-galerie').eq(index).find('.categorie').text();
    }

    // Fonction pour obtenir la référence de l'image
    function getImageReference(index) {
        return $('.container-galerie').eq(index).find('.reference').text();
    }
});