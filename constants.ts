import { Product, Review } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Hamburguesas de Pollo",
    description: "Deliciosa pechuga de pollo seleccionada con el toque especial de las primas.",
    price: 6.00,
    image: "https://buenazo.cronosmedia.glr.pe/original/2023/04/25/6448830f1c68e76d5f6a426d.png",
    category: "Comida",
    stock: 15,
    maxStock: 25
  },
  {
    id: 2,
    name: "Chorizos en Palito",
    description: "Chorizo artesanal servido en palito, perfecto para comer al paso.",
    price: 3.00,
    image: "https://portal.critica.com.pa/archivo/01022005/imagenes/coc01.jpg",
    category: "Comida",
    stock: 30,
    maxStock: 50
  },
  {
    id: 3,
    name: "Agua en Botella",
    description: "Agua mineral fresca y purificada de 625 ml.",
    price: 1.50,
    image: "https://plazavea.vteximg.com.br/arquivos/ids/31375714-450-450/20190927.jpg?v=638838896994600000",
    category: "Bebidas",
    stock: 45,
    maxStock: 60
  },
  {
    id: 10,
    name: "Chicha Morada en Botella",
    description: "Refrescante chicha morada tradicional hecha con maíz morado y un toque de limón.",
    price: 1.50,
    image: "https://tofuu.getjusto.com/orioneat-local/resized2/NkfR48gaHk6mqGryY-300-x.webp",
    category: "Bebidas",
    stock: 40,
    maxStock: 60
  },
  {
    id: 4,
    name: "Cerveza",
    description: "Cerveza rubia bien helada, ideal para acompañar tus chorizos.",
    price: 8.00,
    image: "https://s3.amazonaws.com/bsalemarket/75518/product/889049pilsen-lata-473-web.jpg",
    category: "Bebidas",
    stock: 20,
    maxStock: 40
  },
  {
    id: 5,
    name: "Gelatina de Piña (Vaso)",
    description: "Refrescante gelatina de piña servida en vaso individual.",
    price: 1.50,
    image: "https://media.falabella.com/tottusPE/42033217_1/public",
    category: "Postres",
    stock: 12,
    maxStock: 20
  },
  {
    id: 6,
    name: "Gelatina de Fresa (Vaso)",
    description: "Dulce gelatina de fresa servida en vaso con la firmeza ideal.",
    price: 1.50,
    image: "https://images.rappi.pe/products/1718031680446_1718031678151_1718031679952.png",
    category: "Postres",
    stock: 12,
    maxStock: 20
  },
  {
    id: 7,
    name: "Gelatina de Fresa (Bolsita)",
    description: "Clásica gelatina de fresa en bolsita, como un delicioso marciano.",
    price: 1.00,
    image: "https://i.ytimg.com/vi/kCrvjAcYomI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCkvAHn0Ng69LChphXTVivdqhB7rw",
    category: "Postres",
    stock: 25,
    maxStock: 40
  },
  {
    id: 8,
    name: "Gelatina de Piña (Bolsita)",
    description: "Refrescante gelatina de piña en bolsita, perfecta para el calor.",
    price: 1.00,
    image: "https://i.ytimg.com/vi/E204XjSoJBI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCcCCUAISt3KLU62D_OPR5TjPBTdA",
    category: "Postres",
    stock: 25,
    maxStock: 40
  },
  {
    id: 9,
    name: "Gaseosa Pepsi",
    description: "Pepsi helada de 500ml para refrescar tu paladar.",
    price: 2.00,
    image: "https://mercaderiasperu.com/assets/uploads/86564017b7adaaa1786331bf27480db9.png",
    category: "Bebidas",
    stock: 30,
    maxStock: 48
  }
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    user: "Maria Gonzalez",
    rating: 5,
    comment: "Las hamburguesas de pollo son espectaculares. ¡Súper recomendadas!",
    date: "2023-11-20",
    avatar: "https://i.pravatar.cc/150?u=maria"
  },
  {
    id: 2,
    user: "Juan Perez",
    rating: 4,
    comment: "Atención muy amable y los productos llegaron calientes. Los chorizos son un 10.",
    date: "2023-11-18",
    avatar: "https://i.pravatar.cc/150?u=juan"
  },
  {
    id: 3,
    user: "Carla Ruiz",
    rating: 5,
    comment: "Me encanta pedir aquí, siempre es rápido y confiable. El Yape hace todo más fácil.",
    date: "2023-11-15",
    avatar: "https://i.pravatar.cc/150?u=carla"
  }
];