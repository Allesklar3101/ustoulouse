<?php
/**
 * Affichage front des classements (shortcode + bloc).
 *
 * @package UST_Classements
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class UST_Clst_Shortcode {

	/**
	 * Constructeur.
	 */
	public function __construct() {
		add_shortcode( 'ust_classement', array( $this, 'render' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'register_assets' ) );
		add_action( 'init', array( $this, 'register_block' ) );
	}

	/**
	 * Enregistre le CSS front (chargé à la demande).
	 */
	public function register_assets() {
		wp_register_style( 'ust-clst-front', UST_CLST_URL . 'assets/classements-front.css', array(), UST_CLST_VERSION );
	}

	/**
	 * Enregistre le bloc Gutenberg (rendu côté serveur).
	 */
	public function register_block() {
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}
		register_block_type(
			'ust/classement',
			array(
				'attributes'      => array(
					'id' => array(
						'type'    => 'number',
						'default' => 0,
					),
				),
				'render_callback' => array( $this, 'render_block' ),
			)
		);
	}

	/**
	 * Rendu du bloc.
	 *
	 * @param array $attr Attributs.
	 */
	public function render_block( $attr ) {
		$id = isset( $attr['id'] ) ? absint( $attr['id'] ) : 0;
		return $this->render( array( 'id' => $id ) );
	}

	/**
	 * Rendu du shortcode [ust_classement id="X"].
	 *
	 * @param array $atts Attributs.
	 */
	public function render( $atts ) {
		$atts = shortcode_atts(
			array(
				'id'    => 0,
				'titre' => '',
			),
			$atts,
			'ust_classement'
		);

		$comp_id = absint( $atts['id'] );
		if ( ! $comp_id ) {
			return '';
		}

		$comp = UST_Clst_DB::get_competition( $comp_id );
		if ( ! $comp ) {
			return '<p>' . esc_html__( 'Classement introuvable.', 'ust-classements' ) . '</p>';
		}

		$rows = UST_Clst_DB::get_rows( $comp_id );
		wp_enqueue_style( 'ust-clst-front' );

		$titre = $atts['titre'] ? $atts['titre'] : $comp->nom;

		ob_start();
		?>
		<div class="ust-clst">
			<div class="ust-clst__head">
				<span class="ust-clst__eyebrow"><?php echo esc_html( $comp->saison ); ?></span>
				<h3 class="ust-clst__title"><?php echo esc_html( $titre ); ?></h3>
			</div>
			<div class="ust-clst__scroll">
				<table class="ust-clst__table">
					<thead>
						<tr>
							<th class="ust-clst__pos">#</th>
							<th class="ust-clst__team"><?php esc_html_e( 'Équipe', 'ust-classements' ); ?></th>
							<th>J</th>
							<th>G</th>
							<th>N</th>
							<th>P</th>
							<th>BP</th>
							<th>BC</th>
							<th class="ust-clst__diff">Diff</th>
							<th class="ust-clst__pts">Pts</th>
						</tr>
					</thead>
					<tbody>
					<?php if ( empty( $rows ) ) : ?>
						<tr><td colspan="10" class="ust-clst__empty"><?php esc_html_e( 'Classement à venir.', 'ust-classements' ); ?></td></tr>
					<?php else : ?>
						<?php foreach ( $rows as $r ) : ?>
							<?php $diff = (int) $r->bp - (int) $r->bc; ?>
							<tr class="<?php echo $r->highlight ? 'ust-clst__row--ust' : ''; ?>">
								<td class="ust-clst__pos"><?php echo esc_html( $r->position ); ?></td>
								<td class="ust-clst__team"><?php echo esc_html( $r->equipe ); ?></td>
								<td><?php echo esc_html( $r->joues ); ?></td>
								<td><?php echo esc_html( $r->gagnes ); ?></td>
								<td><?php echo esc_html( $r->nuls ); ?></td>
								<td><?php echo esc_html( $r->perdus ); ?></td>
								<td><?php echo esc_html( $r->bp ); ?></td>
								<td><?php echo esc_html( $r->bc ); ?></td>
								<td class="ust-clst__diff"><?php echo esc_html( ( $diff > 0 ? '+' : '' ) . $diff ); ?></td>
								<td class="ust-clst__pts"><?php echo esc_html( $r->points ); ?></td>
							</tr>
						<?php endforeach; ?>
					<?php endif; ?>
					</tbody>
				</table>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}
}
