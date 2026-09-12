<?php
/**
 * Gladhat — temporary Hostinger / staging URL fix.
 *
 * Upload to: wp-content/mu-plugins/gladhat-temporary-url.php
 * (Create the mu-plugins folder if it does not exist.)
 *
 * Use while the site is accessed via a Hostinger preview URL such as
 * https://yoursite.hostingersite.com before gladhat.com DNS is pointed here.
 *
 * Delete this file when gladhat.com is live and Settings → General URLs are correct.
 *
 * Optional wp-config.php override (recommended for this site):
 *   define( 'GLADHAT_TEMPORARY_URL', 'https://chocolate-lemur-135747.hostingersite.com' );
 *
 * @package Gladhat
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Hosts that should use the request URL instead of the database site URL.
 *
 * @param string $host HTTP host, lowercase, no port unless non-standard.
 * @return bool
 */
function gladhat_temp_url_is_preview_host( $host ) {
	if ( '' === $host ) {
		return false;
	}

	$suffixes = array(
		'.hostingersite.com',
		'.hostingerpreview.com',
	);

	foreach ( $suffixes as $suffix ) {
		$len = strlen( $suffix );
		if ( strlen( $host ) >= $len && substr( $host, -$len ) === $suffix ) {
			return true;
		}
	}

	return false;
}

/**
 * Build the URL WordPress should use for this request.
 *
 * @return string|null Null when no override applies.
 */
function gladhat_temp_url_resolve() {
	if ( defined( 'GLADHAT_TEMPORARY_URL' ) && GLADHAT_TEMPORARY_URL ) {
		return untrailingslashit( GLADHAT_TEMPORARY_URL );
	}

	$host = isset( $_SERVER['HTTP_HOST'] ) ? strtolower( wp_unslash( $_SERVER['HTTP_HOST'] ) ) : '';
	if ( ! gladhat_temp_url_is_preview_host( $host ) ) {
		return null;
	}

	$https  = ( ! empty( $_SERVER['HTTPS'] ) && 'off' !== $_SERVER['HTTPS'] )
		|| ( isset( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && 'https' === $_SERVER['HTTP_X_FORWARDED_PROTO'] );
	$scheme = $https ? 'https' : 'http';

	return $scheme . '://' . $host;
}

/**
 * @return string|null
 */
function gladhat_temp_url_value() {
	static $url = null;
	static $resolved = false;

	if ( $resolved ) {
		return $url;
	}

	$resolved = true;
	$url      = gladhat_temp_url_resolve();

	return $url;
}

/**
 * @param mixed $pre Option pre-filter value.
 * @return mixed
 */
function gladhat_temp_url_pre_option_home( $pre ) {
	$override = gladhat_temp_url_value();
	return $override ? $override : $pre;
}

/**
 * @param mixed $pre Option pre-filter value.
 * @return mixed
 */
function gladhat_temp_url_pre_option_siteurl( $pre ) {
	$override = gladhat_temp_url_value();
	return $override ? $override : $pre;
}

add_filter( 'pre_option_home', 'gladhat_temp_url_pre_option_home' );
add_filter( 'pre_option_siteurl', 'gladhat_temp_url_pre_option_siteurl' );
