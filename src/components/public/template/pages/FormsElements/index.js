import React from "react";
import {
  Grid,
  FormHelperText,
  InputAdornment,
  Divider,
  MenuItem,
  Select
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import Input from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import {
  AccountCircle,
  VpnKey as PasswordIcon,
  AccountBalanceWallet as WalletIcon
} from "@material-ui/icons";

// components
import Widget from "../../components/Widget";
import Button from '../../../../common/Button';
import Typography from '../../../../common/Typography';
import Code from "../../components/Code";

const GreenCheckbox = withStyles(theme => ({
  root: {
    color: theme.palette.text.successTheme,
    "&$checked": {
      color: theme.palette.text.successTheme
    }
  }
}))(props => <Checkbox color="default" {...props} />);

const GreenRadio = withStyles(theme => ({
  root: {
    color: theme.palette.text.successTheme,
    "&$checked": {
      color: theme.palette.text.successTheme,
    }
  }
}))(props => <Radio color="default" {...props} />);

const SuccessInput = withStyles(theme => ({
  root: {
    "& .MuiInputLabel-root": {
      color: theme.palette.text.successTheme
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.text.successTheme
      },
      "&:hover fieldset": {
        borderColor: theme.palette.text.successTheme
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.text.successTheme,
        borderWidth: 2
      }
    }
  }
}))(props => <Input {...props} />);

const actions = [
  {
    id: 0,
    value: "Action"
  },
  {
    id: 1,
    value: "Another action"
  },
  {
    id: 2,
    value: "Something else here"
  },
  {
    id: 3,
    type: "divider"
  },
  {
    id: 4,
    value: "Separated link"
  }
];

const styles = theme => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5"
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)"
    }
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""'
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3"
    }
  },
  horizontalFormTop: {
    paddingTop: theme.spacing(2)
  },
  inputIcon: {
    color: '#ccc'
  },
  buttonSpacing: {
    marginRight: 20,
  },
  buttonsContainerSpacing: {
    marginTop: 30
  },
  inputTitle: {
    display: 'block',
    marginTop: 16
  }
})

