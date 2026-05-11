import type { SocialNetwork, UserHandle } from "../types";

type HandleDataProps = {
  data: UserHandle;
};

const HandleData = ({ data }: HandleDataProps) => {
  const links: SocialNetwork[] = JSON.parse(data.links).filter(
    (link: SocialNetwork) => link.enabled,
  );
  return (
    <div className="space-y-6 text-white ">
      <p className="text-3xl text-center font-black tracking-wider">{data.handle}</p>
      {data.image && (
        <img
          src={data.image}
          alt={`${data.handle}'s profile picture`}
          className="mx-auto max-w-62.5 max-h-80  md:max-w-80 md:max-h-120 rounded-md"
        />
      )}

      <p className="text-lg text-center font-bold">{data.description}</p>
      <div className="mt-20 flex flex-col gap-6 ">
        {links.length ? (
          links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg "
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`/social/icon_${link.name}.svg`}
                alt="imagen red social"
                className="w-12 h-12"
              />
              <p className="text-black capitalize font-bold text-lg">
                Visita mi: {link.name}
              </p>
            </a>
          ))
        ) : (
          <p>No hay enlaces en este perfil</p>
        )}
      </div>
    </div>
  );
};

export default HandleData;
