type LoadingViewProps = {
  children: string;
};

const LoadingView = ({ children }: LoadingViewProps) => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-800 flex flex-col gap-8 items-center justify-center z-10 ">
      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
      <p className="text-white text-lg font-medium  tracking-wider">{children}</p>
    </div>
  );
};

export default LoadingView;
