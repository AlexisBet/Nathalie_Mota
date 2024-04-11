<footer class="footer">
    <?php 
	wp_nav_menu( 
        array( 
            'theme_location' => 'footer', 
            'container' => false,
        ) 
    ); 
    ?>
    <li> TOUS DROITS RÉSERVÉS </li>
</footer>
<?php get_template_part('/template_part/modale_contact'); ?>

<?php get_template_part('/template_part/lightbox'); ?>

    <?php wp_footer() ?>
</body>
</html>