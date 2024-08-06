import { faker } from "@faker-js/faker";
import { ProductNearby } from "@/data/product.data";
import fs from "fs";
import path from "path";

type ProductCategory = "Makanan" | "Minuman" | "Salad" | "Dessert";

function generateDistance(isNear: boolean) {
  return faker.number.float({ min: 0.001, max: isNear ? 1 : 25, fractionDigits: 3 });
}

function generateProductData({
  categoryName,
  isNear,
}: {
  categoryName: ProductCategory;
  isNear: boolean;
}) {
  const food = faker.food;
  let imageCategory: string = "";
  if (categoryName === "Makanan") imageCategory = "food";
  else if (categoryName === "Minuman") imageCategory = "drink";
  else if (categoryName === "Salad") imageCategory = "salad";
  else if (categoryName === "Dessert") imageCategory = "dessert";

  const data: ProductNearby = {
    id: faker.string.uuid(),
    name: food.dish(),
    categoryName,
    price: `${faker.commerce.price({ min: 1000, max: 20000, dec: 0 })}`,
    description: food.description(),
    distance: generateDistance(isNear),
    images: [
      faker.image.urlLoremFlickr({
        category: imageCategory,
        width: 1000,
        height: 1000,
      }),
    ],
  };

  return data;
}

function saveDataToFile(data: ProductNearby[]) {
  const dataString = `import { Product } from "types/product.type";

  export type ProductNearby = {
    distance: number;
  } & Pick<Product, "id" | "name" | "categoryName" | "description" | "images" | "price">;
  
  export const products: ProductNearby[] = ${JSON.stringify(data, null, 2)}`;
  fs.writeFileSync(path.resolve("data", "product.data.ts"), dataString);
}

function seed() {
  const data: ProductNearby[] = [];

  for (let index = 1; index <= 60; index++) {
    let categoryName: ProductCategory = "Dessert";
    let generatedData: ProductNearby;

    if (index <= 15) categoryName = "Makanan";
    else if (index <= 30) categoryName = "Minuman";
    else if (index <= 45) categoryName = "Salad";

    do {
      generatedData = generateProductData({
        categoryName,
        isNear: faker.datatype.boolean({ probability: 0.66 }),
      });
    } while (data.find((product) => product.name === generatedData.name));

    data.push(generatedData);
  }

  saveDataToFile(data);
  console.log("Product data has been seeded");
}

try {
  seed();
} catch (error) {
  console.log("Failed to seed product data", error);
}
