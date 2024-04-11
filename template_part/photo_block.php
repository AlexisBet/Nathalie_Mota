<img class="photo" src="<?php the_post_thumbnail_url('large'); ?>" alt="<?php the_title_attribute(); ?>">
<div class="hover-img">
    <img class="fullscreen" src="<?php echo get_template_directory_uri() . '/images/iconfullscreen.png'; ?>" alt="Icône Fullscreen"> 
    <a href="<?php the_permalink(); ?>">
        <img class="eye" src="<?php echo get_template_directory_uri() . '/images/eye.png'; ?>" alt="Icône œil">
    </a>
    <div class="reference"><?php echo get_field('reference_de_la_photo'); ?></div>
    <div class="categorie"><?php echo get_the_terms(get_the_ID(), 'categorie')[0]->name; ?></div>
</div>
