const LinkCard = () => {
  return (
    <div className="card flex flex-col gap-3 w-full">
      <p className="text-gray00 leading-4 font-medium">
        Share this link with a trainer to become their player
      </p>
      <div className="flex w-full gap-2.5">
        <div className="rounded py-2.5 px-3 bg-purple00 bg-opacity-50 flex-grow">
          <div className="text-sm font-medium text-black2">
            https://Aura.com/player/239
          </div>
        </div>
        <LinkIcon image="/assets/images/Shared/copy-icon.svg" />
        <LinkIcon image="/assets/images/Shared/share-icon.svg" />
      </div>
    </div>
  );
};

const LinkIcon = ({ image }: { image: string }) => {
  return (
    <div className="rounded bg-pastel-purple p-2">
      <img className="w-6 h-6" src={image} alt="" />
    </div>
  );
};
export default LinkCard;
