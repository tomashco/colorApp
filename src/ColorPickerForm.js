import React from 'react';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {ChromePicker} from 'react-color'
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
  createStyles({
    picker: {
      width: "100% !important",
      marginTop: "2rem"
    },
    addColor: {
      width: "100%",
      padding: "1rem",
      marginTop: "1rem",
      fontSize: "2rem"
    },
    colorNameInput: {
      width:"100%",
      height: "70px"
    }
  }),
);

export default function ColorPickerForm(props) {
  const {paletteIsFull, colors, setColors} = props;
  const classes = useStyles();
  const [newColorName, setNewColorName] = React.useState("")
  const [currentColor, setCurrentColor] = React.useState('teal');

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
        return colors.every(
          ({name}) => name.toLowerCase() !== value.toLowerCase()
        )
    });
    ValidatorForm.addValidationRule('isColorUnique', () => {
      return colors.every(
          ({color}) => color !== currentColor.hex
        )
    });
  });

  const handleCurrentColor = (newColor) => {
    setCurrentColor(newColor)
  }

  const addNewColor = () => {
    const newColor = {
      name: newColorName,
      color: currentColor.hex,
    }
    setColors([...colors, newColor])
  }

  return (
    <div>
      <ChromePicker
        className={classes.picker}
        color={currentColor}
        onChangeComplete={handleCurrentColor}/>
      <ValidatorForm onSubmit={addNewColor}>
        <TextValidator
          className={classes.colorNameInput}
          value={newColorName}
          name="newColorName"
          variant="filled"
          margin="normal"
          placeholder="Color Name"
          onChange={evt => setNewColorName(evt.target.value)}
          validators = {[
            "required",
            "isColorNameUnique",
            "isColorUnique"
          ]}
          errorMessages={[
            "this field is required",
            "Color name must be unique",
            "Color already used!"
          ]}
          />
      <Button
        className={classes.addColor}
        variant="contained"
        color="primary"
        style={{backgroundColor: currentColor.hex}}
        type="submit"
        disabled={paletteIsFull}
        >{paletteIsFull? "Palette is full":"Add Color"}</Button>
      </ValidatorForm>
    </div>
    )
  }
