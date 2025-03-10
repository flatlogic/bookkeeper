import React from "react";
import {
  withStyles,
  Badge as BadgeBase,
  Typography as TypographyBase,
  Button as ButtonBase,
  Chip as ChipBase,
  Tooltip as TooltipBase,
  Avatar as AvatarBase,
  Paper as PaperBase,
  AppBar as AppBarBase,
  Link as LinkBase,
  CircularProgress as CircularProgressBase,
  LinearProgress as LinearProgressBase,
  Radio as RadioBase
} from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/styles";
import classnames from "classnames";
import tinycolor from 'tinycolor2';

// styles
const useStyles = makeStyles(theme => ({
  badge: {
    fontWeight: 600,
    height: props => {
      if (!props.variant) return 16;
    },
    minWidth: props => {
      if (!props.variant) return 16;
    }
  }
}));

function Badge({ children, colorBrightness, color, type, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const Styled = createStyled({
    badge: {
      backgroundColor: type === 'tag' ? `${getColorText(color, theme, colorBrightness)}44` : getColorText(color, theme, colorBrightness),
      color: type === 'tag' ? getColorText(color, theme, colorBrightness) : "white",
      borderRadius: type === 'tag' && 2,
      padding: type === 'tag' && '4px 7px',
      height: type === 'tag' && 'auto',
      position: type === 'tag' && 'static',
      transform: type === 'tag' && 'none',
      marginRight:  type === 'tag' && 10,
      marginBottom:  type === 'tag' && 7,
    }
  });

  return (
    <Styled>
      {styledProps => (
        <BadgeBase
          classes={{
            badge: classnames(classes.badge, styledProps.classes.badge)
          }}
          {...props}
        >
          {children}
        </BadgeBase>
      )}
    </Styled>
  );
}

function Chip({ colorBrightness, color, variant, ...props }) {
  const theme = useTheme();
  const Styled = createStyled({
    root: {
      backgroundColor: tinycolor(getColorText(color, theme, colorBrightness)).setAlpha(colorBrightness || 1),
      color: variant === 'outlined' ? getColorText(color, theme, colorBrightness) : "white",
      border: variant === 'outlined' ? `1px solid ${getColorText(color, theme, colorBrightness)}`  : "none",
      width:  variant === 'outlined' && 21,
      height: variant === 'outlined' && 21,
      '& > span': {
        padding: variant === 'outlined' && 0,
        fontSize: variant === 'outlined' && 10
      }
    }
  });

  return (
    <Styled>
      {styledProps => (
        <ChipBase
          classes={{
            root: classnames(styledProps.classes.root)
          }}
          {...props}
        />
      )}
    </Styled>
  );
}

function Typography({
  children,
  weight,
  size,
  colorBrightness,
  color,
  block,
  uppercase,
  style,
  ...props
}) {
  const theme = useTheme();

  return (
    <TypographyBase
      style={{
        color: getColor(color, theme, colorBrightness),
        fontWeight: getFontWeight(weight),
        fontSize: getFontSize(size, props.variant, theme),
        textTransform: uppercase ? "uppercase" : "none",
        ...style
      }}
      component={block ? "div" : "p"}
      {...props}
    >
      {children}
    </TypographyBase>
  );
}

function Button({ children, color, className, style, ...props }) {
  const useStyles = makeStyles(theme => ({
    root: {
      color: getColor(color, theme)
    },
    contained: {
      backgroundColor: getColor(color, theme),
      boxShadow: theme.customShadows.widget,
      color:
        theme.palette.type === "dark" && !color
          ? "#000"
          : `${color ? "white" : theme.palette.text.primary} !important`,
      "&:hover": {
        backgroundColor: getColor(color, theme, "light"),
        boxShadow: theme.customShadows.widgetWide
      },
      "&:active": {
        boxShadow: theme.customShadows.widgetWide
      }
    },
    outlined: {
      color: getColor(color, theme),
      borderColor: getColor(color, theme)
    },
    select: {
      backgroundColor: theme.palette.primary.main,
      color: "#fff"
    }
  }));
  const classes = useStyles();

  return (
    <ButtonBase
      classes={{
        contained: classes.contained,
        root: classes.root,
        outlined: classes.outlined
      }}
      {...props}
      className={classnames(
        {
          [classes.select]: props.select
        },
        className
      )}
      style={{...style}}
    >
      {children}
    </ButtonBase>
  );
}

function Avatar({ children, color, colorBrightness, ...props }) {
  const theme = useTheme();

  const Styled = createStyled({
    colorDefault: {
      backgroundColor: getColorPaper(color, theme, colorBrightness)
    }
  });

  return (
    <Styled>
      {({ classes }) => (
        <AvatarBase classes={{ colorDefault: classes.colorDefault }} {...props}>
          {children}
        </AvatarBase>
      )}
    </Styled>
  );
}

function Tooltip({ children, color, ...props }) {
  const theme = useTheme();

  const Styled = createStyled({
    tooltip: {
      backgroundColor: getColor(color, theme),
      color: "white"
    }
  });

  return (
    <Styled>
      {({ classes }) => (
        <TooltipBase classes={{ tooltip: classes.tooltip }} {...props}>
          {children}
        </TooltipBase>
      )}
    </Styled>
  );
}

function Paper({ children, color, ...props }) {
  const theme = useTheme();

  const Styled = createStyled({
    root: {
      backgroundColor: getColorPaper(color, theme),
      boxShadow: 'none',
      borderRadius: 2,
      border: `1px solid ${tinycolor(getColorPaper(color, theme)).darken(10)}`
    }
  });

  return (
    <Styled>
      {({ classes }) => (
        <PaperBase classes={{ root: classes.root }} {...props}>
          {children}
        </PaperBase>
      )}
    </Styled>
  );
}

function AppBar({ children, color, ...props }) {
  const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: getColor(color, theme)
    }
  }));

  const classes = useStyles();

  return (
    <AppBarBase classes={{ root: classes.root }} {...props}>
      {children}
    </AppBarBase>
  );
}

