import { locationDataActions } from "./locationData-slice";
import { useSelector } from "react-redux";

export const fetchLocationData = (locationName) => {
  //const locationName = useSelector((state) => state.locationName.name);
  //console.log("location name:", locationName);
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=1&appid=d864677b725d1065f1fe5443269ca607`
      );
      const data = await res.json();
      //console.log("data:", data);
      return data;
    };

    try {
      const locationData = await fetchHandler();
      console.log("Location data:", locationData);
      //dispatch(locationDataActions.setLocationData({}))
    } catch (err) {
      console.log("error?");
    }
  };
};
