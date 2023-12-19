import { FadeIn, Scale } from '../../animations';

const Spalsh = () => {
  return (
    <div className="page page__splash !pt-[90px] !px-[22px] pb-4 flex flex-col">
      <section className="content pl-5 pr-12">
        <FadeIn duration={0.3} delay={0.1}>
          <p className="text-white font-black text-5xl mb-3">Aura</p>
        </FadeIn>
        <FadeIn duration={0.3} delay={0.15}>
          <p className="text-white font-black text-2xl mb-9">
            A leap forward
            <br />
            toward Trusted Identity
          </p>
        </FadeIn>
        <FadeIn duration={0.3} delay={0.2}>
          <p className="text-white font-medium text-lg">
            Use Aura to evaluate{' '}
            <img
              className="inline ml-1"
              src="/assets/images/Shared/brighthid.svg"
              alt=""
            />{' '}
            Accounts and make an step into safer, more trustworthy online
            community where your identity is secured and recognized. Accounts
            and make an
          </p>
        </FadeIn>
      </section>

      <section className="actions mb-24 mt-auto text-center">
        <Scale duration={0.3} delay={0.25}>
          <button className="btn btn--big !text-white max-w-[270px] w-full">
            Get Started
          </button>
        </Scale>
      </section>
      <footer className="flex justify-between text-gray90 text-sm">
        <span className="flex gap-1">
          <p className="font-light">Version</p>
          <p className="">2.1</p>
        </span>
        <span className="flex gap-1">
          <p className="text-gray50">Powered by:</p>
          <p className="font-light">BrightID</p>
        </span>
      </footer>
    </div>
  );
};

export default Spalsh;
