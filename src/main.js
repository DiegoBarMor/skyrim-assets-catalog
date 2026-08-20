/**
 * @typedef {Map<string, [string, string] | SKNode>} SKNode
 */

/**
 * @param {SKNode} node
 * @returns {{ keys_dir: string[], keys_nif: string[] }}
 */
function split_keys(node) {
    const keys_all = Object.keys(node);
    const mask_is_dir = keys_all.map((x) => x.at(-1) == '/');
    var keys_dir = keys_all.filter((_, i) =>  mask_is_dir.at(i));
    var keys_nif = keys_all.filter((_, i) => !mask_is_dir.at(i));
    keys_dir.sort();
    keys_nif.sort();
    return { keys_dir, keys_nif };
}

/**
 * @param {string} name_dir
 */
function get_html_dir(name_dir) {
    return `<a href="#"><b>${name_dir}</b></a>`
}

/**
 * @param {string} name_nif
 */
function get_html_nif(name_nif) {
    url = URLS_THUMBNAILS[name_nif] || URL_MISSING_THUMBNAIL;
    return `
    <div class="nif-item">
        <a href="#">${name_nif}</a>
        <img src="${url}" alt="${name_nif}" onclick="wip_not_implemented('${url}')">
    </div>
    `
}

/**
 * @param {string} url
 */
function wip_not_implemented(url) {
    alert(`WIP: Not implemented yet. ${url}`);
}

/**
 * @param {SKNode} node
 */
function update_node(node) {
    const { keys_dir, keys_nif } = split_keys(node);
    document.getElementById("list_dirs").innerHTML = keys_dir.map(get_html_dir).join("<br>");
    document.getElementById("list_nifs").innerHTML = keys_nif.map(get_html_nif).join("<br>");
}

var CURRENT_NODE = DATA_STATICS_META["data"];
update_node(DATA_STATICS_META["data"]);
