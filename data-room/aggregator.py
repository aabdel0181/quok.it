import pandas as pd
import os

def build_akash_isolated(df_akash):
    if "date" in df_akash.columns:
        df_akash["date"] = pd.to_datetime(df_akash["date"], utc=True).dt.tz_localize(None)
    rename_map = {
        "active_gpu_capacity": "capacity_gpu",
        "available_gpu": "available_gpu",
        "active_leases": "leases",
        "daily_earnings_usd": "daily_earnings",
        "protocol_earnings_usd": "protocol_earnings",
    }
    df_iso = df_akash.rename(columns=rename_map).copy()
    if "capacity_gpu" in df_iso.columns and "available_gpu" in df_iso.columns:
        df_iso["utilization_gpu"] = (df_iso["capacity_gpu"] / df_iso["available_gpu"]).replace([float("inf"), float("nan")], 0)
    df_iso["provider"] = "Akash"
    desired_cols = [
        "date",
        "provider",
        "capacity_gpu",
        "available_gpu",
        "utilization_gpu",
        "leases",
        "daily_earnings",
        "protocol_earnings",
    ]
    final_cols = [c for c in desired_cols if c in df_iso.columns]
    return df_iso[final_cols]


def build_aethir_isolated(daily_revenue_df, supply_dfs):
    daily_revenue_df["date"] = pd.to_datetime(daily_revenue_df["date"], utc=True).dt.tz_localize(None)
    daily_renamed = daily_revenue_df.rename(
        columns={
            "revenue": "daily_earnings",
            "usdValue": "protocol_earnings",
        }
    ).copy()

    gpu_info_df = supply_dfs.get("gpu_info", pd.DataFrame())
    capacity_gpu = gpu_info_df["gpuCards"].sum() if "gpuCards" in gpu_info_df.columns else 0

    # Instead of using only the latest date, we keep the full daily time-series.
    if not daily_renamed.empty:
        latest_date = daily_renamed["date"].max()
        daily_latest = daily_renamed[daily_renamed["date"] == latest_date].copy()
    else:
        daily_latest = pd.DataFrame([{"date": pd.NaT}])

    daily_latest["capacity_gpu"] = capacity_gpu
    daily_latest["available_gpu"] = float("nan")
    daily_latest["utilization_gpu"] = (daily_latest["capacity_gpu"] / daily_latest["available_gpu"]) if ("capacity_gpu" in daily_latest.columns) else 0
    daily_latest["utilization_gpu"] = daily_latest["utilization_gpu"].replace([float("inf"), float("nan")], 0)
    daily_latest["leases"] = float("nan")
    daily_latest["provider"] = "Aethir"

    desired_cols = [
        "date",
        "provider",
        "capacity_gpu",
        "available_gpu",
        "utilization_gpu",
        "leases",
        "daily_earnings",
        "protocol_earnings",
    ]
    final_cols = [c for c in desired_cols if c in daily_latest.columns]
    df_iso = daily_latest[final_cols]
    return df_iso


def build_aggregated_isolated(
    akash_csv_path,
    aethir_revenue_csv_path,
    aethir_gpu_info_csv_path,
    aethir_total_computed_hours_csv_path,
    aethir_gpu_locations_csv_path,
    aethir_rewards_distributed_csv_path,
):
    akash_df = pd.read_csv(akash_csv_path)
    aggregator_isolated_akash = build_akash_isolated(akash_df)

    daily_revenue_df = pd.read_csv(aethir_revenue_csv_path)
    supply_dfs = {
        "gpu_info": pd.read_csv(aethir_gpu_info_csv_path),
        "total_computed_hours": pd.read_csv(aethir_total_computed_hours_csv_path),
        "locations": pd.read_csv(aethir_gpu_locations_csv_path),
        "rewards_distributed": pd.read_csv(aethir_rewards_distributed_csv_path),
    }
    aggregator_isolated_aethir = build_aethir_isolated(daily_revenue_df, supply_dfs)

    return aggregator_isolated_akash, aggregator_isolated_aethir


