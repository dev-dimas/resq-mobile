import { Product } from "types/product.type";

  export type ProductNearby = {
    distance: number;
  } & Pick<Product, "id" | "name" | "categoryName" | "description" | "images" | "price">;
  
  export const products: ProductNearby[] = [
  {
    "id": "9731ef4f-3321-40e8-bb89-136bdcb4c647",
    "name": "Lemon Pie",
    "categoryName": "Makanan",
    "price": "17624",
    "description": "13-day aged crocodile steak, with choice of 4 sides.",
    "distance": 0.015,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=721756121580264"
    ]
  },
  {
    "id": "28dbaf56-55e6-4280-8298-dc33cddde1cd",
    "name": "Philadelphia Maki",
    "categoryName": "Makanan",
    "price": "8012",
    "description": "A succulent ostrich steak, encased in a juicy basil crust, served with a side of baharat mashed peas.",
    "distance": 21464.861,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=1638601030745595"
    ]
  },
  {
    "id": "b571b98f-5a9b-454e-bf29-5cfd9fd8fc1e",
    "name": "Incaberry-glazed Quail Skewers",
    "categoryName": "Makanan",
    "price": "19111",
    "description": "A classic pie filled with delicious quail and bitter oat flour, baked in a smoky pastry crust and topped with a golden-brown lattice.",
    "distance": 0.395,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=2930501827607574"
    ]
  },
  {
    "id": "acae79b3-8544-4237-b8db-7769c46b325c",
    "name": "Starfruit-infused Duck Roast",
    "categoryName": "Makanan",
    "price": "5424",
    "description": "Juicy lamb, grilled to your liking and drizzled with a bold baharat sauce, served alongside roasted english spinach.",
    "distance": 0.28,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=3843856903040409"
    ]
  },
  {
    "id": "abd0bef9-61ed-4a84-bbab-b6620a0cb315",
    "name": "Fettuccine Alfredo",
    "categoryName": "Makanan",
    "price": "9183",
    "description": "A special lime bean sprouts from Sint Maarten. To support the strong flavor it is sided with a tablespoon of chervil.",
    "distance": 0.958,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=4826120078972020"
    ]
  },
  {
    "id": "9b93ba13-76b5-40c6-8071-ebd28646150a",
    "name": "French Fries With Sausages",
    "categoryName": "Makanan",
    "price": "4046",
    "description": "A robust golden stew featuring Mordovian flavors, loaded with smoky meat, tangy vegetables, and a tender, sweet broth.",
    "distance": 9237.063,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=5984777532470928"
    ]
  },
  {
    "id": "367dfcf8-1319-4bb2-97c6-0d529b312cf4",
    "name": "Lamb Steak",
    "categoryName": "Makanan",
    "price": "11943",
    "description": "A special indigo kumera from Bonaire, Sint Eustatius and Saba. To support the strong flavor it is sided with a tablespoon of cinnamon.",
    "distance": 0.764,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=2404878551383297"
    ]
  },
  {
    "id": "2cf470fa-8b16-4bfb-bdf0-4e9e52795905",
    "name": "Creamy Rabbit With Butternut Lettuce",
    "categoryName": "Makanan",
    "price": "9031",
    "description": "Hearty papaw and pork stew, slow-cooked with vanilla and rhubarb for a comforting, flavorful meal.",
    "distance": 17579.779,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=581973158505739"
    ]
  },
  {
    "id": "885fcbd6-696b-4ab5-9350-f0aafa852093",
    "name": "Seafood Paella",
    "categoryName": "Makanan",
    "price": "11000",
    "description": "A classic pie filled with delicious pigeon and tangy asafoetida, baked in a spicy pastry crust and topped with a golden-brown lattice.",
    "distance": 0.021,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=2988917458560144"
    ]
  },
  {
    "id": "c27230bd-0395-4d4c-8f91-8b68c1d68328",
    "name": "Tacos",
    "categoryName": "Makanan",
    "price": "18993",
    "description": "A simple goji berry pie. No fancy stuff. Just pie.",
    "distance": 8915.652,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=3563079354945651"
    ]
  },
  {
    "id": "b8e92f72-fdfa-4bcc-870d-146bddb4b459",
    "name": "Vanilla-crusted Duck",
    "categoryName": "Makanan",
    "price": "3626",
    "description": "Crispy fried goose bites, seasoned with annatto seed and served with a tangy loquat dipping sauce.",
    "distance": 0.91,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=5678356995985332"
    ]
  },
  {
    "id": "9165b1e8-6acb-4459-8a60-1839d89c2a36",
    "name": "Salty Emu With Jerusalem Artichoke",
    "categoryName": "Makanan",
    "price": "14792",
    "description": "A slow-roasted Seaside Sparrow with a smoky, salty exterior. Stuffed with passionfruit and covered in nectarine sauce. Sides with broccoli puree and wild chinese cabbage.",
    "distance": 0.682,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=1986114877473721"
    ]
  },
  {
    "id": "f1b8633f-5ae6-43c5-b71b-37f62bcb625e",
    "name": "Ebiten Maki",
    "categoryName": "Makanan",
    "price": "7686",
    "description": "A succulent venison steak, encased in a fresh tikka masala crust, served with a side of allspice mashed chives.",
    "distance": 22680.916,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=7093145118971245"
    ]
  },
  {
    "id": "478ea70d-3477-491a-af75-69be018e0fbc",
    "name": "Ricotta Stuffed Ravioli",
    "categoryName": "Makanan",
    "price": "15582",
    "description": "Three provolone with arugula, cornichons, zucchini, kohlrabi and brazil nut. With a side of baked goji berry, and your choice of jerusalem artichoke or purple carrot.",
    "distance": 123.785,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=6973236575206357"
    ]
  },
  {
    "id": "ea1247fe-122e-4687-b9b8-f4ab1eba7cc2",
    "name": "Spicy Crocodile With Lettuce",
    "categoryName": "Makanan",
    "price": "10634",
    "description": "Fresh goat cheese with a pinch of ajwan seed, topped by a caramelized loquat with whipped cream",
    "distance": 18657.266,
    "images": [
      "https://loremflickr.com/1000/1000/food?lock=5280181409526549"
    ]
  },
  {
    "id": "08df6761-2604-4fbe-b37f-3456e2d27a1b",
    "name": "Lilliana's Special Duck",
    "categoryName": "Minuman",
    "price": "14634",
    "description": "59-day aged kangaroo steak, with choice of 4 sides.",
    "distance": 0.463,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=7276860953597813"
    ]
  },
  {
    "id": "91d47523-7b52-4bcd-80af-bea480da5a1a",
    "name": "Sushi",
    "categoryName": "Minuman",
    "price": "9027",
    "description": "83-day aged duck steak, with choice of 2 sides.",
    "distance": 0.43,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=5309440332395735"
    ]
  },
  {
    "id": "cc3b8758-2d78-49d7-8d9c-e7a6cd546d9f",
    "name": "Lobster And Emu Pie",
    "categoryName": "Minuman",
    "price": "11246",
    "description": "Tender ostrich skewers, glazed with a sweet and tangy banana sauce, served over a bed of fragrant jasmine rice.",
    "distance": 0.787,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=6489898838237246"
    ]
  },
  {
    "id": "495f8c3b-eab0-442f-b363-95a571aaf62a",
    "name": "Blackberry-infused Ostrich Roast",
    "categoryName": "Minuman",
    "price": "6299",
    "description": "Our salty crocodile, slow-cooked to perfection, accompanied by steamed beetroot and a rich, savory gravy.",
    "distance": 0.536,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=7357253209029225"
    ]
  },
  {
    "id": "418eaeed-294c-4fb1-b877-74946bd9f1c2",
    "name": "Chicken Parm",
    "categoryName": "Minuman",
    "price": "19525",
    "description": "A special mint green white rice from Nigeria. To support the strong flavor it is sided with a tablespoon of piri piri.",
    "distance": 0.886,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=4178788347776009"
    ]
  },
  {
    "id": "814898a3-6264-4d63-b502-eed3cf776bbb",
    "name": "Cream Cheese And Quail Pie",
    "categoryName": "Minuman",
    "price": "14623",
    "description": "Crispy fried venison bites, seasoned with sage and served with a tangy pear dipping sauce.",
    "distance": 6398.343,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=1434621185632013"
    ]
  },
  {
    "id": "fa3741ff-0621-48b8-be90-99580730be46",
    "name": "Pierogi",
    "categoryName": "Minuman",
    "price": "12012",
    "description": "A simple starfruit pie. No fancy stuff. Just pie.",
    "distance": 3291.453,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=4600547999627351"
    ]
  },
  {
    "id": "8f093201-1a34-4bba-b835-ef688a2df6b5",
    "name": "Cauliflower Penne",
    "categoryName": "Minuman",
    "price": "15559",
    "description": "Fresh mixed greens tossed with chervil-rubbed kangaroo, okra, and a light dressing.",
    "distance": 0.829,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=2040643703332870"
    ]
  },
  {
    "id": "90ef7cbe-24c9-4603-8b1f-57d64a751689",
    "name": "Blueberry Pie",
    "categoryName": "Minuman",
    "price": "6285",
    "description": "Baked buttermilk-stuffed turkey, seasoned with curry and crunchy herbs, accompanied by roasted hijiki medley.",
    "distance": 11139.132,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=4727220758440239"
    ]
  },
  {
    "id": "40fcbf16-0b01-4a13-a21e-90481af84f9f",
    "name": "Pasta And Beans",
    "categoryName": "Minuman",
    "price": "19386",
    "description": "44-day aged duck steak, with choice of 2 sides.",
    "distance": 0.044,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=2894479787271076"
    ]
  },
  {
    "id": "92ba06f2-640c-448e-b6ec-8ab86f49203f",
    "name": "Pasta Carbonara",
    "categoryName": "Minuman",
    "price": "1720",
    "description": "Hearty fresh chillies and duck stew, slow-cooked with ras-el-hanout and artichoke for a comforting, flavorful meal.",
    "distance": 0.516,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=6320155107027821"
    ]
  },
  {
    "id": "07b5b936-772d-4933-9885-443d50727c95",
    "name": "Cumin-crusted Crocodile",
    "categoryName": "Minuman",
    "price": "3406",
    "description": "A slow-roasted Purple Gallinule with a savory, zesty exterior. Stuffed with mango and covered in mango sauce. Sides with jerusalem artichoke puree and wild cornichons.",
    "distance": 0.132,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=5307029072473383"
    ]
  },
  {
    "id": "01d9275d-02ca-4c82-8a6f-5e5a578cfebc",
    "name": "Peach-glazed Kangaroo Skewers",
    "categoryName": "Minuman",
    "price": "17610",
    "description": "99-day aged chicken steak, with choice of 4 sides.",
    "distance": 0.098,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=4603344874871502"
    ]
  },
  {
    "id": "c031586f-e8e0-4a9d-a1c0-699ab0f4b56d",
    "name": "Yellowtail Kingfish-infused Quail",
    "categoryName": "Minuman",
    "price": "13300",
    "description": "Tender emu skewers, glazed with a sweet and tangy bush tomato sauce, served over a bed of fragrant jasmine rice.",
    "distance": 0.36,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=6738963420800538"
    ]
  },
  {
    "id": "206db85a-4cd1-42e7-b712-1f03d1f6b170",
    "name": "Romanian Besan Soup",
    "categoryName": "Minuman",
    "price": "5678",
    "description": "A succulent duck steak, encased in a juicy liquorice root crust, served with a side of paprika mashed purple carrot.",
    "distance": 0.748,
    "images": [
      "https://loremflickr.com/1000/1000/drink?lock=4982377556783004"
    ]
  },
  {
    "id": "6036aed8-e58d-4551-9401-d007224e5c8c",
    "name": "Pork Sausage Roll",
    "categoryName": "Salad",
    "price": "8999",
    "description": "A robust sweet stew featuring Laotian flavors, loaded with bitter meat, tender vegetables, and a crispy, delicious broth.",
    "distance": 0.939,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=6158212432749109"
    ]
  },
  {
    "id": "5fea5c98-83b2-4c65-8700-ae03df677d9d",
    "name": "Celery-crusted Beef",
    "categoryName": "Salad",
    "price": "18869",
    "description": "Tenderly braised quail in a rich curry and eggplant sauce, served with a side of creamy dried chinese broccoli.",
    "distance": 5930.257,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=5452615487271256"
    ]
  },
  {
    "id": "33bff7c3-44ef-40f9-8a6b-87c70b3d7359",
    "name": "Savory Keralite Stew",
    "categoryName": "Salad",
    "price": "12182",
    "description": "Grilled turkey kebabs, marinated in Pashtun spices and served with a fresh swiss chard and lime salad.",
    "distance": 21728.472,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=7138157096045732"
    ]
  },
  {
    "id": "21bf2e50-8c84-4442-9cf6-81185da49a65",
    "name": "Carrot-infused Kangaroo",
    "categoryName": "Salad",
    "price": "6039",
    "description": "Our creamy quail, slow-cooked to perfection, accompanied by steamed artichoke and a rich, savory gravy.",
    "distance": 0.346,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=3832451613673141"
    ]
  },
  {
    "id": "e41567af-cb77-4552-8a37-64f69e43e6fa",
    "name": "Pasta With Tomato And Basil",
    "categoryName": "Salad",
    "price": "3410",
    "description": "A special fuchsia avocado spread from Bulgaria. To support the strong flavor it is sided with a tablespoon of fenugreek.",
    "distance": 0.158,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=2737691737719610"
    ]
  },
  {
    "id": "41bfc473-3ff7-4330-bde1-dd803dd5b36c",
    "name": "Moist Spanish Stew",
    "categoryName": "Salad",
    "price": "11220",
    "description": "Grilled chicken kebabs, marinated in English spices and served with a fresh parsnip and olive salad.",
    "distance": 0.664,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=345488438676388"
    ]
  },
  {
    "id": "ef4c777b-679b-4fc1-a95b-1f25304408b3",
    "name": "Jolie's Special Honey",
    "categoryName": "Salad",
    "price": "15670",
    "description": "Our savory salmon, slow-cooked to perfection, accompanied by steamed bok choy and a rich, savory gravy.",
    "distance": 0.933,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=106746860680535"
    ]
  },
  {
    "id": "2fe8d2b9-83fc-49bc-9253-76be31d5aba9",
    "name": "Bunny Chow",
    "categoryName": "Salad",
    "price": "10599",
    "description": "Fresh unbleached flour with a pinch of basil, topped by a caramelized lychee with whipped cream",
    "distance": 0.109,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=3528263412102164"
    ]
  },
  {
    "id": "8268a31d-6470-4452-8d8a-f4eaf0bc98fa",
    "name": "Arrowroot-infused Venison",
    "categoryName": "Salad",
    "price": "5883",
    "description": "Baked cannellini beans-stuffed venison, seasoned with herbes de provence and bitter herbs, accompanied by roasted zucchini medley.",
    "distance": 0.249,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=5193212977621513"
    ]
  },
  {
    "id": "19fffa9b-7841-44ae-8bc7-52adebce9c20",
    "name": "Mushroom Risotto",
    "categoryName": "Salad",
    "price": "8162",
    "description": "Our bitter lamb, slow-cooked to perfection, accompanied by steamed celery and a rich, savory gravy.",
    "distance": 0.031,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=7530592949595175"
    ]
  },
  {
    "id": "a39595f3-eb58-4514-a8ac-b2a8cdfaa35a",
    "name": "Pho",
    "categoryName": "Salad",
    "price": "2508",
    "description": "Three cottage cheese with swiss chard, beans, beans, butternut lettuce and milk chocolate. With a side of baked sultana, and your choice of pandanus leaves or vinegar.",
    "distance": 0.685,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=7507570125930185"
    ]
  },
  {
    "id": "1825344d-4280-498a-ba91-05749f5bb697",
    "name": "Caprese Salad",
    "categoryName": "Salad",
    "price": "16834",
    "description": "Three swiss chard with beetroot, hijiki, garlic, radish and wholewheat flour. With a side of baked melon, and your choice of potatoes or pears.",
    "distance": 17633.326,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=857775812758938"
    ]
  },
  {
    "id": "15c0e268-e549-4353-a8d8-b40a3fe71f45",
    "name": "Nashi Pear Pie",
    "categoryName": "Salad",
    "price": "16723",
    "description": "Fresh mixed greens tossed with fines herbes-rubbed duck, peas, and a light dressing.",
    "distance": 0.962,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=4863580406750955"
    ]
  },
  {
    "id": "70ca6009-c90b-4dce-9453-a0256b036372",
    "name": "Udupi Parsnip Soup",
    "categoryName": "Salad",
    "price": "3814",
    "description": "Juicy crocodile, grilled to your liking and drizzled with a bold cinnamon sauce, served alongside roasted jerusalem artichoke.",
    "distance": 0.806,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=3289750993633551"
    ]
  },
  {
    "id": "abbb5674-455d-4044-9573-9bf3eab938aa",
    "name": "Passionfruit-infused Pork Roast",
    "categoryName": "Salad",
    "price": "6539",
    "description": "A delightful tart combining zesty green beans and sweet goji berry, set in a buttery pastry shell and finished with a hint of fenugreek.",
    "distance": 0.153,
    "images": [
      "https://loremflickr.com/1000/1000/salad?lock=7584820509632945"
    ]
  },
  {
    "id": "2fb7d144-7aa7-405e-ac58-d4c8290820e0",
    "name": "Dragonfruit And Lemon Tart",
    "categoryName": "Dessert",
    "price": "2493",
    "description": "Crispy fried quail bites, seasoned with dhansak and served with a tangy papaw dipping sauce.",
    "distance": 9447.684,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=6056735362169486"
    ]
  },
  {
    "id": "3e6e4d4e-9fde-4288-997b-6b54a5d1bec8",
    "name": "Pork With Cantaloupe Sauce",
    "categoryName": "Dessert",
    "price": "11250",
    "description": "A delightful tart combining zesty english spinach and sweet melon, set in a buttery pastry shell and finished with a hint of ajwan seed.",
    "distance": 22784.62,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=6478112715154822"
    ]
  },
  {
    "id": "3b786075-170b-4f01-86ec-e09c8249e420",
    "name": "Massaman Curry",
    "categoryName": "Dessert",
    "price": "12559",
    "description": "A succulent salmon steak, encased in a moist caraway seed crust, served with a side of french lavender mashed brussels sprouts.",
    "distance": 0.732,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=6726303806908838"
    ]
  },
  {
    "id": "9fb11d9f-d245-4924-8b78-94e14583b237",
    "name": "Vegetable Stock And Salmon Pie",
    "categoryName": "Dessert",
    "price": "10724",
    "description": "Crispy fried beef bites, seasoned with ajwan seed and served with a tangy strawberry dipping sauce.",
    "distance": 0.117,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=5754935287681149"
    ]
  },
  {
    "id": "6c6967f4-dd0d-46e9-94ac-39ba221b7316",
    "name": "Philadelphia Maki",
    "categoryName": "Dessert",
    "price": "19328",
    "description": "Three capsicum with peppers, carrot, turnips, cornichons and garam masala. With a side of baked passionfruit, and your choice of macadamia oil or quark.",
    "distance": 1238.683,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=870657600114076"
    ]
  },
  {
    "id": "0db5a9b8-79d7-44aa-a6b1-f49ee2186eab",
    "name": "Ebiten Maki",
    "categoryName": "Dessert",
    "price": "13499",
    "description": "Three silverbeet with cornichons, cos lettuce, cabbage, peppers and sweet potato. With a side of baked custard apples daikon, and your choice of margarine or spring onions.",
    "distance": 0.373,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=7061582692355376"
    ]
  },
  {
    "id": "0adddef7-0466-4403-86fc-10c562e5db50",
    "name": "Tandoori Masala-crusted Emu",
    "categoryName": "Dessert",
    "price": "5153",
    "description": "Juicy pigeon, grilled to your liking and drizzled with a bold german chamomile sauce, served alongside roasted radish.",
    "distance": 0.515,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=2044114314941485"
    ]
  },
  {
    "id": "b6dc619d-6e1c-460e-b8a9-b2c19ebaeb25",
    "name": "Fenugreek-rubbed Lamb Salad",
    "categoryName": "Dessert",
    "price": "3026",
    "description": "Three brie with english spinach, turnips, red cabbage, dried chinese broccoli and brown flour. With a side of baked jarrahdale pumpkin, and your choice of flaxseed oil or cannellini beans.",
    "distance": 0.55,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=2089142730467517"
    ]
  },
  {
    "id": "b2890dd3-219e-48fb-bc68-e2a8f5751543",
    "name": "Teriyaki Chicken Donburi",
    "categoryName": "Dessert",
    "price": "8777",
    "description": "Grilled ostrich kebabs, marinated in Sri Lankan spices and served with a fresh hijiki and melon salad.",
    "distance": 3861.08,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=3806419242792606"
    ]
  },
  {
    "id": "7420619c-a15e-424f-a51f-4667e90bc1f2",
    "name": "Chicken Parm",
    "categoryName": "Dessert",
    "price": "17935",
    "description": "A slow-roasted Little Gull with a smoky, golden exterior. Stuffed with lemon and covered in date sauce. Sides with raspberry puree and wild chives.",
    "distance": 0.432,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=3521406065077936"
    ]
  },
  {
    "id": "e571393e-dac9-41b8-bb04-0d28c6a852c9",
    "name": "Capers Salad",
    "categoryName": "Dessert",
    "price": "4116",
    "description": "A special sky blue soy milk from Grenada. To support the strong flavor it is sided with a tablespoon of zahtar.",
    "distance": 22917.115,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=789927232370895"
    ]
  },
  {
    "id": "12ebb25e-fe70-4e0b-a1dd-1fa915cd3aed",
    "name": "Orange-glazed Turkey Skewers",
    "categoryName": "Dessert",
    "price": "9694",
    "description": "A special pink milk from South Africa. To support the strong flavor it is sided with a tablespoon of mace.",
    "distance": 0.865,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=216106952472859"
    ]
  },
  {
    "id": "445dc96f-d3cb-4736-a293-5153ec64198e",
    "name": "California Maki",
    "categoryName": "Dessert",
    "price": "11184",
    "description": "Three smoked trout with garlic, green beans, snowpea sprouts, potatoes and goat cheese. With a side of baked fingerlime, and your choice of red wine vinegar or liver.",
    "distance": 0.052,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=2464499000366640"
    ]
  },
  {
    "id": "6a4c470b-61f9-4835-9ae7-5f0ce5fd5536",
    "name": "Grapes And Lamb Pie",
    "categoryName": "Dessert",
    "price": "14075",
    "description": "A simple watermelon pie. No fancy stuff. Just pie.",
    "distance": 497.242,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=406148444958334"
    ]
  },
  {
    "id": "f86435aa-9923-407d-94aa-512a6ef7d9db",
    "name": "Som Tam",
    "categoryName": "Dessert",
    "price": "14957",
    "description": "Three pork with sun dried tomatoes, bok choy, beans, arugula and soymilk. With a side of baked strawberry, and your choice of dandelion or gruyere.",
    "distance": 0.197,
    "images": [
      "https://loremflickr.com/1000/1000/dessert?lock=14451643726046"
    ]
  }
]