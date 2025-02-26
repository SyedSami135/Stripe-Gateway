"use client"
import { store } from "@/store";
import { Provider } from "react-redux";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});


const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={`${poppins.className} bg-foreground  text-primary-foreground antialiased`}>
    <Provider store={store}>

      {children}
    </Provider>
    </div>
  );
};

export default Layout;
