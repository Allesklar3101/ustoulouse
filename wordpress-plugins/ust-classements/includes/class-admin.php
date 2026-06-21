<?php
/**
 * Interface d'administration des classements.
 *
 * @package UST_Classements
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class UST_Clst_Admin {

	/**
	 * Constructeur : enregistre les hooks.
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_menu' ) );
		add_action( 'admin_init', array( $this, 'handle_actions' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'assets' ) );
	}

	/**
	 * Ajoute le menu d'administration.
	 */
	public function add_menu() {
		add_menu_page(
			__( 'Classements', 'ust-classements' ),
			__( 'Classements', 'ust-classements' ),
			'manage_options',
			'ust-classements',
			array( $this, 'render_page' ),
			'dashicons-list-view',
			26
		);
	}

	/**
	 * Charge le CSS/JS d'admin uniquement sur notre page.
	 *
	 * @param string $hook Page courante.
	 */
	public function assets( $hook ) {
		if ( 'toplevel_page_ust-classements' !== $hook ) {
			return;
		}
		wp_enqueue_style( 'ust-clst-admin', UST_CLST_URL . 'assets/classements-admin.css', array(), UST_CLST_VERSION );
		wp_enqueue_script( 'ust-clst-admin', UST_CLST_URL . 'assets/classements-admin.js', array(), UST_CLST_VERSION, true );
	}

	/**
	 * Traite les soumissions de formulaire (création, édition, suppression).
	 */
	public function handle_actions() {
		if ( ! isset( $_POST['ust_clst_action'] ) && ! isset( $_GET['ust_clst_delete'] ) ) {
			return;
		}
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		// Suppression.
		if ( isset( $_GET['ust_clst_delete'] ) ) {
			$id = absint( $_GET['ust_clst_delete'] );
			check_admin_referer( 'ust_clst_delete_' . $id );
			UST_Clst_DB::delete_competition( $id );
			wp_safe_redirect( admin_url( 'admin.php?page=ust-classements&msg=deleted' ) );
			exit;
		}

		$action = sanitize_text_field( wp_unslash( $_POST['ust_clst_action'] ) );

		// Création / mise à jour d'une compétition.
		if ( 'save_competition' === $action ) {
			check_admin_referer( 'ust_clst_save_comp' );
			$id   = isset( $_POST['comp_id'] ) ? absint( $_POST['comp_id'] ) : 0;
			$data = array(
				'nom'    => isset( $_POST['nom'] ) ? wp_unslash( $_POST['nom'] ) : '',
				'saison' => isset( $_POST['saison'] ) ? wp_unslash( $_POST['saison'] ) : '',
				'sport'  => isset( $_POST['sport'] ) ? wp_unslash( $_POST['sport'] ) : 'football',
			);
			$new_id = UST_Clst_DB::save_competition( $data, $id );
			wp_safe_redirect( admin_url( 'admin.php?page=ust-classements&comp=' . $new_id . '&msg=saved' ) );
			exit;
		}

		// Enregistrement des lignes du classement.
		if ( 'save_rows' === $action ) {
			check_admin_referer( 'ust_clst_save_rows' );
			$comp_id = isset( $_POST['comp_id'] ) ? absint( $_POST['comp_id'] ) : 0;
			$rows    = isset( $_POST['rows'] ) && is_array( $_POST['rows'] ) ? wp_unslash( $_POST['rows'] ) : array();
			if ( $comp_id ) {
				UST_Clst_DB::replace_rows( $comp_id, $rows );
			}
			wp_safe_redirect( admin_url( 'admin.php?page=ust-classements&comp=' . $comp_id . '&msg=rows_saved' ) );
			exit;
		}
	}

	/**
	 * Affiche la page d'administration.
	 */
	public function render_page() {
		$comp_id = isset( $_GET['comp'] ) ? absint( $_GET['comp'] ) : 0; // phpcs:ignore WordPress.Security.NonceVerification
		$msg     = isset( $_GET['msg'] ) ? sanitize_text_field( wp_unslash( $_GET['msg'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification

		echo '<div class="wrap ust-clst-wrap">';
		echo '<h1>' . esc_html__( 'Classements US Toulouse', 'ust-classements' ) . '</h1>';

		if ( $msg ) {
			$labels = array(
				'saved'      => __( 'Compétition enregistrée.', 'ust-classements' ),
				'deleted'    => __( 'Compétition supprimée.', 'ust-classements' ),
				'rows_saved' => __( 'Classement mis à jour.', 'ust-classements' ),
			);
			if ( isset( $labels[ $msg ] ) ) {
				echo '<div class="notice notice-success is-dismissible"><p>' . esc_html( $labels[ $msg ] ) . '</p></div>';
			}
		}

		if ( $comp_id ) {
			$this->render_edit_rows( $comp_id );
		} else {
			$this->render_list();
		}

		echo '</div>';
	}

	/**
	 * Liste des compétitions + formulaire de création.
	 */
	private function render_list() {
		$comps = UST_Clst_DB::get_competitions();
		?>
		<div class="ust-clst-grid">
			<div class="ust-clst-col">
				<h2><?php esc_html_e( 'Compétitions', 'ust-classements' ); ?></h2>
				<?php if ( empty( $comps ) ) : ?>
					<p><?php esc_html_e( 'Aucune compétition pour le moment.', 'ust-classements' ); ?></p>
				<?php else : ?>
					<table class="widefat striped">
						<thead>
							<tr>
								<th><?php esc_html_e( 'Nom', 'ust-classements' ); ?></th>
								<th><?php esc_html_e( 'Saison', 'ust-classements' ); ?></th>
								<th><?php esc_html_e( 'Sport', 'ust-classements' ); ?></th>
								<th><?php esc_html_e( 'Shortcode', 'ust-classements' ); ?></th>
								<th><?php esc_html_e( 'Actions', 'ust-classements' ); ?></th>
							</tr>
						</thead>
						<tbody>
						<?php foreach ( $comps as $c ) : ?>
							<tr>
								<td><strong><?php echo esc_html( $c->nom ); ?></strong></td>
								<td><?php echo esc_html( $c->saison ); ?></td>
								<td><?php echo esc_html( $c->sport ); ?></td>
								<td><code>[ust_classement id="<?php echo esc_attr( $c->id ); ?>"]</code></td>
								<td>
									<a class="button button-small" href="<?php echo esc_url( admin_url( 'admin.php?page=ust-classements&comp=' . $c->id ) ); ?>"><?php esc_html_e( 'Gérer', 'ust-classements' ); ?></a>
									<a class="button button-small button-link-delete" href="<?php echo esc_url( wp_nonce_url( admin_url( 'admin.php?page=ust-classements&ust_clst_delete=' . $c->id ), 'ust_clst_delete_' . $c->id ) ); ?>" onclick="return confirm('<?php echo esc_js( __( 'Supprimer cette compétition ?', 'ust-classements' ) ); ?>');"><?php esc_html_e( 'Supprimer', 'ust-classements' ); ?></a>
								</td>
							</tr>
						<?php endforeach; ?>
						</tbody>
					</table>
				<?php endif; ?>
			</div>

			<div class="ust-clst-col ust-clst-col--narrow">
				<h2><?php esc_html_e( 'Nouvelle compétition', 'ust-classements' ); ?></h2>
				<form method="post">
					<?php wp_nonce_field( 'ust_clst_save_comp' ); ?>
					<input type="hidden" name="ust_clst_action" value="save_competition">
					<p><label><?php esc_html_e( 'Nom', 'ust-classements' ); ?><br>
						<input type="text" name="nom" class="regular-text" placeholder="Ex : Départemental 2 - Poule A" required></label></p>
					<p><label><?php esc_html_e( 'Saison', 'ust-classements' ); ?><br>
						<input type="text" name="saison" class="regular-text" placeholder="2024-2025"></label></p>
					<p><label><?php esc_html_e( 'Sport', 'ust-classements' ); ?><br>
						<select name="sport">
							<option value="football">Football</option>
							<option value="padel">Padel</option>
							<option value="randonnee">Randonnée</option>
							<option value="autre">Autre</option>
						</select></label></p>
					<p><button type="submit" class="button button-primary"><?php esc_html_e( 'Créer', 'ust-classements' ); ?></button></p>
				</form>
			</div>
		</div>
		<?php
	}

	/**
	 * Formulaire d'édition des lignes d'une compétition.
	 *
	 * @param int $comp_id ID compétition.
	 */
	private function render_edit_rows( $comp_id ) {
		$comp = UST_Clst_DB::get_competition( $comp_id );
		if ( ! $comp ) {
			echo '<p>' . esc_html__( 'Compétition introuvable.', 'ust-classements' ) . '</p>';
			return;
		}
		$rows = UST_Clst_DB::get_rows( $comp_id );
		?>
		<p><a href="<?php echo esc_url( admin_url( 'admin.php?page=ust-classements' ) ); ?>">&larr; <?php esc_html_e( 'Retour aux compétitions', 'ust-classements' ); ?></a></p>
		<h2><?php echo esc_html( $comp->nom ); ?> <small>— <?php echo esc_html( $comp->saison ); ?></small></h2>
		<p><?php esc_html_e( 'Shortcode :', 'ust-classements' ); ?> <code>[ust_classement id="<?php echo esc_attr( $comp_id ); ?>"]</code></p>
		<p class="description"><?php esc_html_e( 'Saisissez victoires / nuls / défaites : les matchs joués et les points (V×3 + N) sont calculés automatiquement. Vous pouvez forcer un total de points si besoin. Cochez « UST » pour mettre votre équipe en avant.', 'ust-classements' ); ?></p>

		<form method="post">
			<?php wp_nonce_field( 'ust_clst_save_rows' ); ?>
			<input type="hidden" name="ust_clst_action" value="save_rows">
			<input type="hidden" name="comp_id" value="<?php echo esc_attr( $comp_id ); ?>">

			<table class="widefat ust-clst-rows" id="ust-clst-rows">
				<thead>
					<tr>
						<th style="width:50px">Pos</th>
						<th>Équipe</th>
						<th style="width:50px">V</th>
						<th style="width:50px">N</th>
						<th style="width:50px">D</th>
						<th style="width:60px">BP</th>
						<th style="width:60px">BC</th>
						<th style="width:70px">Pts</th>
						<th style="width:50px">UST</th>
						<th style="width:40px"></th>
					</tr>
				</thead>
				<tbody>
				<?php
				$rows = ! empty( $rows ) ? $rows : array();
				$i    = 0;
				foreach ( $rows as $r ) :
					?>
					<tr>
						<td><input type="number" name="rows[<?php echo esc_attr( $i ); ?>][position]" value="<?php echo esc_attr( $r->position ); ?>" class="small-text"></td>
						<td><input type="text" name="rows[<?php echo esc_attr( $i ); ?>][equipe]" value="<?php echo esc_attr( $r->equipe ); ?>" class="regular-text"></td>
						<td><input type="number" name="rows[<?php echo esc_attr( $i ); ?>][gagnes]" value="<?php echo esc_attr( $r->gagnes ); ?>" class="small-text"></td>
						<td><input type="number" name="rows[<?php echo esc_attr( $i ); ?>][nuls]" value="<?php echo esc_attr( $r->nuls ); ?>" class="small-text"></td>
						<td><input type="number" name="rows[<?php echo esc_attr( $i ); ?>][perdus]" value="<?php echo esc_attr( $r->perdus ); ?>" class="small-text"></td>
						<td><input type="number" name="rows[<?php echo esc_attr( $i ); ?>][bp]" value="<?php echo esc_attr( $r->bp ); ?>" class="small-text"></td>
						<td><input type="number" name="rows[<?php echo esc_attr( $i ); ?>][bc]" value="<?php echo esc_attr( $r->bc ); ?>" class="small-text"></td>
						<td><input type="number" name="rows[<?php echo esc_attr( $i ); ?>][points]" value="<?php echo esc_attr( $r->points ); ?>" class="small-text"></td>
						<td style="text-align:center"><input type="checkbox" name="rows[<?php echo esc_attr( $i ); ?>][highlight]" value="1" <?php checked( $r->highlight, 1 ); ?>></td>
						<td><button type="button" class="button-link ust-clst-remove" title="Supprimer">&times;</button></td>
					</tr>
					<?php
					$i++;
				endforeach;
				?>
				</tbody>
			</table>

			<p>
				<button type="button" class="button" id="ust-clst-add"><?php esc_html_e( '+ Ajouter une ligne', 'ust-classements' ); ?></button>
				<button type="submit" class="button button-primary"><?php esc_html_e( 'Enregistrer le classement', 'ust-classements' ); ?></button>
			</p>
		</form>
		<?php
	}
}
