import axios from "axios";

export const getPrices = (id, days, priceType) => {
  const prices = axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    )
    .then((response) => {
      console.log("Prices>>>", response.data[priceType]);

      return response.data[priceType];
    })
    .catch((error) => {
      console.log("ERROR>>>", error);
    })

  return prices;
};
