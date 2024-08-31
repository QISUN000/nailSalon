import { useState } from 'react'
import { Link } from 'react-scroll';
import './App.css'
import Image from './assets/bg.jpg'
import { IoIosMenu, IoIosClose } from 'react-icons/io';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
      setMenuOpen(!menuOpen);
  };
  
  const content =
  <>
    <div className='lg:hidden duration-500 block absolute top-32 left-0 right-0 bg-gray-50 transition-opacity text-black'>
      <ul className='text-center text-2xl p-20'>
            <Link spy={true} smooth={true} className='my-4 py-4 border-b ' to="Services"><li>Services</li></Link>  
            <Link spy={true} smooth={true} className='my-4 py-4 border-b ' to="Contacts"><li>Contacts</li></Link>
            <Link spy={true} smooth={true} className='my-4 py-4 border-b ' to="Locations"><li>Locations</li></Link>
      </ul>
    </div>
  </>
 
  return (
    <>
      <div className="min-h-screen font-poppins font-extralight">

      <header className="px-20 py-10 flex absolute justify-between w-full z-50 text-white lg:py-14 flex-1 h-10vh">
        <div className="flex flex-1 items-center">
          <span className='text-4xl'>NAILS STUDIO</span>
          </div>
        <div className='lg:flex lg:flex-1 items-center justify-end hidden'>
         
          <ul className="flex gap-10 xl:gap-20 xl:mr-16 text-2xl ">
            <Link spy={true} smooth={true} to="Services"><li>Services</li></Link>  
            <Link spy={true} smooth={true} to="Contacts"><li>Contacts</li></Link>
            <Link spy={true} smooth={true} to="Locations"><li>Locations</li></Link>
          </ul>
         
        </div>
        <div>
          {menuOpen && content}
        </div>
        <button className='block text-4xl lg:hidden ' onClick={toggleMenu}>
          {menuOpen ? <IoIosClose/> : <IoIosMenu/>}
        </button>


      </header>


        {/* Hero Section */}
        <section className="relative h-screen">
          <img src={Image} alt="Woman" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-start p-12">
            <h1 className="text-6xl text-white mb-4 font-poppins font-extralight">Nails and Cocktails</h1>
            <p className="text-2xl text-white mb-8">Expert Nail Care and Exquisite Cocktails in one Place</p>
            <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition duration-300">PLAN YOUR VISIT</button>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-12 max-w-6xl mx-auto">
          <h2 className="text-4xl mb-2">Our Services</h2>
          <p className="text-xl text-gray-600 mb-12">Indulge and Shine</p>

          <div className="grid grid-cols-2 gap-8">
            <div className="col-span-2 md:col-span-1 space-y-8">
              {/* Manicure */}
              <div>
                <img src="/api/placeholder/400/300" alt="Manicure" className="w-full h-64 object-cover mb-4" />
                <div className="flex justify-between items-center">
                  <span className="text-xl">Manicure</span>
                  <button className="border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white transition duration-300">Show price →</button>
                </div>
              </div>

              {/* Coffee */}
              <div>
                <img src="/api/placeholder/400/300" alt="Coffee" className="w-full h-64 object-cover mb-4" />
                <div className="flex justify-between items-center">
                  <span className="text-xl">Coffee</span>
                  <button className="border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white transition duration-300">Menu →</button>
                </div>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1 space-y-8">
              {/* Cocktails */}
              <div>
                <img src="/api/placeholder/400/300" alt="Cocktails" className="w-full h-64 object-cover mb-4" />
                <div className="flex justify-between items-center">
                  <span className="text-xl">Coctails</span>
                  <button className="border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white transition duration-300">Menu →</button>
                </div>
              </div>

              {/* Pedicure */}
              <div>
                <img src="/api/placeholder/400/300" alt="Pedicure" className="w-full h-64 object-cover mb-4" />
                <div className="flex justify-between items-center">
                  <span className="text-xl">Pedicure</span>
                  <button className="border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white transition duration-300">Show price →</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Satisfaction */}
        <section className="bg-gray-100 py-16 px-12">
          <p className="text-xl text-center max-w-2xl mx-auto">
            Our commitment to quality service and customer satisfaction ensures you leave feeling rejuvenated and fabulous.
          </p>
        </section>
      </div >
    </>
  )
}

export default App
