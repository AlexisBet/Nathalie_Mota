<?php get_header(); ?>

<section class="hero">
    <h1>PHOTOGRAPHE EVENT</h1>
    <?php
    $images = get_posts(array(
        'post_type'      => 'photo',
        'posts_per_page' => -1,
        'tax_query' => array(
            array(
                'taxonomy' => 'format',
                'field' => 'slug',
                'terms' =>'paysage',
            ),
        ),
    ));

    if ($images) {
        $random_image = $images[array_rand($images)];
        $image_url = get_the_post_thumbnail_url($random_image->ID, 'large');
        echo '<img src="' . esc_url($image_url) . '" alt="" class="hero-image">';
    }
    ?>
</section>

<div class="container-front-page">
    <section class="filter">
        <div class="category-filter custom-select">
            <div class="selected-option" tabindex="0">CATÉGORIES</div>
            <i class="fas fa-chevron-down"></i>
            <ul class="custom-ul">
                <?php
                $categories = get_terms('categorie');
                foreach ($categories as $category) {
                    echo '<li data-value="' . $category->slug . '">' . $category->name . '</li>';
                }
                ?>
            </ul>
        </div>
        <div class="form-filter custom-select">
            <div class="selected-option" tabindex="0">FORMATS</div>
            <i class="fas fa-chevron-down"></i>
            <ul class="custom-ul">
                <?php
                $formats = get_terms('format');
                foreach ($formats as $format) {
                    echo '<li data-value="' . $format->slug . '">' . $format->name . '</li>';
                }
                ?>
            </ul>
        </div>
        <div class="date-filter custom-select">
            <div class="selected-option" tabindex="0">TRIER PAR</div>
            <i class="fas fa-chevron-down"></i>
            <ul class="custom-ul">
                <li data-value="DESC">Plus récentes</li>
                <li data-value="ASC">Plus anciennes</li>
            </ul>
        </div>
    </section>

    <section class="img-gallery">
        <?php
        $tri = isset($_POST['annee']) ? $_POST['annee'] : 'DESC';

        if ($tri === 'ASC') {
            $order = 'ASC'; // Plus ancien d'abord
        } else {
            $order = 'DESC'; // Plus récent d'abord (par défaut)
        }

        $imagesaccueil = array(
            'post_type' => 'photo',
            'orderby' => 'date',
            'order' => $order,
            'posts_per_page' => 8,
        );

        // Exécuter la requête
        $query_imagesaccueil = new WP_Query($imagesaccueil);

        // Afficher les résultats
        if ($query_imagesaccueil->have_posts()) :
            while ($query_imagesaccueil->have_posts()) : $query_imagesaccueil->the_post();
        ?>
                <div class="container-galerie">
                    <?php get_template_part('/template_part/photo_block'); ?>
                </div>
        <?php
            endwhile;
        endif;

        // Réinitialiser les données de la requête
        wp_reset_postdata();
        ?>
    </section>
    <div class="container-load">
        <button
            class="load-more-photos custom-button"
            data-nonce="<?php echo wp_create_nonce('load_more_photos_nonce'); ?>"
            data-action="load_more_photos_action"
            data-ajaxurl="<?php echo admin_url( 'admin-ajax.php' ); ?>"
        >
            Charger plus
        </button>
    </div>
</div>

<?php get_footer(); ?>
