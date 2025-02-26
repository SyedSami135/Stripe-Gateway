import CartProduct from "@/components/CartProduct";
import CartSummary from "@/components/cartSummary";


const page = () => {
  return (
    <>
     
        <div className="   md:gap-6 pt-4  lg:pt-8 lg:flex mx-auto max-w-screen-xl px-4 2xl:px-0 lg:items-start xl:gap-8 antialiased  lg:h-screen">
          <div className="mx-auto  w-full space-y-6 flex-none lg:max-w-2xl xl:max-w-4xl ">
            <h2 className="text-xl font-semibold  min-w-full mx-auto  text-secondary sm:text-2xl">
              Shopping Cart
            </h2>
           
            <CartProduct />

          </div>
          <CartSummary/>

          
        </div>
    </>
  

  );
};

export default page;
