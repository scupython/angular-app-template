function parse_link_header(header) {
    var links = {};
    if (header.length === 0) {
        return links;
    }

    // Split parts by comma
    var parts = header.split(',');
    // Parse each part into a named link
    for (var i = 0; i < parts.length; i++) {
        var section = parts[i].split(';');
        if (section.length !== 2) {
            throw new Error("section could not be split on ';'");
        }
        var url = section[0].replace(/<(.*)>/, '$1').trim();
        var name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
    }
    return links;
}

function parse_url_params(url) {
    var params = {};
    if (url.length === 0) {
        return params;
    }
    var parts = url.split('?');
    if (parts.length == 2) {
        var p1 = parts[1].split("&");
        for (var i = 0; i < p1.length; i++) {
            var pp = p1[i].split('=');
            if (pp.length != 2) {
                continue;
            }
            var q = pp[0].trim();
            var a = pp[1].trim();
            params[q] = a;
        }
    }
    return params;
}