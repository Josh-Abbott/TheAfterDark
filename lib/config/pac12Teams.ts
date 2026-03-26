// Centralized config for teams existing in the Pac-12, along with the sports they have (for now just fb/bb/baseball but will add more)

export const PAC_TEAMS = [
  {
    name: "Washington State",
    city: "Pullman",
    state: "WA",

    mascot: {
      name: "Butch T. Cougar",
      year: 1927
    },

    fightSong: {
      name: "The Fight Song",
      year: 1919
    },

    stadium: {
      name: "Martin Stadium",
      capacity: 32952
    },

    arena: {
      name: "Beasley Coliseum",
      capacity: 12058
    },

    rivalries: {
      football: "Washington",
      basketball: "Washington",
    },

    sports: [
      { name: "Football", id: 265, founded: 1894 },
      { name: "Men's Basketball", id: 265, founded: 1901, coach: "David Riley", coachStart: 2024 },
      //{ name: "Baseball", id: 134, founded: 1892, coach: "Nathan Choate" },
    ],
  },
  {
    name: "Oregon State",
    city: "Corvallis",
    state: "OR",

    mascot: {
      name: "Benny Beaver",
      year: 1942
    },

    fightSong: {
      name: "Hail to Old OSU",
      year: 1914
    },

    stadium: {
      name: "Reser Stadium",
      capacity: 35548
    },

    arena: {
      name: "Gill Coliseum",
      capacity: 9604
    },

    rivalries: {
      football: "Oregon",
      basketball: "Oregon",
    },

    sports: [
      { name: "Football", id: 204, founded: 1894 },
      { name: "Men's Basketball", id: 204, founded: 1901, coach: "Wayne Tinkle", coachStart: 2014 },
      //{ name: "Baseball", id: 113, founded: 1907 },
    ],
  },
  {
    name: "Boise State",
    city: "Boise",
    state: "ID",

    mascot: {
      name: "Buster Bronco",
      year: 1932
    },

    fightSong: {
      name: "Orange and Blue",
      year: 1940
    },

    stadium: {
      name: "Albertsons Stadium",
      capacity: 36363
    },

    arena: {
      name: "ExtraMile Arena",
      capacity: 12644
    },

    rivalries: {
      football: "Fresno State",
      basketball: "Fresno State", // ?
    },

    sports: [
      { name: "Football", id: 68, founded: 1933 },
      { name: "Men's Basketball", id: 68, founded: 1933, coach: "Leon Rice", coachStart: 2010 },
    ],
  },
  {
    name: "Colorado State",
    city: "Fort Collins",
    state: "CO",

    mascot: {
      name: "CAM the Ram",
      year: 1947
    },

    fightSong: {
      name: "Stalwart Rams",
      year: 1932
    },

    stadium: {
      name: "Canvas Stadium",
      capacity: 36500
    },

    arena: {
      name: "Wolstein Center",
      capacity: 13610
    },

    rivalries: {
      football: "Wyoming",
      basketball: "Wyoming", // ?
    },

    sports: [
      { name: "Football", id: 36, founded: 1892 },
      { name: "Men's Basketball", id: 36, founded: 1901, coach: "Ali Farokhmanesh", coachStart: 2025 },
    ],
  },
  {
    name: "Fresno State",
    city: "Fresno",
    state: "CA",

    mascot: {
      name: "Victor E. Bulldog",
      year: 1921
    },

    fightSong: {
      name: "FIGHT VARSITY!",
      year: 1934
    },

    stadium: {
      name: "Valley Children's Stadium",
      capacity: 40727
    },

    arena: {
      name: "Save Mart Center",
      capacity: 18000
    },

    rivalries: {
      football: "Boise State",
      basketball: "Boise State", // ?
    },

    sports: [
      { name: "Football", id: 278, founded: 1921 },
      { name: "Men's Basketball", id: 278, founded: 1921, coach: "Vance Walberg", coachStart: 2024 },
      //{ name: "Baseball", id: 137, founded: 1922 },
    ],
  },
  {
    name: "Gonzaga",
    city: "Pullman",
    state: "WA",

    mascot: {
      name: "Spike the Bulldog",
      year: 1921
    },

    fightSong: {
      name: "Gonzaga Fight Song",
      year: 2010
    },

    arena: {
      name: "McCarthey Athletic Center",
      capacity: 6000
    },

    rivalries: {
      basketball: "Saint Mary's", // check spelling later
    },

    sports: [
      { name: "Men's Basketball", id: 2250, founded: 1907, coach: "Mark Few", coachStart: 1999 },
      { name: "Women's Basketball", id: 2250, founded: 1961 },
      //{ name: "Baseball", id: 287, founded: 1890 },
    ],
  },
  {
    name: "San Diego State",
    city: "San Diego",
    state: "CA",

    mascot: {
      name: "N/A",
      year: 0
    },

    fightSong: {
      name: "Aztec Fight Song",
      year: 1936
    },

    stadium: {
      name: "Snapdragon Stadium",
      capacity: 35000
    },

    arena: {
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
      { name: "Men's Basketball", id: 21, founded: 1921, coach: "Brian Dutcher", coachStart: 2017 },
      //{ name: "Baseball", id: 62, founded: 1936 },
    ],
  },
  {
    name: "Texas State",
    city: "San Marcos",
    state: "TX",

    mascot: {
      name: "Boko the Bobcat",
      year: 1921
    },

    fightSong: {
      name: "Go Bobcats",
      year: 1961
    },

    stadium: {
      name: "UFCU Stadium",
      capacity: 28388
    },

    arena: {
      name: "Strahan Arena",
      capacity: 10000
    },

    rivalries: {
      football: "UTSA",
      basketball: "UTSA",
    },

    sports: [
      { name: "Football", id: 326, founded: 1904 },
      { name: "Men's Basketball", id: 326, founded: 1904, coach: "Terrence Johnson", coachStart: 2020 },
      //{ name: "Baseball", id: 147, founded: 1985 },
    ],
  },
  {
    name: "Utah State",
    city: "Logan",
    state: "UT",

    mascot: {
      name: "Big Blue",
      year: 1976
    },

    fightSong: {
      name: "Hail the Utah Aggies",
      year: 1933
    },

    stadium: {
      name: "Maverik Stadium",
      capacity: 25513
    },

    arena: {
      name: "Dee Glen Smith Spectrum",
      capacity: 10270
    },

    rivalries: {
      football: "Boise State",
      basketball: "Boise State", // San Diego State? New Mexico? UNLV?
    },

    sports: [
      { name: "Football", id: 328, founded: 1892 },
      { name: "Men's Basketball", id: 328, founded: 1903, coach: "Jerrod Calhoun", coachStart: 2024 },
    ],
  },
];
