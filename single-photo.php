<?php
/**
 * Template Name: single-photo
 * Description: Template pour afficher un contenu de type Photos
 */

get_header(); ?>

<?php
$format = get_the_terms(get_the_ID(), 'format');
$categorie = get_the_terms(get_the_ID(), 'categorie');
?>

    <?php if( have_posts() ) : while( have_posts() ) : the_post(); ?>
    <div class="container-photo">
            <section>
                    <div class="informations-photo">
                    <div class="informations">
                        <h1><?php the_title(); ?></h1>
                        <p>RÉFÉRENCE : <?php echo get_field('reference_de_la_photo'); ?></p>
                        <p>CATÉGORIE : <?php echo $categorie[0]->name ?></p>
                        <p>FORMAT : <?php echo $format[0]->name ?></p>
                        <p>TYPE : <?php echo get_field('Type_photo'); ?></p>
                        <p>ANNÉE : <?php echo get_the_date('Y'); ?></p>
                    </ul>
                    </div>
                    <div class="affichage-photo">
                    <?php the_post_thumbnail('large', array('class' => 'photo-principale')); ?>
                    </div>
                </div>
            </section>
            <section class="contact-menu">
                <div class="container-contact">
                    <p>Cette photo vous intéresse ?</p>
                    <button type="button" class="button-contact modale-contact">Contact</button>
                </div>
            <div class="container-arrows"> 
            <?php
$category_ids = wp_get_post_terms(get_the_ID(), 'categorie', array('fields' => 'ids'));
$previous_post_id = get_adjacent_post(true, '', true, 'categorie', $category_ids);
$next_post_id = get_adjacent_post(true, '', false, 'categorie', $category_ids);
            ?>
    <?php if ($previous_post_id) : ?>
    <?php echo get_the_post_thumbnail($previous_post_id, 'thumbnail', ['class' => "img-arrows"]) ?>
    <div class="arrow">
        <a href="<?php echo get_permalink($previous_post_id) ?>"><img src="<?php echo get_template_directory_uri() . '/images/line6.png'; ?>" alt="Flèche précédent"></a>
    <?php endif; ?>
<?php if ($next_post_id) : ?>
        <a href="<?php echo get_permalink($next_post_id) ?>"><img src="<?php echo get_template_directory_uri() . '/images/line7.png'; ?>" alt="Flèche suivant"></a>   
<?php endif; ?>

    </div>
</div>
            </section>
            <section class="container-similar">
                <h3>Vous aimerez aussi</h3>
            <div class="container-photo-simi">
                <?php

        // Requête pour récupérer les articles de la même catégorie
        $args = array(
            'post_type' => 'photo',
            'posts_per_page' => 2,
            'tax_query' => array(
                array(
                    'taxonomy' => 'categorie',
                    'field' => 'term_id',
                    'terms' => $categorie[0]->term_id,
                ),
            ),
            'post__not_in' => array(get_the_ID()), // Exclure l'article actuel
            'orderby' => 'rand',
        );

        $query = new WP_Query($args);

        if ($query->have_posts()) :
            while ($query->have_posts()) : $query->the_post();
            ?>
            <div class ="container-img">
			<?php get_template_part('/template_part/photo_block'); ?>
		</div>
            <?php
            endwhile;
            wp_reset_postdata();
        else :
            echo 'Il n\'y a pas d\'autres photos dans cette catégorie.';
        endif;
        ?>
        </div>
    </section>
    </div>
        <?php endwhile; endif; ?>
<?php get_footer(); ?>