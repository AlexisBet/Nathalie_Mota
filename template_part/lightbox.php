<?php 
    $reference = get_field('reference'); 
    $categorie = get_the_terms(get_the_ID(), 'categorie'); 
	$id = get_the_ID();
    $url = get_permalink();
?>

<div class="container-lightbox">
    <div class="fullscreen-photo">
        <div class="nav-arrow prev-image"><img src="<?php echo get_template_directory_uri(); ?>/images/navprec.png" alt="Flèche précédent"></div>
            <img id="lightbox-image" src="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'full'); ?>" alt="" class="img-fullscreen">
        <div class="nav-arrow next-image"><img src="<?php echo get_template_directory_uri(); ?>/images/navsuiv.png" alt="Flèche suivant"></div>
        <div>
            <h5><?php echo get_field('reference'); ?></h5>
            <h6><?php echo get_the_terms(get_the_ID(), 'categorie')[0]->name ?></h6>
        </div>
    </div>
    <img class="close-fullscreen" src="<?php echo get_template_directory_uri(); ?>/images/croixferm.png" alt="Croix de fermeture de la Lightbox">
</div>