def build_aggregated_soc(aggregator_isolated_akash, aggregator_isolated_aethir):
    combined = pd.concat([aggregator_isolated_akash, aggregator_isolated_aethir], ignore_index=True)

    # Summation approach for a single "All" row:
    global_row = combined.loc[combined["date"] == combined["date"].max()].copy()
    numeric_cols = ["capacity_gpu", "available_gpu", "utilization_gpu", "leases", "daily_earnings", "protocol_earnings"]
    for col in numeric_cols:
        if col in global_row.columns:
            global_row[col] = combined[col].sum(skipna=True)
    global_row["provider"] = "All"

    aggregator_soc = pd.concat([combined, global_row], ignore_index=True)
    return aggregator_soc


# --------------  HELPER FOR APPENDING --------------
def append_to_csv(new_df, path, subset_for_dupes=None):
    """
    Appends 'new_df' rows to an existing CSV at 'path'.
    If 'path' doesn't exist, we just write the new_df as is.
    If 'subset_for_dupes' is given (e.g. ['date','provider']), we drop duplicates on those columns, 
    keeping the last occurrence.
    """
    if os.path.exists(path):
        old_df = pd.read_csv(path)
        combined_df = pd.concat([old_df, new_df], ignore_index=True)
    else:
        combined_df = new_df.copy()
    
    if subset_for_dupes:
        combined_df.drop_duplicates(subset=subset_for_dupes, keep="last", inplace=True)
    
    combined_df.to_csv(path, index=False)
    return combined_df
# -------------------------------------------------------


def main():
    data_dir = "data"

    akash_csv = os.path.join(data_dir, "akash.csv")
    aethir_revenue_csv = os.path.join(data_dir, "aethir_historical_revenue.csv")
    aethir_gpu_info_csv = os.path.join(data_dir, "aethir_gpu_info.csv")
    aethir_total_computed_hours_csv = os.path.join(data_dir, "aethir_total_computed_hours.csv")
    aethir_gpu_locations_csv = os.path.join(data_dir, "aethir_gpu_locations.csv")
    aethir_rewards_distributed_csv = os.path.join(data_dir, "aethir_rewards_distributed.csv")

    aggregator_isolated_akash, aggregator_isolated_aethir = build_aggregated_isolated(
        akash_csv,
        aethir_revenue_csv,
        aethir_gpu_info_csv,
        aethir_total_computed_hours_csv,
        aethir_gpu_locations_csv,
        aethir_rewards_distributed_csv,
    )

    aggregator_soc_df = build_aggregated_soc(aggregator_isolated_akash, aggregator_isolated_aethir)

    # Instead of overwriting, we APPEND to aggregator_isolated_akash.csv, aggregator_isolated_aethir.csv, aggregator_soc.csv
    # and we specify subset_for_dupes so that if the same (date,provider) row appears multiple times, we only keep the last.

    aggregated_akash_path = os.path.join(data_dir, "aggregator_isolated_akash.csv")
    aggregator_isolated_akash_all = append_to_csv(
        aggregator_isolated_akash, 
        aggregated_akash_path, 
        subset_for_dupes=["date","provider"]
    )

    aggregated_aethir_path = os.path.join(data_dir, "aggregator_isolated_aethir.csv")
    aggregator_isolated_aethir_all = append_to_csv(
        aggregator_isolated_aethir,
        aggregated_aethir_path,
        subset_for_dupes=["date","provider"]
    )

    aggregator_soc_path = os.path.join(data_dir, "aggregator_soc.csv")
    aggregator_soc_all = append_to_csv(
        aggregator_soc_df,
        aggregator_soc_path,
        subset_for_dupes=["date","provider"]
    )

    print("Aggregator completed.")
    print(" - aggregator_isolated_akash.csv appended.")
    print(" - aggregator_isolated_aethir.csv appended.")
    print(" - aggregator_soc.csv appended.")


if __name__ == "__main__":
    main()
