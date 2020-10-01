//@flow
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import './Header.css';

type Props = {
  onPressCreate: Function,
};

export default function Header(props: Props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <div className="container">
          <Typography variant="h6">Storefront</Typography>
          <IconButton
            edge="end"
            aria-label="add"
            color="inherit"
            onClick={props.onPressCreate}
          >
            <AddIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
