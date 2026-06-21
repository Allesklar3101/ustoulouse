<?php
/**
 * Gestion des cotisations / adhésions (produits WooCommerce).
 *
 * Chaque cotisation est un produit WooCommerce virtuel (catégorie « Cotisations »).
 * Le shortcode [ust_cotisations] affiche les cartes avec bouton « Adhérer »
 * qui ajoute au panier et redirige vers le checkout (paiement Stripe).
 *
 * @package UST_Paiements
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class UST_Pay_Cotisations {

	/**
	 * Constructeur.
	 */
	public function __construct() {
		add_shortcode( 'ust_cotisations', array( $this, 'render' ) );
	}

	/**
	 * Récupère les produits de la catégorie « cotisations ».
	 *
	 * @return WP_Post[]
	 */
	private function get_cotisation_products() {
		$args = array(
			'post_type'      => 'product',
			'posts_per_page' => -1,
			'orderby'        => 'menu_order',
			'order'          => 'ASC',
			'tax_query'      => array( // phpcs:ignore WordPress.DB.SlowDBQuery
				array(
					'taxonomy' => 'product_cat',
					'field'    => 'slug',
					'terms'    => 'cotisations',
				),
			),
		);
		return get_posts( $args );
	}

	/**
	 * Rendu du shortcode [ust_cotisations].
	 *
	 * @param array $atts Attributs.
	 */
	public function render( $atts ) {
		$atts = shortcode_atts(
			array(
				'section' => '', // Filtre optionnel par tag/section.
			),
			$atts,
			'ust_cotisations'
		);

		$products = $this->get_cotisation_products();
		wp_enqueue_style( 'ust-pay-front' );

		if ( empty( $products ) ) {
			return '<p class="ust-pay-empty">' . esc_html__( 'Aucune cotisation disponible pour le moment.', 'ust-paiements' ) . '</p>';
		}

		ob_start();
		echo '<div class="ust-pay-grid ust-cotis-grid">';
		foreach ( $products as $post ) {
			$product = wc_get_product( $post->ID );
			if ( ! $product || ! $product->is_purchasable() ) {
				continue;
			}
			$add_url = add_query_arg(
				array(
					'add-to-cart' => $product->get_id(),
				),
				wc_get_checkout_url()
			);
			?>
			<div class="ust-pay-card">
				<div class="ust-pay-card__head">
					<span class="ust-pay-card__tag"><?php esc_html_e( 'Adhésion', 'ust-paiements' ); ?></span>
					<h3 class="ust-pay-card__title"><?php echo esc_html( $product->get_name() ); ?></h3>
				</div>
				<div class="ust-pay-card__price">
					<?php echo wp_kses_post( $product->get_price_html() ); ?>
					<span class="ust-pay-card__period"><?php esc_html_e( '/ saison', 'ust-paiements' ); ?></span>
				</div>
				<div class="ust-pay-card__desc">
					<?php echo wp_kses_post( wpautop( $product->get_short_description() ) ); ?>
				</div>
				<a class="ust-pay-btn" href="<?php echo esc_url( $add_url ); ?>">
					<?php esc_html_e( 'Adhérer', 'ust-paiements' ); ?>
				</a>
			</div>
			<?php
		}
		echo '</div>';
		return ob_get_clean();
	}
}
