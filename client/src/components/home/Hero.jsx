import heroImage from "../../assets/Hero.png";

function Hero() {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-[#F2F9FD]">
      <div className="flex min-h-[600px] flex-col lg:flex-row">
        {/* Left side: Hero text */}
        <div className="z-10 flex w-full flex-col justify-center px-6 py-12 sm:px-10 lg:w-1/2 lg:py-16 lg:pl-12 xl:pl-16">
          {/* Slogan */}
          <p className="mb-5 text-base font-semibold italic tracking-wide text-[#A56A9F] sm:text-lg">
            SUPPORT&nbsp; · &nbsp; UNDERSTAND&nbsp; · &nbsp; EMPOWER
          </p>
          {/* Main heading */}
          <h1 className="text-5xl font-bold leading-[1.08] text-black sm:text-6xl xl:text-[68px]">
            Your <span className="text-[#29B4E4]">Wellbeing</span>
            <br />
            <span className="text-[#A56A9F]">Matters</span>
          </h1>
          {/* Description */}
          <p className="mt-6 max-w-[600px] text-lg leading-relaxed text-gray-800">
            At the Emotional Assessment and Therapy Centre, we provide a safe
            and supportive space for individuals, couples, and families to
            navigate life's challenges and build a healthier, more fulfilling
            future.
          </p>
          {/* Learn more button */}
          <a
            href="#about"
            className="mt-6 inline-flex w-fit items-center justify-center text-lg rounded-full border-2 border-[#29B4E4] px-9 py-3.5 font-semibold text-[#29B4E4] transition-colors hover:bg-[#29B4E4] hover:text-white"
          >
            {" "}
            Learn More
          </a>
        </div>

        {/* Right side: Curved hero image */}
        <div className="relative hidden lg:block lg:min-h-[600px] lg:w-1/2 lg:overflow-hidden lg:rounded-l-[45%]">
          <img
            src={heroImage}
            alt="Comfortable therapy room with a chair and green plants"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
