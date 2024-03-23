import { App, PluginSettingTab, Setting } from 'obsidian';
import MoreMarkers from './main';
import { MoreMarkersSettings } from './interfaces';

export const DEFAULT_SETTINGS: MoreMarkersSettings = {
	markers: [
		{ symbols: '!!', color: '#ff0000' },
		{ symbols: '??', color: '#00ff00' },
		{ symbols: '?!', color: '#00ffff' }
	]
};

export class SettingTab extends PluginSettingTab {
	plugin: MoreMarkers;

	constructor(app: App, plugin: MoreMarkers) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();

    containerEl.createEl('h1', {text: 'More Markers'});

    containerEl.createEl('h2', {text: 'List of Markers'});
		// Display all markers
		this.plugin.settings.markers.forEach((marker, index) => {
			new Setting(containerEl)
				.setName(`Marker #${index + 1}`)
				// symbols
				.addText((text) =>
					text
						.setPlaceholder('Symbols')
						.setValue(marker.symbols)
						.onChange(async (value) => {
							this.plugin.settings.markers[index].symbols = value;
							await this.plugin.saveSettings();
						})
				)
				// color
				.addColorPicker((color) =>
					color
						.setValue(marker.color)
						.onChange(async (value) => {
							this.plugin.settings.markers[index].color = value;
							await this.plugin.saveSettings();
						})
				)
				// delete marker
				.addButton((button) =>
					button
						.setButtonText('Delete')
						.onClick(async () => {
							this.plugin.settings.markers.splice(index, 1);
							await this.plugin.saveSettings();
							this.display();
						})
				);
		});

		// Add new marker
		new Setting(containerEl)
			.addButton((button) =>
				button
					.setButtonText('Add Marker')
					.onClick(async () => {
						this.plugin.settings.markers.push({ symbols: '', color: '' });
						await this.plugin.saveSettings();
						this.display();
					})
			);
	}
}