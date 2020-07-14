import React, { Component } from 'react';
import ColorBox from './ColorBox';
import {Link} from 'react-router-dom'
import PaletteFooter from './PaletteFooter'
import Navbar from './Navbar';
import {withStyles} from "@material-ui/core/styles";
import style from "./styles/PaletteStyle"

class SingleColorPalette extends Component {
  constructor(props){
    super(props)
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state = {format: "hex"};
    this.changeFormat = this.changeFormat.bind(this)
  }
  gatherShades(palette, colorToFilterBy){
    let shades = []
    let allColors = palette.colors;

    for(let key in allColors){
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      )
    }
    return shades.slice(1);
  }
  changeFormat(val){
    this.setState({format: val})
  }
  render() {
    const {paletteName, emoji, id} = this.props.palette;
    const {classes} = this.props;
    const {format} = this.state;
    const colorBoxes = this._shades.map(color => (
      <ColorBox
        key={color[format]}
        name={color.name}
        background={color[format]}
        showingFullPalette={false}
      />
    ));
    return (
      <div className={classes.palette}>
        <Navbar
          handleChange = {this.changeFormat}
          showingAllColors = {false}
        />
    <div className={classes.colors}>
      {colorBoxes}
      <div className={classes.goBack}>
          <Link to={`/palette/${id}`}>GO BACK</Link>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(style)(SingleColorPalette);
