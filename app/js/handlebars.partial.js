Handlebars.registerPartial("39510", `
    <td align="center" width="20%" style="vertical-align: middle;"><a href="https://www.thingsyouneverknew.com/whatsnew/c/102601?code={{ form.sourceCode }}">What's New</a></td>
    <td align="center" width="20%" style="vertical-align: middle;"><a href="https://www.thingsyouneverknew.com/books/c/105177?code={{ form.sourceCode }}">Books</a></td>
    <td align="center" width="20%" style="vertical-align: middle;"><a href="https://www.thingsyouneverknew.com/novelties/c/105196?code={{ form.sourceCode }}">Novelties</a></td>
    <td align="center" width="20%" style="vertical-align: middle;"><a href="https://www.thingsyouneverknew.com/diecastthings/c/105227?code={{ form.sourceCode }}">Die Cast</a></td>
    <td align="center" style="vertical-align: middle;"><a href="https://www.thingsyouneverknew.com/thingsonsale/c/662963?code={{ form.sourceCode }}">Sale</a></td>
`);

Handlebars.registerPartial("39498", `
    <td align="center" width="20%" style="vertical-align: middle;"><a href="https://www.lighterside.com/ournewestitems/c/100311?code={{ form.sourceCode }}">New</a></td>
    <td align="center" width="20%" style="vertical-align: middle;"><a href="https://www.lighterside.com/dolls/c/104955?code={{ form.sourceCode }}">Dolls</a></td>
    <td align="center" width="20%" style="vertical-align: middle;"><a href="https://www.lighterside.com/decor/c/104966?code={{ form.sourceCode }}">D&eacute;cor</a></td>
    <td align="center" width="20%" style="vertical-align: middle;"><a href="https://www.lighterside.com/housewares/c/105007?code={{ form.sourceCode }}">Housewares</a></td>
    <td align="center" style="vertical-align: middle;"><a href="https://www.lighterside.com/sale/c/4?code={{ form.sourceCode }}">Sale</a></td>
`);

Handlebars.registerPartial("39509", `
    <td align="center" width="20%" style="vertical-align: middle;"><a href="https://www.fulloflife.com/new/c/102581?code={{ form.sourceCode }}">New</a></td>
    <td align="center" width="20%" style="vertical-align: middle;"><a href="https://www.fulloflife.com/Fitness/c/102624?code={{ form.sourceCode }}">Fitness</a></td>
    <td align="center" width="20%" style="vertical-align: middle;"><a href="https://www.fulloflife.com/Mobility/c/102687?code={{ form.sourceCode }}">Mobility</a></td>
    <td align="center" width="20%" style="vertical-align: middle;"><a href="https://www.fulloflife.com/better-sleep/c/102761?code={{ form.sourceCode }}">Better Sleep</a></td>
    <td align="center" style="vertical-align: middle;"><a href="https://www.fulloflife.com/sale/c/102582?code={{ form.sourceCode }}">Sale</a></td>
`);

Handlebars.registerPartial("39507", `
    <td align="center" width="20%" style="vertical-align: middle;"><a href="https://www.bettysattic.com/new/c/102583?code={{ form.sourceCode }}">New</a></td>
    <td align="center" width="20%" style="vertical-align: middle;"><a href="https://www.bettysattic.com/Books/c/102654?code={{ form.sourceCode }}">Dolls</a></td>
    <td align="center" width="20%" style="vertical-align: middle;"><a href="https://www.bettysattic.com/Collectibles/c/102911?code={{ form.sourceCode }}">Collectibles</a></td>
    <td align="center" width="20%" style="vertical-align: middle;"><a href="https://www.bettysattic.com/Kitchen/c/102745?code={{ form.sourceCode }}">Kitchen</a></td>
    <td align="center" style="vertical-align: middle;"><a href="https://www.bettysattic.com/sale/c/102585?code={{ form.sourceCode }}">Sale</a></td>
`);

