/** @odoo-module */

import { NavBar } from "@web/webclient/navbar/navbar";
import { registry } from "@web/core/registry";
const { fuzzyLookup } = require('@web/core/utils/search');
import { computeAppsAndMenuItems } from "@web/webclient/menus/menu_helpers";
import core from 'web.core';

const commandProviderRegistry = registry.category("command_provider");
const { onMounted } = owl;
import { patch } from 'web.utils';
var rpc = require('web.rpc');
patch(NavBar.prototype, 's_theme/static/src/js/appMenu.js', {
     setup() {
        this._super();
        this._search_def = $.Deferred();
        let { apps, menuItems } = computeAppsAndMenuItems(this.menuService.getMenuAsTree("root"));
        this._apps = apps;
        this._searchableMenus = menuItems;
        this.colors = this.fetch_data();
        onMounted(this.onMounted);
    },
    fetch_data: function() {
        var self = this;
        rpc.query({model: 'res.config.settings',method: 'config_color_settings',args: [0],}).then(function(result){
            self.colors = result;
            console.log("$$$",result);
            if (result.nav_menu_color !== false){
                document.documentElement.style.setProperty("--o-navbar-apps-menu",result.nav_menu_color);
            }
            if (result.button_save_color !== false){
                document.documentElement.style.setProperty("--o-form-button-save",result.button_save_color);}
            if (result.nav_background_color !== false){
                document.documentElement.style.setProperty("--o-navbar-background",result.nav_background_color);
            }
        });
    },

    onMounted() {
        this.$search_container = $(".search-container");
        this.$search_input = $(".search-input input");
        this.$search_results = $(".search-results");
        this.$app_menu = $(".app-menu");
        this.$dropdown_menu = $(".dropdown-menu");
    },

     _searchMenusSchedule: function () {
        this.$search_results.removeClass("o_hidden")
        this.$app_menu.addClass("o_hidden");
        this._search_def.reject();
        this._search_def = $.Deferred();
        setTimeout(this._search_def.resolve.bind(this._search_def), 50);
        this._search_def.done(this._searchMenus.bind(this));
    },

    _searchMenus: function () {
        var query = this.$search_input.val();
        if (query === "") {
            this.$search_container.removeClass("has-results");
            this.$app_menu.removeClass("o_hidden");
            this.$search_results.empty();
            return;
        }
        var results = [];

        fuzzyLookup(query, this._apps, (menu) => menu.label)
        .forEach((menu) => {
            results.push({
                category: "apps",
                name: menu.label,
                actionID: menu.actionID,
                id: menu.id,
                webIconData: menu.webIconData,
            });
        });

        fuzzyLookup(query, this._searchableMenus, (menu) =>
            (menu.parents + " / " + menu.label).split("/").reverse().join("/")
        ).forEach((menu) => {
            results.push({
                category: "menu_items",
                name: menu.parents + " / " + menu.label,
                actionID: menu.actionID,
                id: menu.id,
            });
        });

        this.$search_container.toggleClass(
            "has-results",
            Boolean(results.length)
        );
        this.$search_results.html(
            core.qweb.render(
                "s_theme.SearchResults",
                {
                    results: results,
                    widget: this,
                }
            )
        );
    },
});
