import ImgLoadErr from "../fallback/error/ImgLoadErr";
const API_BASE = import.meta.env.VITE_API_BASE;


const LatestCard = ({date_created, image, time_required, title}) => {
  return (
    <div className="**:transition hover:-translate-y-2 duration-150 flex-1 rounded-4xl bg-white shadow-lg dark:bg-neutral-900">
      <div className="h-full flex flex-col p-4 gap-4">
        {
          image ?
          <img onError={(e)=> e.target.style.display = 'none'} src={API_BASE + image} className="w-full object-cover rounded-3xl h-40"/>
          :
          <ImgLoadErr/>
        }
        <p className="text-xl dark:text-white font-bold">{title}</p>
        <div className="mt-auto text-neutral-600 dark:text-neutral-500 flex justify-between">
          <p>{date_created}</p>
          <p>{time_required} min</p>
        </div>
      </div>
    </div>
  );
};

export default LatestCard;
