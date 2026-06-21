<?php
/**
 * Plugin Name:       UST Paiements
 * Plugin URI:        https://ustoulouse.com
 * Description:        Paiements Stripe pour l'US Toulouse via WooCommerce : boutique, cotisations/adhésions et dons. Fournit des shortcodes dédiés et la configuration des produits.
 * Version:           1.0.0
 * Author:            US Toulouse
 * License:           GPL-2.0+
 * Text Domain:       ust-paiements
 *
 * @package UST_Paiements
 *
 * Dépendances : WooCommerce + « WooCommerce Stripe Payment Gateway » (officiel).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'UST_PAY_VERSION', '1.0.0' );
define( 'UST_PAY_FILE', __FILE__ );
define( 'UST_PAY_DIR', plugin_dir_path( __FILE__ ) );
define( 'UST_PAY_URL', plugin_dir_url( __FILE__ ) );

/**
 * Vérifie que WooCommerce est actif, sinon affiche un avertissement.
 */
function ust_pay_check_woocommerce() {
	if ( class_exists( 'WooCommerce' ) ) {
		return true;
	}
	add_action(
		'admin_notices',
		function () {
			echo '<div class="notice notice-error"><p>';
			echo esc_html__( 'UST Paiements nécessite WooCommerce (et le gateway WooCommerce Stripe) pour fonctionner. Merci d\'installer et activer WooCommerce.', 'ust-paiements' );
			echo '</p></div>';
		}
	);
	return false;
}

/**
 * Bootstrap.
 */
function ust_pay_init() {
	if ( ! ust_pay_check_woocommerce() ) {
		return;
	}

	require_once UST_PAY_DIR . 'includes/class-cotisations.php';
	require_once UST_PAY_DIR . 'includes/class-dons.php';
	require_once UST_PAY_DIR . 'includes/class-checkout.php';
	require_once UST_PAY_DIR . 'includes/class-admin.php';

	new UST_Pay_Cotisations();
	new UST_Pay_Dons();
	new UST_Pay_Checkout();
	if ( is_admin() ) {
		new UST_Pay_Admin();
	}

	add_action( 'wp_enqueue_scripts', 'ust_pay_front_assets' );
}
add_action( 'plugins_loaded', 'ust_pay_init', 20 );

/**
 * Enregistre le CSS front.
 */
function ust_pay_front_assets() {
	wp_register_style( 'ust-pay-front', UST_PAY_URL . 'assets/paiements-front.css', array(), UST_PAY_VERSION );
}

/**
 * À l'activation : crée les catégories produits dédiées.
 */
function ust_pay_activate() {
	// Les taxonomies WooCommerce ne sont pas forcément chargées ici ; on diffère.
	add_option( 'ust_pay_needs_setup', 1 );
}
register_activation_hook( __FILE__, 'ust_pay_activate' );

/**
 * Crée les catégories produit « Cotisations » et « Dons » si nécessaire.
 */
function ust_pay_maybe_setup() {
	if ( ! get_option( 'ust_pay_needs_setup' ) ) {
		return;
	}
	if ( ! taxonomy_exists( 'product_cat' ) ) {
		return;
	}
	foreach ( array( 'cotisations' => 'Cotisations', 'dons' => 'Dons' ) as $slug => $name ) {
		if ( ! term_exists( $slug, 'product_cat' ) ) {
			wp_insert_term( $name, 'product_cat', array( 'slug' => $slug ) );
		}
	}
	delete_option( 'ust_pay_needs_setup' );
}
add_action( 'init', 'ust_pay_maybe_setup', 30 );