Handlebars.registerPartial("39508", `
    <td align="center" width="20%" style="vertical-align: middle;"><a href="https://www.closeoutzone.com/New/c/103711?code={{ form.sourceCode }}">New</a></td>
    <td align="center" width="20%" style="vertical-align: middle;"><a href="https://www.closeoutzone.com/Collectibles/c/103772?code={{ form.sourceCode }}">Collectibles</a></td>
    <td align="center" width="20%" style="vertical-align: middle;"><a href="https://www.closeoutzone.com/Novelties/c/103696?code={{ form.sourceCode }}">Novelties</a></td>
    <td align="center" width="20%" style="vertical-align: middle;"><a href="https://www.closeoutzone.com/electronics-amp-gadgets/c/103659?code={{ form.sourceCode }}">Electronics</a></td>
    <td align="center" style="vertical-align: middle;"><a href="https://www.closeoutzone.com/sale/c/103718?code={{ form.sourceCode }}">Sale</a></td>
`);

Handlebars.registerPartial("style", `
<style>
    body {
        user-select: none;
        -webkit-user-drag: none;
        font-size: 16px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #303030;
        margin: 0;
    }

    table td {
        vertical-align: top;
    }

    .was span {
        text-decoration: line-through;
    }

    .now {
        color: red;
        font-weight: bold;
    }

    .footer {
        font-size: 10px;
        color: #666;
    }

    .footer a {
        text-decoration: none;
        color: #000;
    }

    .view {
        font-size: 12px;
        text-align: center;
        width: 600px;
    }

    .banner {
        background-image: url(https://cdn-tp4.mozu.com/25762-m1/cms/files/{{ bannerImageId }});
        display: table-cell;
        font-size: 24px;
        height: 72px;
        text-align: center;
        vertical-align: middle;
        width: 600px;
    }

    table.content {
        background-image: url(https://cdn-tp4.mozu.com/25762-m1/cms/files/{{ contentImageId }});
    }

    .view a {
        color: black;
        text-decoration: none;
    }

    .nav {
        font-size: 12px;
        background-color: #008bcc;
    }

    .nav a {
        text-decoration: none;
        color: white;
    }

    .item {
        width: 200px;
    }

    .item img {
        border: 1px solid #eee;
        width: 200px;
    }

    .item h4 {
        font-size: 14px;
        margin: 0;
    }

    .item .productCode,
    .item .price {
        font-size: 12px;
    }

    .hidden {
        display: none;
    }
</style>
`);

Handlebars.registerPartial("CAN-SPAM", `
<table class="footer" width="600">
    <tr>
        <td>
            <hr>
            <div style="text-align: center;">
                This email was sent to <b>%%!contact_email%%</b> by <b>%%!account_organization%%</b>
            </div>
            <div style="text-align: center;">
                %%!account_address1%% | %%!account_city%% | %%!account_state%% |
                %%!account_zip%%<br><a href="%%!forward_url%%">Forward to a friend</a> | <a
                    href="%%!manage_url%%">Manage Preferences</a> | <a
                    href="%%!unsubscribe_url%%">Unsubscribe</a><br>%%!poweredby%%
            </div>
        </td>
    </tr>
</table>
`);

Handlebars.registerPartial("footer", `
<table class="footer" width="600">
    <tr>
        <td>
            <p>All prices, items, descriptions and ship dates are subject to change without notice.
                Copyright
                &copy;2019 <a href="https://www.{{ site.domain }}/">{{ site.name }}</a>. All Rights
                Reserved.
            </p>
            <p>This information is coming to you because of your relationship with {{ site.name }},
                and
                {{ site.domain }}. Your subscription to {{ site.name }} news and specials is both
                private and
                free.
                If
                you would rather not receive this information, please click here: <a
                    href="%%!unsubscribe_url%%">UNSUBSCRIBE</a>. Please allow 7-14 days for your
                unsubscribe
                request
                to be processed.</p>
            <p>Please do not reply to this email. This mailbox is not monitored and we will be
                unable to reply.
                If
                you have a Customer Service question or issue, please <a
                    href="mailto:CustomerService@{{ site.domain }}">email us</a>.</p>
            <p>Customer Service: {{ site.phoneNumber }} between 8 AM and 6 PM ET Monday through
                Friday.</p>
        </td>
    </tr>
</table>
`);

Handlebars.registerPartial("banner", `
<table width="600" align="center"
style="font-size: 20px; text-align: center; width: 600px; background-image: url(https://cdn-tp4.mozu.com/25762-m1/cms/files/{{ background-image }})"
background="https://cdn-tp4.mozu.com/25762-m1/cms/files/{{ background-image }}">
<tr style="height: 72px;">
    <td valign="middle" style="vertical-align: middle;">{{ text }}</td>
</tr>
</table>
`);