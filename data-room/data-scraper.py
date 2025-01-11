import requests
import numpy as np
import pandas as pd
import os 

# File for scraping and storing Akash and Aethir data
def fetch_akash():
    akash_api_url = "https://api.cloudmos.io/v1/dashboard-data"
    try:
        response = requests.get(akash_api_url, timeout=10)
        response.raise_for_status()
        data = response.json()

        now_stats = data.get("now", {})
        network_stats = data.get("networkCapacity", {})
        chain_stats = data.get("chainStats", {})

        parsed_data = {
            "date": now_stats.get("date"),
            "active_gpu_capacity": now_stats.get("activeGPU"),
            "available_gpu": network_stats.get("availableGPU"),
            "active_leases": now_stats.get("activeLeaseCount"),
            "staked_compute_providers": chain_stats.get("bondedTokens"),
            "daily_earnings_usd": now_stats.get("dailyUUsdSpent"),
            "protocol_earnings_usd": now_stats.get("totalUUsdSpent"),
            "active_provider_count": network_stats.get("activeProviderCount")
        }

        df = pd.DataFrame([parsed_data])
        print("Akash cleaned")
        print(df.head())
        return df

    except (requests.RequestException, ValueError) as e:
        print(f"Error fetching Akash data: {e}")
        return pd.DataFrame()
    
def fetch_aethir_gpu_info():
    """
    Fetch GPU info from Aethir's gpu-info-list endpoint.
    Returns a DataFrame with columns like gpu, specName, tflops, gpuCards, etc.
    """
    url = "https://aethir-server-stagging.up.railway.app/protocol/gpu-info-list"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        # Raw JSON
        data = response.json()
        # print("=== [GPU INFO] Raw JSON ===")
        # print(data)

        # Convert to DataFrame
        df = pd.DataFrame(data)
        print("=== [GPU INFO] DataFrame ===")
        print(df.head())
        # print(f"Shape: {df.shape}")

        # Sum the gpuCards column
        total_gpu_count = df["gpuCards"].sum()
        df["totalGPUCount"] = total_gpu_count
        
        return df
    
    except (requests.RequestException, ValueError) as e:
        print(f"Error fetching Aethir GPU info: {e}")
        # Return an empty DF on error
        return pd.DataFrame()

def fetch_aethir_total_computed_hours():
    """
    Fetch total computed hours from Aethir.
    The structure might be different, so parse accordingly.
    """
    url = "https://aethir-server-stagging.up.railway.app/protocol/total-computed-hours"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        # Raw JSON
        data = response.json()
        # print("=== [TOTAL COMPUTED HOURS] Raw JSON ===")
        # print(data)

        # Some endpoints might return a single dict. Wrap it in a list for DF creation.
        df = pd.DataFrame([data])
        print("=== [TOTAL COMPUTED HOURS] DataFrame ===")
        print(df.head())
        # print(f"Shape: {df.shape}")

        return df
    
    except (requests.RequestException, ValueError) as e:
        print(f"Error fetching total computed hours: {e}")
        return pd.DataFrame()

def fetch_aethir_gpu_locations():
    """
    Fetch GPU locations (country-device info).
    Returns a DataFrame with whatever fields the endpoint provides.
    """
    url = "https://aethir-server-stagging.up.railway.app/protocol/country-device"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        # Raw JSON
        data = response.json()
        # print("=== [GPU LOCATIONS] Raw JSON ===")
        # print(data)

        df = pd.DataFrame(data)
        print("=== [GPU LOCATIONS] DataFrame ===")
        print(df.head())
        # print(f"Shape: {df.shape}")

        return df
    
    except (requests.RequestException, ValueError) as e:
        print(f"Error fetching Aethir GPU locations: {e}")
        return pd.DataFrame()

def fetch_aethir_rewards_distributed():
    """
    Fetch reward distribution from Aethir.
    """
    url = "https://aethir-server-stagging.up.railway.app/protocol/rewards-distributed-in-idc"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        # Raw JSON
        data = response.json()
        # print("=== [REWARDS DISTRIBUTED] Raw JSON ===")
        # print(data)

        if isinstance(data, dict):
            df = pd.DataFrame([data])
        else:
            df = pd.DataFrame(data)
        print("=== [REWARDS DISTRIBUTED] DataFrame ===")
        print(df.head())
        print(f"Shape: {df.shape}")

        return df
    
    except (requests.RequestException, ValueError) as e:
        print(f"Error fetching Aethir rewards: {e}")
        return pd.DataFrame()

def fetch_supply_aethir():
    dfs = {}
    dfs["gpu_info"] = fetch_aethir_gpu_info()
    dfs["total_computed_hours"] = fetch_aethir_total_computed_hours()
    dfs["locations"] = fetch_aethir_gpu_locations()
    dfs["rewards_distributed"] = fetch_aethir_rewards_distributed()
    return dfs

