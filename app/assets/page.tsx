import CartIconQty from "@/components/CartIconQty";
import ProductCard from "@/components/productCard";

import Link from "next/link";

const DigitalAssets = () => {
  return (
    <div>
      <Link
        href=" /assets/buy"
        className="text-secondary absolute top-5 right-10  "
      >
        <CartIconQty />
      </Link>
      <ProductCard />
    </div>
  );
};

export default DigitalAssets;
