{
    "name": "Change theme color v16",
    "description": """Lets you choose the color of the background, save button and navbar menu""",
    "category": "Themes/Backend",
    "version": "16",
    'author': 'huytq@snine.vn',
    'company': 'Snine',
    'website': "https://erp.snine.info/",
    "depends": ['base', 'web'],
    "data": [
        'views/res_config_settings.xml',
    ],
    'assets': {
        'web.assets_backend': [
            's_theme/static/src/layout/style/layout_colors.scss',
            's_theme/static/src/components/app_menu/search_apps.js',
        ],
    },
}
