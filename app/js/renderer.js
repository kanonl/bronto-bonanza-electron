const { ipcRenderer, remote } = require("electron"),
    request = require("request");

let preview = document.querySelector("#preview"),
    submit = document.querySelector("#submit"),
    result = document.querySelector("#result"),
    item = document.querySelector("#item"),
    site = document.querySelector("#site"),
    template = document.querySelector("#template"),
    sourceCode = document.querySelector("#source"),
    headerText = document.querySelector("#header_text"),
    headerUrl = document.querySelector("#header_url"),
    bannerTextTop = document.querySelector("#top_banner_text"),
    bannerTextBottom = document.querySelector("#bottom_banner_text");

let messageContent;

preview.addEventListener("click", (event) => {
    event.preventDefault();

    if (!valid()) return;
    getPriceListEntries(siteConfig[site.value].priceListCode, item.value).then(entries => {
        getProducts(item.value, entries);
    }).catch(console.log);
});

submit.addEventListener("click", async (event) => {
    event.preventDefault();

    if (!valid()) return;

    if (messageContent) {
        let { apiToken, messageFolderId } = siteConfig[site.value];

        let subject = document.querySelector("#subject").value;
        let messageName = document.querySelector("#message_name").value;

        let sessionId = await login(apiToken);
        addMessages(messageContent, subject, messageName, sessionId, messageFolderId);
    }
});

const getProducts = (products, priceListEntries) => {
    let { catalogId, siteId } = siteConfig[site.value];

    let url = new URL("https://t25762.mozu.com");
    url.pathname = "api/commerce/catalog/admin/products";
    url.search = new URLSearchParams({
        filter: `productCode in [${products}]`
    });

    let options = {
        method: "GET",
        url: url.toString(),
        headers: {
            "x-vol-app-claims": remote.getGlobal("mozu").accessToken,
            "x-vol-master-catalog": 1,
            "x-vol-catalog": catalogId,
            "x-vol-tenant": 25762,
            "x-vol-site": siteId
        }
    };

    try {
        request(options, (error, response, body) => {
            let { statusCode, statusMessage } = response;

            if (statusCode === 200) {
                let data = JSON.parse(body);
                data.activeItems = [];
                for (const item of data.items) {
                    for (const productInCatalog of item.productInCatalogs) {
                        if (catalogId == productInCatalog.catalogId) {
                            if (productInCatalog.isActive) {

                                // combine item with corresponding priceList entry
                                priceListEntries.forEach(entry => {
                                    if (entry.productCode === item.productCode) {
                                        item.priceListEntries = entry;
                                        item.price.label = generatePriceLabelHTML(entry);
                                    }
                                });
                                data.activeItems.push(item);
                            }
                        }
                    }
                }

                data.activeItems = sortProducts(products, data.activeItems);
                data.site = siteConfig[site.value];
                data.siteId = () => { return siteId };
                data.form = {
                    sourceCode: sourceCode.value,
                    headerText: headerText.value,
                    headerUrl: headerUrl.value,
                    bannerTextTop: bannerTextTop.value,
                    bannerTextBottom: bannerTextBottom.value
                };
                data.backgroundImageId = getBackgroundImageId(template.value);

                generateProductUrl(data.activeItems);
                displayProducts(data);
            } else {
                console.log(statusMessage);
            }
        });
    }
    catch (e) { console.log(e); }
};

const makeRequest = (options) => {
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) reject(error);
            let { statusCode, statusMessage } = response;
            if (statusCode === 200) {
                resolve(JSON.parse(body));
            } else {
                reject(statusMessage);
            }
        });
    });
};

const getPriceListEntries = async (priceListCode, productCodes) => {
    let url = new URL("https://t25762.mozu.com");
    url.pathname = `api/commerce/catalog/admin/pricelists/${priceListCode}/entries`;
    url.search = new URLSearchParams({
        startIndex: 0,
        pageSize: 20,
        filter: getPriceListEntriesFilter(productCodes.split(",")),
        responseFields: "items(productCode,productName,priceEntries)"
    });

    let options = {
        method: "GET",
        headers: {
            "x-vol-app-claims": remote.getGlobal("mozu").accessToken,
            "x-vol-master-catalog": 1
        },
        url: url.toString()
    };

    let entries = [];
    let moreResults = true;

    while (moreResults) {
        const response = await makeRequest(options);

        let { startIndex, pageSize, pageCount, totalCount, items } = response;

        if (items.length == 0) { moreResults = false; }
        let params = new URLSearchParams(url.search);
        params.set("startIndex", startIndex + pageSize);
        url.search = params;
        options.url = url.toString();

        items.forEach(item => {
            entries.push(item);
        });
    }

    return entries;
};

const getPriceListEntriesFilter = (productCodes) => {
    let str = [];
    productCodes.forEach(productCode => {
        str.push(`productCode eq ${productCode}`);
    });
    return (str.join(" or "));
};

