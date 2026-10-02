export type CatalogItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  popularity: number;
};

export const catalog: CatalogItem[] = [
  {
    id: "1",
    name: "Classic Beef Burger",
    category: "Burgers",
    description: "Beef patty with lettuce, tomato and sauce",
    popularity: 95,
  },
  {
    id: "2",
    name: "Margherita Pizza",
    category: "Pizza",
    description: "Tomato, mozzarella and basil",
    popularity: 88,
  },
  {
    id: "3",
    name: "Chicken Burger",
    category: "Burgers",
    description: "Crispy chicken with lettuce and mayo",
    popularity: 91,
  },
];
