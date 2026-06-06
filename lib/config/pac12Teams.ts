// Centralized config for teams existing in the Pac-12, along with the sports they have (for now just fb/bb/baseball but will add more)

export const PAC_TEAMS = [
  {
    name: "Washington State",
    city: "Pullman",
    state: "WA",

    confHistory: [
      "Pac-12 (1962-Present)",
      "Independent (1959-1961)",
      "Independent (1918)",
      "Pacific Coast Conference (1917, 1919-1958)",
      "Independent (1894-1916)",
    ],

    mascot: {
      name: "Butch T. Cougar",
      year: 1927,
      description: "Named  after Herbert 'Butch' Meeker of Spokane, a WSU football star from the 1920s"
    },

    fightSong: {
      name: "The Fight Song",
      year: 1919,
      listenUrl: "https://www.youtube.com/watch?v=lsts113KwEk"
    },

    stadium: {
      name: "Martin Stadium",
      capacity: 32952,
      yearOpened: 1972
    },

    arena: {
      name: "Beasley Coliseum",
      capacity: 12058,
      yearOpened: 1973
    },

    traditions: [
      { title: "Ol' Crimson ", description: "At every home game, and famously at every single ESPN College GameDay broadcast since 2003, fans proudly fly the \"Ol' Crimson\" flag to show global Cougar pride." },
      { title: "Back Home Chant", description: "During the fourth quarter of home games at Martin Stadium, the entire crowd locks arms and sings along to Andy Grammer’s \"Back Home\" to celebrate Pullman's tight-knit community." },
    ],

    alumni: [
      { name: "Paul Allen", description: "The billionaire co-founder of Microsoft, investor, and philanthropist who famously attended WSU before leaving to start the tech giant with Bill Gates." },
      { name: "Edward R. Murrow", description: "A legendary broadcast journalist and war correspondent whose reporting during World War II shaped modern news media." },
      { name: "Gary Larson", description: "The acclaimed cartoonist and creator of The Far Side, one of the most celebrated and surreal comic strips in newspaper history." },
    ],

    rivalries: [
      { sport: "Football", name: "Apple Cup", team: "Washington", startYear: 1900, description: "This cross-state clash is defined by the stark geographic and cultural divide between the rolling wheat fields of the Palouse and the urban landscape of the Puget Sound. It is a fight for the iconic silver Apple Cup trophy, representing ultimate bragging rights in a state where family loyalties are often split down the middle." },
      { sport: "Men's Basketball", name: "Apple Cup", team: "Washington", startYear: 1910 },
      { sport: "Women's Basketball", name: "Apple Cup", team: "Oregon", startYear: 1975 },
    ],

    sports: [
      { name: "Football", id: 265, founded: 1894, allAmerican: 7, latestAA: "Cody O'Connell (2017)", foundedText: "Its early history is defined by a 1916 Rose Bowl victory against Brown that proved the small-town Palouse could compete nationally.", coachPrev: "Former HC at South Dakota State", confChamp: 4, lastChamp: 2002 },
      { name: "Men's Basketball", id: 265, founded: 1901, allAmerican: 4, latestAA: "Vince Hanson (1945)", foundedText: "Emerging at the turn of the century, the program found early glory with a retroactive national title in 1917.", coach: "David Riley", coachPrev: "Former HC at Eastern Washington", coachStart: 2024, confChamp: 2, tourChamp: 0, lastChamp: 1941 },
      { name: "Women's Basketball", id: 265, founded: 1970, allAmerican: 0, foundedText: "Born from the pioneers of the Title IX era, the program has grown from its foundational years into a resilient force in the modern game.", coach: "Kamie Ethridge", coachPrev: "Former HC at Northern Colorado", coachStart: 2018, confChamp: 0, tourChamp: 1, lastChamp: 2023 },
      //{ name: "Baseball", id: 134, founded: 1892, coach: "Nathan Choate" },
    ],
  },
  {
    name: "Oregon State",
    city: "Corvallis",
    state: "OR",

    confHistory: [
      "Pac-12 (1964-Present)",
      "Independent (1959-1963)",
      "Pacific Coast Conference (1915-1958)",
      "Northwest Intercollegiate Athletic Association (1902, 1908, 1912-1914)",
      "Independent (1898–1901, 1903–1907, 1909–1911)",
      "Oregon Intercollegiate Football Association (1893-1897)",
    ],

    mascot: {
      name: "Benny Beaver",
      year: 1942,
      description: "When Oregon became a state, it coined itself 'The Beaver State' due to the beaver's historic importance as an economic catalyst."
    },

    fightSong: {
      name: "Hail to Old OSU",
      year: 1914,
      listenUrl: "https://www.youtube.com/watch?v=rEoQZy9Edqg"
    },

    stadium: {
      name: "Reser Stadium",
      capacity: 35548,
      yearOpened: 1953
    },

    arena: {
      name: "Gill Coliseum",
      capacity: 9604,
      yearOpened: 1949
    },

    traditions: [
      { title: "Chainsaw Buzz", description: "To pay homage to the Pacific Northwest’s logging history, a roaring chainsaw sound effect is blasted over the Reser Stadium loudspeakers on critical defensive third downs while the student section mimics a sawing motion." },
      { title: "Beaver Walk", description: "Before kickoff, the team makes their way into the stadium through a passionate tunnel of fans alongside their energetic mascot, Benny." },
    ],

    alumni: [
      { name: "Jensen Huang", description: "The co-founder, president, and CEO of NVIDIA, who has become one of the most influential figures in the global tech and artificial intelligence industries." },
      { name: "Linus Pauling", description: "One of the most important scientists in history, he remains the only person to win two unshared Nobel Prizes (Chemistry in 1954 and Peace in 1962)." },
      { name: "Douglas Engelbart", description: "A computing pioneer who invented the computer mouse and helped lay the groundwork for the modern graphical user interface and the internet." },
    ],

    rivalries: [
      { sport: "Football", name: "Civil War", team: "Oregon", startYear: 1894, description: "One of the most-played matchups in the nation, this series is a battle for the Willamette Valley. The winner claims the Platypus Trophy, which is a unique piece of folk art featuring the bill of a duck and the tail of a beaver. It was famously 'lost' for decades in a trophy case before being rediscovered and restored to its rightful place." },
      { sport: "Men's Basketball", name: "Civil War", team: "Oregon", startYear: 1903 },
      { sport: "Women's Basketball", name: "Civil War", team: "Oregon", startYear: 1974 },
    ],

    sports: [
      { name: "Football", id: 204, founded: 1893, allAmerican: 8, latestAA: "Brandin Cooks (2013)", foundedText: "One of the oldest continuous programs in the West, the Beavers began as a local powerhouse in the Willamette Valley.", coachPrev: "Former DC at Oregon State", confChamp: 7, lastChamp: 2000 },
      { name: "Men's Basketball", id: 204, founded: 1901, allAmerican: 9, latestAA: "Gary Payton (1990)", foundedText: "Established during the sport's infancy, the program quickly became a regional standard-bearer.", coach: "Wayne Tinkle", coachPrev: "Former HC at Montana", coachStart: 2014, confChamp: 1, tourChamp: 15, lastChamp: 2021 },
      { name: "Women's Basketball", id: 204, founded: 1971, allAmerican: 5, latestAA: "Raegan Beers (2024)", foundedText: "Founded as the university expanded its athletic mission, the program represents the rise of women's sports in the Pacific Northwest, evolving into a national perennial contender.", coach: "Scott Rueck", coachPrev: "Former HC at George Fox", coachStart: 2010, confChamp: 3, tourChamp: 2, lastChamp: 2025 },
      //{ name: "Baseball", id: 113, founded: 1907 },
    ],
  },
  {
    name: "Boise State",
    city: "Boise",
    state: "ID",

    confHistory: [
      "Pac-12 (2026-Present)",
      "Mountain West (2011-2025)",
      "Western Athletic Conference (2001-2010)",
      "Big West (1996-2000)",
      "Big Sky (1970-1995)",
      "NAIA Independent (1968-1969)",
      "Intermountain Collegiate Athletic Conference (1948-1967)",
      "Independent (1933-1947)"
    ],

    mascot: {
      name: "Buster Bronco",
      year: 1932,
      description: "Students picked the Bronco mascot as part of a contest because it represented the wild horses that roamed the Owyhees."
    },

    fightSong: {
      name: "Orange and Blue",
      year: 1940,
      listenUrl: "https://www.youtube.com/watch?v=8XEMFvsactk"
    },

    stadium: {
      name: "Albertsons Stadium",
      capacity: 36363,
      yearOpened: 1970
    },

    arena: {
      name: "ExtraMile Arena",
      capacity: 12644,
      yearOpened: 1982
    },

    traditions: [
      { title: "The Blue", description: "The most recognizable tradition is playing on the blue artificial turf, installed originally in 1986. It is so unique that it led to a trademark on blue turf and an NFL rule informally known as the \"Boise State Rule\"." },
      { title: "Bronco Girl", description: "A pre-game tradition that was established in 1965 in which a cowgirl rides a live horse onto the turf of Albertsons Stadium." },
    ],

    alumni: [
      { name: "Elizabeth Prelogar", description: "A prominent appellate attorney who served as the Solicitor General of the United States, representing the federal government before the Supreme Court." },
      { name: "Dirk Kempthorne", description: "A distinguished politician who served as the 30th Governor of Idaho and later as the U.S. Secretary of the Interior under President George W. Bush." },
      { name: "Kellen Moore", description: "The historic, record-setting college quarterback who successfully transitioned into the NFL coaching ranks, serving as the head coach for the New Orleans Saints." },
    ],

    rivalries: [
      { sport: "Football", name: "Battle for the Milk Can", team: "Fresno State", startYear: 1977, description: "This rivalry emerged as a premiere Western showdown between two programs with a penchant for toppling giants. The winner hauls home a 90-pound silver milk can, a trophy that pays homage to the vital dairy industries of both the Treasure Valley and the San Joaquin Valley." },
      { sport: "Men's Basketball", team: "Nevada", startYear: 1974 },
      { sport: "Women's Basketball", team: "Nevada", startYear: 1982 },
    ],

    sports: [
      { name: "Football", id: 68, founded: 1933, allAmerican: 4, latestAA: "Ashton Jeanty (2024)", foundedText: "Starting as a junior college program, the Broncos’ founding reflects the gritty, upwardly mobile spirit of Boise.", coachPrev: "Former DC at Boise State", confChamp: 23, lastChamp: 2025 },
      { name: "Men's Basketball", id: 68, founded: 1933, allAmerican: 0, foundedText: "Launched alongside the school’s inception, the program grew in tandem with the city of Boise.", coach: "Leon Rice", coachPrev: "Former assistant at Gonzaga", coachStart: 2010, confChamp: 6, tourChamp: 6, lastChamp: 2022 },
      { name: "Women's Basketball", id: 68, founded: 1970, allAmerican: 0,  foundedText: "Established during the school's transition to a four-year university, the program was a trailblazer for women’s athletics in the Intermountain West.", coach: "Gordy Presnell", coachPrev: "Former HC at Seattle Pacific", coachStart: 2005, confChamp: 6, tourChamp: 6, lastChamp: 2020 },
    ],
  },
  {
    name: "Colorado State",
    city: "Fort Collins",
    state: "CO",

    confHistory: [
      "Pac-12 (2026-Present)",
      "Mountain West (1999-2025)",
      "Western Athletic Conference (1968-1998)",
      "Independent (1962-1967)",
      "Skyline Conference (1938-1961)",
      "Oregon Intercollegiate Football Association (1893-1897)",
    ],

    mascot: {
      name: "CAM the Ram",
      year: 1947,
      description: "An alumnus created the acronym CAM as part of a competition from the schools name at the time, Colorado Agricultural and Mechanical College."
    },

    fightSong: {
      name: "Stalwart Rams",
      year: 1932,
      listenUrl: "https://www.youtube.com/watch?v=QAFqqB3-HJU"
    },

    stadium: {
      name: "Canvas Stadium",
      capacity: 36500,
      yearOpened: 2017
    },

    arena: {
      name: "Moby Arena",
      capacity: 13610,
      yearOpened: 1966
    },

    traditions: [
      { title: "Firing of \"Comatose\"", description: "Since 1920, Army ROTC cadets have fired a vintage French 75mm field gun named \"Comatose\" after every Rams touchdown and field goal." },
      { title: "The Painting of the \"A\"", description: "Every year, students and athletes head into the foothills west of campus to refresh the massive white \"A\" that has symbolized the school's agricultural roots since 1924." },
    ],

    alumni: [
      { name: "John Amos", description: "A celebrated actor and former CSU football player, Amos became an iconic television figure starring in Good Times, Roots, and the film Coming to America." },
      { name: "Becky Hammon", description: "A legendary basketball icon and Naismith Hall of Famer who went from an undrafted player to a championship-winning WNBA head coach." },
      { name: "Jon Rubinstein", description: "A prominent computer scientist and executive who was instrumental in the development of the iMac and the iPod during his tenure at Apple." },
    ],

    rivalries: [
      { sport: "Football", name: "The Border War", team: "Wyoming", startYear: 1899, description: "Separated by only 65 miles of highway, this is a high-altitude slugfest for the Bronze Boot. The trophy is a genuine combat boot worn in Vietnam by an Army ROTC instructor at CSU Captain Dan Romero; it is traditionally transported on foot in a shuttle relay by the ROTC detachment of the visiting team to the stadium." },
      { sport: "Men's Basketball", name: "The Border War", team: "Wyoming", startYear: 1911 },
      { sport: "Women's Basketball", name: "The Border War", team: "Wyoming", startYear: 1974 },
    ],

    sports: [
      { name: "Football", id: 36, founded: 1892, allAmerican: 5, latestAA: "Trey McBride (2021)", foundedText: "Born from student initiative, the program was founded by 19 students who formed the first squad without a coach or official funding.", coachPrev: "Former HC at Nevada", confChamp: 15, lastChamp: 2002 },
      { name: "Men's Basketball", id: 36, founded: 1901, allAmerican: 1, latestAA: "Bill Green (1963)", foundedText: "Born in the sport's earliest years, the program established the 'Aggie' identity on the court long before the school became Colorado State.", coach: "Ali Farokhmanesh", coachPrev: "Former AHC at Colorado State", coachStart: 2025, confChamp: 4, tourChamp: 2, lastChamp: 2025 },
      { name: "Women's Basketball", id: 36, founded: 1974, allAmerican: 1, latestAA: "Becky Hammon (1999)", foundedText: "Established as the school transitioned into a modern research university, the program has become a pillar of Mountain West basketball culture.", coach: "Ryun Williams", coachPrev: "Former HC at South Dakota", coachStart: 2012, confChamp: 6, tourChamp: 3, lastChamp: 2026 },
    ],
  },
  {
    name: "Fresno State",
    city: "Fresno",
    state: "CA",

    mascot: {
      name: "Victor E. Bulldog",
      year: 1921,
      description: "Stems from student Body President Warren Moody, who adopted a tough-looking Bulldog that showed up on campus daily."
    },

    fightSong: {
      name: "FIGHT VARSITY!",
      year: 1934,
      listenUrl: "https://www.youtube.com/watch?v=C4WAtS2orVk"
    },

    stadium: {
      name: "Valley Children's Stadium",
      capacity: 40727,
      yearOpened: 1980
    },

    arena: {
      name: "Save Mart Center",
      capacity: 18000,
      yearOpened: 2003
    },

    traditions: [
      { title: "V on the Helmet", description: "The Bulldogs proudly display a green \"V\" on the back of their helmets as a tribute to California's Central Valley, honoring the agricultural community that passionately supports the team" },
      { title: "Live Mascot Runway Run", description: "Before the team bursts out of the tunnel, Victor E. Bulldog (a live, beloved English Bulldog) leads the spirit squad on a frantic, energetic sprint across the end zone." },
    ],

    alumni: [
      { name: "Rick Husband", description: "A highly decorated U.S. Air Force Colonel and NASA astronaut, served as the Commander of the Space Shuttle Columbia during its tragic final mission in 2003." },
      { name: "Aaron Judge", description: "A towering MLB superstar and captain of the New York Yankees who set the American League single-season home run record with 62 blasts in 2022." },
      { name: "Paul George", description: "An NBA All-Star and Olympic gold medalist who became the highest draft pick in Fresno State basketball history when he was selected 10th overall." },
    ],

    rivalries: [
      { sport: "Football", name: "Battle for the Milk Can", team: "Boise State", startYear: 1977, description: "This rivalry emerged as a premiere Western showdown between two programs with a penchant for toppling giants. The winner hauls home a 90-pound silver milk can, a trophy that pays homage to the vital dairy industries of both the Treasure Valley and the San Joaquin Valley." },
      { sport: "Men's Basketball", name: "Battle for the Valley", team: "San Jose State", startYear: 1913 },
      { sport: "Women's Basketball", name: "Battle for the Valley", team: "San Jose State", startYear: 1971 },
    ],

    sports: [
      { name: "Football", id: 278, founded: 1921, allAmerican: 1, latestAA: "Phillip Thomas (2012)", foundedText: "Created to give the Central Valley a voice in the state’s athletic landscape, the program’s identity was forged in a 'pride of the valley' ethos.", coachPrev: "Former AHC at USC", confChamp: 28, lastChamp: 2022 },
      { name: "Men's Basketball", id: 278, founded: 1921, allAmerican: 1, latestAA: "Courtney Alexander (2000)", foundedText: "Launched in the early 20th century, the program’s history is highlighted by an NIT Championship and a reputation for high-octane play that reflects the valley's energy.", coach: "Vance Walberg", coachPrev: "Former HC at Clovis West HS", coachStart: 2024, confChamp: 6, tourChamp: 5, lastChamp: 2016 },
      { name: "Women's Basketball", id: 278, founded: 1971, allAmerican: 0, foundedText: "One of the earlier established women's programs in California, it has a long-standing tradition of competing at the highest levels of the Western conferences.", coach: "Ryan McCarthy", coachPrev: "Former HC at Alaska Anchorage", coachStart: 2025, confChamp: 5, tourChamp: 4, lastChamp: 2020 },
      //{ name: "Baseball", id: 137, founded: 1922 },
    ],
  },
  {
    name: "Gonzaga",
    city: "Spokane",
    state: "WA",

    mascot: {
      name: "Spike the Bulldog",
      year: 1921,
      description: "Adopted as a moniker after a sportswriter described the football team's play as 'tenacious like bulldogs.' and quickly became a symbol of the school."
    },

    fightSong: {
      name: "Go Gonzaga!",
      year: 2010,
      listenUrl: "https://www.youtube.com/watch?v=Df2Nbqqha_A"
    },

    arena: {
      name: "McCarthey Athletic Center",
      capacity: 6000,
      yearOpened: 2004
    },

    traditions: [
      { title: "", description: "" },
      { title: "", description: "" },
    ],

    alumni: [
      { name: "Bing Crosby", description: "One of the most influential multimedia stars of the 20th century, Crosby was an Oscar-winning actor and a chart-topping singer whose recording of 'White Christmas' remains the best-selling single of all time." },
      { name: "Tom Foley", description: "A giant in Washington state politics, Foley served 30 years in the U.S. House of Representatives and held the powerful position of the 49th Speaker of the House." },
      { name: "John Stockton", description: "One of the greatest point guards in basketball history, Stockton spent his entire Hall of Fame career with the Utah Jazz and still holds the NBA's all-time career records for assists and steals." },
    ],

    rivalries: [
      { sport: "Men's Basketball", team: "St. Mary's", startYear: 1955 },
      { sport: "Women's Basketball", team: "St. Mary's", startYear: 1987 },
    ],

    sports: [
      { name: "Men's Basketball", id: 2250, founded: 1907, allAmerican: 12, latestAA: "Drew Timme (2023)", foundedText: "From its humble Jesuit beginnings to its status as a global basketball brand, the program is the ultimate 'David turned Goliath.'", coach: "Mark Few", coachPrev: "Former assistant at Gonzaga", coachStart: 1999, confChamp: 23, tourChamp: 29, lastChamp: 2026 },
      { name: "Women's Basketball", id: 2250, founded: 1961, allAmerican: 1, latestAA: "Courtney Vandersloot", foundedText: "Though a later addition to the university's portfolio, the program quickly mirrored the men's success, establishing 'The Kennel' as a premier destination for women's hoops in the West.", coach: "Lisa Fortier", coachPrev: "Former assistant at Gonzaga", coachStart: 2014, confChamp: 20, tourChamp: 11, lastChamp: 2026 },
      //{ name: "Baseball", id: 287, founded: 1890 },
    ],
  },
  {
    name: "San Diego State",
    city: "San Diego",
    state: "CA",

    mascot: {
      name: "N/A",
      year: 0,
      description: "While the teams are still known as the 'Aztecs', SDSU retired its 'Aztec Warrior' and 'Monty Montezuma' costumed mascots in 2018."
    },

    fightSong: {
      name: "Aztec Fight Song",
      year: 1936,
      listenUrl: "https://www.youtube.com/watch?v=mRjSg29lyvk"
    },

    stadium: {
      name: "Snapdragon Stadium",
      capacity: 35000,
      yearOpened: 2022
    },

    arena: {
      name: "Viejas Arena",
      capacity: 12414,
      yearOpened: 1997
    },

    traditions: [
      { title: "All-Black Home Uniforms", description: "Pioneered by legendary head coach Don Coryell in 1963, the Aztecs wear a single-color look for home games that were originally designed to intimidate opponents." },
      { title: "Honor Warrior", description: "A pre-game ritual where a notable former Aztec alumnus returns to \"The Mesa\" to plant a ceremonial spear on the 50-yard line" },
    ],

    alumni: [
      { name: "Ellen Ochoa", description: "A distinguished engineer and pioneer who became the first Hispanic woman in space, later serving as the Director of the NASA Johnson Space Center." },
      { name: "Kathleen Kennedy", description: "A wildly successful film producer and former President of Lucasfilm, who has produced iconic franchises like Indiana Jones, Jurassic Park, and Star Wars." },
      { name: "James Sinegal", description: "A prominent businessman and philanthropist, best known for his role as the founder and CEO of Costco Wholesale Corporation." },
    ],

    rivalries: [
      { sport: "Football", team: "Fresno State", startYear: 1900, description: "A historic California showdown that pits the 'Coast' against the 'Valley' for the Old Oil Can. The trophy is an antique oil can discovered during a construction project at San Diego State that hailed from Fresno, serving as a reminder of the era when fans would travel between the two cities via the old, rugged inland highways." },
      { sport: "Men's Basketball", team: "UNLV", startYear: 1979 },
      { sport: "Women's Basketball", team: "UNLV", startYear: 1979 },
    ],

    sports: [
      { name: "Football", id: 21, founded: 1921, allAmerican: 4, latestAA: "Matt Araiza (2021)", foundedText: "Founded at the San Diego Normal School, they were so dominant in the early years that rival schools petitioned for them to leave the league.", coachPrev: "Former OC at Colorado", confChamp: 19, lastChamp: 2016 },
      { name: "Men's Basketball", id: 21, founded: 1921, allAmerican: 3, latestAA: "Malachi Flynn (2020)", foundedText: "The program’s roots trace back to the NAIA era, where the Aztecs claimed a national title in 1941.", coach: "Brian Dutcher", coachPrev: "Former AHC at San Diego State", coachStart: 2017, confChamp: 11, tourChamp: 9, lastChamp: 2023 },
      { name: "Women's Basketball", id: 21, founded: 1976, allAmerican: 0, foundedText: "Formed during the explosive growth of the university, the program reflects the vibrant, competitive spirit of San Diego and a long history of postseason excellence.", coach: "Stacie Terry-Hutson", coachPrev: "Former assistant at LSU", coachStart: 2013, confChamp: 7, tourChamp: 5, lastChamp: 2026 },
      //{ name: "Baseball", id: 62, founded: 1936 },
    ],
  },
  {
    name: "Texas State",
    city: "San Marcos",
    state: "TX",

    mascot: {
      name: "Boko the Bobcat",
      year: 1921,
      description: "Adopted as part of a search to find a mascot that embodied Texas toughness, pride, and resilience."
    },

    fightSong: {
      name: "Go Bobcats",
      year: 1961,
      listenUrl: "https://www.youtube.com/watch?v=g1MM8m0ITSM"
    },

    stadium: {
      name: "UFCU Stadium",
      capacity: 28388,
      yearOpened: 1981
    },

    arena: {
      name: "Strahan Arena",
      capacity: 10000,
      yearOpened: 1982
    },

    traditions: [
      { title: "Lighting the Victory Star", description: "Originally started by a night watchman in 1942, the university activates a massive five-pointed \"Victory Star\" high above the athletic complex that burns bright through the night following any Bobcat football win." },
      { title: "The River Dip Victory", description: "Following a major home win, students and fans flock to the nearby San Marcos River to jump into the spring-fed waters fully clothed in celebration." },
    ],

    alumni: [
      { name: "Lyndon B. Johnson", description: "The 36th President of the United States, who graduated from the university and went on to pass the historic Civil Rights Act of 1964." },
      { name: "George Strait", description: "Known universally as the 'King of Country Music,' he earned an agriculture degree here before going on to sell over 100 million records worldwide." },
      { name: "Taylor Sheridan", description: "A highly successful screenwriter, director, and actor who created the massive television franchise Yellowstone and wrote acclaimed films like Sicario." },
    ],

    rivalries: [
      { sport: "Football", name: "The I-35 Showdown", team: "UTSA", startYear: 2012, description: "A high-octane battle for control of Central Texas, this rivalry is fueled by the proximity of two massive, rapidly growing universities. Known for record-breaking crowds and intense atmosphere, the game determines who owns the I-35 corridor, turning a short stretch of Texas highway into a literal battleground for regional dominance." },
      { sport: "Men's Basketball", name: "The I-35 Showdown", team: "UTSA", startYear: 1982 },
      { sport: "Women's Basketball", name: "The I-35 Showdown", team: "UTSA", startYear: 1982 },
    ],

    sports: [
      { name: "Football", id: 326, founded: 1904, allAmerican: 0, foundedText: "Originating in the heart of the Texas Hill Country, the program’s history is defined by back-to-back D2 national championships in the early 1980s.", coachPrev: "Former HC at Incarnate Ward", confChamp: 13, lastChamp: 2008 },
      { name: "Men's Basketball", id: 326, founded: 1904, allAmerican: 0, foundedText: "Founded as the school grew into a regional education hub, the program’s identity was solidified by an NAIA National Championship in 1960.", coach: "Terrence Johnson", coachPrev: "Former assistant at Texas State", coachStart: 2020, confChamp: 13, tourChamp: 4, lastChamp: 2022 },
      { name: "Women's Basketball", id: 326, founded: 1903, allAmerican: 0, foundedText: "The first-ever athletic team at the school was women's basketball. Early teams used colorful nicknames like the 'Nymphs' and 'Sprites' before officially becoming the Bobcats we know today.", coach: "Zenarae Antoine", coachPrev: "Former assistant at Arkansas", coachStart: 2011, confChamp: 1, tourChamp: 2, lastChamp: 2023 },
      //{ name: "Baseball", id: 147, founded: 1985 },
    ],
  },
  {
    name: "Utah State",
    city: "Logan",
    state: "UT",

    mascot: {
      name: "Big Blue",
      year: 1976,
      description: "The term 'Big Blue' came about in the 1960s simply to refer to the uniform color, as opposed to any particular mascot."
    },

    fightSong: {
      name: "Hail the Utah Aggies",
      year: 1933,
      listenUrl: "https://www.youtube.com/watch?v=qPObamLQTvI"
    },

    stadium: {
      name: "Maverik Stadium",
      capacity: 25513,
      yearOpened: 1968
    },

    arena: {
      name: "Dee Glen Smith Spectrum",
      capacity: 10270,
      yearOpened: 1970
    },

    traditions: [
      { title: "The Scotsman Chant", description: "At the start of the fourth quarter, the entire stadium links arms and sways wildly while singing \"The Scotsman,\" a traditional fight song that involves frantic jumping and clapping." },
      { title: "The Merlin Olsen Statue Salute", description: "Players touch the bronze statue of Pro Football Hall of Famer and Aggie legend Merlin Olsen on their way into Maverik Stadium to channel his legendary defensive dominance." },
    ],

    alumni: [
      { name: "Harry Reid", description: "A titan of American politics who represented Nevada in Washington for decades, serving as the Senate Majority Leader from 2007 to 2015." },
      { name: "Bobby Wagner", description: "A legendary NFL linebacker, Super Bowl champion, and future Hall of Famer who became one of the most dominant defensive players of his generation." },
      { name: "Charlie Denson", description: "A global business leader who spent decades rising through the ranks at Nike, eventually serving as the brand's long-term global President." },
    ],

    rivalries: [
      { sport: "Football", name: "The Old Wagon Wheel", team: "BYU", startYear: 1922, description: "This matchup celebrates the deep pioneer roots of the Beehive State. The winner is awarded the Old Wagon Wheel, a massive wooden trophy that honors the early settlers who traveled the trails between Logan and Provo. It represents a quest for hierarchy in a state where football is a foundational part of the cultural fabric." },
      { sport: "Men's Basketball", name: "The Old Wagon Wheel", team: "BYU", startYear: 1906 },
      { sport: "Women's Basketball", name: "The Old Wagon Wheel", team: "BYU", startYear: 1972 },
    ],

    sports: [
      { name: "Football", id: 328, founded: 1892, allAmerican: 3, latestAA: "Savon Scarver (2018)", foundedText: "Founded as the 'Farmers,' the program played its first game on the Logan quad, defeating the University of Utah 12-0.", coachPrev: "Former HC at New Mexico", confChamp: 13, lastChamp: 2021 },
      { name: "Men's Basketball", id: 328, founded: 1903, allAmerican: 1, latestAA: "Wayne Estes (1965)", foundedText: "Established shortly after the turn of the century, the program turned the Spectrum into one of the most feared environments in the country, rooted in a century of local devotion.", coach: "Jerrod Calhoun", coachPrev: "Former HC at Youngstown State", coachStart: 2024, confChamp: 19, tourChamp: 11, lastChamp: 2026 },
      { name: "Women's Basketball", id: 328, founded: 1971, allAmerican: 0, foundedText: "Notably, the women’s program actually predates the men’s team at Utah State. It stands as a historic testament to the university's early commitment to inclusive athletics.", coach: "Wesley Brooks", coachPrev: "Former assistant at Ohio State", coachStart: 2024, confChamp: 1, tourChamp: 0, lastChamp: 1974 },
    ],
  },
];
