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

function _html_detailed_view() {
    function _button(orientation, label) {
        // "return false" to prevent navigation to top of page
        return `
        <a class="button" href="#"
            onclick="enable_view_detailed(true, '${orientation}'); return false;"
        >${label}</a>
        `
    }

    var url = URL_MISSING_SCREENSHOT;
    return `
    <aside class="floating-preview" aria-label="Floating preview image">
        <img src="${url}" alt="Screenshot placeholder">
        <div class="detailed_view_buttons">
            ${_button('t', 'Top')}
            ${_button('f', 'Front')}
            ${_button('l', 'Left')}
            <span class="detailed_view_debug">DEBUG: ${ORIENTATION_DETAILED}</span>
        </div>
    </aside>
    `
}
