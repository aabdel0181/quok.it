# State of Compute - README

This repository provides an API that exposes **aggregated** and **isolated** metrics for multiple compute providers (e.g., **Akash**, **Aethir**).  
It includes:

1. **Endpoints** to fetch aggregated (“state of compute”) and isolated provider data.  
2. A **networking** setup (with **Nginx** as a reverse proxy) serving the API over **HTTPS**.

---

## Table of Contents

- [Endpoints](#endpoints)
  - [1. `GET /fetch_soc`](#1-get-fetch_soc)
  - [2. `GET /fetch_akash`](#2-get-fetch_akash)
  - [3. `GET /fetch_aethir`](#3-get-fetch_aethir)
- [Networking Setup](#networking-setup)
  - [Overview](#overview)
  - [HTTPS and Certificates](#https-and-certificates)
  - [Nginx Reverse Proxy](#nginx-reverse-proxy)

---

## Endpoints

Below are the primary REST endpoints exposed by this API.  
They serve **JSON** responses with various compute metrics, pulled from aggregator CSV files stored on the server.

### 1. `GET /fetch_soc`

- **Description**:  
  Returns the **state of compute** (SoC) aggregator, which sums or merges data across all providers.  
  It may also include the isolated aggregator metrics for Akash and Aethir if desired.

### 2. `GET /fetch_akash`

- **Description**:  
    Returns the isolated aggregator for Akash only.

### 2. `GET /fetch_aethir`

- **Description**:  
    Returns the isolated aggregator for Aethir only.

## Networking 

This API is served over HTTPS on port 443, with a reverse proxy (Nginx) listening on our Linux server’s public IP. The requests flow like this:

(Client) -> Internet -> [ Nginx :443 ] -> [ Uvicorn w/ FastAPI on 127.0.0.1:8000 ] -> Aggregator CSV data
