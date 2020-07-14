import React, {Component} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {withStyles} from "@material-ui/core/styles";
import style from "./styles/ColorBoxStyle"
import {Link} from "react-router-dom"
import clsx from 'clsx';

class ColorBox extends Component {
  constructor(props){
    super(props);
    this.state = {copied: false};
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  changeCopyState(){
    this.setState({copied:true}, () => {
    setTimeout(() => this.setState({copied:false}), 1500)
    });
  }

  render(){
    const {name, background, moreUrl, showingFullPalette, classes } = this.props;
    const {copied} = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
      <div className={classes.colorBox}>
        <div
          style={{background:background}}
          className={clsx(classes.copyOverlay, {[classes.showOverlay]: copied})}
          />
        <div className={clsx(classes.copyMsg, {[classes.showMsg]: copied})}>
          <h1>copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div className="copy-container">
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton}>Copy</button>
        </div>
        {showingFullPalette && (
        <Link to={moreUrl} onClick={e => e.stopPropagation()}>
          <span className={classes.seeMore}>MORE</span>
        </Link>)}
      </div>
      </CopyToClipboard>
    )
  }
}

export default withStyles(style)(ColorBox);
