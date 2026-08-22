/**
 * @typedef {Map<string, [string, string] | SKNode>} SKNode
 */

/* -------------------------------------------------------------------------- */
/**
 * @param {SKNode} node
 * @returns {{ keys_dir: string[], keys_nif: string[] }}
 */
function split_keys(node) {
    const keys_all = Object.keys(node);
    const mask_is_dir = keys_all.map((x) => x.at(-1) == '/');
    var keys_dir = keys_all.filter((x, i) =>  mask_is_dir.at(i) && x != KEY_COUNT_LEAVES);
    var keys_nif = keys_all.filter((x, i) => !mask_is_dir.at(i) && x != KEY_COUNT_LEAVES);
    keys_dir.sort();
    keys_nif.sort();
    CURRENT_NAME_NIF = keys_nif.length ? keys_nif[0] : "";
    return { keys_dir, keys_nif };
}


/* -------------------------------------------------------------------------- */
function update_dirs_prev() {
    NODE_TRAVERSAL_PATH.pop();

    CURRENT_NODE = DATA_STATICS_META;
    NODE_TRAVERSAL_PATH.forEach((x) => {
        CURRENT_NODE = CURRENT_NODE[x];
    });

    update_display();
}


/* -------------------------------------------------------------------------- */
/**
 * @param {string} name_dir
 */
function update_dirs_next(name_dir) {
    var node = CURRENT_NODE[name_dir];
    if (!node) return;

    CURRENT_NODE = node;
    NODE_TRAVERSAL_PATH.push(name_dir);

    update_display();
}


/* -------------------------------------------------------------------------- */
/**
 * @param {string} name_dir
 * @param {boolean} go_back
 */
function get_html_dir(name_dir, go_back = false) {
    var str_callback = go_back ?
        `update_dirs_prev()`:
        `update_dirs_next('${name_dir}')`;
    var func = DO_VIEW_DETAILED ? _html_dir_view_detailed : _html_dir_view_list;
    return func(name_dir, str_callback);
}


/* -------------------------------------------------------------------------- */
/**
 * @param {string} name_nif
 */
function get_html_nif(name_nif) {
    var leaf = CURRENT_NODE[name_nif];
    var editor_name = leaf[0];
    var base_form = leaf[1];
    var func = DO_VIEW_DETAILED ? _html_nif_view_detailed : _html_nif_view_list;
    return func(name_nif, editor_name, base_form);
}


/* -------------------------------------------------------------------------- */
function update_display() {
    function _update(key, new_val) {
        document.getElementById(key).innerHTML = new_val;
    }

    var text_path = `
        <div class="text_path_item">
            <code>${NODE_TRAVERSAL_PATH.join("")}</code>
        </div>
    `;

    const { keys_dir, keys_nif } = split_keys(CURRENT_NODE);
    var array_dirs = !NODE_TRAVERSAL_PATH.length? [] : [
        get_html_dir("../", go_back = true)
    ]
    array_dirs = array_dirs.concat(
        keys_dir.map((x) => get_html_dir(x, go_back = false))
    );

    _update("text_path", text_path);
    _update("list_dirs", array_dirs.join(""));
    _update("list_nifs", keys_nif.map(get_html_nif).join(""));
    _update("detailed_view", DO_VIEW_DETAILED ? _html_detailed_view() : "");
}


/* -------------------------------------------------------------------------- */
/**
 * @param {boolean} do_detailed
 */
function enable_view_detailed(do_detailed) {
    DO_VIEW_DETAILED = do_detailed;
    CURRENT_ORIENTATION = "t";
    update_display();
}


/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
////// traversal globals
var CURRENT_NODE = DATA_STATICS_META;
var NODE_TRAVERSAL_PATH = [];

////// detailed view globals
var DO_VIEW_DETAILED = false;
var CURRENT_ORIENTATION = "t"; // t: top, f: front, l: left
var CURRENT_NAME_NIF = "";

update_dirs_next("data/");


/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
