// Copy for the homepage sections, taken from tis.edu.in. Sections only lay this
// out; changing wording or adding an item never means touching a component.

// Photos and logos are loaded from the live TIS site (allowed in next.config.mjs).
// Their filenames carry a content hash, so if TIS redeploys their site these URLs
// change and must be updated here.
const tisMedia = (fileName) => `https://tis.edu.in/_next/static/media/${encodeURI(fileName)}`;

export const hero = {
  // Split into lines so each can rise from behind its own mask on load.
  titleLines: ["Welcome to Tulas", "International School"],
  description:
    "TIS is one of India's top boarding and day schools in Dehradun, India. Our CBSE curriculum focuses on academic excellence, holistic development, and preparing students to be global leaders.",
  image: {
    src: tisMedia("image1.a3011dda.png"),
    alt: "Students learning guitar together in a music class at Tulas",
  },
};

export const lifeAtTulas = {
  title: "Let's do it with Tulas",
  description:
    "We provide world-class education, modern facilities, and a nurturing environment for students to thrive academically, socially, and culturally.",
  // Cut-out portraits on transparent backgrounds, labelled by what each one shows.
  activities: [
    {
      name: "Basketball",
      image: tisMedia("Image 2.0c5295c9.webp"),
      alt: "Students leaping for a basketball",
    },
    {
      name: "Dance",
      image: tisMedia("polo.973ddbae.webp"),
      alt: "A student in a traditional dance pose",
    },
    {
      name: "Cricket",
      image: tisMedia("Image 3.21dc9e69.webp"),
      alt: "A student playing a cricket shot",
    },
    {
      name: "Karate",
      image: tisMedia("karate.4020fba5.webp"),
      alt: "A student in a karate stance",
    },
    {
      name: "Science",
      image: tisMedia("swimming.6fc81e65.webp"),
      alt: "A student using a microscope in the lab",
    },
    {
      name: "Shooting",
      image: tisMedia("Image 1.0a814859.webp"),
      alt: "A student aiming an air rifle",
    },
    {
      name: "Pottery",
      image: tisMedia("pot.6f7c2ee3.webp"),
      alt: "A student shaping clay on a pottery wheel",
    },
    { name: "Art", image: tisMedia("dance.88843edb.webp"), alt: "A student painting on a canvas" },
  ],
};

export const studentStories = [
  {
    quote: "We feel supported in what we do and nudged further to do more.",
    context: "On the room to be creative",
    image: tisMedia("ladyInPink.c358aa8f.png"),
    alt: "Portrait of a Tulas student",
  },
  {
    quote: "Tulas helped me thrive and become the best version of myself.",
    context: "On belonging and growing up here",
    image: tisMedia("manInBlue.46316cbf.png"),
    alt: "Portrait of a Tulas student",
  },
];

export const sports = {
  title: "Sports? It's not just a facility. At Tulas it's the foundation!",
  description: "16+ sports curated to bring joy and discipline to your life.",
  list: [
    "Archery",
    "Cycling",
    "Hockey",
    "Swimming",
    "Taekwondo",
    "Football",
    "Shooting",
    "Horse riding",
    "Billiards",
    "Squash",
    "Volleyball",
    "Basketball",
    "Cricket",
    "Lawn tennis",
    "Badminton",
    "Table tennis",
  ],
};

export const whyTis = {
  title: "At Tulas, we always ask, “What's the secret to making school awesome?”",
  description:
    "Our answer is adventure-based learning, where curiosity leads, creativity thrives, and every day brings something new to discover. Tulas International School was established in 2012 under the aegis of Rishabh Educational Trust.",
  image: {
    src: tisMedia("AtTIS.59351600.png"),
    alt: "A Tulas student taking notes",
  },
  // `suffix` lets non-numeric stats still count up: 24 + "×7", 6 + ":1".
  stats: [
    { value: 22, suffix: "", label: "Acre pollution-free campus" },
    { value: 16, suffix: "+", label: "Olympic sports" },
    { value: 24, suffix: "×7", label: "Medical assistance" },
    { value: 6, suffix: ":1", label: "Student–teacher ratio" },
  ],
};

