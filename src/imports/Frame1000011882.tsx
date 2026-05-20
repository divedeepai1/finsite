import imgJpg11 from "figma:asset/b56cedb1403e951a8062795e16be9b91c9226e98.png";

export default function Frame() {
  return (
    <div className="overflow-clip relative rounded-[8px] size-full">
      <div className="absolute left-0 size-[49px] top-0" data-name="Jpg1 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[283.67%] left-[-139.12%] max-w-none top-[-77.55%] w-[378.23%]" src={imgJpg11} />
        </div>
      </div>
      <div className="absolute h-[49px] left-[49px] top-0 w-[256px]" data-name="Jpg1 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[1209.68%] left-[-105.71%] max-w-none top-[-748.39%] w-[308.64%]" src={imgJpg11} />
        </div>
      </div>
    </div>
  );
}