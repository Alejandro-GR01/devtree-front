import { Link, Outlet } from "react-router";
import { Toaster } from "sonner";
import { DragDropProvider } from "@dnd-kit/react";

import NavigationTabs from "./NavigationTabs";
import { type User, type SocialNetwork } from "../types";
import { useEffect, useState } from "react";
import DevTreeLink from "./DevTreeLink";
import { useQueryClient } from "@tanstack/react-query";
import { isSortable } from "@dnd-kit/react/sortable";
import { move } from "@dnd-kit/helpers";
import Header from "./Header";

type DevTreeProps = {
  data: User;
};

const DevTree = ({ data }: DevTreeProps) => {
  const queryClient = useQueryClient();
  const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(
    JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled),
  );
  const disabledLinks: SocialNetwork[] = JSON.parse(data.links).filter(
    (link: SocialNetwork) => !link.enabled && link.url.length > 0,
  );

  useEffect(() => {
    setEnabledLinks(
      JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled),
    );
  }, [data]);

  return (
    <>
      <Header />
      <div className="bg-gray-100  min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:py-0">
          <NavigationTabs />

          <div className="flex justify-end pr-4">
            <Link
              className="font-bold text-right text-slate-800 text-2xl"
              to={`/${data.handle}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visitar Mi Perfil: /{data.handle}
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-6">
            <div className="flex-1 ">
              <Outlet />
            </div>
            <div className="w-full md:w-96 bg-slate-800 rounded-lg px-5 py-10 space-y-6">
              <p className="text-4xl text-center text-white/80">
                {data.handle}
              </p>
              {data.image && (
                <img
                  src={data.image}
                  alt={data.handle + " image"}
                  className="mx-auto max-w-62.5 max-h-80 rounded-md"
                />
              )}
              <p className="text-center text-lg font-black text-white">
                {data.description}
              </p>

              <DragDropProvider
                onDragEnd={(event) => {
                  if (event.canceled) return;
                  const { source } = event.operation;

                  if (isSortable(source)) {
                    const ordererLinks = move(enabledLinks, event);
                    setEnabledLinks(ordererLinks);
                    const links = [...ordererLinks, ...disabledLinks];

                    queryClient.setQueryData(["user"], (prevData: User) => {
                      return {
                        ...prevData,
                        links: JSON.stringify(links),
                      };
                    });
                  }
                }}
              >
                <div className="mt-8 flex flex-col gap-5 ">
                  {enabledLinks.map((link, index) => (
                    <DevTreeLink key={link.name} link={link} index={index} />
                  ))}
                </div>
              </DragDropProvider>
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default DevTree;
