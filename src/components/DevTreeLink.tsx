

import type { SocialNetwork } from "../types";
import {useSortable} from '@dnd-kit/react/sortable'
import { useNavigate } from "react-router";


type DevTreeLinkProps = {
  link: SocialNetwork;
  index: number;
};

const DevTreeLink = ({ link, index }: DevTreeLinkProps) => {
  const {ref} = useSortable({id: link.name, index})
  const navigate = useNavigate()
  return ( 
    <li
   
     ref={ref}
      className="bg-white px-5 py-2 flex items-center gap-1 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
      onClick={() => navigate(link.url)}
    >
      
      <div
        className="w-8 h-8  md:w-12 md:h-12 bg-cover shrink-0"
        style={{
          backgroundImage: `url('/social/icon_${link.name}.svg')`,
        }}
      />
      <p className="capitalize text-sm">
        Visita mi: <span className="font-bold">{link.name}</span>
      </p>
    </li>
  );
};

export default DevTreeLink;
