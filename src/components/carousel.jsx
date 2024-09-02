import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import Carousel1 from "../assets/carousel1.png";
import Carousel2 from "../assets/carousel2.png";
import Carousel3 from "../assets/carousel3.png";
import Carousel4 from "../assets/carousel4.png";

// Custom Next Arrow Component
const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="absolute top-1/2 right-[-40px] transform -translate-y-1/2 cursor-pointer z-10"
            onClick={onClick}
        >
            <HiMiniArrowLongRight className="text-gray-600 w-10 h-10" />
        </div>
    );
};

// Custom Previous Arrow Component
const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="absolute top-1/2 left-[-40px] transform -translate-y-1/2 cursor-pointer z-10"
            onClick={onClick}
        >
            <HiMiniArrowLongLeft className="text-gray-600 w-10 h-10" />
        </div>
    );
};

const Carousel = () => {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="w-10/12 mx-auto relative ">
            <Slider {...settings}>
                <div data-aos="zoom-in-up"  >
                    <img src={Carousel1} className="w-full h-full object-cover px-2" />
                </div>
                <div data-aos="zoom-in-up" data-aos-delay="50">
                    <img src={Carousel2} className="w-full h-full object-cover px-2" />
                </div>
                <div data-aos="zoom-in-up" data-aos-delay="100">
                    <img src={Carousel4} className="w-full h-full object-cover px-2" />
                </div>
                <div data-aos="zoom-in-up" data-aos-delay="150">
                    <img src={Carousel3} className="w-full h-full object-cover px-2" />
                </div>
            </Slider>
        </div>
    );
};

export default Carousel;
