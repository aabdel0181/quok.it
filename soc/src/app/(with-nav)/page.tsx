import { Suspense } from "react";
import HomeView from "../components/HomeView";
// import { fetchGPUMetrics } from "./lib/db";

export default async function Home() {
  // const { socData, akashData, aethirData } = await fetchGPUMetrics();

  // You can choose which data to pass to HomeView
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeView />
    </Suspense>
  );
}
