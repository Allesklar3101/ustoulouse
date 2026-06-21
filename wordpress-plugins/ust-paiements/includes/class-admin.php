<?php
/**
 * Page d'administration / aide du plugin UST Paiements.
 *
 * @package UST_Paiements
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class UST_Pay_Admin {

	/**
	 * Constructeur.
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_menu' ) );
	}

	/**
	 * Ajoute la page de réglages.
	 */
	public function add_menu() {
		add_menu_page(
			__( 'UST Paiements', 'ust-paiements' ),
			__( 'UST Paiements', 'ust-paiements' ),
			'manage_woocommerce',
			'ust-paiements',
			array( $this, 'render' ),
			'dashicons-cart',
			27
		);
	}

	/**
	 * Statut du gateway Stripe.
	 *
	 * @return bool
	 */
	private function stripe_active() {
		$gateways = WC()->payment_gateways ? WC()->payment_gateways->get_available_payment_gateways() : array();
		return isset( $gateways['stripe'] ) || isset( $gateways['stripe_cc'] );
	}

	/**
	 * Affiche la page.
	 */
	public function render() {
		$cotis_cat  = admin_url( 'edit.php?post_type=product&product_cat=cotisations' );
		$new_cotis  = admin_url( 'post-new.php?post_type=product' );
		$stripe_url = admin_url( 'admin.php?page=wc-settings&tab=checkout&section=stripe' );
		?>
		<div class="wrap">
			<h1><?php esc_html_e( 'UST Paiements — Stripe', 'ust-paiements' ); ?></h1>

			<h2><?php esc_html_e( '1. État de Stripe', 'ust-paiements' ); ?></h2>
			<?php if ( $this->stripe_active() ) : ?>
				<p style="color:#1a7f37;font-weight:600">&#10003; <?php esc_html_e( 'Le gateway Stripe est actif.', 'ust-paiements' ); ?></p>
			<?php else : ?>
				<p style="color:#b32d2e;font-weight:600">&#10007; <?php esc_html_e( 'Stripe n\'est pas actif. Installez et configurez « WooCommerce Stripe Payment Gateway ».', 'ust-paiements' ); ?></p>
			<?php endif; ?>
			<p><a class="button" href="<?php echo esc_url( $stripe_url ); ?>"><?php esc_html_e( 'Réglages Stripe', 'ust-paiements' ); ?></a></p>

			<hr>

			<h2><?php esc_html_e( '2. Cotisations / Adhésions', 'ust-paiements' ); ?></h2>
			<p><?php esc_html_e( 'Chaque cotisation est un produit WooCommerce dans la catégorie « Cotisations ». Créez un produit par section/catégorie (ex : Football senior, Padel, Randonnée…), cochez « Virtuel », définissez le prix et une description courte.', 'ust-paiements' ); ?></p>
			<p>
				<a class="button button-primary" href="<?php echo esc_url( $new_cotis ); ?>"><?php esc_html_e( 'Créer une cotisation', 'ust-paiements' ); ?></a>
				<a class="button" href="<?php echo esc_url( $cotis_cat ); ?>"><?php esc_html_e( 'Voir les cotisations', 'ust-paiements' ); ?></a>
			</p>
			<p><?php esc_html_e( 'Affichage sur une page :', 'ust-paiements' ); ?> <code>[ust_cotisations]</code></p>

			<hr>

			<h2><?php esc_html_e( '3. Dons', 'ust-paiements' ); ?></h2>
			<p><?php esc_html_e( 'Le formulaire de don à montant libre s\'ajoute avec le shortcode ci-dessous. Le produit « Don » est créé automatiquement.', 'ust-paiements' ); ?></p>
			<p><code>[ust_don montants="10,20,50,100"]</code></p>

			<hr>

			<h2><?php esc_html_e( '4. Boutique', 'ust-paiements' ); ?></h2>
			<p><?php esc_html_e( 'La boutique utilise WooCommerce de façon standard. Créez vos produits (avec stock, variations de taille, etc.) et ils seront payables par Stripe automatiquement. Pages WooCommerce : Boutique, Panier, Commande.', 'ust-paiements' ); ?></p>
			<p><a class="button" href="<?php echo esc_url( admin_url( 'edit.php?post_type=product' ) ); ?>"><?php esc_html_e( 'Gérer les produits', 'ust-paiements' ); ?></a></p>
		</div>
		<?php
	}
}
