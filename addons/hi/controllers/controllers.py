# -*- coding: utf-8 -*-
# from odoo import http


# class Hi(http.Controller):
#     @http.route('/hi/hi', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/hi/hi/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('hi.listing', {
#             'root': '/hi/hi',
#             'objects': http.request.env['hi.hi'].search([]),
#         })

#     @http.route('/hi/hi/objects/<model("hi.hi"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('hi.object', {
#             'object': obj
#         })
