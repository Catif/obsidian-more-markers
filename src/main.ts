import { Plugin, MarkdownView } from 'obsidian';
import { MoreMarkersSettings } from './interfaces';
import { SettingTab } from './PluginSettingTab';
import { searchAndPlaceMarkers } from './MoreMarkers';
// Remember to rename these classes and interfaces!

const DEFAULT_SETTINGS: MoreMarkersSettings = {
	markers: [
		{ symbols: '!!', color: '#ff0000' },
		{ symbols: '??', color: '#00ff00' },
		{ symbols: '?!', color: '#00ffff' }
	]
}

export default class MoreMarkers extends Plugin {
	settings: MoreMarkersSettings;

	async onload() {
		await this.loadSettings();

		this.registerMarkdownPostProcessor((el) => {
			searchAndPlaceMarkers(this.settings.markers, el);
		});

		this.addSettingTab(new SettingTab(this.app, this));
	}

	async onunload() {
		this.refreshPreview();
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);

		this.refreshPreview();
	}

	async refreshPreview() {
		this.app.workspace.getActiveViewOfType(MarkdownView)?.previewMode.rerender(true);
	}
}