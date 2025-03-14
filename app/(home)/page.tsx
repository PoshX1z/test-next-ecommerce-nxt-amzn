import HomeCarousel from "@/components/shared/home/HomeCarousel";
import data from "@/lib/data";

export default function Home() {
  return (
    <div>
      <HomeCarousel items={data.carousels} />
    </div>
  );
}
