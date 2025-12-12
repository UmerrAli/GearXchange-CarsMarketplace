const features_Defination = [
  { name: "ac", label: "Air Conditioning" },
  { name: "alloy", label: "Alloy Rims" },
  { name: "abs", label: "ABS" },
  { name: "powerSteering", label: "Power Steering" },
  { name: "powerWindows", label: "Power Windows" },
  { name: "immobilizer", label: "Immobilizer Key" },
  { name: "sunRoof", label: "Sun Roof" },
];

const carMakes = ["Toyota", "Honda", "Suzuki", "Hyundai", "Kia"];

const cities = [
  "Abbottabad",
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Peshawar",
];

const prices = [
  "5 Lacs",
  "10 Lacs",
  "15 Lacs",
  "20 Lacs",
  "25 Lacs",
  "30 Lacs",
  "35 Lacs",
];

const models = [
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
];
const colors = ["Red", "Blue", "Black", "White", "Gray"];

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
    label: "Model Year",
    type: "dropdown",
    options: models,
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

export { features_Defination, carDetails, carMakes, cities, prices };
