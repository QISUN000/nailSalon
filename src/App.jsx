import { useState } from 'react'
import { Link } from 'react-scroll';
import './App.css'
import Image from './assets/bg.jpg'
import Image2 from './assets/image2.png'
import Manicure from './assets/manicure.png'
import Coffee from './assets/coffee.png'
import Pedicure from './assets/pedicure.png'
import Coctails from './assets/coctails.png'
import { IoIosMenu, IoIosClose } from 'react-icons/io';
import { FaInstagram } from "react-icons/fa";
import { RiFacebookBoxLine } from "react-icons/ri";
import { TbBrandTiktok } from "react-icons/tb";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Carousel from './components/carousel';

function App() {
  AOS.init({
    duration: 700,
    once: true
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
          <Link spy={true} smooth={true} className='my-4 py-4 block transition ease-in-out delay-150 hover:cursor-pointer hover:scale-110 ' to="Services"><li>Services</li></Link>
          <Link spy={true} smooth={true} className='my-4 py-4 block transition ease-in-out delay-150 hover:cursor-pointer hover:scale-110 ' to="Creations"><li>Creations</li></Link>
          <Link spy={true} smooth={true} className='my-4 py-4 block transition ease-in-out delay-150 hover:cursor-pointer hover:scale-110 ' to="Contacts"><li>Contacts</li></Link>
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
              <Link className="transition ease-in-out delay-150 hover:cursor-pointer hover:scale-110 border-b-2 border-transparent hover:border-current" spy={true} smooth={true} to="Services"><li>Services

              </li></Link>
              <Link className="transition ease-in-out delay-150 hover:cursor-pointer hover:scale-110 border-b-2 border-transparent hover:border-current" spy={true} smooth={true} to="Creations"><li>Creations</li></Link>
              <Link className="transition ease-in-out delay-150 hover:cursor-pointer hover:scale-110 border-b-2 border-transparent hover:border-current" spy={true} smooth={true} to="Contacts"><li>Contacts</li></Link>
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
      <section name="Services" className="py-16 mx-auto w-10/12 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12  gap-6 lg:gap-0">
          {/* Background lines - visible only on large screens */}
          <div className="hidden lg:block w-px lg:col-start-4 lg:row-start-1 lg:row-end-5 bg-gray-200 "></div>
          <div className="hidden lg:block w-px lg:col-end-9 lg:row-start-2 lg:row-end-6 bg-gray-200 "></div>


          <div data-aos="fade-up" className='lg:col-end-11 lg:col-span-3 flex flex-col items-start justify-center z-0  lg:mb-10  '>
            <h2 className="text-4xl lg:text-5xl mb-2 z-10">Our Services</h2>
            <p className="text-lg lg:text-xl text-gray-600  z-10">Indulge and Shine</p>
          </div>

          {/* manicure */}
          <div data-aos="fade-up" data-aos-delay="100" className='lg:col-start-1 lg:col-end-5 lg:row-start-2 z-10 font-normal '>
            <img src={Manicure} alt="Manicure" className="object-cover w-full" />
            <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
              <span className="text-2xl mb-2 sm:mb-0">Manicure</span>
              <button className="border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white transition duration-300">Show price →</button>
            </div>
          </div>

          {/* Cocktails */}
          <div data-aos="fade-up" data-aos-delay="200" className='lg:col-end-11 lg:col-span-3 lg:row-start-2  font-normal'>
            <img src={Coctails} alt="Cocktails" className="object-cover w-full" />
            <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
              <span className="text-2xl mb-2 sm:mb-0">Cocktails</span>
              <button className="border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white transition duration-300">Menu →</button>
            </div>
          </div>


          {/* Coffee */}
          <div data-aos="fade-up" className='lg:col-end-7 lg:col-span-3 lg:row-start-4 font-normal'>
            <img src={Coffee} alt="Coffee" className="object-cover w-full" />
            <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
              <span className="text-2xl mb-2 sm:mb-0">Coffee</span>
              <button className="border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white transition duration-300">Menu →</button>
            </div>
          </div>

          {/* Pedicure */}
          <div data-aos="fade-up" data-aos-delay="100" className='lg:col-end-12 lg:col-span-3 lg:row-start-5 font-normal'>
            <img src={Pedicure} alt="Pedicure" className="object-cover w-full" />
            <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
              <span className="text-2xl mb-2 sm:mb-0">Pedicure</span>
              <button className="border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white transition duration-300">Show price →</button>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="100" className='lg:col-start-1 lg:col-end-5 lg:row-start-5 z-10 flex items-center mt-8 lg:mt-0'>
            <p className="text-lg lg:text-xl max-w-2xl mx-auto text-left">
              Our commitment to quality service and customer satisfaction ensures you leave feeling rejuvenated and fabulous.
            </p>
          </div>
        </div>
      </section>

      {/* Our Creations */}
      <div className='mt-28' name="Creations">
        <div className='w-10/12 flex mx-auto items-center justify-between'>
          <div>
            <h2 className="text-5xl mb-2 relative z-10">Our Creations</h2>
            <p className="text-xl text-gray-600 mb-12 relative z-10">Capture Elegance</p>
          </div>
          <div>
            <p className='text-xl'>We create the perfect  <br />blend of beauty and blisss</p>
          </div>
        </div>
        <Carousel />
      </div>

      {/* plan you visit */}
      <div className="mx-auto flex w-full md:w-3/5 lg:w-2/5 flex-col items-center mt-24 mb-16 lg:mt-56 lg:mb-28 relative px-4">
        <div className="absolute z-10 top-[-60px] lg:top-[-90px] text-center">
          <p className="text-lg md:text-xl">Sip. Relax. Beautify.</p>
          <h2 className="text-6xl lg:text-7xl xl:text-8xl">Nails Salons</h2>
        </div>
        <img src={Image2} data-aos="zoom-in-up" alt="Pedicure" className="object-cover w-3/4 md:w-2/3 lg:w-1/2" />
        <div className="py-6 md:py-10 flex-col flex justify-center items-center">
          <p className="text-lg md:text-xl text-center">Get yourself 15% Discount and<br /> a FREE Cocktail on the first visit,<br /> when you book online.</p>
          <button className="mt-4 text-lg md:text-2xl border border-black px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-black hover:text-white transition duration-300">
            PLAN YOUR VISIT
          </button>
        </div>
      </div>

      {/* footer */}
      <div className='w-10/12 border-t border-gray-200 py-20 mx-auto' name="Contacts">
        <div className='grid grid-cols-1 sm:grid-cols-5 gap-4' data-aos="zoom-in-up" >
          <div className='sm:col-start-2 sm:col-span-1 mb-6 sm:mb-0'>
            <h2 className='font-medium text-2xl mb-2'>Contacts</h2>
            <p className='mb-1'>(555) 867-5309</p>
            <p className='mb-3'>harmonystudio@gmail.com</p>
            <div className='flex space-x-3'>
              <FaInstagram className='text-2xl' />
              <RiFacebookBoxLine className='text-2xl' />
              <TbBrandTiktok className='text-2xl' />
            </div>
          </div>
          <div className='sm:col-start-4 sm:col-span-1'>
            <h2 className='font-medium text-2xl mb-2'>Address</h2>
            <p>Springfield, 62704</p>
            <p>123 Maple Street</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
