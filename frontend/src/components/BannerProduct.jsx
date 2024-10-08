import React, { useEffect, useState, useContext } from 'react';
import image1 from '../assest/banner/img1.webp';
import image2 from '../assest/banner/img2.webp';
import image3 from '../assest/banner/img3.jpg';
import image4 from '../assest/banner/img4.jpg';
import image5 from '../assest/banner/img5.webp';

import image1Mobile from '../assest/banner/img1_mobile.jpg';
import image2Mobile from '../assest/banner/img2_mobile.webp';
import image3Mobile from '../assest/banner/img3_mobile.jpg';
import image4Mobile from '../assest/banner/img4_mobile.jpg';
import image5Mobile from '../assest/banner/img5_mobile.png';

import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';
import { ThemeContext } from '../context/ThemeContext';

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { theme } = useContext(ThemeContext); // Use the theme from the ThemeContext

  const desktopImages = [
    image1,
    image2,
    image3,
    image4,
    image5,
  ];

  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const prevImage = () => {
    if (currentImage !== 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className={`container mx-auto px-4 rounded ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <div className={`h-56 md:h-80 w-full ${theme === 'dark' ? 'bg-white' : 'bg-slate-200'} relative`}>
        <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
          <div className='flex justify-between w-full text-2xl'>
            <button onClick={prevImage} className={`shadow-md rounded-full p-1 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
              <FaAngleLeft />
            </button>
            <button onClick={nextImage} className={`shadow-md rounded-full p-1 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/** Desktop and tablet version */}
        <div className='hidden md:flex h-full w-full overflow-hidden'>
          {desktopImages.map((imageUrl, index) => (
            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageUrl} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
              <img src={imageUrl} className='w-full h-full' alt={`slide ${index + 1}`} />
            </div>
          ))}
        </div>

        {/** Mobile version */}
        <div className='flex h-full w-full overflow-hidden md:hidden'>
          {mobileImages.map((imageUrl, index) => (
            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageUrl} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
              <img src={imageUrl} className='w-full h-full object-cover' alt={`slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
