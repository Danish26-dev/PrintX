// Mock shop service - Backend will replace these with real API calls

export const mockShops = [
  {
    id: 1,
    name: "Achar Xerox – Student's Corner",
    rating: 4.7,
    verified: true,
    aiEnabled: true,
    location: "0.8 km away",
    status: "online"
  },
  {
    id: 2,
    name: "ISHA Prints – Jumbo Xerox",
    rating: 4.6,
    verified: true,
    aiEnabled: true,
    location: "1.2 km away",
    status: "online"
  },
  {
    id: 3,
    name: "Jumbo Xerox – Sree Manjunatha Enterprises",
    rating: 4.7,
    verified: true,
    aiEnabled: true,
    location: "1.5 km away",
    status: "online"
  },
  {
    id: 4,
    name: "Print Cafe – The Xerox Shop",
    rating: 4.8,
    verified: true,
    aiEnabled: true,
    location: "1.8 km away",
    status: "online"
  },
  {
    id: 5,
    name: "PrintX Demo Lab (AI Enabled)",
    rating: 4.9,
    verified: true,
    aiEnabled: true,
    location: "",
    status: "online",
    isPrintX: true
  },
  {
    id: 6,
    name: "Sasi Xerox and Stationary",
    rating: 4.8,
    verified: true,
    aiEnabled: true,
    location: "2.1 km away",
    status: "online"
  },
  {
    id: 7,
    name: "Shivanugraha Enterprises Prints",
    rating: 4.7,
    verified: true,
    aiEnabled: true,
    location: "2.4 km away",
    status: "online"
  },
  {
    id: 8,
    name: "Sri Padma Prints",
    rating: 4.5,
    verified: true,
    aiEnabled: true,
    location: "2.7 km away",
    status: "online"
  },
  {
    id: 9,
    name: "Sri Sapthagiri Enterprises Xerox",
    rating: 4.6,
    verified: true,
    aiEnabled: true,
    location: "3.0 km away",
    status: "busy"
  }
];

export const getShops = async (searchQuery = '') => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!searchQuery) {
    return mockShops;
  }
  
  return mockShops.filter(shop => 
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export const getShopById = async (shopId) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockShops.find(shop => shop.id === shopId);
};
