/* -------------------------------------------------------------------------- */
/**
 * @param {string} name_dir
 * @param {string} str_callback
 */
function _html_dir_view_list(name_dir, str_callback) {
    var count_leaves = "";
    if (name_dir != "../") {
        var n_leaves = CURRENT_NODE[name_dir][KEY_COUNT_LEAVES] || 0;
        count_leaves = ` (${n_leaves} NIFs)`;
    }
    return `
    <div class="dir_item">
        <a href="#" onclick="${str_callback}">
            <b class="neon-accent">${name_dir}</b>${count_leaves}
        </a>
    </div>
    `
}


/* -------------------------------------------------------------------------- */
/**
 * @param {string} name_nif
 * @param {string} editor_name
 * @param {string} base_form
 */
function _html_nif_view_list(name_nif, editor_name, base_form) {
    var url = URLS_THUMBNAILS[name_nif] || URL_MISSING_THUMBNAIL;
    return `
    <div class="nif_item">
        <div class="nif_item_text">
            <b>${editor_name}</b>
            <span>${base_form}</span>
            <span>${name_nif}.nif</span>
        </div>
        <img src="${url}" alt="${name_nif}">
    </div>
    `
}


/* -------------------------------------------------------------------------- */
