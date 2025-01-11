from fastapi import FastAPI, Response
import pandas as pd
import os
import math
app = FastAPI()

DATA_DIR = os.path.join(os.path.dirname(__file__),"..", "data")

def replace_nan_with_zero(value):
    if isinstance(value, float) and math.isnan(value):
        return 0.0
    return value

@app.get("/fetch_soc")
def fetch_soc():
    """
    Returns the aggregator_soc data (across all networks),
    and optionally the isolated aggregator if we want it in one payload.
    """

    # aggregator_soc.csv
    soc_csv_path = os.path.join(DATA_DIR, "aggregator_soc.csv")

    if not os.path.exists(soc_csv_path):
        return {"error": "No aggregator_soc.csv found. Run aggregator first."}

    # Load it into a DataFrame
    soc_df = pd.read_csv(soc_csv_path)

    # Convert to JSON
    # soc_json = soc_df.to_dict(orient="records")

    # # If you also want to fetch the isolated aggregator data:
    # akash_csv = os.path.join(DATA_DIR, "aggregator_isolated_akash.csv")
    # aethir_csv = os.path.join(DATA_DIR, "aggregator_isolated_aethir.csv")

    # akash_data = []
    # aethir_data = []
    # if os.path.exists(akash_csv):
    #     akash_data = pd.read_csv(akash_csv).to_dict(orient="records")
    # if os.path.exists(aethir_csv):
    #     aethir_data = pd.read_csv(aethir_csv).to_dict(orient="records")

    # return {
    #     "soc": soc_json,
    #     "akash": akash_data,
    #     "aethir": aethir_data
    # }
    records = soc_df.to_dict(orient="records")
    # Replace any NaNs
    cleaned_records = []
    for row in records:
        cleaned_row = {k: replace_nan_with_zero(v) for k, v in row.items()}
        cleaned_records.append(cleaned_row)
    return {"soc": cleaned_records}

@app.get("/fetch_akash")
def fetch_akash():
    """
    Returns the aggregator_isolated_akash data
    """
    akash_csv = os.path.join(DATA_DIR, "aggregator_isolated_akash.csv")
    if not os.path.exists(akash_csv):
        return {"error": "No aggregator_isolated_akash.csv found."}

    akash_df = pd.read_csv(akash_csv)
    # convert to a list of records 
    records = akash_df.to_dict(orient="records")
    # Replace any NaNs
    cleaned_records = []
    for row in records:
        cleaned_row = {k: replace_nan_with_zero(v) for k, v in row.items()}
        cleaned_records.append(cleaned_row)
    
    return {"akash": cleaned_records}

@app.get("/fetch_aethir")
def fetch_aethir():
    """
    Returns the aggregator_isolated_aethir data
    """
    # print("Looking for aggregator at:", os.path.abspath(DATA_DIR))

    aethir_csv = os.path.join(DATA_DIR, "aggregator_isolated_aethir.csv")
    if not os.path.exists(aethir_csv):
        return {"error": "No aggregator_isolated_aethir.csv found."}

    aethir_df = pd.read_csv(aethir_csv)
    # Convert to a list of records
    records = aethir_df.to_dict(orient="records")

    # Replace any NaNs
    cleaned_records = []
    for row in records:
        cleaned_row = {k: replace_nan_with_zero(v) for k, v in row.items()}
        cleaned_records.append(cleaned_row)
    
    return {"aethir": cleaned_records}
