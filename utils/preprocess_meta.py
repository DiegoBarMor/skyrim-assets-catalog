import sys
import json
import pandas as pd
from pathlib import Path

# ------------------------------------------------------------------------------
def preprocess_df(df: pd.DataFrame) -> pd.DataFrame:
    df = df.dropna()
    df = df.drop_duplicates("name_nif")

    df["directories"] = df["pseudo_path"]\
        .apply(lambda p: str(Path(p).parent))

    df = df.drop(columns = ["path_texture", "pseudo_path"])
    df = df.sort_values(by = ["directories"])
    return df


# ------------------------------------------------------------------------------
def init_dir_tree(unique_dirs: list[str]) -> dict[str, dict]:
    tree: dict[str, dict] = {}
    for d in unique_dirs:
        if d == '.': continue # skip root
        parts = d.split('/')
        current = tree
        for part in parts:
            key = part + '/'
            if key not in current:
                current[key] = {}
            current = current[key]

    return tree


# ------------------------------------------------------------------------------
def populate_dir_tree(tree: dict[str, dict], data: list[list[str]]) -> None:
    def get_inner_dict(path: str) -> dict[str, dict]:
        if path == '.': return tree
        parts = path.split('/')
        current = tree
        for part in parts: current = current[part+'/']
        return current

    for entry in data:
        ### ASSUME HARDCODED COLUMNS
        editor_name, base_form, name_nif, directories = entry
        node = get_inner_dict(directories)
        if name_nif in node:
            raise ValueError(f"Duplicate entry for '{name_nif}' in '{directories}'")

        node[name_nif] = [editor_name, base_form]


# ------------------------------------------------------------------------------
def extract_tree(df: pd.DataFrame) -> dict[str, list|dict]:
    json_flat = json.loads(df.to_json(orient = "split", index = False))
    tree = init_dir_tree(df["directories"].unique())
    populate_dir_tree(tree, json_flat["data"])
    return {
        "columns" : ["editor_name", "base_form"], # ASSUME HARDCODED COLUMNS
        "data": tree
    }


# ------------------------------------------------------------------------------
def main():
    data = extract_tree(
        preprocess_df(pd.read_csv(PATH_CSV))
    )
    PATH_JSON.write_text(json.dumps(data))


################################################################################
if __name__ == "__main__":
    PATH_CSV  = Path(sys.argv[1])
    PATH_JSON = Path(sys.argv[2])
    main()


################################################################################
# python3 utils/preprocess_meta.py data/statics.meta.csv data/statics.meta.json
