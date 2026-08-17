import sys
import pandas as pd
from pathlib import Path

# ------------------------------------------------------------------------------
def preprocess(df: pd.DataFrame) -> pd.DataFrame:
    df = df.dropna()
    df["parent"] = df["pseudo_path"].apply(lambda p: str(Path(p).parent))
    df["depth"] = df["pseudo_path"].str.count("/")
    df = df.drop(columns = ["path_texture", "pseudo_path"])
    df = df.sort_values(by = ["parent"])
    return df

# ------------------------------------------------------------------------------
def main():
    df = preprocess(pd.read_csv(PATH_CSV))
    df.to_json(PATH_JSON, orient = "split", index = False)


################################################################################
if __name__ == "__main__":
    PATH_CSV  = Path(sys.argv[1])
    PATH_JSON = Path(sys.argv[2])
    main()


################################################################################
# python3 utils/csv2json.py data/statics.meta.csv data/statics.meta.json
