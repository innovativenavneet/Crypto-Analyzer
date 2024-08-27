import { toast } from "react-toastify";
export const saveItemToWatchlist = (e, id, callback) => {
  e.preventDefault();
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!watchlist.includes(id)) {
    watchlist.push(id);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));

    // Add to favorites if needed
    if (!favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    toast.success(
      `${id.substring(0, 1).toUpperCase() + id.substring(1)} - added to the watchlist`
    );
    callback(); // Call the callback to update the state
  } else {
    toast.error(
      `${id.substring(0, 1).toUpperCase() + id.substring(1)} - is already added to the watchlist!`
    );
  }
};
