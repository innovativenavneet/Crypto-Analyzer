import { gettingDate } from "./getDate";

export const settingChartData = (setChartData, prices) => {
  // if (prices2) {
  setChartData({
    labels: prices.map((price) => gettingDate(price[0])),
    datasets: [
      {
        // label: "Crypto 1",
        data: prices.map((price) => price[1]),
        borderWidth: 2,
        fill: false,
        backgroundColor: "rgba(58, 233, 128, 0.1)",
        tension: 0.25,
        borderColor: "#5BB318",
        pointRadius: 1,
        // yAxisID: "crypto1",
      },
      // {
      //   label: "Crypto 2",
      //   data: prices2?.map((data) => data[1]),
      //   borderWidth: 2,
      //   fill: false,
      //   tension: 0.25,
      //   borderColor: "#5BB318",
      //   pointRadius: 1,
      //   yAxisID: "crypto2",
      // },
    ],
  });
};
//    else {
//     setChartData({
//       labels: prices1?.map((data) => gettingDate(data[0])),
//       datasets: [
//         {
//           data: prices1?.map((data) => data[1]),
//           borderWidth: 1,
//           fill: true,
//           backgroundColor: "rgba(58, 128, 233,0.1)",
//           tension: 0.25,
//           borderColor: "#3a80e9",
//           pointRadius: 0,
//           yAxisID: "crypto1",
//         },
//       ],
//     });
//   }
// };