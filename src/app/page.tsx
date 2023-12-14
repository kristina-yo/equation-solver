import HomeHero from "@/components/HomeHero";

export default function Home() {
  return (
    <main className="flex min-h-screen  flex-col items-center justify-between p-24">
      <HomeHero />
      {/* <div className="space-y-2">
        <span className="text-2xl font-semibold">Write a math problem</span>
        <Canvas />
        <button className="px-4 py-2 bg-emerald-700">Convert</button>
      </div> */}
    </main>
  );
}
