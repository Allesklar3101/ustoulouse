<?php
/**
 * Gestion des dons (montant libre) via WooCommerce + Stripe.
 *
 * Le don repose sur un unique produit WooCommerce « Don » dont le prix
 * est défini dynamiquement au moment de l'ajout au panier selon le montant
 * choisi par le donateur. Le shortcode [ust_don] affiche le formulaire.
 *
 * @package UST_Paiements
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class UST_Pay_Dons {

	/**
	 * Clé d'option stockant l'ID du produit « Don ».
	 */
	const OPTION_PRODUCT = 'ust_pay_don_product_id';

	/**
	 * Constructeur.
	 */
	public function __construct() {
		add_shortcode( 'ust_don', array( $this, 'render' ) );

		// Capture le montant choisi lors de l'ajout au panier.
		add_filter( 'woocommerce_add_cart_item_data', array( $this, 'capture_amount' ), 10, 2 );
		// Applique le prix personnalisé.
		add_action( 'woocommerce_before_calculate_totals', array( $this, 'apply_custom_price' ), 20 );
		// Libellé personnalisé dans le panier.
		add_filter( 'woocommerce_cart_item_name', array( $this, 'cart_item_label' ), 10, 3 );
	}

	/**
	 * Retourne l'ID du produit Don, en le créant si nécessaire.
	 *
	 * @return int
	 */
	public function get_don_product_id() {
		$id = (int) get_option( self::OPTION_PRODUCT );
		if ( $id && 'product' === get_post_type( $id ) && 'trash' !== get_post_status( $id ) ) {
			return $id;
		}

		// Création automatique du produit Don.
		$product = new WC_Product_Simple();
		$product->set_name( __( 'Don à l\'US Toulouse', 'ust-paiements' ) );
		$product->set_status( 'publish' );
		$product->set_catalog_visibility( 'hidden' );
		$product->set_price( 10 );
		$product->set_regular_price( 10 );
		$product->set_virtual( true );
		$product->set_sold_individually( true );
		$product->set_tax_status( 'none' );
		$product->set_short_description( __( 'Soutien au club.', 'ust-paiements' ) );
		$new_id = $product->save();

		// Catégorie « Dons ».
		$term = term_exists( 'dons', 'product_cat' );
		if ( $term ) {
			wp_set_object_terms( $new_id, (int) $term['term_id'], 'product_cat' );
		}

		update_option( self::OPTION_PRODUCT, $new_id );
		return $new_id;
	}

	/**
	 * Capture le montant du don passé en query string.
	 *
	 * @param array $cart_item_data Données.
	 * @param int   $product_id     ID produit.
	 * @return array
	 */
	public function capture_amount( $cart_item_data, $product_id ) {
		if ( (int) $product_id !== $this->get_don_product_id() ) {
			return $cart_item_data;
		}
		if ( isset( $_REQUEST['ust_don_amount'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
			$amount = floatval( wp_unslash( $_REQUEST['ust_don_amount'] ) ); // phpcs:ignore WordPress.Security.NonceVerification
			if ( $amount >= 1 ) {
				$cart_item_data['ust_don_amount'] = $amount;
				// Rend chaque don unique pour qu'il ne se cumule pas avec un autre montant.
				$cart_item_data['unique_key'] = md5( $amount . microtime() );
			}
		}
		return $cart_item_data;
	}

	/**
	 * Applique le prix du don au panier.
	 *
	 * @param WC_Cart $cart Panier.
	 */
	public function apply_custom_price( $cart ) {
		if ( is_admin() && ! defined( 'DOING_AJAX' ) ) {
			return;
		}
		foreach ( $cart->get_cart() as $item ) {
			if ( ! empty( $item['ust_don_amount'] ) ) {
				$item['data']->set_price( (float) $item['ust_don_amount'] );
			}
		}
	}

	/**
	 * Affiche le montant dans le libellé panier.
	 *
	 * @param string $name      Nom.
	 * @param array  $cart_item Item.
	 * @param string $cart_key  Clé.
	 * @return string
	 */
	public function cart_item_label( $name, $cart_item, $cart_key ) {
		if ( ! empty( $cart_item['ust_don_amount'] ) ) {
			$name = esc_html__( 'Don à l\'US Toulouse', 'ust-paiements' ) . ' — ' . wc_price( $cart_item['ust_don_amount'] );
		}
		return $name;
	}

	/**
	 * Rendu du formulaire de don [ust_don].
	 *
	 * @param array $atts Attributs.
	 */
	public function render( $atts ) {
		$atts = shortcode_atts(
			array(
				'montants' => '10,20,50,100', // Montants suggérés.
			),
			$atts,
			'ust_don'
		);

		$product_id = $this->get_don_product_id();
		$presets    = array_filter( array_map( 'intval', explode( ',', $atts['montants'] ) ) );
		$checkout   = wc_get_checkout_url();
		wp_enqueue_style( 'ust-pay-front' );

		ob_start();
		?>
		<div class="ust-don">
			<form class="ust-don__form" method="get" action="<?php echo esc_url( $checkout ); ?>">
				<input type="hidden" name="add-to-cart" value="<?php echo esc_attr( $product_id ); ?>">
				<p class="ust-don__label"><?php esc_html_e( 'Je choisis mon montant', 'ust-paiements' ); ?></p>
				<div class="ust-don__presets">
					<?php foreach ( $presets as $m ) : ?>
						<button type="button" class="ust-don__chip" data-amount="<?php echo esc_attr( $m ); ?>"><?php echo esc_html( $m ); ?> €</button>
					<?php endforeach; ?>
				</div>
				<div class="ust-don__custom">
					<input type="number" name="ust_don_amount" id="ust-don-amount" min="1" step="1" placeholder="<?php esc_attr_e( 'Autre montant', 'ust-paiements' ); ?>" required>
					<span class="ust-don__currency">€</span>
				</div>
				<button type="submit" class="ust-pay-btn ust-don__submit"><?php esc_html_e( 'Faire un don', 'ust-paiements' ); ?></button>
				<p class="ust-don__secure"><?php esc_html_e( 'Paiement sécurisé par Stripe', 'ust-paiements' ); ?></p>
			</form>
		</div>
		<script>
		(function(){
			var wrap=document.currentScript.previousElementSibling;
			if(!wrap)return;
			var input=wrap.querySelector('#ust-don-amount');
			wrap.querySelectorAll('.ust-don__chip').forEach(function(btn){
				btn.addEventListener('click',function(){
					wrap.querySelectorAll('.ust-don__chip').forEach(function(b){b.classList.remove('is-active')});
					btn.classList.add('is-active');
					input.value=btn.getAttribute('data-amount');
				});
			});
			input.addEventListener('input',function(){
				wrap.querySelectorAll('.ust-don__chip').forEach(function(b){b.classList.remove('is-active')});
			});
		})();
		</script>
		<?php
		return ob_get_clean();
	}
}
