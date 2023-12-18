const Spalsh = () => {
  return (
    <div className="page page__splash !pt-[90px] !px-[22px] pb-4 flex flex-col">
      <section className="content pl-5 pr-12">
        <p className="text-white font-black text-5xl mb-3">Aura</p>
        <p className="text-white font-black text-2xl mb-9">
          A leap forward
          <br />
          toward Trusted Identity
        </p>
        <p className="text-white font-medium text-lg">
          Use Aura to evaluate{' '}
          <img
            className="inline ml-1"
            src="/assets/images/Shared/brighthid.svg"
            alt=""
          />{' '}
          Accounts and make an step into safer, more trustworthy online
          community where your identity is secured and recognized. Accounts and
          make an
        </p>
      </section>

      <section className="actions mb-24 mt-auto text-center">
        <button className="btn btn--big !text-white max-w-[270px] w-full">
          Get Started
        </button>
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
