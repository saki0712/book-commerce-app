"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    image: "/banner-1.jpg",
    title: "Spring Sale",
    description: "Get 20% off all eBooks!",
    button: "Limited Time Only",
  },
  {
    image: "/banner-2.jpg",
    title: "Discover New Reads",
    description: "Explore fresh titles and hidden gems",
    button: "Featured Selection",
  },
  {
    image: "/banner-3.jpg",
    title: "Curated Picks",
    description: "Selected books loved by our team",
    button: "Handpicked for You",
  },
];

const Slideshow = () => {
  return (
    <section className="w-full py-6">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        spaceBetween={20}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-60 md:h-80 rounded-xl overflow-hidden shadow-md">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-6 md:px-12">
                <h2 className="text-white text-xl md:text-3xl font-bold mb-2">
                  {slide.title}
                </h2>
                <p className="text-white text-sm md:text-base mb-2 max-w-md">
                  {slide.description}
                </p>
                <span className="text-white text-xs md:text-sm bg-white/10 rounded px-3 py-1 border border-white/30">
                  {slide.button}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slideshow;
