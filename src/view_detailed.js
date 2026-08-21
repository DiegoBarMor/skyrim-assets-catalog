/**
 * @param {string} name_dir
 * @param {string} str_callback
 */
function _html_dir_view_detailed(name_dir, str_callback) {
    return `
    <div class="dir_item">
        <a href="#">
            <b class="neon-accent" onclick="${str_callback}">${name_dir}</b>
        </a>
    </div>
    `
}

/**
 * @param {string} name_nif
 * @param {string} editor_name
 * @param {string} base_form
 */
function _html_nif_view_detailed(name_nif, editor_name, base_form) {
    return `
    <div class="nif_item">
        <div class="nif_item_text">
            <b>${editor_name}</b>
            <span>${base_form}</span>
            <span>${name_nif}.nif</span>
        </div>
    </div>
    `
}
