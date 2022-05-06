import moment from "moment";

export function convertTime(timestamp, format) {
  switch (format) {
    case "HH-MM":
      var dt = new Date(timestamp * 1000);
      var hr = dt.getHours();

      var m = "0" + dt.getMinutes();

      if (hr >= 12) {
        if (hr === 12) {
          return hr + ":" + m.substr(-2) + " PM";
        }
        return hr - 12 + ":" + m.substr(-2) + " PM";
      } else if (hr < 12) {
        return hr - 12 + ":" + m.substr(-2) + " AM";
      }
  }

  function Unix_timestamp(t) {
    // var dt = new Date(t*1000);
    // var hr = dt.getHours();
    // var m = "0" + dt.getMinutes();
    // var s = "0" + dt.getSeconds();
    // return hr+ ':' + m.substr(-2) + ':' + s.substr(-2);
  }
}
