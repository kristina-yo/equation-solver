import HeroAction from "./HeroAction";

const HomeHero = () => {
  return (
    <div className="w-[50%] text-center space-y-5">
      <h1>Equation Solver</h1>
      <p className="text-2xl leading-7">
        Empower your math journey with our equation solver – effortlessly upload
        or type your problem and discover instant solutions.
      </p>
      <HeroAction />
    </div>
  );
};

export default HomeHero;
