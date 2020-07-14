import React from 'react';
import {Link} from "react-router-dom"
import PaletteMetaForm from "./PaletteMetaForm"
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import useStyles from './styles/PaletteFormNavStyles';

export default function PaletteFormNav(props) {

  const {newPaletteName, setNewPaletteName, handleDrawerOpen, open, handleSubmit, palettes} = props;
  const [formShowing, setFormShowing] = React.useState(false);
  const classes = useStyles();

  const hideForm = () => {
    setFormShowing(false);
  }

  return (
    <div className={classes.root} >
      <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Create a palette
            </Typography>
          </Toolbar>
            <div className={classes.navBtns}>
            <Link to="/">
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              >Go back</Button>
            </Link>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => setFormShowing(true)}>
              Save
            </Button>
              </div>
        </AppBar>
        {formShowing && <PaletteMetaForm
              palettes={palettes}
              newPaletteName={newPaletteName}
              setNewPaletteName={setNewPaletteName}
              handleSubmit={handleSubmit}
              hideForm={hideForm}
              />}
      </div>
    );
  }
