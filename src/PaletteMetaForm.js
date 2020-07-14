import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css'
import {Picker} from "emoji-mart"

export default function PaletteMetaForm(props) {
  const {palettes, newPaletteName, setNewPaletteName, handleSubmit, hideForm} = props;
  const [stage, setStage] = React.useState("form")

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return palettes.every(
          ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
        )
    });
  });

  const savePalette = (emoji) => {
    handleSubmit(emoji.native)
    setStage("");
  }
  return (
    <div>
      <Dialog open={stage === "emoji"} onClose={hideForm}>
        <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
        <Picker
          onSelect={savePalette}
          title="Pick a Palette Emoji"
          />
      </Dialog>
      <Dialog open={stage === "form"} onClose={hideForm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Save the palette</DialogTitle>
        <ValidatorForm onSubmit={() => setStage("emoji")}>
          <DialogContent>
            <DialogContentText>
              Enter the name of the palette to save
            </DialogContentText>
            <TextValidator
              label="Palette Name"
                value={newPaletteName}
                name="newPaletteName"
                fullWidth
                margin="normal"
                onChange={evt => setNewPaletteName(evt.target.value)}
                validators={["required","isPaletteNameUnique"]}
                errorMessages={["Enter Palette Name", "Name already used"]}
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              >Save</Button>
          </DialogActions>
          </ValidatorForm>
      </Dialog>
    </div>
  );
}
