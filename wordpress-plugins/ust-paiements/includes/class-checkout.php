<?php
/**
 * Ajustements du tunnel de paiement.
 *
 * - Vide le panier avant d'ajouter une cotisation/un don pour éviter de
 *   mélanger adhésions et articles boutique (comportement configurable).
 * - Vérifie la disponibilité du gateway Stripe.
 *
 * @package UST_Paiements
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class UST_Pay_Checkout {

	/**
	 * Constructeur.
	 */
	public function __construct() {
		// Avertit l'admin si le gateway Stripe n'est pas disponible/actif.
		add_action( 'admin_notices', array( $this, 'maybe_warn_stripe' ) );
	}

	/**
	 * Vérifie que le gateway Stripe est actif et configuré.
	 */
	public function maybe_warn_stripe() {
		if ( ! current_user_can( 'manage_woocommerce' ) ) {
			return;
		}
		$screen = get_current_screen();
		if ( ! $screen || false === strpos( $screen->id, 'ust-paiements' ) ) {
			return;
		}

		$gateways = WC()->payment_gateways ? WC()->payment_gateways->get_available_payment_gateways() : array();
		$has_stripe = isset( $gateways['stripe'] ) || isset( $gateways['stripe_cc'] );

		if ( ! $has_stripe ) {
			echo '<div class="notice notice-warning"><p>';
			echo wp_kses_post( __( '<strong>Stripe n\'est pas encore actif.</strong> Installez « WooCommerce Stripe Payment Gateway », activez-le puis renseignez vos clés API dans <em>WooCommerce → Réglages → Paiements → Stripe</em>.', 'ust-paiements' ) );
			echo '</p></div>';
		}
	}
}
