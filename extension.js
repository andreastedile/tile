/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const {Gio, Shell, Meta} = imports.gi;
const Main = imports.ui.main;
const Me = imports.misc.extensionUtils.getCurrentExtension();

function getSettings() {
    let GioSSS = Gio.SettingsSchemaSource;
    let schemaSource = GioSSS.new_from_directory(
        Me.dir.get_child('schemas').get_path(),
        GioSSS.get_default(),
        false
    );
    let schemaObj = schemaSource.lookup(
        'org.gnome.shell.extensions.tile', true);
    if (!schemaObj) {
        throw new Error('Cannot find schemas');
    }
    return new Gio.Settings({settings_schema: schemaObj});
}


class Extension {
    constructor() {
    }

    enable() {
        const mode = Shell.ActionMode.NORMAL;
        const flag = Meta.KeyBindingFlags.NONE;
        const settings = getSettings();

        ['tile-1', 'tile-2', 'tile-3'].forEach(shortcut => {
            Main.wm.addKeybinding(shortcut, settings, flag, mode, () => {
                log(`Shortcut ${shortcut} activated`);
            });
        });
    }

    disable() {
        ['tile-1', 'tile-2', 'tile-3'].forEach(shortcut => {
            Main.wm.removeKeybinding(shortcut);
        })
    }
}

function init() {
    return new Extension();
}
