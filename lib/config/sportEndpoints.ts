// Centralized config for sports and their corresponding ESPN API paths
// showonHomepage indicates what games are shown on the "Today's Games" section of the homepage

export const SPORTS = {
  football: {
    path: "football/college-football",
    label: "Football",
    showOnHomepage: true,
  },
  mensBasketball: {
    path: "basketball/mens-college-basketball",
    label: "Men's Basketball",
    showOnHomepage: true,
  },
  womensBasketball: {
    path: "basketball/womens-college-basketball",
    label: "Women's Basketball",
    showOnHomepage: true,
  },
  baseball: {
    path: "baseball/college-baseball",
    label: "Baseball",
    showOnHomepage: false,
  },
};