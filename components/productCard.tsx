"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { addToCart } from "../store/cartSlice";
import StarRating from "./Stars";

const ProductCard = () => {
  const dispatch = useDispatch();
  const digitalProducts = useSelector(
    (state: RootState) => state.digitalProducts.products
  );

 
  const handleAddToCart = (productId: number) => {
    const product = digitalProducts.find((p) => p.id === productId);
    if (!product) {
      return;
    }
    dispatch(addToCart({...product, quantity:1}));

    toast.success(`${product.title}  added to cart`, {
      position: "bottom-right",
      duration: 3000,
      icon: <ShoppingBagIcon className="h-6 w-6" />,
      style: {
        background: "#333",
        color: "#fff",
        border: 0,
      }
    })
  };

  return (
    <div className="flex text-secondary flex-col  h-screen p-10 overflow-y-scroll  ">
      <h1 className="text-4xl text-center font-semibold pt-10 "> Products</h1>
      {/* <button onClick={handleAddProduct}>Add Product</button> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-5 pb-10 lg:px-16 lg:pb-16 mt-8">
        {digitalProducts.map((product) => (
          <Card
            key={product.id}
            className="relative  group shadow-lg overflow-hidden rounded-xl  border-0 bg-primary hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <CardHeader className="h-96 lg:h-80 w-full p-0">
              <Image
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-in-out rounded-xl"
                src={product.imgUrl}
                alt={product.title}
                width={1000}
                height={1000}
              />
            </CardHeader>
            <CardContent className="absolute p-4 space-y-1 bottom-0 left-0  w-full bg-gradient-to-t from-black to-transparent  opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out text-secondary">
              <CardTitle className="tracking-wide  ">{product.title}</CardTitle>
              <CardDescription className="text-muted space-y-1 ">
                <span>Price ${product.price}</span>
                <StarRating rating={product.rating} size={16} />
              </CardDescription>
            </CardContent>
            <CardFooter className="absolute bottom-2 right-2 p-3 bg-primary opacity-50 group-hover:opacity-100 rounded-full text-secondary transition-transform duration-500 ease-in-out group-hover:scale-110 cursor-pointer">
              <ShoppingBagIcon
                onClick={() =>
                  handleAddToCart(product.id)
                }
                className="w-6 h-6"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default ProductCard;
