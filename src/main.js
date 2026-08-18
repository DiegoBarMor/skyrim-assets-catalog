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
 * @param {SKNode} node
 */
function update_node(node) {
    const { keys_dir, keys_nif } = split_keys(node);
    document.getElementById("list_dirs").innerHTML = keys_dir.map((x) => `<a href="#">${x}</a>`).join("<br>");
    document.getElementById("list_nifs").innerHTML = keys_nif.map((x) => `<a href="#">${x}</a>`).join("<br>");
}

update_node(DATA_STATICS_META["data"]);
