Handlebars.registerHelper('ifRowEnd', function (index, options) {
    if (index % 2) {
        return new Handlebars.SafeString("</tr><tr>");
    }
});