def fetch_historical_revenue():
    """
    Fetch historical revenue from Aethir, then extract and store only the daily portion.
    """
    url = "https://aethir-server-stagging.up.railway.app/protocol/demand-metrics/historical-network-revenue"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()

        # Raw JSON
        data = response.json()
        # print("=== [HISTORICAL REVENUE] Raw JSON ===")
        # print(data)

        # create a DataFrame out of the 'dailyRevenue' list of dicts.
        daily_data = data.get("dailyRevenue", [])
        daily_df = pd.DataFrame(daily_data)

        # Debug prints
        print("=== [HISTORICAL REVENUE] Daily DF ===")
        print(f"Daily Shape: {daily_df.shape}")

        # You might want to ensure 'date' is recognized as a datetime
        if 'date' in daily_df.columns:
            daily_df['date'] = pd.to_datetime(daily_df['date'])
        daily_df.sort_values(by="date", ascending=False, inplace=True)
        print(daily_df.head())

        # Return just the daily DataFrame
        return daily_df

    except (requests.RequestException, ValueError) as e:
        print(f"Error fetching Aethir historical revenue: {e}")
        return pd.DataFrame()  # Empty DF on error

def fetch_compute_purchases():
    """
    Fetch compute purchases from Aethir.
    """
    url = "https://aethir-server-stagging.up.railway.app/protocol/demand-metrics/v2/compute-purchases"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        # Raw JSON
        data = response.json()
        print("=== [COMPUTE PURCHASES] Raw JSON ===")
        print(data)

        # Convert to DataFrame
        if isinstance(data, dict):
            df = pd.DataFrame([data])
        else:
            df = pd.DataFrame(data)

        print("=== [COMPUTE PURCHASES] DataFrame ===")
        print(df.head())
        print(f"Shape: {df.shape}")

        return df
    
    except (requests.RequestException, ValueError) as e:
        print(f"Error fetching Aethir compute purchases: {e}")
        return pd.DataFrame()

def fetch_compute_hours_delivered():
    """
    Fetch compute hours delivered from Aethir.
    """
    url = "https://aethir-server-stagging.up.railway.app/protocol/demand-metrics/weekly-compute-hours"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        # Raw JSON
        data = response.json()
        # print("=== [WEEKLY COMPUTE HOURS] Raw JSON ===")
        # print(data)

        # Convert to DataFrame
        if isinstance(data, dict):
            df = pd.DataFrame([data])
        else:
            df = pd.DataFrame(data)

        print("=== [WEEKLY COMPUTE HOURS] DataFrame ===")
        print(df.head())
        print(f"Shape: {df.shape}")

        return df
    
    except (requests.RequestException, ValueError) as e:
        print(f"Error fetching Aethir compute hours: {e}")
        return pd.DataFrame()

def fetch_demand_aethir():
    dfs = {}
    dfs["historical_revenue"] = fetch_historical_revenue()
    dfs["total_compute_purchases"] = fetch_compute_purchases()
    dfs["weekly_compute_hours"] = fetch_compute_hours_delivered()
    return dfs

def fetch_aethir():
    try:
        Supply_GPU_df = fetch_supply_aethir()
        Demand_GPU_df = fetch_demand_aethir()
        return Supply_GPU_df, Demand_GPU_df
    except (requests.RequestException, ValueError) as e:
        print(f"Error fetching Aethir data: {e}")
        return {}, {}
    
def main():
    #  create a 'data' subfolder if you want
    os.makedirs("data", exist_ok=True)

    # 1. Fetch & Store Akash
    akash_df = fetch_akash()
    akash_csv_path = os.path.join("data", "akash.csv")
    akash_df.to_csv(akash_csv_path, index=False)

    # 2. Fetch & Store Aethir Supply & Demand
    supply_dict, demand_dict = fetch_aethir()

    # -- Supply data
    supply_dict["gpu_info"].to_csv(os.path.join("data", "aethir_gpu_info.csv"), index=False)
    supply_dict["total_computed_hours"].to_csv(os.path.join("data", "aethir_total_computed_hours.csv"), index=False)
    supply_dict["locations"].to_csv(os.path.join("data", "aethir_gpu_locations.csv"), index=False)
    supply_dict["rewards_distributed"].to_csv(os.path.join("data", "aethir_rewards_distributed.csv"), index=False)

    # -- Demand data
    demand_dict["historical_revenue"].to_csv(os.path.join("data", "aethir_historical_revenue.csv"), index=False)
    demand_dict["total_compute_purchases"].to_csv(os.path.join("data", "aethir_compute_purchases.csv"), index=False)
    demand_dict["weekly_compute_hours"].to_csv(os.path.join("data", "aethir_weekly_compute_hours.csv"), index=False)

    print("Data fetching and CSV storage complete!")

if __name__ == "__main__":
    main()