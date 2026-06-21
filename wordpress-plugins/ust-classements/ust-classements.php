<?php
/**
 * Plugin Name:       UST Classements
 * Plugin URI:        https://ustoulouse.com
 * Description:        Gestion manuelle des classements sportifs (football, etc.) avec affichage par shortcode et bloc Gutenberg, aux couleurs de l'US Toulouse.
 * Version:           1.0.0
 * Author:            US Toulouse
 * License:           GPL-2.0+
 * Text Domain:       ust-classements
 *
 * @package UST_Classements
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Accès direct interdit.
}

define( 'UST_CLST_VERSION', '1.0.0' );
define( 'UST_CLST_FILE', __FILE__ );
define( 'UST_CLST_DIR', plugin_dir_path( __FILE__ ) );
define( 'UST_CLST_URL', plugin_dir_url( __FILE__ ) );

require_once UST_CLST_DIR . 'includes/class-db.php';
require_once UST_CLST_DIR . 'includes/class-admin.php';
require_once UST_CLST_DIR . 'includes/class-shortcode.php';

/**
 * Création des tables à l'activation.
 */
function ust_clst_activate() {
	UST_Clst_DB::create_tables();
}
register_activation_hook( __FILE__, 'ust_clst_activate' );

/**
 * Initialisation du plugin.
 */
function ust_clst_init() {
	if ( is_admin() ) {
		new UST_Clst_Admin();
	}
	new UST_Clst_Shortcode();
}
add_action( 'plugins_loaded', 'ust_clst_init' );
