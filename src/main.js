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

function update_dirs_prev() {
    NODE_TRAVERSAL_PATH.pop();

    CURRENT_NODE = DATA_STATICS_META;
    NODE_TRAVERSAL_PATH.forEach((x) => {
        CURRENT_NODE = CURRENT_NODE[x];
    });

    update_display(CURRENT_NODE);
}

/**
 * @param {string} name_dir
 */
function update_dirs_next(name_dir) {
    var node = CURRENT_NODE[name_dir];
    if (!node) return;

    CURRENT_NODE = node;
    NODE_TRAVERSAL_PATH.push(name_dir);

    update_display(node);
}

/**
 * @param {string} name_nif
 */
function on_click_nif(name_nif) {
    alert(`WIP: Not implemented yet. ${name_nif}`);
}

/**
 * @param {string} name_dir
 * @param {boolean} go_back
 */
function get_html_dir(name_dir, go_back = false) {
    var callback = go_back ?
        `update_dirs_prev()`:
        `update_dirs_next('${name_dir}')`;
    return `<a href="#">
        <b class="neon-accent" onclick="${callback}">${name_dir}</b>
    </a>`
}

/**
 * @param {string} name_nif
 */
function get_html_nif(name_nif) {
    url = URLS_THUMBNAILS[name_nif] || URL_MISSING_THUMBNAIL;
    return `
    <div onclick="on_click_nif('${name_nif}')">
        <b>${name_nif}</b>
        <img src="${url}" alt="${name_nif}">
    </div>
    `
}

/**
 * @param {SKNode} node
 */
function update_display(node) {
    const { keys_dir, keys_nif } = split_keys(node);
    var array_dirs = !NODE_TRAVERSAL_PATH.length? [] : [
        get_html_dir("../", go_back = true)
    ]
    document.getElementById("list_dirs").innerHTML = array_dirs.concat(
        keys_dir.map((x) => get_html_dir(x, go_back = false))
    ).join("<br>");
    document.getElementById("list_nifs").innerHTML = keys_nif.map(get_html_nif).join("<br>");
}

var CURRENT_NODE = DATA_STATICS_META;
var NODE_TRAVERSAL_PATH = [];
update_dirs_next("data/");
