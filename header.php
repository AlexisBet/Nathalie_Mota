<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    
    <?php wp_body_open(); ?>
    <header class="header">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
            <img src="<?php echo esc_url( get_template_directory_uri() . '/images/NathalieMota.png' ); ?>" alt="Logo de Nathalie Mota Photographe">
        </a>
        <div class="modal__burger modal-open">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
        <nav class="main-menu">
            <ul>
                <?php 
                    wp_nav_menu (
                        array(
                            'theme_location' => 'header',
                            'container' => false,
                        )
                    );
                ?>
            </ul>
        </nav>
    </header>