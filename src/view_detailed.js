/* -------------------------------------------------------------------------- */
/**
 * @param {string} name_dir
 * @param {string} str_callback
 */
function _html_dir_view_detailed(name_dir, str_callback) {
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
function _html_nif_view_detailed(name_nif, editor_name, base_form) {
    return `
    <div class="nif_item">
        <div class="nif_item_text">
            <a href="#"
                onclick="_select_nif('${name_nif}', '${CURRENT_ORIENTATION}'); return false;"
            ><b>${editor_name}</b></a>
            <span>${base_form}</span>
            <span>${name_nif}.nif</span>
        </div>
    </div>
    `
}


/* -------------------------------------------------------------------------- */
function _html_detailed_view() {
    function _button(orientation, label) {
        // "return false" to prevent navigation to top of page
        return `
        <a class="button" href="#"
            onclick="_select_nif('${CURRENT_NAME_NIF}', '${orientation}'); return false;"
        >${label}</a>
        `
    }
    var str_detailed = "";
    var url = URL_EMPTY_SCREENSHOT;
    var name_ss = `${CURRENT_NAME_NIF}.${CURRENT_ORIENTATION}`;

    var leaf = CURRENT_NODE[CURRENT_NAME_NIF];
    if (leaf) {
        var editor_name = leaf[0];
        var base_form = leaf[1];
        str_detailed = `${editor_name} (${base_form})`;
        url = URLS_OUTPUT_NIFSKOPE[name_ss] || URL_MISSING_SCREENSHOT;
    }

    return `
    <aside class="floating-preview" aria-label="Floating preview image">
        <a href="${url}" target="_blank" rel="noopener noreferrer">
            <img src="${url}" alt="${CURRENT_NAME_NIF}">
        </a>
        <div class="detailed_view_buttons">
            ${_button('t', 'Top')}
            ${_button('f', 'Front')}
            ${_button('l', 'Left')}
            <span class="detailed_view_text">${str_detailed}</span>
        </div>
    </aside>
    `
}


/* -------------------------------------------------------------------------- */
/**
 * @param {string} name_nif
 * @param {string} orientation
 */
function _select_nif(name_nif, orientation) {
    CURRENT_NAME_NIF = name_nif;
    CURRENT_ORIENTATION = orientation;
    document.getElementById("detailed_view").innerHTML = _html_detailed_view()
}


/* -------------------------------------------------------------------------- */
