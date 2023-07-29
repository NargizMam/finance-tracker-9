import React from 'react';
import {NavLink} from "react-router-dom";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {useAppDispatch} from "../../app/hook";
import {openModal} from "../../store/TransactionsSlice";

const Navbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const open = () => {
        dispatch(openModal());
    };

  return (
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant="h6" component={NavLink} to='/' >
            Finance Tracker
          </Typography>
            <Box>
                <Button component={NavLink} to='/categories' color="inherit">Categories </Button>
                <Button color="inherit"
                        onClick={open}
                >Add </Button>
            </Box>
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;