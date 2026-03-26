import { fetchCFBD } from "./client";

export async function getMetricsInfoFB(metricType: string, team: string) {
  let year = new Date().getFullYear();

  if (metricType === "wp/pregame") {
    let metrics = await fetchCFBD(`/metrics/wp/pregame?year=${year}&team=${encodeURIComponent(team)}`);

    // If no data found, default to last year
    if (!metrics.length) {
      year -= 1;
      metrics = await fetchCFBD(`/metrics/wp/pregame?year=${year}&team=${encodeURIComponent(team)}`);
    }

    return metrics;
  }
}