import { Plugin } from 'obsidian';
import { MoreMarkersSettings } from './interfaces';
import { SettingTab } from './PluginSettingTab';
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
	settingsTab: SettingTab;

	async onload() {
		await this.loadSettings();

		this.settingsTab = new SettingTab(this.app, this);

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(this.settingsTab);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}