import React, {Component} from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar'
import PaletteFooter from './PaletteFooter'
import {withStyles} from "@material-ui/core/styles";
import style from "./styles/PaletteStyle"

class Palette extends Component {
  constructor(props){
    super(props);
    this.state = {level:500, format:"hex"};
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }
  changeLevel(level){
    this.setState({level: level});
  }
  changeFormat(val){
    this.setState({format: val})
  }
  render(){
    const {classes} = this.props;
    const {colors, paletteName, emoji, id} = this.props.palette;
    const {level, format} = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        moreUrl = {`/palette/${id}/${color.id}`}
        showingFullPalette = {true}
        />
    ))
  return (
    <div className={classes.palette}>
      <Navbar
        level={level}
        changeLevel={this.changeLevel}
        handleChange={this.changeFormat}
        showingAllColors
        />
      <div className={classes.colors}>
        {colorBoxes}
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} id={id}/>
    </div>
  );
  }
}

export default withStyles(style)(Palette);
