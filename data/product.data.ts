import { Product } from "types/product.type";

export type ProductNearby = {
  distance: number;
} & Pick<Product, "id" | "name" | "categoryName" | "description" | "images" | "price">;

export const products: ProductNearby[] = [
  {
    id: "83e91263-1888-42ac-ada5-683eb482b1eb",
    name: "Kebab",
    categoryName: "Makanan",
    price: "13578",
    description:
      "A succulent duck steak, encased in a fluffy cardamom crust, served with a side of french lavender mashed capers.",
    distance: 0.799,
    images: ["https://loremflickr.com/1000/1000/food?lock=8807710590500303"],
  },
  {
    id: "e5f9fa38-8d7d-41da-b7ae-4f8191acf8bd",
    name: "Sunflower Oil And Pigeon Pie",
    categoryName: "Makanan",
    price: "4951",
    description: "50-day aged crocodile steak, with choice of 2 sides.",
    distance: 0.676,
    images: ["https://loremflickr.com/1000/1000/food?lock=458516401700750"],
  },
  {
    id: "14eb6655-6652-4478-9f72-29a0ebab378e",
    name: "Safflower Oil And Pork Pie",
    categoryName: "Makanan",
    price: "12967",
    description:
      "A delightful tart combining fluffy peas and sweet kiwiberry, set in a buttery pastry shell and finished with a hint of rice paper.",
    distance: 0.12,
    images: ["https://loremflickr.com/1000/1000/food?lock=8393689100410054"],
  },
  {
    id: "bbe1ef0b-3648-4479-8d8a-9e63b805bb14",
    name: "Arepas",
    categoryName: "Makanan",
    price: "5835",
    description: "A simple orange pie. No fancy stuff. Just pie.",
    distance: 0.343,
    images: ["https://loremflickr.com/1000/1000/food?lock=520550454024784"],
  },
  {
    id: "e375836b-6a4f-4952-bde4-7ec6ebf1315e",
    name: "Garlic Salad",
    categoryName: "Makanan",
    price: "2862",
    description:
      "Tender rabbit skewers, glazed with a sweet and tangy berry sauce, served over a bed of fragrant jasmine rice.",
    distance: 0.373,
    images: ["https://loremflickr.com/1000/1000/food?lock=3845057406964757"],
  },
  {
    id: "78294fd3-8371-436f-b794-45c89038ae24",
    name: "Tacos",
    categoryName: "Makanan",
    price: "17253",
    description:
      "A special red tapioca flour from Jamaica. To support the strong flavor it is sided with a tablespoon of ajwain seed.",
    distance: 14.965,
    images: ["https://loremflickr.com/1000/1000/food?lock=7256135132912075"],
  },
  {
    id: "646f34d2-6fb5-4c46-b86d-82b9a48fe83c",
    name: "Sour Quail With Peas",
    categoryName: "Makanan",
    price: "7771",
    description:
      "A special orange squid from Iran. To support the strong flavor it is sided with a tablespoon of mint.",
    distance: 0.605,
    images: ["https://loremflickr.com/1000/1000/food?lock=8449488534299230"],
  },
  {
    id: "56a3f0ed-2e94-4f19-93a9-95cbfa362c57",
    name: "Seafood Paella",
    categoryName: "Makanan",
    price: "14168",
    description:
      "A slow-roasted Black-chinned Hummingbird with a juicy, rich exterior. Stuffed with date and covered in cherry sauce. Sides with chives puree and wild swiss chard.",
    distance: 0.236,
    images: ["https://loremflickr.com/1000/1000/food?lock=7036449015860870"],
  },
  {
    id: "43ff5aa5-472e-4fa3-8f58-186c8464e148",
    name: "Risotto With Seafood",
    categoryName: "Makanan",
    price: "7627",
    description:
      "Crispy fried turkey bites, seasoned with turmeric and served with a tangy pear dipping sauce.",
    distance: 15.721,
    images: ["https://loremflickr.com/1000/1000/food?lock=2156819620046945"],
  },
  {
    id: "219f1c30-a8a6-4319-a81d-f8e2d9fb96f1",
    name: "Frankie's Special Dragonfruit",
    categoryName: "Makanan",
    price: "8385",
    description:
      "Grilled kangaroo kebabs, marinated in Latvian spices and served with a fresh okra and mandarin salad.",
    distance: 0.174,
    images: ["https://loremflickr.com/1000/1000/food?lock=4077747802422587"],
  },
  {
    id: "defc760a-40b6-4ab0-a4d1-7e2ee8152dc3",
    name: "Berniece's Special Elderberry",
    categoryName: "Makanan",
    price: "18839",
    description:
      "Tenderly braised crocodile in a rich pimento and sweet potato sauce, served with a side of creamy kohlrabi.",
    distance: 0.15,
    images: ["https://loremflickr.com/1000/1000/food?lock=4217724940450389"],
  },
  {
    id: "7efbe3c9-ff92-4da8-85ff-e1bc6f03f471",
    name: "Goose Steak",
    categoryName: "Makanan",
    price: "16798",
    description:
      "Grilled ostrich kebabs, marinated in Sindhi spices and served with a fresh celery and passionfruit salad.",
    distance: 0.475,
    images: ["https://loremflickr.com/1000/1000/food?lock=5282387271894213"],
  },
  {
    id: "7a74675c-317b-4597-822a-248322802255",
    name: "Turkey Steak",
    categoryName: "Makanan",
    price: "8031",
    description:
      "Tenderly braised turkey in a rich balti masala and broccolini sauce, served with a side of creamy squash.",
    distance: 0.547,
    images: ["https://loremflickr.com/1000/1000/food?lock=7249353411854192"],
  },
  {
    id: "8599aebf-d3df-410b-93c4-883e1f10efc4",
    name: "Tomato And Aubergine Tart",
    categoryName: "Makanan",
    price: "8365",
    description:
      "A classic pie filled with delicious beef and moist cantaloupe, baked in a crispy pastry crust and topped with a golden-brown lattice.",
    distance: 0.602,
    images: ["https://loremflickr.com/1000/1000/food?lock=4506535816283144"],
  },
  {
    id: "452cda3b-e491-4c59-8f00-f0b885290b1e",
    name: "Emu Steak",
    categoryName: "Makanan",
    price: "3049",
    description:
      "Juicy crocodile, grilled to your liking and drizzled with a bold five spice sauce, served alongside roasted green beans.",
    distance: 14.921,
    images: ["https://loremflickr.com/1000/1000/food?lock=2191488581631092"],
  },
  {
    id: "8ae5811b-a266-41d8-9430-4105f234ff6a",
    name: "Lasagne",
    categoryName: "Minuman",
    price: "19593",
    description:
      "A delightful tart combining moist artichoke and sweet berry, set in a buttery pastry shell and finished with a hint of poppy seed.",
    distance: 0.083,
    images: ["https://loremflickr.com/1000/1000/drink?lock=3111021210732918"],
  },
  {
    id: "61896f3e-123d-43a4-b5ee-bc8c170f8425",
    name: "Eggplant-infused Crocodile",
    categoryName: "Minuman",
    price: "5326",
    description:
      "Fresh rice flour with a pinch of ajwain seed, topped by a caramelized blueberry with whipped cream",
    distance: 18.475,
    images: ["https://loremflickr.com/1000/1000/drink?lock=230206008620064"],
  },
  {
    id: "eb80b01e-d72d-4003-8012-10482174f17c",
    name: "Mangosteen-infused Duck Roast",
    categoryName: "Minuman",
    price: "7934",
    description:
      "A slow-roasted Wilson's Warbler with a fresh, salty exterior. Stuffed with cumquat and covered in blood orange sauce. Sides with onion puree and wild cos lettuce.",
    distance: 19.226,
    images: ["https://loremflickr.com/1000/1000/drink?lock=1626112602939258"],
  },
  {
    id: "3cb25cb0-f889-4d5b-9a80-1d1ae1c51050",
    name: "Mahi Mahi-infused Emu",
    categoryName: "Minuman",
    price: "18859",
    description:
      "Fresh vegetable spaghetti with a pinch of oregano, topped by a caramelized blood orange with whipped cream",
    distance: 0.61,
    images: ["https://loremflickr.com/1000/1000/drink?lock=803197572942959"],
  },
  {
    id: "b4439667-5f3d-4a62-a2ea-c4bd06136b9f",
    name: "Quail With Blackberry Sauce",
    categoryName: "Minuman",
    price: "18518",
    description:
      "A succulent ostrich steak, encased in a sour poudre de colombo crust, served with a side of asafoetida mashed radicchio.",
    distance: 0.587,
    images: ["https://loremflickr.com/1000/1000/drink?lock=3262033421016879"],
  },
  {
    id: "cd920e1d-5d5a-4f00-b506-1a4545903d95",
    name: "Strawberry-glazed Kangaroo Skewers",
    categoryName: "Minuman",
    price: "2844",
    description:
      "A succulent venison steak, encased in a fresh balti masala crust, served with a side of fines herbes mashed cauliflower.",
    distance: 24.908,
    images: ["https://loremflickr.com/1000/1000/drink?lock=3679156791317440"],
  },
  {
    id: "b0edb05b-6a05-4107-a91a-d6ff67b45df7",
    name: "Incaberry Pie",
    categoryName: "Minuman",
    price: "15609",
    description:
      "Our tangy quail, slow-cooked to perfection, accompanied by steamed zucchini and a rich, savory gravy.",
    distance: 0.087,
    images: ["https://loremflickr.com/1000/1000/drink?lock=5550017932291567"],
  },
  {
    id: "ca4ece02-0cce-4f5f-90c6-57f04b60bcfd",
    name: "Rice Paper-rubbed Kangaroo Salad",
    categoryName: "Minuman",
    price: "16303",
    description:
      "A heartwarming Chinese Islamic soup, featuring fresh bamboo shoots and an aromatic blend of traditional spices.",
    distance: 0.358,
    images: ["https://loremflickr.com/1000/1000/drink?lock=3135598564661829"],
  },
  {
    id: "2386cbb4-62af-4aa9-9834-81facbe0837b",
    name: "Orange Pie",
    categoryName: "Minuman",
    price: "12704",
    description:
      "Grilled ostrich kebabs, marinated in Nepalese spices and served with a fresh okra and pear salad.",
    distance: 0.135,
    images: ["https://loremflickr.com/1000/1000/drink?lock=1842878744592241"],
  },
  {
    id: "ea42b1f3-9da0-4fc8-9bb3-05717ad07113",
    name: "Fluffy Ostrich With Radish",
    categoryName: "Minuman",
    price: "2252",
    description:
      "Grilled quail kebabs, marinated in Mexican spices and served with a fresh squash and rockmelon salad.",
    distance: 0.467,
    images: ["https://loremflickr.com/1000/1000/drink?lock=2293477648174821"],
  },
  {
    id: "1ee5d55f-ef7c-4dc4-90c8-a1b2b3a33408",
    name: "Pierogi",
    categoryName: "Minuman",
    price: "6859",
    description:
      "An exquisite venison roast, infused with the essence of guava, slow-roasted to bring out its natural flavors and served with a side of creamy cos lettuce",
    distance: 0.061,
    images: ["https://loremflickr.com/1000/1000/drink?lock=7855057511387353"],
  },
  {
    id: "ccc8d1ec-37c4-40f1-b295-8c3b2f4d1d92",
    name: "Ricotta Stuffed Ravioli",
    categoryName: "Minuman",
    price: "6705",
    description:
      "Baked pears-stuffed goose, seasoned with tarragon and crispy herbs, accompanied by roasted broccoli medley.",
    distance: 0.891,
    images: ["https://loremflickr.com/1000/1000/drink?lock=1773175163113949"],
  },
  {
    id: "484b3e03-f3b4-4f4b-a1ee-97781b5228d8",
    name: "Tina's Special Swordfish",
    categoryName: "Minuman",
    price: "16636",
    description:
      "Juicy rabbit, grilled to your liking and drizzled with a bold ras-el-hanout sauce, served alongside roasted asparagus.",
    distance: 0.062,
    images: ["https://loremflickr.com/1000/1000/drink?lock=978607164034597"],
  },
  {
    id: "bde47200-2103-4f49-8330-1a37cc448cad",
    name: "Ebiten Maki",
    categoryName: "Minuman",
    price: "2612",
    description:
      "Three gruyere with bok choy, turnips, carob carrot, lettuce and avocado oil. With a side of baked snowpea, and your choice of fresh chillies or cacao.",
    distance: 0.062,
    images: ["https://loremflickr.com/1000/1000/drink?lock=3665841538303709"],
  },
  {
    id: "b5d996ee-906b-44a9-b406-e4e8890d26c5",
    name: "Katsu Curry",
    categoryName: "Minuman",
    price: "15130",
    description:
      "Tender lamb skewers, glazed with a sweet and tangy tangelo sauce, served over a bed of fragrant jasmine rice.",
    distance: 0.354,
    images: ["https://loremflickr.com/1000/1000/drink?lock=6852735430310934"],
  },
  {
    id: "1a6963ba-40ea-4b87-94a3-9a35b2b1d333",
    name: "Pomegranate-glazed Rabbit Skewers",
    categoryName: "Salad",
    price: "4101",
    description:
      "A heartwarming Romanian soup, featuring fresh arugula and an aromatic blend of traditional spices.",
    distance: 0.691,
    images: ["https://loremflickr.com/1000/1000/salad?lock=3932531800802023"],
  },
  {
    id: "aa2d78ef-0295-451d-b725-f48d4d561b3d",
    name: "Tarragon-rubbed Kangaroo Salad",
    categoryName: "Salad",
    price: "7876",
    description:
      "A slow-roasted Blue-throated Hummingbird with a tangy, sour exterior. Stuffed with starfruit and covered in mangosteen sauce. Sides with red pepper puree and wild red pepper.",
    distance: 0.382,
    images: ["https://loremflickr.com/1000/1000/salad?lock=1671208514997433"],
  },
  {
    id: "86590215-c5ba-4bc8-bb98-f27cda3b696c",
    name: "Chinese Cabbage Salad",
    categoryName: "Salad",
    price: "9670",
    description:
      "A robust salty stew featuring Caribbean flavors, loaded with spicy meat, creamy vegetables, and a sweet, fresh broth.",
    distance: 0.086,
    images: ["https://loremflickr.com/1000/1000/salad?lock=6646158434168535"],
  },
  {
    id: "82616351-23d9-4fd0-913e-9ebef60c2b62",
    name: "Fish And Chips",
    categoryName: "Salad",
    price: "8547",
    description:
      "Hearty camellia tea oil and crocodile stew, slow-cooked with ginger and jerusalem artichoke for a comforting, flavorful meal.",
    distance: 0.502,
    images: ["https://loremflickr.com/1000/1000/salad?lock=1112991219805581"],
  },
  {
    id: "3539652a-5a4e-470f-97e0-611ec99e8487",
    name: "Tuna Sashimi",
    categoryName: "Salad",
    price: "17481",
    description:
      "Crispy fried duck bites, seasoned with ginger and served with a tangy cumquat dipping sauce.",
    distance: 0.907,
    images: ["https://loremflickr.com/1000/1000/salad?lock=5957472029960005"],
  },
  {
    id: "5af58bc6-df00-44a8-9004-f99343d79eb9",
    name: "Salty Salmon With Jicama",
    categoryName: "Salad",
    price: "14845",
    description:
      "Baked saffron-stuffed pork, seasoned with caraway seed and salty herbs, accompanied by roasted peppers medley.",
    distance: 15.31,
    images: ["https://loremflickr.com/1000/1000/salad?lock=1687356606490495"],
  },
  {
    id: "edbd1efb-390e-4225-8d91-131087ab9700",
    name: "Chicken Wings",
    categoryName: "Salad",
    price: "1589",
    description:
      "Fresh mixed greens tossed with herbes de provence-rubbed duck, jicama, and a light dressing.",
    distance: 10.163,
    images: ["https://loremflickr.com/1000/1000/salad?lock=6940036477826223"],
  },
  {
    id: "ec99e637-9a05-42f2-9608-337f27ddfce6",
    name: "Peking Duck",
    categoryName: "Salad",
    price: "5094",
    description:
      "A special turquoise nutritional yeast from Argentina. To support the strong flavor it is sided with a tablespoon of green cardamom.",
    distance: 0.542,
    images: ["https://loremflickr.com/1000/1000/salad?lock=8672182997964263"],
  },
  {
    id: "899e3c11-3d5c-4c7b-8058-85807c7326f8",
    name: "Thai Parsley Soup",
    categoryName: "Salad",
    price: "16697",
    description:
      "Juicy rabbit, grilled to your liking and drizzled with a bold curry sauce, served alongside roasted radish.",
    distance: 3.937,
    images: ["https://loremflickr.com/1000/1000/salad?lock=3924960152826280"],
  },
  {
    id: "e2c0b48a-5d41-4244-85db-b268f7e70226",
    name: "Pork Belly Buns",
    categoryName: "Salad",
    price: "10137",
    description:
      "A robust crispy stew featuring Udupi flavors, loaded with spicy meat, moist vegetables, and a salty, tender broth.",
    distance: 0.549,
    images: ["https://loremflickr.com/1000/1000/salad?lock=6498358092321504"],
  },
  {
    id: "c812c6ee-2573-40e8-ad87-ad15488f93df",
    name: "Rich Turkey With Zucchini",
    categoryName: "Salad",
    price: "14176",
    description:
      "A slow-roasted Red Phalarope with a sweet, rich exterior. Stuffed with starfruit and covered in bush tomato sauce. Sides with onion puree and wild onion.",
    distance: 0.691,
    images: ["https://loremflickr.com/1000/1000/salad?lock=1168383805404687"],
  },
  {
    id: "cb889a81-ff3d-4ead-ae0d-09e0a3594b96",
    name: "Mushroom Risotto",
    categoryName: "Salad",
    price: "9663",
    description:
      "Three celery with hijiki, bean shoots, snowpea sprouts, dried chinese broccoli and dark chocolate. With a side of baked jarrahdale pumpkin, and your choice of squid or spinach.",
    distance: 0.775,
    images: ["https://loremflickr.com/1000/1000/salad?lock=3614545987673257"],
  },
  {
    id: "f39ebfeb-f5ce-4b9d-b0eb-4623feaf45b2",
    name: "Scotch Eggs",
    categoryName: "Salad",
    price: "2237",
    description:
      "A heartwarming Nepalese soup, featuring fresh nutritional yeast and an aromatic blend of traditional spices.",
    distance: 10.91,
    images: ["https://loremflickr.com/1000/1000/salad?lock=6048177966313571"],
  },
  {
    id: "6488167f-4315-49f2-8205-9fb9e245584c",
    name: "Chicken Milanese",
    categoryName: "Salad",
    price: "8311",
    description:
      "Hearty kale and turkey stew, slow-cooked with tarragon and okra for a comforting, flavorful meal.",
    distance: 9.769,
    images: ["https://loremflickr.com/1000/1000/salad?lock=8887369807941891"],
  },
  {
    id: "1571699c-07a7-44cc-84e7-5a90756011b5",
    name: "Savannah's Special Agar",
    categoryName: "Salad",
    price: "19355",
    description:
      "A special orange cornmeal from Netherlands. To support the strong flavor it is sided with a tablespoon of garlic.",
    distance: 0.786,
    images: ["https://loremflickr.com/1000/1000/salad?lock=1631557296819540"],
  },
  {
    id: "ea45def7-0ec3-456b-b468-dfa19df32ee7",
    name: "Eliza's Special Elderberry",
    categoryName: "Dessert",
    price: "11623",
    description:
      "Three avocado spread with red cabbage, red pepper, bean shoots, arugula and buckwheat noodles. With a side of baked tangelo, and your choice of iceberg lettuce or cavalo.",
    distance: 0.875,
    images: ["https://loremflickr.com/1000/1000/dessert?lock=3838882353920286"],
  },
  {
    id: "6266e9b1-798b-4443-a905-60842a8a05ae",
    name: "Pasta Carbonara",
    categoryName: "Dessert",
    price: "19616",
    description: "A simple kiwiberry pie. No fancy stuff. Just pie.",
    distance: 1.44,
    images: ["https://loremflickr.com/1000/1000/dessert?lock=3377075488513031"],
  },
  {
    id: "d8941d48-07fa-44e6-8372-29de5f917447",
    name: "French Toast",
    categoryName: "Dessert",
    price: "18213",
    description:
      "Grilled rabbit kebabs, marinated in Chinese spices and served with a fresh bean sprouts and loquat salad.",
    distance: 2.698,
    images: ["https://loremflickr.com/1000/1000/dessert?lock=5775804667465201"],
  },
  {
    id: "9656e3f6-2f0d-49e8-b71f-beb333abfd59",
    name: "Red Wine-infused Rabbit",
    categoryName: "Dessert",
    price: "5832",
    description:
      "A heartwarming Armenian soup, featuring fresh wakame and an aromatic blend of traditional spices.",
    distance: 0.851,
    images: ["https://loremflickr.com/1000/1000/dessert?lock=729943875455831"],
  },
  {
    id: "0466f262-975c-4a3b-9d19-f750c46a370c",
    name: "Mozzarella And Pork Pie",
    categoryName: "Dessert",
    price: "6407",
    description:
      "Grilled crocodile kebabs, marinated in Czech spices and served with a fresh jicama and mangosteen salad.",
    distance: 0.473,
    images: ["https://loremflickr.com/1000/1000/dessert?lock=8189497336270838"],
  },
  {
    id: "3c211bb4-e91a-4a12-b798-c0bd7e5b6ca8",
    name: "Chicken Parm",
    categoryName: "Dessert",
    price: "3474",
    description:
      "Juicy pork, grilled to your liking and drizzled with a bold caraway seed sauce, served alongside roasted beetroot.",
    distance: 21.462,
    images: ["https://loremflickr.com/1000/1000/dessert?lock=6435506819091418"],
  },
  {
    id: "ac460afb-0bad-468c-9a49-940d1b073b53",
    name: "Golden Lamb With Peas",
    categoryName: "Dessert",
    price: "2916",
    description:
      "An exquisite venison roast, infused with the essence of dragonfruit, slow-roasted to bring out its natural flavors and served with a side of creamy jerusalem artichoke",
    distance: 0.429,
    images: ["https://loremflickr.com/1000/1000/dessert?lock=1525067620616369"],
  },
  {
    id: "438e8e58-5bdb-4542-a463-fedf7dc84d57",
    name: "Moist Kazakh Stew",
    categoryName: "Dessert",
    price: "13753",
    description:
      "A special salmon coconut oil from Greenland. To support the strong flavor it is sided with a tablespoon of cumin.",
    distance: 12.317,
    images: ["https://loremflickr.com/1000/1000/dessert?lock=6000171953561332"],
  },
  {
    id: "e52ce85c-0930-4330-86b7-204363ddc125",
    name: "Custard Apples Daikon-glazed Pork Skewers",
    categoryName: "Dessert",
    price: "16325",
    description:
      "Baked garam masala-stuffed salmon, seasoned with cumin and fresh herbs, accompanied by roasted cornichons medley.",
    distance: 0.02,
    images: ["https://loremflickr.com/1000/1000/dessert?lock=2576972727665233"],
  },
  {
    id: "4120de36-d2ac-4e04-9f6e-8b9761f23446",
    name: "Pappardelle Alla Bolognese",
    categoryName: "Dessert",
    price: "11911",
    description:
      "Fresh bulghur with a pinch of paprika, topped by a caramelized apple with whipped cream",
    distance: 0.198,
    images: ["https://loremflickr.com/1000/1000/dessert?lock=2884863937117689"],
  },
  {
    id: "9897ca91-50fe-4481-b521-124f38a1417e",
    name: "Cauliflower Penne",
    categoryName: "Dessert",
    price: "16998",
    description:
      "Hearty blue swimmer crab and pigeon stew, slow-cooked with baharat and sun dried tomatoes for a comforting, flavorful meal.",
    distance: 0.793,
    images: ["https://loremflickr.com/1000/1000/dessert?lock=4686577335129268"],
  },
  {
    id: "dff76ae7-fab3-4ad8-b7b4-2ade618a1f3e",
    name: "Mangosteen Pie",
    categoryName: "Dessert",
    price: "15470",
    description:
      "A heartwarming Buddhist soup, featuring fresh bok choy and an aromatic blend of traditional spices.",
    distance: 0.528,
    images: ["https://loremflickr.com/1000/1000/dessert?lock=1720465373679160"],
  },
  {
    id: "9e4f011f-8766-4760-af71-26b5b8e1dacc",
    name: "Turkey With Mulberry Sauce",
    categoryName: "Dessert",
    price: "1202",
    description:
      "A succulent beef steak, encased in a sour peppercorns crust, served with a side of lemon grass mashed jerusalem artichoke.",
    distance: 0.548,
    images: ["https://loremflickr.com/1000/1000/dessert?lock=323403098021049"],
  },
  {
    id: "15a36548-97ac-44d7-ae27-c6bd382caf87",
    name: "Tarragon-rubbed Goose Salad",
    categoryName: "Dessert",
    price: "14629",
    description:
      "Fresh mixed greens tossed with anise-rubbed turkey, parsnip, and a light dressing.",
    distance: 0.465,
    images: ["https://loremflickr.com/1000/1000/dessert?lock=1552551535529695"],
  },
  {
    id: "cdda90e1-13d0-4d5b-a9d8-07e355c76559",
    name: "Loquat And Sultana Tart",
    categoryName: "Dessert",
    price: "9676",
    description:
      "Hearty coriander leaves and emu stew, slow-cooked with tarragon and snowpea sprouts for a comforting, flavorful meal.",
    distance: 0.328,
    images: ["https://loremflickr.com/1000/1000/dessert?lock=2537561047281338"],
  },
];
