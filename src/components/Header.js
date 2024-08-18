import Link from 'next/link';
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { usePathname } from 'next/navigation';
const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const pathname = usePathname();
console.log(" pathname :",pathname)
  return (
    <header className="sticky top-0 z-50 bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {pathname === '/cart' &&
          <Link href="/" legacyBehavior>
          
            <span className="ml-1 text-20 cursor-pointer  text-white">Store</span>
          
        </Link>
          }
        </div>
        <div className="flex items-center space-x-6 text-white">
          
          <Link href="/cart" legacyBehavior>
            <a className="relative flex items-center">
              <ShoppingCartIcon/>
               {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1.5 py-0.5">
                  {cartItems.length}
                </span>
              )}
              <span className="ml-1 hidden md:flex">Cart</span>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
