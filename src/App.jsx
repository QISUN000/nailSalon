import { useState } from 'react'
import { Link } from 'react-scroll';
import './App.css'
import Image from './assets/bg.jpg'
import Manicure from './assets/manicure.png'
import Coffee from './assets/coffee.png'
import Pedicure from './assets/pedicure.png'
import Coctails from './assets/coctails.png'
import { IoIosMenu, IoIosClose } from 'react-icons/io';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  AOS.init({
    duration: 700,
    once:true
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    AOS.refresh();
  };

  const content =
    <>
      <div className='lg:hidden duration-500 block absolute top-32 left-0 right-0 bg-gray-50 transition-opacity text-black'>
        <ul className='text-center text-2xl p-20'>
          <Link spy={true} smooth={true} className='my-4 py-4 block' to="Services"><li>Services</li></Link>
          <Link spy={true} smooth={true} className='my-4 py-4 block' to="Contacts"><li>Contacts</li></Link>
          <Link spy={true} smooth={true} className='my-4 py-4 block' to="Locations"><li>Locations</li></Link>
        </ul>
      </div>
    </>

  return (
    <div className='font-poppins font-extralight'>
      <div className="min-h-screen ">

        <header className="px-20 py-10 flex absolute justify-between w-full z-50 text-white lg:py-14 flex-1 h-10vh ">
          <div data-aos="fade-down" className="flex flex-1 items-center">
            <span className='text-4xl'>NAILS STUDIO</span>
          </div>
          <div className='lg:flex lg:flex-1 items-center justify-end hidden'>

            <ul data-aos="fade-down" data-aos-delay="100" className="flex gap-10 xl:gap-20 xl:mr-16 text-2xl ">
              <Link  className="transition ease-in-out delay-150 hover:cursor-pointer hover:scale-110 border-b-2 border-transparent hover:border-current" spy={true} smooth={true} to="Services"><li>Services
            
                </li></Link>
              <Link  className="transition ease-in-out delay-150 hover:cursor-pointer hover:scale-110 border-b-2 border-transparent hover:border-current" spy={true} smooth={true} to="Contacts"><li>Contacts</li></Link>
              <Link  className="transition ease-in-out delay-150 hover:cursor-pointer hover:scale-110 border-b-2 border-transparent hover:border-current"  spy={true} smooth={true} to="Locations"><li>Locations</li></Link>
            </ul>

          </div>
          <div>
            {menuOpen && content}
          </div>
          <button className='block text-4xl lg:hidden ' onClick={toggleMenu}>
            {menuOpen ? <IoIosClose /> : <IoIosMenu />}
          </button>


        </header>

        {/* Hero Section */}
        <section className="relative h-screen flex items-end">
          <img src={Image} alt="Woman" className="w-full h-full object-cover" />
          <div className="px-20 py-10 flex absolute justify-between w-full z-50 text-white lg:py-14 flex-1  items-center flex-wrap">
            <div>
              <h1 data-aos="fade-up" data-aos-delay="200" data-aos-anchor="#hero-section" className="text-6xl text-white mb-4 font-poppins font-extralight">Nails Studio</h1>
              <p data-aos="fade-up" data-aos-delay="250" data-aos-anchor="#hero-section" className="text-2xl text-white mb-8">Expert Nail Care and Exquisite Cocktails in one Place</p>
            </div>
            <button data-aos="fade-up" data-aos-delay="300" data-aos-anchor="#hero-section" className=" border-white border-solid border-2 h-20 text-2xl text-white px-10 py-3 rounded-full hover:bg-gray-200  hover:text-black transition duration-300">PLAN YOUR VISIT</button>
          </div>
        </section>

      </div >

      {/* Services Section */}
      <section name="Services" className="py-16 mx-auto relative grid grid-cols-12 grid-rows-12 max-h-[2000px] w-4/5 my-26">
        {/* Background lines */}

        <div className="w-px col-start-4 row-start-1 row-end-11 bg-gray-200"></div>
        <div className="w-px col-end-9 row-start-2 row-end-12  bg-gray-200"></div>


        <div data-aos="fade-up" className='col-end-11 col-span-3 row-span-1 flex flex-col items-start justify-center z-0'>
          <h2 className="text-5xl mb-2 relative z-10">Our Services</h2>
          <p className="text-xl text-gray-600 mb-12 relative z-10">Indulge and Shine</p>
        </div>

        {/* manicure */}
        <div data-aos="fade-up" data-aos-delay="100" className='col-start-1 col-end-5 row-start-2 row-end-5 z-10 font-normal'>
          <img src={Manicure} alt="Manicure" className="object-cover" />
          <div className="flex justify-between items-center mt-5">
            <span className="text-2xl">Manicure</span>
            <button className="border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white transition duration-300">Show price →</button>
          </div>
        </div>

        {/* Cocktails */}
        <div data-aos="fade-up" data-aos-delay="200" className=' col-end-11 col-span-3 row-start-2 row-end-6 font-normal'>
          <img src={Coctails} alt="Cocktails" className="object-cover" />
          <div className="flex justify-between items-center mt-5">
            <span className="text-2xl">Cocktails</span>
            <button className="border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white transition duration-300">Menu →</button>
          </div>
        </div>

        {/* Coffee */}
        <div data-aos="fade-up" className='col-end-7 col-span-3 row-start-7 font-normal'>
          <img src={Coffee} alt="Coffee" className="object-cover" />
          <div className="flex justify-between items-center mt-5">
            <span className="text-2xl">Coffee</span>
            <button className="border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white transition duration-300">Menu →</button>
          </div>
        </div>

        {/* Pedicure */}
        <div data-aos="fade-up" data-aos-delay="100" className='col-end-12 col-span-3 row-start-8 font-normal'>
          <img src={Pedicure} alt="Pedicure" className="object-cover" />
          <div className="flex justify-between items-center mt-5">
            <span className="text-2xl">Pedicure</span>
            <button className="border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white transition duration-300">Show price →</button>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-delay="100" className='col-start-1 col-end-5 row-start-12 z-10 flex items-center '>
          <p className="text-xl  max-w-2xl mx-auto text-left">
            Our commitment to quality service and customer satisfaction ensures you leave feeling rejuvenated and fabulous.
          </p>
        </div>

      </section>
    </div>
  )
}

export default App
