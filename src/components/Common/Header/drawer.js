import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { IconButton } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Link } from 'react-router-dom';
import './style.css'; // Ensure you have the styles for .drawer-div and .link

export default function AnchorTemporaryDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <MenuRoundedIcon className="link" />
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="drawer-div">
          <Link to="/" className="link" onClick={() => setOpen(false)}>
            <p>Home</p>
          </Link>

          <Link to="/Comparepage" className="link" onClick={() => setOpen(false)}>
            <p>Compare</p>
          </Link>

          <Link to="/WatchList" className="link" onClick={() => setOpen(false)}>
            <p>Watchlist</p>
          </Link>

          <Link to="/Dashboard" className="link" onClick={() => setOpen(false)}>
            <p>Dashboard</p>
          </Link>
        </div>
      </Drawer>
    </div>
  );
}
