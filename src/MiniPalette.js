import React, {PureComponent} from 'react';
import {withStyles} from "@material-ui/core/styles";
import styles from "./styles/MiniPaletteStyle"
import DeleteIcon from '@material-ui/icons/Delete'

class MiniPalette extends PureComponent {

  render(){
  const {classes, paletteName, id, emoji, colors, openDialog, handleClick} = this.props;
  const removePalette = (e) => {
    e.stopPropagation()
    openDialog(id)
  }
  const miniColorBoxes = colors.map(color => (
    <div
      className={classes.miniColor}
      style={{backgroundColor: color.color}}
      key={color.name}
      />
  ));
    return (
      <div className={classes.root} onClick={() => handleClick(id)}>
        <div className={classes.delete}>
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={removePalette}
            />
        </div>
        <div className={classes.colors}>{miniColorBoxes}</div>
          <h5 className={classes.title}>
            {paletteName} <span className={classes.emoji}>{emoji}</span>
          </h5>
      </div>
    );
  }
}
export default withStyles(styles)(MiniPalette);
