import { useScreenWidth } from "../../../hooks/useScreenWidth";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

const Settings = () => {
  const vp = useScreenWidth()  
  if(vp==="small") {
    return <Mobile/>
  }
  else {
    return <Desktop/>
  }
};

export default Settings