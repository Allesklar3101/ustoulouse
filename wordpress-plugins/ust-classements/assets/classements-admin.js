/* ── UST Classements — admin JS ── */
( function () {
	'use strict';

	function getNextIndex( tbody ) {
		var rows = tbody.querySelectorAll( 'tr' );
		var max = -1;
		rows.forEach( function ( tr ) {
			var input = tr.querySelector( 'input[name^="rows["]' );
			if ( ! input ) {
				return;
			}
			var m = input.name.match( /rows\[(\d+)\]/ );
			if ( m ) {
				max = Math.max( max, parseInt( m[ 1 ], 10 ) );
			}
		} );
		return max + 1;
	}

	function buildRow( i ) {
		var tr = document.createElement( 'tr' );
		tr.innerHTML =
			'<td><input type="number" name="rows[' + i + '][position]" class="small-text" value="' + ( i + 1 ) + '"></td>' +
			'<td><input type="text" name="rows[' + i + '][equipe]" class="regular-text"></td>' +
			'<td><input type="number" name="rows[' + i + '][gagnes]" class="small-text" value="0"></td>' +
			'<td><input type="number" name="rows[' + i + '][nuls]" class="small-text" value="0"></td>' +
			'<td><input type="number" name="rows[' + i + '][perdus]" class="small-text" value="0"></td>' +
			'<td><input type="number" name="rows[' + i + '][bp]" class="small-text" value="0"></td>' +
			'<td><input type="number" name="rows[' + i + '][bc]" class="small-text" value="0"></td>' +
			'<td><input type="number" name="rows[' + i + '][points]" class="small-text" value="0"></td>' +
			'<td style="text-align:center"><input type="checkbox" name="rows[' + i + '][highlight]" value="1"></td>' +
			'<td><button type="button" class="button-link ust-clst-remove" title="Supprimer">&times;</button></td>';
		return tr;
	}

	document.addEventListener( 'click', function ( e ) {
		if ( e.target && e.target.id === 'ust-clst-add' ) {
			var tbody = document.querySelector( '#ust-clst-rows tbody' );
			if ( tbody ) {
				tbody.appendChild( buildRow( getNextIndex( tbody ) ) );
			}
		}
		if ( e.target && e.target.classList.contains( 'ust-clst-remove' ) ) {
			var tr = e.target.closest( 'tr' );
			if ( tr ) {
				tr.remove();
			}
		}
	} );
}() );
