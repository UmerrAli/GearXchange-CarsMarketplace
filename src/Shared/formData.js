const features_Defination = [
  { name: "ac", label: "Air Conditioning" },
  { name: "alloy", label: "Alloy Rims" },
  { name: "abs", label: "ABS" },
  { name: "power_steering", label: "Power Steering" },
  { name: "power_windows", label: "Power Windows" },
  { name: "immobilizer", label: "Immobilizer Key" },
  { name: "sun_roof", label: "Sun Roof" },
];

const carMakes = ["Toyota", "Honda", "Suzuki", "Hyundai", "Kia", "Mitsubishi"];

const carModels = {
  Toyota: [
    "Corolla",
    "Yaris",
    "Fortuner",
    "Prius",
    "Land Cruiser",
    "Hilux",
    "Parado",
    "Camry",
  ],
  Honda: ["Civic", "City", "Vezel", "BR-V", "Accord"],
  Suzuki: ["Swift", "Cultus", "Alto", "Wagon R", "Bolan", "Mehran"],
  Hyundai: ["Tucson", "Elantra", "Sonata", "Santa Fe"],
  Kia: ["Sportage", "Picanto", "Stonic", "Sorento"],
  Mitsubishi: ["Lancer", "Pajero", "Mirage"],
};

const cities = [
  {
    province: "Islamabad Capital Territory",
    cities: ["Islamabad"],
  },
  {
    province: "Punjab",
    cities: [
      "Lahore",
      "Rawalpindi",
      "Faisalabad",
      "Multan",
      "Gujranwala",
      "Sialkot",
      "Bahawalpur",
      "Sargodha",
    ],
  },
  {
    province: "Sindh",
    cities: ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah"],
  },
  {
    province: "Khyber Pakhtunkhwa",
    cities: ["Peshawar", "Abbottabad", "Mardan", "Swat", "Nowshera"],
  },
  {
    province: "Balochistan",
    cities: ["Quetta", "Gwadar", "Turbat", "Khuzdar"],
  },
  {
    province: "Azad Kashmir",
    cities: ["Muzaffarabad", "Mirpur", "Rawalakot"],
  },
  {
    province: "Gilgit-Baltistan",
    cities: ["Gilgit", "Skardu", "Hunza"],
  },
];

const prices = [
  "< 5 Lacs",
  "5 - 10 Lacs",
  "10 - 20 Lacs",
  "20 - 30 Lacs",
  "30 - 40 Lacs",
  "40 - 50 Lacs",
  "50 - 60 Lacs",
  "60 - 70 Lacs",
  "70 - 80 Lacs",
  "80 - 90 Lacs",
  "90 - 100 Lacs",
  "> 100 Lacs",
];

const years = [
  "1995",
  "1996",
  "1997",
  "1998",
  "1999",
  "2000",
  "2001",
  "2002",
  "2003",
  "2004",
  "2005",
  "2006",
  "2007",
  "2008",
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
];

const colors = [
  "Beige",
  "Black",
  "Blue",
  "Bronze",
  "Brown",
  "Burgundy",
  "Gold",
  "Gray",
  "Green",
  "Maroon",
  "Orange",
  "Purple",
  "Red",
  "Silver",
  "White",
  "Yellow",
];

const carDetails = [
  { name: "title", label: "Title", type: "text", isDropdown: false },
  {
    name: "make",
    label: "Car Make",
    type: "dropdown",
    options: carMakes,
  },
  {
    name: "model",
    label: "Car Model",
    type: "dropdown",
    options: [], // Initially empty, depends on make
  },
  {
    name: "year",
    label: "Year",
    type: "dropdown",
    options: years,
  },
  {
    name: "city",
    label: "City",
    type: "dropdown",
    options: cities,
  },
  { name: "price", label: "Price", type: "number", isDropdown: false },
  {
    name: "color",
    label: "Color",
    type: "dropdown",
    options: colors,
  },
  { name: "milage", label: "Milage (km)", type: "number", isDropdown: false },
];

export { features_Defination, carDetails, carMakes, carModels, cities, prices };
