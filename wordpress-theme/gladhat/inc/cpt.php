<?php

function gladhat_register_project_cpt() {
  register_post_type('gladhat_project', array(
    'labels' => array(
      'name'          => 'More Stories',
      'singular_name' => 'Project',
      'add_new_item'  => 'Add Project',
      'edit_item'     => 'Edit Project',
    ),
    'public'              => false,
    'show_ui'             => true,
    'show_in_menu'        => true,
    'menu_icon'           => 'dashicons-portfolio',
    'supports'            => array('title', 'page-attributes'),
    'capability_type'     => 'post',
  ));
}
add_action('init', 'gladhat_register_project_cpt');
