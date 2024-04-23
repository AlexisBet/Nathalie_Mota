<?php

function theme_enqueue_styles() {
    wp_enqueue_style('style', get_stylesheet_directory_uri() . '/style.css', array(), '1.0'); 
    wp_enqueue_script('script', get_template_directory_uri() . '/assets/js/script.js', array(), '1.0', true);
    wp_enqueue_script('lightbox-script', get_template_directory_uri() . '/assets/js/lightbox.js', array('jquery'), '1.0', true);
    wp_localize_script('script', 'ajax_params', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('load_more_photos_nonce'),
    ));
}

add_action('wp_enqueue_scripts', 'theme_enqueue_styles');

function enqueue_font_awesome() {
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css', array(), '5.15.4');
}
add_action('wp_enqueue_scripts', 'enqueue_font_awesome');

register_nav_menus( array(
	'header' => 'Menu principal',
	'footer' => 'Pied de page',
));

// Ajouter la prise en charge des images mises en avant
add_theme_support( 'post-thumbnails' );

// Ajouter automatiquement le titre du site dans l'en-tête du site
add_theme_support( 'title-tag' );

// Ajouter menus dans l'interface wordpress
add_theme_support( 'menus');

add_action('after_setup_theme', 'add_theme_support');

function load_more_photos() {
    $paged = $_POST['paged'];
    $tri = $_POST['tri'];
    $categorie = isset($_POST['categorie']) ? $_POST['categorie'] : '';
    $format = isset($_POST['format']) ? $_POST['format'] : '';
 
    $args = array(
        'post_type' => 'photo',
        'orderby' => 'date',
        'order' => $tri,
        'posts_per_page' => 8,
        'paged' => $paged,
    );

     // Ajouter le filtre par catégorie si sélectionné
     if (!empty($categorie)) {
        $args['tax_query'][] = array(
            'taxonomy' => 'categorie',
            'field' => 'slug',
            'terms' => $categorie,
        );
    }

    // Ajouter le filtre par format si sélectionné
    if (!empty($format)) {
        $args['tax_query'][] = array(
            'taxonomy' => 'format',
            'field' => 'slug',
            'terms' => $format,
        );
    }

    $query = new WP_Query($args);

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            echo '<div class="container-galerie">';
            get_template_part('/template_part/photo_block', '', false);
            echo '</div>';
        }
    wp_reset_postdata();
}
    wp_die();
}

add_action('wp_ajax_load_more_photos_action', 'load_more_photos');
add_action('wp_ajax_nopriv_load_more_photos_action', 'load_more_photos');

function load_filtered_photos() {
    $categorie = isset($_POST['categorie']) ? $_POST['categorie'] : '';
    $format = isset($_POST['format']) ? $_POST['format'] : '';
    $tri = isset($_POST['tri']) ? $_POST['tri'] : 'date';

    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => 8,
        'order' => $order,
    );

    // Ajouter le filtre par catégorie si sélectionné
    if (!empty($categorie)) {
        $args['tax_query'][] = array(
            'taxonomy' => 'categorie',
            'field' => 'slug',
            'terms' => $categorie,
        );
    }

    // Ajouter le filtre par format si sélectionné
    if (!empty($format)) {
        $args['tax_query'][] = array(
            'taxonomy' => 'format',
            'field' => 'slug',
            'terms' => $format,
        );
    }

    if ($tri === 'DESC') {
        $args['orderby'] = 'date';
        $args['order'] = 'DESC'; // Plus récent d'abord
    } elseif ($tri === 'ASC') {
        $args['orderby'] = 'date';
        $args['order'] = 'ASC'; // Plus ancien d'abord
    }

    // Exécuter la requête
    $query = new WP_Query($args);

    // Afficher les résultats
    if ($query->have_posts()) :
        while ($query->have_posts()) : $query->the_post();
            ?>
            <div class="container-galerie">
                <?php get_template_part('/template_part/photo_block'); ?>
            </div>
            <?php
        endwhile;
    endif;
    // Réinitialiser les données de la requête
    wp_reset_postdata();

    // Important pour terminer la requête Ajax correctement
    wp_die();
}

// Hook pour gérer la requête Ajax côté serveur
add_action('wp_ajax_load_filtered_photos_action', 'load_filtered_photos');
add_action('wp_ajax_nopriv_load_filtered_photos_action', 'load_filtered_photos');