function Link({ children, color, ...props }) {
  const useStyles = makeStyles(theme => ({
    root: {
      color: color
        ? `${getColorPaper(color, theme)} !important`
        : theme.palette.text.primary
    }
  }));

  const classes = useStyles();

  return (
    <LinkBase classes={{ root: classes.root }} {...props}>
      {children}
    </LinkBase>
  );
}

function CircularProgress({ children, color, ...props }) {
  const useStyles = makeStyles(theme => ({
    root: {
      color: color
        ? `${getColorText(color, theme)} !important`
        : theme.palette.primary.main
    }
  }));

  const classes = useStyles();

  return (
    <CircularProgressBase classes={{ root: classes.root }} {...props}>
      {children}
    </CircularProgressBase>
  );
}

function LinearProgress({ children, color, ...props }) {
  const theme = useTheme();

  const Styled = createStyled({
    root: {
      backgroundColor: getCustomBackgroundColor(color)
    },
    bar: {
      backgroundColor: color
        ? `${getColorText(color, theme)} !important`
        : theme.palette.primary.main
    }
  });

  return (
    <Styled>
      {({ classes }) => (
        <LinearProgressBase
          classes={{ root: classes.root, bar: classes.bar }}
          {...props}
        >
          {children}
        </LinearProgressBase>
      )}
    </Styled>
  );
}

function Radio({ children, color, ...props }) {
  const Styled = createStyled({
    root: {
      color: "green",
      "&$checked": {
        color: "green"
      }
    },
    checked: {}
    // '&.Mui-checked': {
    // color: theme.palette[color].main
    // },
    // '&:hover': {
    //   backgroundColor: `${theme.palette[color].main} !important`,
    //   opacity: .1
    // }
  });

  return (
    <Styled>
      {({ classes }) => (
        <RadioBase
          classes={{
            root: classes.root,
            checked: classes.checked
          }}
          {...props}
        />
      )}
    </Styled>
  );
}

export {
  Badge,
  Typography,
  Button,
  Chip,
  Tooltip,
  Avatar,
  Paper,
  AppBar,
  Link,
  CircularProgress,
  LinearProgress,
  Radio
};

// ########################################################################

function getColor(color, theme, brightness = "main") {
  if (color && theme.palette[color] && theme.palette[color][brightness]) {
    return theme.palette[color][brightness];
  }
}

function getColorPaper(color, theme) {
  if (color && theme.palette.button[color]) {
    return theme.palette.button[color];
  }
}

function getColorText (color, theme) {
  if (color && theme.palette.text[color]) {
    return theme.palette.text[color];
  }
}

function getCustomBackgroundColor(color) {
  switch (color) {
    case "primary":
      return "rgba(83, 109, 254, .3)";
    case "secondary":
      return "rgba(255, 198, 208, 0.3)";
    case "warning":
      return "rgba(255, 219, 198, 0.3)";
    case "success":
      return "rgba(147, 212, 185, 0.3)";
    case "info":
      return "rgba(214, 172, 254, 0.3)";
    default:
      return "#C4D4FE";
  }
}

function getFontWeight(style) {
  switch (style) {
    case "light":
      return 300;
    case "medium":
      return 500;
    case "bold":
      return 600;
    default:
      return 400;
  }
}

function getFontSize(size, variant = "", theme) {
  let multiplier;

  switch (size) {
    case "sm":
      multiplier = 0.8;
      break;
    case "md":
      multiplier = 1.5;
      break;
    case "xl":
      multiplier = 2;
      break;
    case "xxl":
      multiplier = 3;
      break;
    default:
      multiplier = 1;
      break;
  }

  const defaultSize =
    variant && theme.typography[variant]
      ? theme.typography[variant].fontSize
      : theme.typography.fontStyle + "px";

  return `calc(${defaultSize} * ${multiplier})`;
}

function createStyled(styles, options) {
  const Styled = function(props) {
    const { children, ...other } = props;
    return children(other);
  };

  return withStyles(styles, options)(Styled);
}
