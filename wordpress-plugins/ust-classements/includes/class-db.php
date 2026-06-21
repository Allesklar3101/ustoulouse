<?php
/**
 * Couche d'accès aux données pour les classements.
 *
 * @package UST_Classements
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class UST_Clst_DB {

	/**
	 * Nom de la table des compétitions (sans préfixe).
	 */
	const TABLE_COMP = 'ust_classements';

	/**
	 * Nom de la table des lignes/équipes (sans préfixe).
	 */
	const TABLE_ROWS = 'ust_classement_rows';

	/**
	 * Retourne le nom complet de la table compétitions.
	 */
	public static function comp_table() {
		global $wpdb;
		return $wpdb->prefix . self::TABLE_COMP;
	}

	/**
	 * Retourne le nom complet de la table lignes.
	 */
	public static function rows_table() {
		global $wpdb;
		return $wpdb->prefix . self::TABLE_ROWS;
	}

	/**
	 * Crée les tables nécessaires.
	 */
	public static function create_tables() {
		global $wpdb;
		$charset_collate = $wpdb->get_charset_collate();
		$comp            = self::comp_table();
		$rows            = self::rows_table();

		require_once ABSPATH . 'wp-admin/includes/upgrade.php';

		$sql_comp = "CREATE TABLE {$comp} (
			id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
			nom VARCHAR(191) NOT NULL,
			saison VARCHAR(50) DEFAULT '',
			sport VARCHAR(50) DEFAULT 'football',
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY  (id)
		) {$charset_collate};";

		$sql_rows = "CREATE TABLE {$rows} (
			id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
			comp_id BIGINT(20) UNSIGNED NOT NULL,
			position INT(11) NOT NULL DEFAULT 0,
			equipe VARCHAR(191) NOT NULL,
			joues INT(11) NOT NULL DEFAULT 0,
			gagnes INT(11) NOT NULL DEFAULT 0,
			nuls INT(11) NOT NULL DEFAULT 0,
			perdus INT(11) NOT NULL DEFAULT 0,
			bp INT(11) NOT NULL DEFAULT 0,
			bc INT(11) NOT NULL DEFAULT 0,
			points INT(11) NOT NULL DEFAULT 0,
			highlight TINYINT(1) NOT NULL DEFAULT 0,
			PRIMARY KEY  (id),
			KEY comp_id (comp_id)
		) {$charset_collate};";

		dbDelta( $sql_comp );
		dbDelta( $sql_rows );
	}

	/* ----------------------------------------------------------------
	 *  Compétitions
	 * ---------------------------------------------------------------- */

	/**
	 * Liste toutes les compétitions.
	 */
	public static function get_competitions() {
		global $wpdb;
		$table = self::comp_table();
		return $wpdb->get_results( "SELECT * FROM {$table} ORDER BY nom ASC" ); // phpcs:ignore WordPress.DB.PreparedSQL
	}

	/**
	 * Récupère une compétition par son ID.
	 *
	 * @param int $id ID de la compétition.
	 */
	public static function get_competition( $id ) {
		global $wpdb;
		$table = self::comp_table();
		return $wpdb->get_row( $wpdb->prepare( "SELECT * FROM {$table} WHERE id = %d", $id ) ); // phpcs:ignore WordPress.DB.PreparedSQL
	}

	/**
	 * Crée ou met à jour une compétition.
	 *
	 * @param array $data Données.
	 * @param int   $id   ID (0 = création).
	 * @return int ID de la compétition.
	 */
	public static function save_competition( $data, $id = 0 ) {
		global $wpdb;
		$table  = self::comp_table();
		$fields = array(
			'nom'        => sanitize_text_field( $data['nom'] ),
			'saison'     => sanitize_text_field( $data['saison'] ),
			'sport'      => sanitize_text_field( $data['sport'] ),
			'updated_at' => current_time( 'mysql' ),
		);

		if ( $id > 0 ) {
			$wpdb->update( $table, $fields, array( 'id' => $id ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
			return $id;
		}

		$wpdb->insert( $table, $fields ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		return (int) $wpdb->insert_id;
	}

	/**
	 * Supprime une compétition et ses lignes.
	 *
	 * @param int $id ID.
	 */
	public static function delete_competition( $id ) {
		global $wpdb;
		$wpdb->delete( self::comp_table(), array( 'id' => $id ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$wpdb->delete( self::rows_table(), array( 'comp_id' => $id ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
	}

	/* ----------------------------------------------------------------
	 *  Lignes du classement
	 * ---------------------------------------------------------------- */

	/**
	 * Récupère les lignes d'une compétition, triées par position.
	 *
	 * @param int $comp_id ID compétition.
	 */
	public static function get_rows( $comp_id ) {
		global $wpdb;
		$table = self::rows_table();
		return $wpdb->get_results( $wpdb->prepare( "SELECT * FROM {$table} WHERE comp_id = %d ORDER BY position ASC, points DESC", $comp_id ) ); // phpcs:ignore WordPress.DB.PreparedSQL
	}

	/**
	 * Remplace toutes les lignes d'une compétition.
	 *
	 * @param int   $comp_id ID compétition.
	 * @param array $rows    Tableau de lignes.
	 */
	public static function replace_rows( $comp_id, $rows ) {
		global $wpdb;
		$table = self::rows_table();
		$wpdb->delete( $table, array( 'comp_id' => $comp_id ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery

		foreach ( $rows as $row ) {
			$equipe = sanitize_text_field( $row['equipe'] );
			if ( '' === $equipe ) {
				continue;
			}
			$g = absint( $row['gagnes'] );
			$n = absint( $row['nuls'] );
			$p = absint( $row['perdus'] );
			$wpdb->insert( // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				$table,
				array(
					'comp_id'   => $comp_id,
					'position'  => absint( $row['position'] ),
					'equipe'    => $equipe,
					'joues'     => $g + $n + $p,
					'gagnes'    => $g,
					'nuls'      => $n,
					'perdus'    => $p,
					'bp'        => absint( $row['bp'] ),
					'bc'        => absint( $row['bc'] ),
					'points'    => isset( $row['points'] ) && '' !== $row['points'] ? intval( $row['points'] ) : ( $g * 3 + $n ),
					'highlight' => empty( $row['highlight'] ) ? 0 : 1,
				)
			);
		}
	}
}
