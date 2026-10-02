export type CatalogItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  popularity: number;
  price: number;
};

export const catalog: CatalogItem[] = [
  {
    id: "1",
    name: "Classic Beef Burger",
    category: "Burgers",
    description: "Beef patty with lettuce, tomato and sauce",
    popularity: 95,
    price: 89.9,
  },
  {
    id: "2",
    name: "Margherita Pizza",
    category: "Pizza",
    description: "Tomato, mozzarella and basil",
    popularity: 88,
    price: 109.9,
  },
  {
    id: "3",
    name: "Chicken Burger",
    category: "Burgers",
    description: "Crispy chicken with lettuce and mayo",
    popularity: 91,
    price: 79.9,
  },
  {
    id: "4",
    name: "BBQ Bacon Burger",
    category: "Burgers",
    description: "Beef patty, bacon, cheddar and BBQ sauce",
    popularity: 97,
    price: 119.9,
  },
  {
    id: "5",
    name: "Pepperoni Pizza",
    category: "Pizza",
    description: "Tomato sauce, mozzarella and pepperoni",
    popularity: 94,
    price: 129.9,
  },
  {
    id: "6",
    name: "Peri-Peri Chicken",
    category: "Chicken",
    description: "Grilled chicken with spicy peri-peri sauce",
    popularity: 89,
    price: 99.9,
  },
  {
    id: "7",
    name: "Chicken Wings",
    category: "Chicken",
    description: "Crispy wings with your choice of sauce",
    popularity: 93,
    price: 84.9,
  },
  {
    id: "8",
    name: "Garlic Bread",
    category: "Sides",
    description: "Toasted bread with garlic butter",
    popularity: 82,
    price: 39.9,
  },
  {
    id: "9",
    name: "Chocolate Brownie",
    category: "Desserts",
    description: "Warm chocolate brownie with chocolate sauce",
    popularity: 86,
    price: 54.9,
  },
  {
    id: "10",
    name: "Chocolate Milkshake",
    category: "Drinks",
    description: "Creamy chocolate milkshake",
    popularity: 90,
    price: 49.9,
  },
];
