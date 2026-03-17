import { fetchCFBD } from "./client";

export async function getRatingInfo(ratingType: string) {
  let year = new Date().getFullYear();
  if (ratingType === "SP+") {
    let ratings = await fetchCFBD(`/ratings/sp?year=${year}`);

    // If no events found, default to last year
    if (!ratings.length) {
      year -= 1;
      ratings = await fetchCFBD(`/ratings/sp?year=${year}`);
    }

    return ratings;
  }
}