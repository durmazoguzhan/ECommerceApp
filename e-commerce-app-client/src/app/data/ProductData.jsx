import img1 from "../../assets/img/product-image/product1.png";
import img2 from "../../assets/img/product-image/product2.png";
import img3 from "../../assets/img/product-image/product3.png";

export const ProductData = [
  {
    id: 1,
    labels: "Trending",
    category: "fashion",
    img: img1,
    hover_img: img2,
    title: "Green Dress For Woman",
    price: 38,
    description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
        The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.`,
    rating: {
      rate: 3.9,
      count: 30,
    },
    color: [
      {
        color: "green",
        img: img1,
        quantity: 1,
      },
      {
        color: "red",
        img: img2,
        quantity: 1,
      },
      {
        color: "blue",
        img: img3,
        quantity: 1,
      },
    ],
  },
  {
    id: 2,
    labels: "45% OFF",
    category: "fashion",
    img: img2,
    hover_img: img1,
    title: "T-Shirt For Men",
    price: 72,
    description: `Vivamus suscipit tortor eget felis porttitor volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
         Proin eget tortor risus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus.`,
    rating: {
      rate: 3.3,
      count: 80,
    },
    color: [
      {
        color: "green",
        img: img1,
        quantity: 1,
      },
      {
        color: "red",
        img: img2,
        quantity: 1,
      },
      {
        color: "blue",
        img: img3,
        quantity: 1,
      },
    ],
  },
  {
    id: 3,
    labels: "50% OFF",
    category: "fashion",
    img: img3,
    hover_img: img1,
    title: "V-Neck Dress",
    price: 34,
    description: `Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ante ipsum primis in 
        faucibus orci luctus et ultrices posuere cubilia Curae;`,
    rating: {
      rate: 4.9,
      count: 156,
    },
    color: [
      {
        color: "green",
        img: img1,
        quantity: 1,
      },
      {
        color: "red",
        img: img2,
        quantity: 1,
      },
      {
        color: "blue",
        img: img3,
        quantity: 1,
      },
    ],
  },
];
