"use client";

import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "@/components/ui/cta-section-with-gallery";
import { Button } from "@/components/ui/button";

const IMAGES = [
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=500",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=500",
];

export default function Reviews() {
  return (
    <section id="ulasan" className="w-full bg-white py-16 px-6 md:px-12 max-w-[1280px] mx-auto">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <ContainerStagger>
          <ContainerAnimated className="mb-4 block text-xs font-medium text-black md:text-sm uppercase tracking-wider">
            Customer Reviews
          </ContainerAnimated>
          <ContainerAnimated className="text-4xl font-sans font-bold md:text-5xl tracking-tight text-black leading-tight">
            Over 350+ Customer reviews from our clients
          </ContainerAnimated>
          <ContainerAnimated className="my-6 text-base text-gray-600 md:my-8 md:text-lg">
            We are proud to serve our customers and deliver exceptional quality. Hear from our clients who have elevated their style with our collections.
          </ContainerAnimated>
          <ContainerAnimated>
            <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-6 text-sm">
              Read All Reviews
            </Button>
          </ContainerAnimated>
        </ContainerStagger>

        <GalleryGrid>
          {IMAGES.map((imageUrl, index) => (
            <GalleryGridCell index={index} key={index}>
              <img
                className="size-full object-cover object-center transition-transform duration-500 hover:scale-105"
                src={imageUrl}
                alt={`Customer review ${index + 1}`}
              />
            </GalleryGridCell>
          ))}
        </GalleryGrid>
      </div>
    </section>
  );
}
