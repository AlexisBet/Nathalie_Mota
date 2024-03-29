<?php get_header(); ?>

<section class="hero">
        <h1>PHOTOGRAPHE EVENT</h1>
<?php
    $images = get_posts(array(
        'post_type'      => 'photo',
        'posts_per_page' => -1,
    ));

    if ($images) {
        $random_image = $images[array_rand($images)];
        $image_url = get_the_post_thumbnail_url($random_image->ID, 'large');
        echo '<img src="' . esc_url($image_url) . '" alt="" class="hero-image">';
    }
?>
</section>

<?php get_footer(); ?>