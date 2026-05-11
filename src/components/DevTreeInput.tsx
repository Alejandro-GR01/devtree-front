import { Switch } from "@headlessui/react";
import type { DevTreeLink } from "../types";
import { classNames } from "../utils";

type DevtreeInputProps = {
  item: DevTreeLink;
  handleUrlChange: (e: React.ChangeEvent< HTMLInputElement>) => void,
  handleEnableLinks: (socialNetwork: string) => void
};

const DevTreeInput = ({ item, handleUrlChange, handleEnableLinks }: DevtreeInputProps) => {
  return (
    <div className="bg-white shadow-sm px-2 py-5 sm:p-5 flex items-center gap-1 sm:gap-3 rounded">
      <div
        className="w-8 h-8  md:w-12 md:h-12 bg-cover shrink-0"
        style={{
          backgroundImage: `url('/social/icon_${item.name}.svg')`,
        }}
      />
      <input type="text" className={`flex-1 shrink border border-gray-100 rounded-lg `} value={item.url} name={item.name}
      onChange={handleUrlChange}/>
      <Switch
        checked={item.enabled}
        onChange={()=> handleEnableLinks(item.name)}
        disabled= {item.url.length == 0}
        className={classNames(
          item.enabled ? "bg-blue-500" : "bg-gray-200",
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            item.enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          )}
        />
      </Switch>
    </div>
  );
};

export default DevTreeInput;
