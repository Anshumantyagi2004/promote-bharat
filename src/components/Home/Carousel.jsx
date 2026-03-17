"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Carousel() {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      speed={1000}
      className="lg:h-[500px] "
    >
      <SwiperSlide>
        <img
          src="/first1.webp"
          className="w-full h-full object-cover"
          alt=""
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src="/first2.webp"
          className="w-full h-full object-cover"
          alt=""
        />
      </SwiperSlide>
    </Swiper>
  );
}