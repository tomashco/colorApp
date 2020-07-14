import React from 'react';
import PaletteFormNav from "./PaletteFormNav"
import ColorPickerForm from "./ColorPickerForm"
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Button } from '@material-ui/core';
import DraggableColorList from "./draggableColorList"
import { arrayMove } from 'react-sortable-hoc';
import useStyles from './styles/NewPaletteFormStyle';
import seedColors from "./seedColors"

export default function NewPaletteForm(props){
    const {maxColors = 20, palettes} = props;
    const classes = useStyles();
    const [colors, setColors] = React.useState(seedColors[0].colors)
    const [open, setOpen] = React.useState(true);
    const [newPaletteName, setNewPaletteName] = React.useState("")
    const paletteIsFull = colors.length >= maxColors;

      const handleDrawerClose = () => {
      setOpen(false);
    };

    const onSortEnd = ({oldIndex, newIndex}) => {
      setColors(arrayMove(colors, oldIndex, newIndex))
    }

    const handleSubmit = (emoji) => {
      const newPalette = {
        paletteName: newPaletteName,
        id: newPaletteName.toLowerCase().replace(/ /g, "-"),
        emoji: emoji,
        colors: colors
      }
      props.savePalette(newPalette);
      props.history.push("/");
    }

    const removeColor = (colorName) => {
      setColors(colors.filter(color => color.name !== colorName))
    }

    const clearColors = () => {
      setColors([])
    }

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const addRandomColor = () => {
      const allColors = props.palettes.map(p => p.colors).flat();
      let rand;
      let randomColor;
      let isDuplicateColor = true;
      while(isDuplicateColor){
        rand = Math.floor(Math.random()*allColors.length)
        randomColor = allColors[rand];
        isDuplicateColor = colors.some(color => color.name === randomColor.name);
      }
      setColors([...colors, randomColor])
    }

    return (
      <div className={classes.root}>
        <PaletteFormNav
          newPaletteName={newPaletteName}
          setNewPaletteName={setNewPaletteName}
          handleDrawerOpen={handleDrawerOpen}
          open={open}
          handleSubmit={handleSubmit}
          palettes={palettes}
          />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container} >
            <Typography variant="h4" gutterBottom>
              Design your Palette
            </Typography>
          <div className={classes.buttons} >
          <Button
            variant='contained'
            className={classes.button}
            color='secondary'
            onClick={clearColors}
            >Clear Palette</Button>
          <Button
            variant='contained'
            className={classes.button}
            color='primary'
            onClick = {addRandomColor}
            disabled={paletteIsFull}
            >Random Color</Button>
          </div>
          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            colors={colors}
            setColors={setColors}
            />
          </div>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
            <DraggableColorList
              colors={colors}
              removeColor={removeColor}
              axis="xy"
              onSortEnd={onSortEnd}
              />
        </main>
      </div>
    );
  }
