const FirstStep = () => {
  return (
    <>
      <span className="flex items-start gap-4 mb-3 pl-5 pr-12">
        <p className="text-white text-5xl font-black">1</p>
        <p className="text-pastel-purple text-3xl font-black">
          Find a<br /> Subject
        </p>
      </span>
      <p className="text-white font-medium text-lg mb-9 pl-5 pr-20">
        Explore among your brightID connections and choose the one you think you
        can evaluate
      </p>

      <div className="content-images relative flex w-full justify-center">
        <img
          src="/assets/images/onboarding/subject-card-1.svg"
          alt=""
          className="top-0 absolute w-[50vw] max-w-[170px] left-1/2 -translate-x-1/2"
        />
        <img
          src="/assets/images/onboarding/subject-card-2.svg"
          alt=""
          className="top-6 absolute w-[75vw] max-w-[250px] left-1/2 -translate-x-1/2"
        />
        <img
          src="/assets/images/onboarding/subject-card-3.svg"
          alt=""
          className="top-14 absolute w-[90vw] max-w-[385px] left-1/2 -translate-x-1/2"
        />
      </div>
    </>
  );
};

export default FirstStep;
