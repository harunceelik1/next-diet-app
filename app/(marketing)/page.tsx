import Image from "next/image";
import Heading from "./_components/heading";
import Footer from "./_components/footer";

export default function Home() {
  return (
    <section className="min-h-full flex flex-col ">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
      </div>
      <Footer />
    </section>
  );
}