const generatePriceLabelHTML = (entry) => {
    if (entry.priceEntries.length === 1) {
        if (entry.priceEntries[0].salePrice != entry.priceEntries[0].listPrice) {
            return `<div class="was">Was: <span>$${entry.priceEntries[0].listPrice.toFixed(2)}</span></div><div class="now">Now: $${entry.priceEntries[0].salePrice.toFixed(2)}</div>`;
        }
        return `$${entry.priceEntries[0].salePrice.toFixed(2)}`;
    }

    if (entry.priceEntries.length > 1) {
        let label = "";
        entry.priceEntries.forEach((entry, index, array) => {
            if (index === array.length - 1) {
                label += `<div>Buy ${entry.minQty}+ for $${entry.salePrice.toFixed(2)}</div>`;
            }
            else {
                label += `<div>Buy ${entry.minQty} for $${entry.salePrice.toFixed(2)}</div>`;
            }
        });
        return label;
    }
};

const generateProductUrl = (items) => {
    items.forEach(item => {
        let isFamily = false;
        let familyCode = "";

        item.properties.forEach(property => {
            if (property.attributeFQN === "tenant~Family_Code") {
                isFamily = true;
                familyCode = property.values[0].value;
            }
        });

        if (isFamily) {
            item.url = `/${item.seoContent.seoFriendlyUrl}/p/${familyCode}`;
        }
        else {
            item.url = `/${item.seoContent.seoFriendlyUrl}/p/${item.productCode}`;
        }
    });
};

const getBackgroundImageId = (tmpl) => {
    switch (tmpl) {
        case "default":
            return { banner: "", content: "" };
        case "main":
            return { banner: "e1e11f7c-0534-4f28-b3cf-7a3218b16b52", content: "ab221c66-3002-4c21-9c3f-c8c8e6f6913f" };
        case "plain2":
            return { banner: "b9d9d2cb-2f30-4ab7-b3e0-98cc0b1d8aba", content: "db46c293-58fa-4244-a658-bbbf7a1bd633" };
        case "plain3":
            return { banner: "b2014c63-a9cb-4152-a76e-914712ec697b", content: "97d29743-1282-4e65-b4fa-f952bc2adaea" };
        case "snowflake1":
            return { banner: "5b7a43a8-3245-440a-af28-85592fd693d0", content: "8c2a9c2f-b8d9-4c16-be9e-e439c49d9570" };
        default:
            return { banner: "", content: "" };
    }
};

const displayProducts = (products) => {
    try {
        if (products.totalCount > 0) {
            // messageContent = Handlebars.templates[template.value](products);
            messageContent = Handlebars.templates["default"](products);
            result.srcdoc = messageContent;
        }
    }
    catch (e) { console.log(e); }
};

const sortProducts = (sortOrder, products) => {
    let userSortOrder = sortOrder.split(",");
    let sortedProducts = [];

    for (let i = 0; i < userSortOrder.length; i++) {
        for (let j = 0; j < products.length; j++) {
            if (products[j].productCode === userSortOrder[i]) {
                sortedProducts.push(products[j]);
            }
        }
    }

    return sortedProducts;
};

const login = (apiToken) => {
    return new Promise((resolve, reject) => {
        let soapenv = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v4="http://api.bronto.com/v4"><soapenv:Header/><soapenv:Body><v4:login><apiToken>${apiToken}</apiToken></v4:login></soapenv:Body></soapenv:Envelope>`;

        let options = {
            method: "POST",
            url: "https://api.bronto.com/v4/",
            headers: {
                "Content-Type": "text/xml;charset=UTF-8"
            },
            form: soapenv
        };

        request(options, (error, response, body) => {
            let { statusCode, statusMessage } = response;

            if (error) reject(error);
            if (statusCode != 200) reject(statusMessage);

            let regex = /<return>(.+?)<\/return>/g;
            let matches = regex.exec(body);
            if (matches.length > 0) {
                resolve(matches[1]);
            }
        });
    });
};

const addMessages = (content, subject, name, sessionId, messageFolderId) => {
    let soapenv =
        `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v4="http://api.bronto.com/v4">
            <soapenv:Header>
                <v4:sessionHeader>
                    <sessionId>${sessionId}</sessionId>
                </v4:sessionHeader>
            </soapenv:Header>
            <soapenv:Body>
                <v4:addMessages>
                    <messages>
                        <name>${name}</name>
                        <messageFolderId>${messageFolderId}</messageFolderId>
                        <content>
                            <type>html</type>
                            <subject>${subject}</subject>
                            <content><![CDATA[${content}]]></content>
                        </content>
                    </messages>
                </v4:addMessages>
            </soapenv:Body>
        </soapenv:Envelope>`;

    let options = {
        method: "POST",
        url: "https://api.bronto.com/v4/",
        body: soapenv
    };

    request(options, (error, response, body) => {
        let { statusCode, statusMessage } = response;
        console.log(body);
        if (statusCode == 200) { }
    });
};

const siteConfig = { };

const valid = () => {
    if (!site.value) return false;
    if (!template.value) return false;
    if (item.value.trim().length === 0) return false;
    return true;
};
