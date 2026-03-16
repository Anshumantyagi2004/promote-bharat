"use client";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="w-full py-10 bg-gray-50">
      <div className="md:px-15 mx-auto px-4 grid md:grid-cols-2 gap-5 items-center">
        <div className="w-full flex justify-center">
          <Image
            src="/wordMap.webp"
            alt="Promote Bharat"
            width={600}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </div>

        <div>
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
            Empowering Businesses, Connecting Opportunities
          </h2>

          <h3 className="text-2xl text-blue-600 font-semibold mb-6">
            Har Business Ka Saathi – Promote Bharat
          </h3>

          <p className="text-gray-800 mb-4 leading-relaxed text-lg">
            India is full of hardworking business owners, from local dukandars
            to big brands. But in today’s digital world, sirf accha kaam hi
            kaafi nahi hai—logon tak pahuncha bhi zaroori hai.
          </p>

          <p className="text-gray-800 mb-4 leading-relaxed text-lg">
            That’s where <span className="font-semibold">Promote Bharat</span>
            comes in. We help every business, small or big, get noticed, grow,
            and succeed.
          </p>

          <p className="text-gray-800 leading-relaxed text-lg">
            Agar aap ek kirana store chalate hain, kapdon ki dukaan, ek startup
            ya ek factory, toh hum aapko sahi customers tak pahunchane ka ek
            aasaan aur bharosemand tareeka dete hain. Bina kisi jhanjhat ke,
            aapka vyapar badhega aur naye log aapse judege.
          </p>

        </div>
      </div>
    </section>
  );
}