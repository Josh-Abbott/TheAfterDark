// Centralized config for teams existing in the Pac-12, along with the sports they have (for now just fb/bb/baseball but will add more)

export const PAC_TEAMS = [
  {
    name: "Washington State",
    mascot: "Cougars",
    city: "Pullman",
    state: "WA",

    stadium: {
      name: "Martin Stadium",
      capacity: 32952
    },

    arema: {
      name: "Beasley Coliseum",
      capacity: 12058
    },

    rivalries: {
      football: "Washington",
      basketball: "Washington",
    },

    sports: [
      { name: "Football", id: 265, founded: 1894 },
      { name: "Men's Basketball", id: 265, founded: 1901 },
      //{ name: "Baseball", id: 134, founded: 1892 },
    ],
  },
  {
    name: "Oregon State",
    mascot: "Beavers",
    city: "Corvallis",
    state: "OR",

    stadium: {
      name: "Reser Stadium",
      capacity: 35548
    },

    arema: {
      name: "Gill Coliseum",
      capacity: 9604
    },

    rivalries: {
      football: "Oregon",
      basketball: "Oregon",
    },

    sports: [
      { name: "Football", id: 204, founded: 1894 },
      { name: "Men's Basketball", id: 204, founded: 1901 },
      //{ name: "Baseball", id: 113, founded: 1907 },
    ],
  },
  {
    name: "Boise State",
    mascot: "Broncos",
    city: "Boise",
    state: "ID",

    stadium: {
      name: "Albertsons Stadium",
      capacity: 36363
    },

    arema: {
      name: "ExtraMile Arena",
      capacity: 12644
    },

    rivalries: {
      football: "Fresno State",
      basketball: "Fresno State", // ?
    },

    sports: [
      { name: "Football", id: 68, founded: 1933 },
      { name: "Men's Basketball", id: 68, founded: 1933 },
    ],
  },
  {
    name: "Colorado State",
    mascot: "Ramns",
    city: "Fort Collins",
    state: "CO",

    stadium: {
      name: "Canvas Stadium",
      capacity: 36500
    },

    arema: {
      name: "Wolstein Center",
      capacity: 13610
    },

    rivalries: {
      football: "Wyoming",
      basketball: "Wyoming", // ?
    },

    sports: [
      { name: "Football", id: 36, founded: 1892 },
      { name: "Men's Basketball", id: 36, founded: 1901 },
    ],
  },
  {
    name: "Fresno State",
    mascot: "Bulldogs",
    city: "Fresno",
    state: "CA",

    stadium: {
      name: "Valley Children's Stadium",
      capacity: 40727
    },

    arema: {
      name: "Save Mart Center",
      capacity: 18000
    },

    rivalries: {
      football: "Boise State",
      basketball: "Boise State", // ?
    },

    sports: [
      { name: "Football", id: 278, founded: 1921 },
      { name: "Men's Basketball", id: 278, founded: 1921 },
      //{ name: "Baseball", id: 137, founded: 1922 },
    ],
  },
  {
    name: "Gonzaga",
    mascot: "Cougars",
    city: "Pullman",
    state: "WA",

    arema: {
      name: "McCarthey Athletic Center",
      capacity: 6000
    },

    rivalries: {
      basketball: "Saint Mary's", // check spelling later
    },

    sports: [
      { name: "Men's Basketball", id: 2250, founded: 1907 },
      { name: "Women's Basketball", id: 2250, founded: 1961 },
      //{ name: "Baseball", id: 287, founded: 1890 },
    ],
  },
  {
    name: "San Diego State",
    mascot: "Aztecs",
    city: "San Diego",
    state: "CA",

    stadium: {
      name: "Snapdragon Stadium",
      capacity: 35000
    },

    arema: {
      name: "Viejas Arena",
      capacity: 12414
    },

    founded: 1894,

    rivalries: {
      football: "Fresno State",
      basketball: "UNLV", // Utah State? New Mexico?
    },

    sports: [
      { name: "Football", id: 21, founded: 1921 },
      { name: "Men's Basketball", id: 21, founded: 1921 },
      //{ name: "Baseball", id: 62, founded: 1936 },
    ],
  },
  {
    name: "Texas State",
    mascot: "Bobcats",
    city: "San Marcos",
    state: "TX",

    stadium: {
      name: "UFCU Stadium",
      capacity: 28388
    },

    arema: {
      name: "Strahan Arena",
      capacity: 10000
    },

    rivalries: {
      football: "UTSA",
      basketball: "UTSA",
    },

    sports: [
      { name: "Football", id: 326, founded: 1904 },
      { name: "Men's Basketball", id: 326, founded: 1904 },
      //{ name: "Baseball", id: 147, founded: 1985 },
    ],
  },
  {
    name: "Utah State",
    mascot: "Aggies",
    city: "Logan",
    state: "UT",

    stadium: {
      name: "Maverik Stadium",
      capacity: 25513
    },

    arema: {
      name: "Dee Glen Smith Spectrum",
      capacity: 10270
    },

    rivalries: {
      football: "Boise State",
      basketball: "Boise State", // San Diego State? New Mexico? UNLV?
    },

    sports: [
      { name: "Football", id: 328, founded: 1892 },
      { name: "Men's Basketball", id: 328, founded: 1903 },
    ],
  },
];