export const rankings = [
  {
    rank: 1,
    region: "Dehradun",
    category: "Co-Educational Boarding School",
    source: "Education Today",
  },
  {
    rank: 2,
    region: "Uttarakhand",
    category: "Co-Educational Boarding School",
    source: "Education Today",
  },
  { rank: 1, region: "North India", category: "Co-Educational Boarding School", source: "Outlook" },
  {
    rank: 4,
    region: "India",
    category: "Co-Educational Boarding School",
    source: "Education Today",
  },
];

export const personalities = {
  achievers: [
    {
      name: "Sakshi Malik",
      role: "Rio 2016 Olympic Bronze Medallist, Rajiv Gandhi Khel Ratna 2016",
      slug: "sakshi-malik",
      image: tisMedia("SakshiMalik.91174bf4.webp"),
    },
    {
      name: "Vishesh Bhriguvanshi",
      role: "Captain, Indian Basketball Team",
      slug: "vishesh-bhriguvanshi",
      image: tisMedia("VisheshBhriguvanshi.52af8bfd.webp"),
    },
    {
      name: "Prakashi Tomar & Late Chandro Tomar",
      role: "Winners of 30 National Championships",
      slug: "tomar-sisters",
      image: tisMedia("PrakashiTomar.339dbb95.webp"),
    },
    {
      name: "Abhishek Verma",
      role: "Arjuna Awardee, Asian Games Gold Medallist in Archery 2013",
      slug: "abhishek-verma",
      image: tisMedia("AbhishekVerma.18f9d349.webp"),
    },
    {
      name: "Aditi Gopichand Swami",
      role: "World Champion in Archery 2024",
      slug: "aditi-gopichand-swami",
      image: tisMedia("AditiGopichandSwami.b7afa246.webp"),
    },
    {
      name: "Jeevan Jyot Singh Teja",
      role: "Dronacharya Awardee 2022",
      slug: "jeevan-jyot-singh-teja",
      image: tisMedia("JeevanJyotSinghTeja.9a07711c.webp"),
    },
    {
      name: "Ojus Devtale",
      role: "World Champion, Archery",
      slug: "ojus-devtale",
      image: tisMedia("OjasPravinDeotale.1d2e01cc.webp"),
    },
    {
      name: "Rajat Chauhan",
      role: "Arjuna Awardee 2016",
      slug: "rajat-chauhan",
      image: tisMedia("RajatChauhan.bcb1fbf2.webp"),
    },
    {
      name: "Devendra Singh Bisht",
      role: "Selector, Under-18 Indian Football Team",
      slug: "devendra-singh-bisht",
      image: tisMedia("DevendraSinghBisht.09635f71.webp"),
    },
    {
      name: "Manish Metani",
      role: "Indian Football Player",
      slug: "manish-metani",
      image: tisMedia("ManishMetani.ca55bf71.webp"),
    },
    {
      name: "Saurabh Joshi",
      role: "YouTuber with 30M subscribers",
      slug: "saurabh-joshi",
      image: tisMedia("SaurabhJoshi.450ff5df.webp"),
    },
    {
      name: "Arushi Nishank",
      role: "Kathak Dancer, Actor and TEDx Speaker",
      slug: "arushi-nishank",
      image: tisMedia("ArushiNishank.f3341404.webp"),
    },
    {
      name: "Laxmi Agarwal",
      role: "Women Empowerment Award, Founder of Laxmi Foundation",
      slug: "laxmi-agarwal",
      image: tisMedia("LakshmiAgarwal.7405df5d.webp"),
    },
  ],
  leaders: [
    "Dhan Singh Rawat",
    "Trivendra Singh Rawat",
    "Subodh Uniyal",
    "Ramesh Pokhriyal Nishank",
    "Bhagat Singh Koshyari",
    "Dharmendra Pradhan",
    "Anurag Tripathi",
    "Arvind Pandey",
    "Namami Bansal",
    "Abhinav Kumar",
    "Janmejaya Khanduri",
    "Ashok Kumar",
    "Amit Kumar Sinha",
    "Sunil Uniyal Gama",
    "Sahdev Singh Pundir",
  ],
};

