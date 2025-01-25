import React from "react";
import { Grid, Box, IconButton, Tab, Tabs, AppBar } from "@material-ui/core";
import {
  Mail as MailIcon,
  ShoppingCart as ShoppingCartIcon
} from "@material-ui/icons";
import { withStyles } from '@material-ui/core/styles';

// components
import Widget from "../../components/Widget";
import Code from "../../components/Code";
import { Badge, Chip } from "../../components/Wrappers";
import Typography from '../../../../common/Typography';
import Button from '../../../../common/Button';

const styles = theme => ({
  paddingTop: {
    paddingTop: theme.spacing(1),
  },
  badge: {
    margin: theme.spacing(2, 2, 0, 0),
  },
  margin: {
    margin: theme.spacing(0, 2, 0, 0),
  },
  tabRoot: {
    minHeight: 46,
    background: '#fff',
    '& > span': {
      flexDirection: 'row',
      '& > svg': {
        marginBottom: 4,
        marginRight: 4
      }
    }
  },
  tabsRoot: {
    minHeight: 46,
    boxShadow: '4px 4px 14px 0 rgba(133,152,174,.25)'
  },
  tabTitle: {
    color: `${theme.palette.text.primaryTheme}!important`
  },
  indicator: {
    background: theme.palette.text.primaryTheme
  },
  appBarRoot: {
    marginTop: 10,
    boxShadow: 'none',
  },
  largeHeading: {
    lineHeight: .85,
  }
})

