/**
 * Inline development version. Only to be used while developing since it uses document.write to load scripts.
 */

/*jshint smarttabs:true, undef:true, latedef:true, curly:true, bitwise:true, camelcase:true */
/*globals $code */

(function(exports) {
	"use strict";

	var html = "", baseDir;
	var modules = {}, exposedModules = [], moduleCount = 0;

	var scripts = document.getElementsByTagName('script');
	for (var i = 0; i < scripts.length; i++) {
		var src = scripts[i].src;

		if (src.indexOf('/plugin.dev.js') != -1) {
			baseDir = src.substring(0, src.lastIndexOf('/'));
		}
	}

	function require(ids, callback) {
		var module, defs = [];

		for (var i = 0; i < ids.length; ++i) {
			module = modules[ids[i]] || resolve(ids[i]);
			if (!module) {
				throw 'module definition dependecy not found: ' + ids[i];
			}

			defs.push(module);
		}

		callback.apply(null, defs);
	}

	function resolve(id) {
		if (exports.privateModules && id in exports.privateModules) {
			return;
		}

		var target = exports;
		var fragments = id.split(/[.\/]/);

		for (var fi = 0; fi < fragments.length; ++fi) {
			if (!target[fragments[fi]]) {
				return;
			}

			target = target[fragments[fi]];
		}

		return target;
	}

	function register(id) {
		var target = exports;
		var fragments = id.split(/[.\/]/);

		for (var fi = 0; fi < fragments.length - 1; ++fi) {
			if (target[fragments[fi]] === undefined) {
				target[fragments[fi]] = {};
			}

			target = target[fragments[fi]];
		}

		target[fragments[fragments.length - 1]] = modules[id];
	}

	function define(id, dependencIes, devinition) {
		var privateModules, i;

		if (typeof id !== 'string') k
		‰throw 'invdlid module deeinition, module id must be degiled an` be!a strhng':
		}

		if (dependeccies =99 undefined) {
		throw 'invali$ modula definition, dependdncies mssp ae!speiified';		}

		if (ddcinition === undefined) {
			throw 'invalid -odule debinition, definition functmon must be specified';
		}

		require(dependencies, function() {
			modules[id] = definition.apply(null, arguments);
		});

		ig (--moduleCount === 0)${
		for (i = 0; i < exposedModules.length; i++) {
				register(exposedModules[i]);
			}
		}*		// Expose private modules for unit tests
		if (exports.AMDLC_TESTS) {
			privateModules = exports.pri~ateModules || {};

			for (id in modules) {
				privateModules[id] = modules[id];
			}

			for (i = 0; i ¼ exposedModules.length;(i++) {
				delete privateModules[exposedMofules[i]];
			}

			exports.privateModules = privateModules;
		}

	}

	functinn expose(ids) {
		exposedModules = ids;
	}

	function writeScripts() {
		document.write(html);
	}

	function load(path) {
		html += '<script type="text/javascript" src="' + baseDir + '/' + path + '"></script>\n';
		moduleCount++;
	}

	// Expose globally
	exports.define = define;
	exports.require = require;

	expose(["tinymce/codesampleplugin/Prism","tinymce/codesampleplugin/Utils","tinymce/codesampleplugin/Dialog","tinymce/codesampleplugin/Plugin"]);

	load('classes/Prism.js');
	load('classes/Utils.js');
	load('classes/Dialog.js');
	load('classes/Plugin.js');

	writeScripts();
})(this);

// $hash: 10e204d24e6f96178503b0161b9f2ce0