export const awards = {
  title: "We believe in celebrating the hard work and perseverance of the best!",
  list: [
    { name: "Top Boarding School", image: tisMedia("TopBoarding.e5405c1a.jpg") },
    { name: "Best Residential School", image: tisMedia("BestResidential.5173db8d.jpg") },
    { name: "Uttarakhand Recognition", image: tisMedia("UTTARAKHAND.652376d5.jpg") },
  ],
};

export const virtualTour = {
  title: "Dive into our virtual tour",
  href: "https://tis.edu.in/virtual-tour/",
  image: tisMedia("image2.5d908b38.webp"),
};

export const parentVoices = {
  featured: {
    quote:
      "We have seen a remarkable improvement in our child's confidence and skills since joining Tulas. The teachers here are genuinely dedicated to bringing out the best in every student.",
    attribution: "A Tulas parent",
  },
  // Parents who left Google reviews, as listed on the current homepage.
  reviewers: [
    {
      name: "Tashi Tsering",
      photo: tisMedia("tashi.3807cb3c.png"),
      relation: "Father of Jigmet Skaldon",
    },
    {
      name: "Namita Agarwal",
      photo: tisMedia("namita.86a0f799.png"),
      relation: "Mother of Krishna Agarwal",
    },
    { name: "Sandeep Kumar", photo: tisMedia("sandeep.1b22b59e.png"), relation: "Father of Aryan" },
    {
      name: "Pinky Sharma",
      photo: tisMedia("pinky.8d7145b0.png"),
      relation: "Mother of Swastik Sharma",
    },
    {
      name: "Suresh Kumar",
      photo: tisMedia("suresh.80d60e49.png"),
      relation: "Father of Aditya Kumar",
    },
    {
      name: "Urja Bhayani",
      photo: tisMedia("urja.03e3c3f3.png"),
      relation: "Mother of Shikha & Samarth Bhayani",
    },
    {
      name: "Amit Agrawal",
      photo: tisMedia("amit.c7b6247e.png"),
      relation: "Father of Samruddhi Agrawal",
    },
    {
      name: "Ashu Arora",
      photo: tisMedia("ashu.9d447126.png"),
      relation: "Mother of Manisha Changrani",
    },
    {
      name: "Gulabdas Gupta",
      photo: tisMedia("gulabdas.63ce81d8.png"),
      relation: "Father of Annika Gulabdas Gupta",
    },
    {
      name: "Selendra K. Ajmera",
      photo: tisMedia("salendra.42b32ea1.png"),
      relation: "Father of Aman Ajmera",
    },
  ],
};

export const collaborations = {
  title: "12+ collaborations",
  partners: [
    { name: "Universidad Autónoma de Chile", logo: tisMedia("Universidad.935e33e1.png") },
    { name: "Synergy University", logo: tisMedia("yhnbepcntet.3b80eac6.jpg") },
    { name: "Universitat d'Andorra", logo: tisMedia("Universitat.f7fac869.jpg") },
    { name: "SPbGUT", logo: tisMedia("Cpi6.106c6037.jpg") },
    { name: "INSEEC", logo: tisMedia("inseec.780a3115.png") },
    { name: "Trinity College London", logo: tisMedia("Trinty.31016999.png") },
    { name: "University of the Highlands and Islands", logo: tisMedia("University.6c89dc70.png") },
    {
      name: "International Award for Young People",
      logo: tisMedia("International_Award_for_Young_People_logo.a0d1c4fa.jpg"),
    },
    { name: "Lions Clubs International", logo: tisMedia("lions.bf493cc1.png") },
    { name: "INSEEC U.", logo: tisMedia("inseecU.1e5c929a.png") },
    { name: "Universitas Muhammadiyah Jakarta", logo: tisMedia("Universitas.d9db402c.png") },
    { name: "Partner university", logo: tisMedia("universityLogo.6e446aad.jpg") },
  ],
};
