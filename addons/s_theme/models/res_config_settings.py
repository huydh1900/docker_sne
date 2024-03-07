from odoo import models, fields
class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    button_save_color = fields.Char(string='Button save color',
                                    config_parameter='s_theme.button_save_color')
    nav_menu_color = fields.Char(string="Navbar color",
                                 config_parameter='s_theme.nav_menu_color')
    nav_background_color = fields.Char(string="AppBar Hover",
                                       config_parameter='s_theme.nav_background_color')
    def config_color_settings(self):
        colors = {}
        colors['button_save_color'] = self.env[
            'ir.config_parameter'].sudo().get_param(
            's_theme.button_save_color')
        colors['nav_menu_color'] = self.env[
            'ir.config_parameter'].sudo().get_param(
            's_theme.nav_menu_color')
        colors['nav_background_color'] = self.env[
            'ir.config_parameter'].sudo().get_param(
            's_theme.nav_background_color')

        return colors