function FormsElements({ classes }) {
  const [isChecked, setChecked] = React.useState({
    default: false,
    horizontal: false
  });
  const [action, setAction] = React.useState("Action");

  const handleChange = e => {
    setAction(e.target.value);
  };

  function StyledRadio(props) {
    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={<span className={classNames(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }
  return (
    <div>
      <Grid container spacing={6}>
        <Grid item md={6} xs={12}>
          <Widget
            title="Horizontal form"
            bodyClass={classes.horizontalFormTop}
            disableWidgetMenu
          >
            <Grid container direction={"column"} spacing={3}>
              <Grid item container alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography variant={"body1"}>Normal field</Typography>
                </Grid>
                <Grid xs={6} item>
                  <Input
                    id="component-helper1"
                    placeholder={"May have placeholder"}
                    style={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
              <Grid item container alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography variant={"body1"}>Label hint</Typography>
                </Grid>
                <Grid xs={6} item>
                  <Input
                    id="component-helper2"
                    aria-describedby="component-helper-text"
                    style={{ width: "100%" }}
                  />
                  <FormHelperText id="component-helper-text">
                    Some important helper text
                  </FormHelperText>
                </Grid>
              </Grid>
              <Grid item container alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography variant={"body1"}>Disabled input</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Input
                    disabled
                    defaultValue={"Default value"}
                    id="component-helper3"
                    style={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
              <Grid item container alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography variant={"body1"}>Max length</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Input
                    id="component-helper4"
                    inputProps={{ maxLength: 3 }}
                    style={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
              <Grid item container alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography variant={"body1"}>Prepended input</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Input
                    id="component-helper5"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle classes={{ root: classes.inputIcon }} />
                        </InputAdornment>
                      )
                    }}
                    style={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
              <Grid item container alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography variant={"body1"}>Password</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Input
                    id="component-helper6"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PasswordIcon classes={{ root: classes.inputIcon }} />
                        </InputAdornment>
                      )
                    }}
                    style={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
              <Grid item container alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography variant={"body1"}>Appended input</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Input
                    id="component-helper7"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">.00</InputAdornment>
                      )
                    }}
                    style={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
              <Grid item container alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography variant={"body1"}>Combined input</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Input
                    id="component-helper8"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WalletIcon classes={{ root: classes.inputIcon }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="start">.00</InputAdornment>
                      )
                    }}
                    style={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
              <Grid classes={{ root: classes.buttonsContainerSpacing }} item container justify="flex-end">
                <Grid item>
                  <Button className={classes.buttonSpacing} variant={"contained"} color={"secondary"}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant={"contained"}
                    color={"primary"}
                  >
                    Save changes
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item md={6} xs={12}>
          <Widget title="Default Form" disableWidgetMenu>
            <Grid container spacing={5} direction={"column"}>
              <Grid item>
                <Typography variant={"body1"}>Search type input</Typography>
                <Input
                  color={"primary"}
                  type={"search"}
                  placeholder={"Search"}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Typography variant={"body1"} className={classes.inputTitle}>
                  Outlined input
                </Typography> 
                <Input
                  id="outlined-input"
                  margin="normal"
                  variant={"outlined"}
                />
              </Grid>
              <Grid item>
                <Typography className={classes.inputTitle}>Filled input</Typography>
                <Input id="outlined-input" margin="normal" variant={"filled"} />
              </Grid>
            </Grid>
          </Widget>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item md={6} xs={12}>
          <Widget title="Control sizing" disableWidgetMenu>
            <Grid container direction={"column"}>
              <Grid item>
                If{" "}
                <Code row inline>
                  dense
                </Code>
                or{" "}
                <Code row inline>
                  normal
                </Code>
                , will adjust vertical spacing of this and contained components.
                <Input
                  label='margin="dense"'
                  placeholder={"Margin dense"}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Input
                  label='margin="normal"'
                  placeholder={"Margin normal"}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item xs={12} md={6}>
          <Widget title="Selects" disableWidgetMenu>
            <Grid item container spacing={5} alignItems={"center"}>
              <Grid item xs={6}>
                <Typography variant={"body1"}>Default select</Typography>
              </Grid>
              <Grid xs={6}  item>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={action}
                  onChange={handleChange}
                >
                  {actions.map(c =>
                    c.type === "divider" ? (
                      <Divider key={c.id} />
                    ) : (
                      <MenuItem value={c.value} key={c.id}>
                        {c.value}
                      </MenuItem>
                    )
                  )}
                </Select>
              </Grid>
            </Grid>
            <Grid item container spacing={5} alignItems={"center"}>
              <Grid item xs={6}>
                <Typography variant={"body1"}>Grouped select</Typography>
              </Grid>
              <Grid xs={6} item>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={action}
                  onChange={handleChange}
                >
                  {actions.map(c =>
                    c.type === "divider" ? (
                      <Divider key={c.id} />
                    ) : (
                      <MenuItem value={c.value} key={c.id}>
                        {c.value}
                      </MenuItem>
                    )
                  )}
                </Select>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item md={6} xs={12}>
          <Widget title="Input variants" disableWidgetMenu>
            <Grid container direction={"column"}>
              <Typography>Custom checkboxes & radios</Typography>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled
                      defaultChecked={isChecked.default}
                      onChange={e =>
                        setChecked({ [e.target.value]: !isChecked.default })
                      }
                      value="checkedG"
                    />
                  }
                  label="Disabled"
                />
                <FormControlLabel
                  control={
                    <GreenCheckbox
                      defaultChecked={isChecked.default}
                      onChange={e =>
                        setChecked({ [e.target.value]: !isChecked.default })
                      }
                      value="checkedG"
                    />
                  }
                  label="Custom color"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      value="checkedH"
                    />
                  }
                  label="Custom icon"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      value="checkedI"
                    />
                  }
                  label="Custom size"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Radio
                      disabled
                      defaultChecked={isChecked.default}
                      onChange={e =>
                        setChecked({ [e.target.value]: !isChecked.default })
                      }
                      value="c"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "C" }}
                    />
                  }
                  label={"Disabled"}
                />
                <FormControlLabel
                  control={
                    <GreenRadio
                      defaultChecked={isChecked.default}
                      onChange={e =>
                        setChecked({ [e.target.value]: !isChecked.default })
                      }
                      value="c"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "C" }}
                    />
                  }
                  label={"Custom color"}
                />
                <FormControlLabel
                  control={
                    <Radio
                      defaultChecked={isChecked.default}
                      onChange={e =>
                        setChecked({ [e.target.value]: !isChecked.default })
                      }
                      value="e"
                      color="default"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "E" }}
                      icon={<RadioButtonUncheckedIcon fontSize="small" />}
                      checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
                    />
                  }
                  label={"Small radio"}
                />
                <FormControlLabel
                  value="a"
                  control={<StyledRadio />}
                  label="Custom style"
                />
                <Grid item>
                  <Input
                    error
                    label="Error input"
                    placeholder={"Input with an error"}
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                  />
                  <SuccessInput
                    label="Success input"
                    placeholder={"Input with success"}
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item xs={12} md={6}>
          <Widget title="Textareas" disableWidgetMenu>
            <Grid item xs={6}>
              <Typography variant={"body1"}>Simple textarea</Typography>
            </Grid>
            <Grid item container alignItems={"center"}>
              <Grid xs={6} item>
                <Input
                  id="outlined-multiline-static"
                  label="Multiline"
                  multiline
                  rows="4"
                  defaultValue="Default Value"
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Widget>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(FormsElements)