function BadgeComp({ classes }) {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Widget title="Badge Example" disableWidgetMenu>
            <Typography>
              Badge generates a small badge to the top-right of its child(ren)
            </Typography>
            <Box>
              <Box my={3}>
                <Badge color="primaryTheme" badgeContent={"Primary"}>
                  <Typography variant="h1" className={`${classes.paddingTop} ${classes.largeHeading}`}>
                    Example heading
                  </Typography>
                </Badge>
              </Box>
              <Box my={3}>
                <Badge color="secondaryLight" badgeContent={"Secondary"}>
                  <Typography variant="h2" className={classes.paddingTop}>
                    Example heading
                  </Typography>
                </Badge>
              </Box>
              <Box my={3}>
                <Badge color="warningTheme" badgeContent={"Warning"}>
                  <Typography variant="h3" className={classes.paddingTop}>
                    Example heading
                  </Typography>
                </Badge>
              </Box>
              <Box my={3}>
                <Badge color="infoTheme" badgeContent={"Info"}>
                  <Typography variant="h4" className={classes.paddingTop}>
                    Example heading
                  </Typography>
                </Badge>
              </Box>
              <Box my={3}>
                <Badge color="errorTheme" badgeContent={"Error"}>
                  <Typography variant="h5" className={classes.paddingTop}>
                    Example heading
                  </Typography>
                </Badge>
              </Box>
              <Box my={3}>
                <Badge
                  color="primaryTheme"
                  colorBrightness="light"
                  badgeContent={"Primary light"}
                >
                  <Typography variant="h6" className={classes.paddingTop}>
                    Example heading
                  </Typography>
                </Badge>
              </Box>
              <Typography>
                Badges can be used as part of links or buttons to provide a
                counter.
              </Typography>
              <Box my={3}>
                <Badge color="success" badgeContent={"1"}>
                  <Button variant="contained" className={classes.paddingTop}>
                    Example heading
                  </Button>
                </Badge>
              </Box>
            </Box>
          </Widget>
        </Grid>

        <Grid item md={6} xs={12}>
          <Widget title="Icon Badges" disableWidgetMenu>
            <Typography>
              Badge can also be used as a parent of a icon as well as a parent
              of a clickable icon
            </Typography>
            <Box>
              <Box
                my={1}
                justifyContent="center"
                display="flex"
                alignItems="center"
              >
                <Badge
                  className={classes.badge}
                  badgeContent={4}
                  color="primaryTheme"
                >
                  <MailIcon />
                </Badge>
                <Badge
                  className={classes.badge}
                  badgeContent={10}
                  color="errorTheme"
                >
                  <MailIcon />
                </Badge>
                <IconButton
                  aria-label="4 pending messages"
                  className={classes.badge}
                >
                  <Badge badgeContent={4} color="warningTheme">
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Box>
              <Box my={6}>
                <AppBar classes={{ root: classes.appBarRoot }} position="static" color="default">
                  <Tabs
                    value={0}
                    classes={{
                      indicator: classes.indicator,
                      root: classes.tabsRoot,
                    }}
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    <Tab
                      classes={{ root: classes.tabRoot, selected: classes.tabTitle }}
                      label={
                        <Badge
                          className={classes.padding}
                          color="errorTheme"
                          badgeContent={4}
                        >
                          Item One
                        </Badge>
                      }
                    />
                    <Tab classes={{ root: classes.tabRoot, selected: classes.tabTitle }} label="Item Two" />
                    <Tab classes={{ root: classes.tabRoot, selected: classes.tabTitle }} label="Item Three" />
                  </Tabs>
                </AppBar>
              </Box>
              <Typography block>
                You may to use dot badge via{" "}
                <Code row inline>{`variant="dot"`}</Code>
              </Typography>
              <Box
                my={6}
                justifyContent="center"
                display="flex"
                alignItems="center"
              >
                <Badge
                  badgeContent={4}
                  color={"primaryTheme"}
                  className={classes.margin}
                  variant={"dot"}
                >
                  <ShoppingCartIcon />
                </Badge>
                <Badge
                  badgeContent={4}
                  color="errorTheme"
                  className={classes.margin}
                  variant={"dot"}
                >
                  <MailIcon />
                </Badge>
                <Badge
                  badgeContent={4}
                  color="warningTheme"
                  className={classes.margin}
                  variant={"dot"}
                >
                  <Typography>Typography</Typography>
                </Badge>
              </Box>
              <Typography block>
                You can use the <Code row inline>{`horizontalAlignment`}</Code>{" "}
                and <Code row inline>{`verticalAlignment`}</Code>
                properties to move the badge to any corner of the wrapped
                element.
              </Typography>
              <Box
                my={6}
                justifyContent="center"
                display="flex"
                alignItems="center"
              >
                <Badge
                  badgeContent={4}
                  color={"primaryTheme"}
                  className={classes.margin}
                  variant={"dot"}
                >
                  <ShoppingCartIcon />
                </Badge>
                <Badge
                  badgeContent={4}
                  color="errorTheme"
                  className={classes.margin}
                  variant={"dot"}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <MailIcon />
                </Badge>
                <Badge
                  badgeContent={4}
                  color="warningTheme"
                  className={classes.margin}
                  variant={"dot"}
                  anchorOrigin={{ vertical: "top", horizontal: "left" }}
                  size={""}
                >
                  <Typography>Typography</Typography>
                </Badge>
              </Box>
            </Box>
          </Widget>
        </Grid>

        <Grid item md={12}>
          <Widget title="Chips" disableWidgetMenu>
            <Typography>
              Chips allow users to enter information, make selections, filter
              content, or trigger actions.
            </Typography>
            <Box>
              <Chip
                className={classes.badge}
                color="primaryTheme"
                label={"Primary"}
              />
              <Chip
                className={classes.badge}
                color="secondaryLight"
                label={"Secondary"}
              />
              <Chip
                className={classes.badge}
                color="warningTheme"
                label={"Warning"}
              />
              <Chip className={classes.badge} color="infoTheme" label={"Info"} />
              <Chip
                className={classes.badge}
                color="successTheme"
                label={"Success"}
              />
              <Chip
                className={classes.badge}
                color="errorTheme"
                label={"Error"}
              />
            </Box>
          </Widget>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(BadgeComp);