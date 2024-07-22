import { Product } from "types/product.type";

  export type ProductNearby = {
    distance: number;
  } & Pick<Product, "id" | "name" | "categoryName" | "description" | "images" | "price">;
  
  export const products: ProductNearby[] = [
  {
    "id": "1e5a33e4-0cdd-4bdd-a6d4-31374828f1a2",
    "name": "Punjabi Sweet Potato Soup",
    "categoryName": "Makanan",
    "price": "7165",
    "description": "Hearty bonito flakes and salmon stew, slow-cooked with celery and french eschallots for a comforting, flavorful meal.",
    "distance": 0.198,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=510704810080747"
    ]
  },
  {
    "id": "ea9db7b3-866c-4e70-b604-73cf0850bc01",
    "name": "Seafood Paella",
    "categoryName": "Makanan",
    "price": "12062",
    "description": "A special orange mace from Zimbabwe. To support the strong flavor it is sided with a tablespoon of caraway seed.",
    "distance": 17.368,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=4792778413655821"
    ]
  },
  {
    "id": "32e62bde-c05f-406b-bdbd-4ba415db0650",
    "name": "Scotch Eggs",
    "categoryName": "Makanan",
    "price": "7974",
    "description": "A robust zesty stew featuring Rajasthani flavors, loaded with rich meat, tender vegetables, and a sour, juicy broth.",
    "distance": 0.493,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=4907949837080068"
    ]
  },
  {
    "id": "45372070-244c-4832-8ce1-5c523d13af43",
    "name": "Barbecue Ribs",
    "categoryName": "Makanan",
    "price": "12483",
    "description": "13-day aged pigeon steak, with choice of 3 sides.",
    "distance": 0.437,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=3307888709328184"
    ]
  },
  {
    "id": "9471a0c8-3137-4b45-9945-beeb2d27d4bb",
    "name": "Pork Belly Buns",
    "categoryName": "Makanan",
    "price": "3349",
    "description": "A classic pie filled with delicious ostrich and sour white wine, baked in a savory pastry crust and topped with a golden-brown lattice.",
    "distance": 0.731,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=6430803762578870"
    ]
  },
  {
    "id": "591c0aca-5107-4609-a75a-eb79ff05e13b",
    "name": "Poke",
    "categoryName": "Makanan",
    "price": "13186",
    "description": "A robust golden stew featuring South Indian flavors, loaded with sour meat, juicy vegetables, and a fresh, tangy broth.",
    "distance": 0.452,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=8961223865087066"
    ]
  },
  {
    "id": "c4e0f0bf-2b84-4e81-8108-ab0b7ef93d1c",
    "name": "Chicken Fajitas",
    "categoryName": "Makanan",
    "price": "13345",
    "description": "A simple mulberry pie. No fancy stuff. Just pie.",
    "distance": 0.46,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=669402963944383"
    ]
  },
  {
    "id": "a20a4b03-7641-46ff-88c5-4926f25b6b8e",
    "name": "Tangy Irish Stew",
    "categoryName": "Makanan",
    "price": "3769",
    "description": "Crispy fried pigeon bites, seasoned with sage and served with a tangy mango dipping sauce.",
    "distance": 0.316,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=6720421262033591"
    ]
  },
  {
    "id": "f91d34f8-810d-4335-a62f-85da05358eda",
    "name": "Parsnip Salad",
    "categoryName": "Makanan",
    "price": "2360",
    "description": "Baked blue swimmer crab-stuffed lamb, seasoned with mace and crunchy herbs, accompanied by roasted brussels sprouts medley.",
    "distance": 0.842,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=4323411036155244"
    ]
  },
  {
    "id": "492bfc50-156e-437f-9790-15028fdabf1e",
    "name": "Chilli Pepper-crusted Pigeon",
    "categoryName": "Makanan",
    "price": "13779",
    "description": "A succulent duck steak, encased in a fresh pimento crust, served with a side of rosemary mashed peppers.",
    "distance": 0.029,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=908363091674259"
    ]
  },
  {
    "id": "30ba2301-5277-4b17-a483-b8efbeec86d7",
    "name": "Cauliflower Penne",
    "categoryName": "Makanan",
    "price": "1899",
    "description": "An exquisite duck roast, infused with the essence of custard apples daikon, slow-roasted to bring out its natural flavors and served with a side of creamy chives",
    "distance": 0.843,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=2240150775069788"
    ]
  },
  {
    "id": "504064fb-ce6a-4359-8173-d0cc03ac96c1",
    "name": "Laron's Special Calamari",
    "categoryName": "Makanan",
    "price": "1300",
    "description": "Baked besan-stuffed ostrich, seasoned with green cardamom and sour herbs, accompanied by roasted sun dried tomatoes medley.",
    "distance": 0.651,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=2753124848124650"
    ]
  },
  {
    "id": "75b18915-1c08-4922-871b-47589b12a850",
    "name": "Chilli Con Carne",
    "categoryName": "Makanan",
    "price": "16194",
    "description": "Hearty hazelnut and beef stew, slow-cooked with chervil and cornichons for a comforting, flavorful meal.",
    "distance": 2.3,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=120500040966160"
    ]
  },
  {
    "id": "01552940-d3d2-4518-b013-99e347758d3c",
    "name": "Fig-glazed Ostrich Skewers",
    "categoryName": "Makanan",
    "price": "3921",
    "description": "An exquisite quail roast, infused with the essence of bush tomato, slow-roasted to bring out its natural flavors and served with a side of creamy eggplant",
    "distance": 0.874,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=4655656007405910"
    ]
  },
  {
    "id": "3ae3eb00-455e-4404-830f-dd5e9227ba39",
    "name": "Seafood Paella",
    "categoryName": "Makanan",
    "price": "12820",
    "description": "Juicy rabbit, grilled to your liking and drizzled with a bold curly leaf parsley sauce, served alongside roasted english spinach.",
    "distance": 0.628,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=1693873588888753"
    ]
  },
  {
    "id": "ff687007-0b53-4fb5-b87a-6023deaffb1a",
    "name": "Romani Garam Masala Soup",
    "categoryName": "Minuman",
    "price": "5096",
    "description": "Fresh limes with a pinch of balti stir fry mix, topped by a caramelized snowpea with whipped cream",
    "distance": 0.807,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=8737965010009366"
    ]
  },
  {
    "id": "eb122651-63ba-465e-875c-ad8eed0a45c1",
    "name": "Kiwi Fruit-infused Goose Roast",
    "categoryName": "Minuman",
    "price": "12594",
    "description": "A slow-roasted Audubon's Shearwater with a tender, smoky exterior. Stuffed with snowpea and covered in grape sauce. Sides with parsnip puree and wild beans.",
    "distance": 0.864,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=8685837680286207"
    ]
  },
  {
    "id": "f2b6364d-287a-4fbc-925b-494f93722a61",
    "name": "Goji Berry And Apricot Tart",
    "categoryName": "Minuman",
    "price": "19122",
    "description": "A robust crunchy stew featuring Bulgarian flavors, loaded with zesty meat, fluffy vegetables, and a sweet, crunchy broth.",
    "distance": 2.584,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=924253583894039"
    ]
  },
  {
    "id": "66481355-2cfc-48d9-9a45-b95ccb91d052",
    "name": "Date And Cavalo Tart",
    "categoryName": "Minuman",
    "price": "2693",
    "description": "Fresh mixed greens tossed with turmeric-rubbed pigeon, dried chinese broccoli, and a light dressing.",
    "distance": 0.737,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=845772850357921"
    ]
  },
  {
    "id": "eb86b481-2c60-41e4-ab4d-339e9ccc0293",
    "name": "Stinky Tofu",
    "categoryName": "Minuman",
    "price": "12940",
    "description": "Hearty nutmeg and venison stew, slow-cooked with jerk and bean shoots for a comforting, flavorful meal.",
    "distance": 15.475,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=5525669320616011"
    ]
  },
  {
    "id": "1b827dca-fee3-4341-a873-2abc7b620949",
    "name": "Cantaloupe Pie",
    "categoryName": "Minuman",
    "price": "9601",
    "description": "Our fluffy crocodile, slow-cooked to perfection, accompanied by steamed kale and a rich, savory gravy.",
    "distance": 0.04,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=7380526959079090"
    ]
  },
  {
    "id": "b10b10cf-dc3e-4607-8c6b-c7ea2f915d1d",
    "name": "Ostrich With Prune Sauce",
    "categoryName": "Minuman",
    "price": "10947",
    "description": "A special orchid hiramasa kingfish from Azerbaijan. To support the strong flavor it is sided with a tablespoon of lavender.",
    "distance": 0.712,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=5889282679680868"
    ]
  },
  {
    "id": "54861990-52ec-46dd-897b-1d89f20d5330",
    "name": "Rhubarb Salad",
    "categoryName": "Minuman",
    "price": "17518",
    "description": "17-day aged lamb steak, with choice of 3 sides.",
    "distance": 0.677,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=7992207582072321"
    ]
  },
  {
    "id": "ab8b1adf-62a2-46c7-aa85-18c36486faa6",
    "name": "Ricotta Stuffed Ravioli",
    "categoryName": "Minuman",
    "price": "12139",
    "description": "A special gold mastic from Belarus. To support the strong flavor it is sided with a tablespoon of oregano.",
    "distance": 0.948,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=4506024991255205"
    ]
  },
  {
    "id": "92d1d2c7-ffd4-4cbc-8c31-8de581af18e4",
    "name": "Risotto With Seafood",
    "categoryName": "Minuman",
    "price": "11024",
    "description": "Hearty oysters and chicken stew, slow-cooked with cloves and cucumber for a comforting, flavorful meal.",
    "distance": 0.175,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=1234423134419506"
    ]
  },
  {
    "id": "a0ce09e1-03cd-4c3b-b1b5-c9fcae91cc7a",
    "name": "Tandoori Masala-crusted Beef",
    "categoryName": "Minuman",
    "price": "13328",
    "description": "Baked limes-stuffed venison, seasoned with peppercorns and sour herbs, accompanied by roasted beans medley.",
    "distance": 7.421,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=5431362164360596"
    ]
  },
  {
    "id": "f691ba02-033c-411d-895c-12fe3ca9b7a9",
    "name": "Katsu Curry",
    "categoryName": "Minuman",
    "price": "1521",
    "description": "A slow-roasted Buff-bellied Hummingbird with a spicy, moist exterior. Stuffed with avocado and covered in banana sauce. Sides with french eschallots puree and wild dried chinese broccoli.",
    "distance": 24.48,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=6515077822508670"
    ]
  },
  {
    "id": "3d4e6d11-4849-46a6-bdb2-256a6ccfc450",
    "name": "French Toast",
    "categoryName": "Minuman",
    "price": "16124",
    "description": "A slow-roasted Little Egret with a crunchy, crunchy exterior. Stuffed with tangelo and covered in watermelon sauce. Sides with jerusalem artichoke puree and wild brussels sprouts.",
    "distance": 8.736,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=2509216428089335"
    ]
  },
  {
    "id": "fb08b7e7-3829-48e2-9d37-e2ffc62dd3f2",
    "name": "Pappardelle Alla Bolognese",
    "categoryName": "Minuman",
    "price": "14822",
    "description": "A heartwarming Lithuanian soup, featuring fresh beef and an aromatic blend of traditional spices.",
    "distance": 0.042,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=3735531191704125"
    ]
  },
  {
    "id": "84347dbd-aff0-4f9e-956f-8ecbc4351a30",
    "name": "Ricotta Stuffed Ravioli",
    "categoryName": "Minuman",
    "price": "16642",
    "description": "A special mint green bush tomato from Kuwait. To support the strong flavor it is sided with a tablespoon of garam masala.",
    "distance": 0.975,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=2851682513653117"
    ]
  },
  {
    "id": "d4a06fbc-185a-4a73-9a19-e0aceea673c0",
    "name": "Vegetable Soup",
    "categoryName": "Salad",
    "price": "17661",
    "description": "Three red pepper with chinese cabbage, squash, raspberry, brussels sprouts and gula melaka. With a side of baked lime, and your choice of shark or arugula.",
    "distance": 0.067,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=188383979230224"
    ]
  },
  {
    "id": "981e2a26-09ff-4339-a9b3-532ed8da7eb4",
    "name": "Spicy Irish Stew",
    "categoryName": "Salad",
    "price": "10091",
    "description": "A special lavender cranberry from Ethiopia. To support the strong flavor it is sided with a tablespoon of pot marjoram.",
    "distance": 0.463,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=1593672575416375"
    ]
  },
  {
    "id": "7f59b4d9-3ab8-4d0e-8472-d2e7f04678e8",
    "name": "Teriyaki Chicken Donburi",
    "categoryName": "Salad",
    "price": "15968",
    "description": "Fresh cherries with a pinch of mint, topped by a caramelized papaya with whipped cream",
    "distance": 0.434,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=7960230947456292"
    ]
  },
  {
    "id": "c879618c-7825-4254-b9b5-2a97fea20caf",
    "name": "Peking Duck",
    "categoryName": "Salad",
    "price": "15335",
    "description": "Grilled turkey kebabs, marinated in Berber spices and served with a fresh squash and goji berry salad.",
    "distance": 0.769,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=393927362539854"
    ]
  },
  {
    "id": "42755d19-9ad8-475b-bf77-2b539dd76b8a",
    "name": "Sushi",
    "categoryName": "Salad",
    "price": "5240",
    "description": "Juicy pigeon, grilled to your liking and drizzled with a bold sage sauce, served alongside roasted dried chinese broccoli.",
    "distance": 11.605,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=6987248761787794"
    ]
  },
  {
    "id": "6370d78d-ea51-48b5-bb61-031288c3eebf",
    "name": "Scotch Eggs",
    "categoryName": "Salad",
    "price": "9472",
    "description": "Fresh mixed greens tossed with celery-rubbed venison, radicchio, and a light dressing.",
    "distance": 0.353,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=4782991436034239"
    ]
  },
  {
    "id": "14cba03d-8a5a-43fa-bfdf-84bfe32a695e",
    "name": "Dried Apricot And Cantaloupe Tart",
    "categoryName": "Salad",
    "price": "7349",
    "description": "A slow-roasted Common Eider with a crispy, crispy exterior. Stuffed with cumquat and covered in cherry sauce. Sides with potatoes puree and wild pumpkin.",
    "distance": 0.887,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=7892492333548288"
    ]
  },
  {
    "id": "9a571ed6-2789-4ea4-8450-259df068c7fc",
    "name": "Ebiten Maki",
    "categoryName": "Salad",
    "price": "13848",
    "description": "Hearty soy sauce and ostrich stew, slow-cooked with sage and sun dried tomatoes for a comforting, flavorful meal.",
    "distance": 0.702,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=1045547664683791"
    ]
  },
  {
    "id": "370563ee-6aab-494d-a756-e6fac7cdc97b",
    "name": "Fish And Chips",
    "categoryName": "Salad",
    "price": "15555",
    "description": "35-day aged salmon steak, with choice of 4 sides.",
    "distance": 5.066,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=5206356847709649"
    ]
  },
  {
    "id": "61dcc467-0526-4666-aa7e-77761cfdfb68",
    "name": "Mint-rubbed Ostrich Salad",
    "categoryName": "Salad",
    "price": "3229",
    "description": "A delightful tart combining golden cauliflower and sweet rockmelon, set in a buttery pastry shell and finished with a hint of anise.",
    "distance": 0.039,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=5506066107227232"
    ]
  },
  {
    "id": "a7180b52-198b-4077-85e6-4ecf1a7441c6",
    "name": "Chilli Con Carne",
    "categoryName": "Salad",
    "price": "15551",
    "description": "A heartwarming Pashtun soup, featuring fresh cashews and an aromatic blend of traditional spices.",
    "distance": 12.181,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=2862686957997733"
    ]
  },
  {
    "id": "165e2393-b7ed-40b5-831b-db838444a3f3",
    "name": "Pierogi",
    "categoryName": "Salad",
    "price": "2531",
    "description": "Fresh mixed greens tossed with arrowroot-rubbed beef, purple carrot, and a light dressing.",
    "distance": 0.566,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=17877306101792"
    ]
  },
  {
    "id": "a4a09c27-d3d9-4b1d-a19f-304494049be9",
    "name": "Kiwi Berries-infused Chicken",
    "categoryName": "Salad",
    "price": "11604",
    "description": "A robust fluffy stew featuring Lithuanian flavors, loaded with crunchy meat, delicious vegetables, and a moist, fresh broth.",
    "distance": 0.174,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=7485070600046163"
    ]
  },
  {
    "id": "808e806b-6c5c-4147-96e8-35b51608bdc8",
    "name": "Grapefruit-infused Ostrich Roast",
    "categoryName": "Salad",
    "price": "14636",
    "description": "76-day aged kangaroo steak, with choice of 3 sides.",
    "distance": 0.325,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=2563517365862831"
    ]
  },
  {
    "id": "3f1479d9-9901-4a74-b6d8-34a3fc2b110a",
    "name": "Bengali Barramundi Soup",
    "categoryName": "Salad",
    "price": "2002",
    "description": "A classic pie filled with delicious chicken and moist bay leaves, baked in a salty pastry crust and topped with a golden-brown lattice.",
    "distance": 20.823,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=5008393070528243"
    ]
  },
  {
    "id": "e9a6b8cc-544f-47a8-8058-cd8ca69d827d",
    "name": "Crunchy Italian Stew",
    "categoryName": "Dessert",
    "price": "9636",
    "description": "Crispy fried rabbit bites, seasoned with anise and served with a tangy bush tomato dipping sauce.",
    "distance": 0.929,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=8139470367973333"
    ]
  },
  {
    "id": "d2c1fa4d-ba71-4c69-96e1-a17feffb0534",
    "name": "Ricotta Stuffed Ravioli",
    "categoryName": "Dessert",
    "price": "18882",
    "description": "Juicy kangaroo, grilled to your liking and drizzled with a bold achiote seed sauce, served alongside roasted butternut lettuce.",
    "distance": 0.908,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=1514134969585971"
    ]
  },
  {
    "id": "84a71879-50c1-48fd-9d8e-8cc020f64bd2",
    "name": "Dried Apricot Pie",
    "categoryName": "Dessert",
    "price": "12981",
    "description": "Crispy fried pigeon bites, seasoned with curry and served with a tangy melon dipping sauce.",
    "distance": 0.624,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=4856404191628969"
    ]
  },
  {
    "id": "b749769c-34d8-4179-b691-282828ecae41",
    "name": "Sour Chicken With Pumpkin",
    "categoryName": "Dessert",
    "price": "15989",
    "description": "Tender ostrich skewers, glazed with a sweet and tangy currant sauce, served over a bed of fragrant jasmine rice.",
    "distance": 21.017,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=734511028588345"
    ]
  },
  {
    "id": "23b33dbb-367f-467c-a9b9-0597a3940025",
    "name": "Orange Pie",
    "categoryName": "Dessert",
    "price": "5571",
    "description": "Our fluffy pork, slow-cooked to perfection, accompanied by steamed raspberry and a rich, savory gravy.",
    "distance": 4.991,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=4428811845984801"
    ]
  },
  {
    "id": "33a2f529-387f-4fcb-836d-199626e9ab07",
    "name": "Mangosteen-infused Pork Roast",
    "categoryName": "Dessert",
    "price": "10456",
    "description": "Fresh jicama with a pinch of poppy seed, topped by a caramelized elderberry with whipped cream",
    "distance": 23.884,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=8884265209418097"
    ]
  },
  {
    "id": "4e44774e-0ad0-4ee7-822d-537243760a6b",
    "name": "English Spinach Salad",
    "categoryName": "Dessert",
    "price": "6182",
    "description": "A slow-roasted Ring-necked Duck with a salty, crispy exterior. Stuffed with blood orange and covered in snowpea sauce. Sides with zucchini puree and wild kale.",
    "distance": 4.673,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=2372421113952030"
    ]
  },
  {
    "id": "0a92570b-e8c2-4f89-ac3a-7cbc3d4304de",
    "name": "Hummus",
    "categoryName": "Dessert",
    "price": "10927",
    "description": "An exquisite beef roast, infused with the essence of strawberry, slow-roasted to bring out its natural flavors and served with a side of creamy broccoli",
    "distance": 0.707,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=5805779812088040"
    ]
  },
  {
    "id": "2ecd6ba7-3454-4df0-bba4-bfb03d228527",
    "name": "Ebiten Maki",
    "categoryName": "Dessert",
    "price": "6957",
    "description": "A succulent venison steak, encased in a fresh chilli crust, served with a side of peppercorns mashed rhubarb.",
    "distance": 0.361,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=6715748550189105"
    ]
  },
  {
    "id": "c320325c-be3c-4da5-80ab-0016bfa083b1",
    "name": "Meatballs With Sauce",
    "categoryName": "Dessert",
    "price": "18344",
    "description": "An exquisite beef roast, infused with the essence of date, slow-roasted to bring out its natural flavors and served with a side of creamy lettuce",
    "distance": 9.106,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=6891156068220218"
    ]
  },
  {
    "id": "0f8251fb-0a87-4b63-9fd2-3460cc2654c4",
    "name": "Malaysian Chinese Plums Soup",
    "categoryName": "Dessert",
    "price": "4734",
    "description": "Hearty miso and beef stew, slow-cooked with cassia and radicchio for a comforting, flavorful meal.",
    "distance": 0.677,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=5328237121060767"
    ]
  },
  {
    "id": "e1a81ed1-f174-4480-89ed-f903af50d39e",
    "name": "Iceberg Lettuce-infused Ostrich",
    "categoryName": "Dessert",
    "price": "11521",
    "description": "Crispy fried crocodile bites, seasoned with balti stir fry mix and served with a tangy melon dipping sauce.",
    "distance": 0.542,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=7697305909163497"
    ]
  },
  {
    "id": "37187d4b-4f86-4735-9594-a67975e80a9b",
    "name": "Pork Sausage Roll",
    "categoryName": "Dessert",
    "price": "9430",
    "description": "A heartwarming Greek soup, featuring fresh alfalfa and an aromatic blend of traditional spices.",
    "distance": 2.104,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=3588367673346457"
    ]
  },
  {
    "id": "091a8d1a-dceb-439d-8a2f-6205b77a5a47",
    "name": "Pasta And Beans",
    "categoryName": "Dessert",
    "price": "18883",
    "description": "Tender beef skewers, glazed with a sweet and tangy goji berry sauce, served over a bed of fragrant jasmine rice.",
    "distance": 7.905,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=6028282838499769"
    ]
  },
  {
    "id": "6d24a7f4-9a56-478f-bff3-dcf2792d9dd2",
    "name": "Chicken Wings",
    "categoryName": "Dessert",
    "price": "12304",
    "description": "A classic pie filled with delicious kangaroo and crispy almonds, baked in a tender pastry crust and topped with a golden-brown lattice.",
    "distance": 0.773,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=327251063749365"
    ]
  }
]