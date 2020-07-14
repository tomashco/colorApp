import chroma from "chroma-js"
import sizes from "./sizes";

export default {
  colorBox: {
    width: "20%",
    background: props => props.background,
    height: props => props.showingFullPalette? "25%": "50%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px",
    "&:hover button": {
      opacity: 1
    },
    [sizes.down("md")]:{
      width: "50%",
      height: props => props.showingFullPalette? "10%" : "20%"
    },
    [sizes.down("xs")]:{
      width: "100%",
      height: props => props.showingFullPalette? "5%" : "10%"
    }
  },
  copyText: {
    color: props => chroma(props.background).luminance() >= 0.6 ? "rgba(0,0,0,0.7)" : "white"
  },
  colorName: {
    color: props => chroma(props.background).luminance() <= 0.1 ? "white" : "rgba(0,0,0,0.7)"
  },
  seeMore: {
    color: props => chroma(props.background).luminance() >= 0.6 ? "rgba(0,0,0,0.7)" : "white",
    background: "rgba(255,255,255,0.3)",
    position: "absolute",
    border: "none",
    right: "0px",
    bottom: "0px",
    width: "60px",
    height: "30px",
    textAlign: "center",
    textTransform: "uppercase"
  },
  copyButton: {
    color: props => chroma(props.background).luminance() >= 0.6 ? "rgba(0,0,0,0.7)" : "white",
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top:"50%",
    left:"50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    outline: "none",
    background: "rgba(255,255,255,0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    textTransform: "uppercase",
    border: "none",
    opacity: 0,
    textDecoration: "none",
  },
  boxContent: {
    width: "100%",
    position: "absolute",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "rgba(0, 0, 0, 0.8)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px"
  },
  copyOverlay: {
    opacity: 0,
    zIndex: 0,
    width: "100%",
    height: "100%",
    transition: "transform 0.6s ease-in-out",
  },
  showOverlay: {
    opacity: 1,
    transform: "scale(50)",
    zIndex: 10,
    position: "absolute",
  },
  copyMsg: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "4rem",
    flexDirection: "column",
    transform: "scale(0.1)",
    opacity: 0,
    color: "white",
    "& h1": {
      fontWeight: 400,
      textShadow: "1px 2px black",
      background: "rgba(255,255,255,0.2)",
      width: "100%",
      textAlign: "center",
      marginBottom: 0,
      padding: "1rem",
    },
    "& p": {
      fontSize: "2rem",
      fontWeight: 100
    }
  },
  showMsg: {
    opacity: 1,
    transform: "scale(1)",
    zIndex: 25,
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.3s",
  }
}
