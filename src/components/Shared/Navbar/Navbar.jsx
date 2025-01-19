


import Container from '../Container';
import { AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai';
import { useState } from 'react';
import { Link ,NavLink} from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import avatarImg from '../../../assets/images/placeholder.jpg';
import logo from '../../../assets/images/logo-flat.png';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleLogout = () => {
    logOut();
    setIsMenuOpen(false);
  };

  const activeLinkClass = "text-red-500 font-semibold";
  
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo and Website Name */}
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="logo" width="50" height="50" />
              {/* <span className="font-bold text-lg hidden md:block">Website Name</span> */}
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeLinkClass : "text-gray-600 hover:text-gray-800"
              }
            >
              Home
            </NavLink>
              <NavLink to="/shop" 
               className={({ isActive }) =>
                isActive ? activeLinkClass : "text-gray-600 hover:text-gray-800"
              }
              >
                Shop
              </NavLink>
              {/* cart icon section */}
              <NavLink to="/cart"
                className={({ isActive }) =>
                  isActive ? activeLinkClass : "text-gray-600 hover:text-gray-800"
                }
              >
                <AiOutlineShoppingCart size={20} />
              </NavLink>
              <div
                className="relative cursor-pointer"
                onClick={() => setIsLangOpen(!isLangOpen)}
              >
                <span className="text-sm font-medium hover:text-gray-600">Language</span>
                {isLangOpen && (
                  <div className="absolute top-8 right-0 bg-white shadow-md rounded-md">
                    <button className="block px-4 py-2 hover:bg-gray-100">English</button>
                    <button className="block px-4 py-2 hover:bg-gray-100">Spanish</button>
                  </div>
                )}
              </div>
              {!user && (
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Join Us
                </Link>
              )}
            </div>

            {/* Dropdown Menu for Mobile */}
            <div className="md:hidden relative">
              <div
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-3 border-[1px] border-neutral-200 rounded-full cursor-pointer hover:shadow-md"
              >
                <AiOutlineMenu size={20} />
              </div>
              {isMenuOpen && (
                <div className="absolute top-12 right-0 bg-white shadow-md rounded-md w-[60vw] overflow-hidden">
                  <Link
                    to="/"
                    className="block px-4 py-3 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/shop"
                    className="block px-4 py-3 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Shop
                  </Link>
                  <Link
                    to="/cart"
                    className="block px-4 py-3 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cart
                  </Link>
                  {user ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-3 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-4 py-3 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Update Profile
                      </Link>
                      <div
                        onClick={handleLogout}
                        className="block px-4 py-3 hover:bg-gray-100 cursor-pointer"
                      >
                        Logout
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-3 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-3 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Profile Picture Dropdown */}
            {user && (
              <div className="relative hidden md:block">
                <div
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <img
                    className="rounded-full"
                    referrerPolicy="no-referrer"
                    src={user.photoURL || avatarImg}
                    alt="profile"
                    width="35"
                    height="35"
                  />
                </div>
                {isMenuOpen && (
                  <div className="absolute right-0 top-12 bg-white shadow-md rounded-md w-[12vw] overflow-hidden">
                    <Link
                      to="/profile"
                      className="block px-4 py-3 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Update Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-3 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <div
                      onClick={handleLogout}
                      className="block px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;



// import { NavLink, Link } from 'react-router-dom';
// import { AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai';
// import { useState } from 'react';
// import useAuth from '../../../hooks/useAuth';
// import avatarImg from '../../../assets/images/placeholder.jpg';
// import logo from '../../../assets/images/logo-flat.png';

// const Navbar = () => {
//   const { user, logOut } = useAuth();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLogout = () => {
//     logOut();
//     setIsMenuOpen(false);
//   };

//   const activeLinkClass = "text-red-500 font-semibold";

//   return (
//     <div className="fixed w-full bg-white z-10 shadow-sm">
//       <div className="py-4 border-b-[1px]">
//         <div className="container mx-auto px-4 flex items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2">
//             <img src={logo} alt="logo" width="50" height="50" />
//             <span className="font-bold text-lg hidden md:block">Website Name</span>
//           </Link>

//           {/* Navigation Links */}
//           <div className="hidden md:flex items-center gap-6">
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 isActive ? activeLinkClass : "text-gray-600 hover:text-gray-800"
//               }
//             >
//               Home
//             </NavLink>
//             <NavLink
//               to="/shop"
//               className={({ isActive }) =>
//                 isActive ? activeLinkClass : "text-gray-600 hover:text-gray-800"
//               }
//             >
//               Shop
//             </NavLink>
//             <NavLink
//               to="/cart"
//               className={({ isActive }) =>
//                 isActive ? activeLinkClass : "text-gray-600 hover:text-gray-800"
//               }
//             >
//               <AiOutlineShoppingCart size={20} />
//             </NavLink>
//             {!user && (
//               <NavLink
//                 to="/signup"
//                 className={({ isActive }) =>
//                   isActive
//                     ? `${activeLinkClass} px-4 py-2 bg-red-100 rounded-md`
//                     : "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                 }
//               >
//                 Join Us
//               </NavLink>
//             )}
//           </div>

//           {/* Dropdown Menu for Mobile */}
//           <div className="md:hidden relative">
//             <div
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-3 border-[1px] border-neutral-200 rounded-full cursor-pointer hover:shadow-md"
//             >
//               <AiOutlineMenu size={20} />
//             </div>
//             {isMenuOpen && (
//               <div className="absolute top-12 right-0 bg-white shadow-md rounded-md w-[60vw] overflow-hidden">
//                 <NavLink
//                   to="/"
//                   className={({ isActive }) =>
//                     isActive
//                       ? `${activeLinkClass} block px-4 py-3`
//                       : "block px-4 py-3 hover:bg-gray-100"
//                   }
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Home
//                 </NavLink>
//                 <NavLink
//                   to="/shop"
//                   className={({ isActive }) =>
//                     isActive
//                       ? `${activeLinkClass} block px-4 py-3`
//                       : "block px-4 py-3 hover:bg-gray-100"
//                   }
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Shop
//                 </NavLink>
//                 <NavLink
//                   to="/cart"
//                   className={({ isActive }) =>
//                     isActive
//                       ? `${activeLinkClass} block px-4 py-3`
//                       : "block px-4 py-3 hover:bg-gray-100"
//                   }
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Cart
//                 </NavLink>
//                 {user ? (
//                   <>
//                     <NavLink
//                       to="/dashboard"
//                       className={({ isActive }) =>
//                         isActive
//                           ? `${activeLinkClass} block px-4 py-3`
//                           : "block px-4 py-3 hover:bg-gray-100"
//                       }
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Dashboard
//                     </NavLink>
//                     <div
//                       onClick={handleLogout}
//                       className="block px-4 py-3 hover:bg-gray-100 cursor-pointer"
//                     >
//                       Logout
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <NavLink
//                       to="/login"
//                       className={({ isActive }) =>
//                         isActive
//                           ? `${activeLinkClass} block px-4 py-3`
//                           : "block px-4 py-3 hover:bg-gray-100"
//                       }
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Login
//                     </NavLink>
//                     <NavLink
//                       to="/signup"
//                       className={({ isActive }) =>
//                         isActive
//                           ? `${activeLinkClass} block px-4 py-3`
//                           : "block px-4 py-3 hover:bg-gray-100"
//                       }
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Sign Up
//                     </NavLink>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
