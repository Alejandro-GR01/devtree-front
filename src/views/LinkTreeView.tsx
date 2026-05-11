import { useEffect, useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidURL } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/DevTreeApi";
import type { DevTreeLink, SocialNetwork, User } from "../types";
import {  useNavigate } from "react-router";

const LinkTreeView = () => {
  const queryClient = useQueryClient();
  const user: User | undefined = queryClient.getQueryData(["user"]);
  const navigate = useNavigate();
  const logoutForce = () => {
    localStorage.removeItem("AUTH_TOKEN");
    navigate("/auth/login", { replace: true });
  };

  let userLinks: SocialNetwork[] = [];
  if (user) {
    userLinks = JSON.parse(user.links);
  }
  let defaultSocial = social;

  if (userLinks !== social) {
    const updatedLinks = social.map((item) => {
      const personalLink = userLinks.find((link) => link.name === item.name);
      if (personalLink) {
        return {
          ...item,
          url: personalLink.url,
          enabled: personalLink.enabled,
        };
      }
      return item;
    });
    defaultSocial = updatedLinks;
  }
  const [devTreeLinks, setDevTreeLinks] = useState(defaultSocial);

  useEffect(() => {
    const newUserLinks: DevTreeLink[] = JSON.parse(
      queryClient.getQueryData<User>(["user"])!.links,
    );

    const result: DevTreeLink[] = [];
    social.forEach((socialLink) => {
      let includes = false;
      newUserLinks.forEach((link) => {
        if (socialLink.name === link.name) {
          result.push(link);
          includes = true;
        }
      });
      if (!includes) {
        result.push(socialLink);
      }
    });

    setDevTreeLinks(result);
  }, [user]);

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      if (error.message === "Token no valido") {
        logoutForce();
        return;
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Actualizado Correctamente");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link,
    );
    setDevTreeLinks(updatedLinks);

    queryClient.setQueryData(["user"], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedLinks),
      };
    });
  };

  const links: SocialNetwork[] = user ? JSON.parse(user.links) : [];

  const handleEnableLinks = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidURL(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else if (link.url.length > 0) {
          toast.error("URL no valida");
        }
      }
      return link;
    });

    setDevTreeLinks(updatedLinks);

    let updatedItems: SocialNetwork[] = [];

    const selectSocialNetwork = updatedLinks.find(
      (link) => link.name === socialNetwork,
    );
    if (selectSocialNetwork?.enabled) {
      const maxId = links.filter((link) => link.enabled).length + 1;
      if (links.some((link) => link.name === socialNetwork)) {
        updatedItems = links.map((link) => {
          if (link.name === socialNetwork) {
            return {
              ...link,
              enabled: true,
              id: maxId,
            };
          } else {
            return link;
          }
        });
      } else {
        const newItem = {
          ...selectSocialNetwork,
          id: maxId,
        };
        updatedItems = [...links, newItem];
      }
    } else {
      const indexToUpdate = links.findIndex(
        (link) => link.name == socialNetwork,
      );
      updatedItems = links.map((link) => {
        if (link.name === socialNetwork) {
          return {
            ...link,
            id: 0,
            enabled: false,
          };
        } else if (link.id > indexToUpdate) {
          return {
            ...link,
            id: link.id - 1,
          };
        } else {
          return link;
        }
      });
    }

    queryClient.setQueryData(["user"], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems),
      };
    });
  };
  return (
    <div className="space-y-5">
      {devTreeLinks.map((item, index) => (
        <DevTreeInput
          key={index}
          item={item}
          handleUrlChange={handleUrlChange}
          handleEnableLinks={handleEnableLinks}
        />
      ))}
      <button
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded font-bold"
        onClick={() => {
          mutate(queryClient.getQueryData(["user"])!);
        }}  
      >
        Guardar Cambios
      </button>
    </div>
  );
};

export default LinkTreeView;
