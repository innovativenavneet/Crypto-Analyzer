import { toast } from "react-toastify";

export const removeItemToWatchlist = (e, id, setIsCoinAdded) => {
  e.preventDefault();
  if (window.confirm("Are you sure you want to remove this coin?")) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const newList = watchlist.filter((coin) => coin !== id);
    
    // Update the watchlist in localStorage
    localStorage.setItem("watchlist", JSON.stringify(newList));
    
    setIsCoinAdded(false); // Update the favorite state
    toast.success(
      `${id.substring(0, 1).toUpperCase() + id.substring(1)} - has been removed!`
    );

    // If you want to reload the page after removing
    window.location.reload();
  } else {
    toast.error(
      `${id.substring(0, 1).toUpperCase() + id.substring(1)} - could not be removed!`
    );
    setIsCoinAdded(true);
  }
};
