<?php

function theme_enqueue_styles() {
    wp_enqueue_style('style', get_stylesheet_directory_uri() . '/style.css', array(), '1.0'); 
    wp_enqueue_script('script', get_template_directory_uri() . '/assets/js/script.js', array(), '1.0', true);
    wp_enqueue_script('jquery');
}

add_action('after_setup_theme', 'add_theme_support');
add_action('wp_enqueue_scripts', 'theme_enqueue_styles');

register_nav_menus( array(
	'header' => 'Menu principal',
	'footer' => 'Pied de page',
) );

// Ajouter la prise en charge des images mises en avant
add_theme_support( 'post-thumbnails' );

// Ajouter automatiquement le titre du site dans l'en-tête du site
add_theme_support( 'title-tag' );

// Ajouter menus dans l'interface wordpress
add_theme_support( 'menus');