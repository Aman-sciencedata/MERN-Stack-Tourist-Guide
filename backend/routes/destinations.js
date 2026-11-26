
const express = require("express");
const router = express.Router();

const destinations = [
  {
    id: 1,
    name: "Mumbai",
    state: "Maharashtra",
    region: "West India",
    category: "City",
    budget: 5000,
    description: "Discover the city of dreams, its coastline and iconic skyline.",
    attractions: ["Gateway of India", "Bandra-Worli Sea Link", "Marine Drive"],
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=900"
  },
  {
    id: 2,
    name: "Delhi",
    state: "Delhi",
    region: "North India",
    category: "Heritage",
    budget: 4000,
    description: "Explore India's capital and its remarkable history.",
    attractions: ["India Gate", "Red Fort", "Qutub Minar"],
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=900"
  },
  {
    id: 3,
    name: "Meghalaya",
    state: "Meghalaya",
    region: "Northeast India",
    category: "Nature",
    budget: 8000,
    description: "Experience misty mountains, waterfalls and living root bridges.",
    attractions: ["Dawki", "Cherrapunji", "Living Root Bridges"],
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=900"
  },
  {
    id: 4,
    name: "Assam",
    state: "Assam",
    region: "Northeast India",
    category: "Nature",
    budget: 6500,
    description: "Discover tea gardens, wildlife and the Brahmaputra valley.",
    attractions: ["Kaziranga", "Majuli", "Tea Gardens"],
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=900"
  },
  {
    id: 5,
    name: "Ladakh",
    state: "Ladakh",
    region: "North India",
    category: "Mountains",
    budget: 12000,
    description: "Explore dramatic Himalayan landscapes and high-altitude lakes.",
    attractions: ["Pangong Lake", "Nubra Valley", "Khardung La"],
    image: "https://images.unsplash.com/photo-1566837497312-7be4a2c4e7a4?w=900"
  },
  {
    id: 6,
    name: "Sikkim",
    state: "Sikkim",
    region: "Northeast India",
    category: "Mountains",
    budget: 9000,
    description: "Enjoy peaceful mountain towns and Himalayan views.",
    attractions: ["Gangtok", "Tsomgo Lake", "Nathula Pass"],
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900"
  },
  {
    id: 7,
    name: "Jaipur",
    state: "Rajasthan",
    region: "North India",
    category: "Heritage",
    budget: 5500,
    description: "Discover the royal architecture of the Pink City.",
    attractions: ["Hawa Mahal", "Amber Fort", "City Palace"],
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=900"
  },
  {
    id: 8,
    name: "Munnar",
    state: "Kerala",
    region: "South India",
    category: "Nature",
    budget: 7500,
    description: "Relax among rolling green tea plantations.",
    attractions: ["Tea Gardens", "Eravikulam National Park", "Mattupetty Dam"],
    image: "https://images.unsplash.com/photo-1562649846-1b0e8a6b1a3e?w=900"
  }
];

router.get("/", (req, res) => {
  const { search, region, category } = req.query;
  let result = destinations;

  if (search) {
    result = result.filter(d =>
      `${d.name} ${d.state} ${d.description}`
        .toLowerCase().includes(search.toLowerCase())
    );
  }

  if (region && region !== "All India") {
    result = result.filter(d => d.region === region);
  }

  if (category && category !== "All") {
    result = result.filter(d => d.category === category);
  }

  res.json(result);
});

router.get("/:id", (req, res) => {
  const destination = destinations.find(
    d => d.id === Number(req.params.id)
  );

  if (!destination) {
    return res.status(404).json({ message: "Destination not found" });
  }

  res.json(destination);
});

module.exports = router;
