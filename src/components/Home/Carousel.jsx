"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Carousel() {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{ delay: 4000 }}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      className="h-[450px]"
    >
      <SwiperSlide>
        <img
          src="/banner1.jpg"
          className="w-full h-full object-cover"
          alt=""
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src="/banner2.jpg"
          className="w-full h-full object-cover"
          alt=""
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src="/banner3.jpg"
          className="w-full h-full object-cover"
          alt=""
        />
      </SwiperSlide>
    </Swiper>
  );
}