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
];
