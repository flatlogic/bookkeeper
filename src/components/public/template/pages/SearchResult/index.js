import React from "react";
import {
  Grid,
  Box,
  Select,
  FormControl,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ButtonGroup
} from "@material-ui/core";
import {
  BorderAll as GridIcon,
  FormatAlignJustify as RowIcon
} from "@material-ui/icons";
import { withStyles } from '@material-ui/core/styles';

//images
import img1 from "../../../../../images/newImages/angular_material.jpg";
import img2 from "../../../../../images/newImages/one_bootstrap_full.jpg";
import img3 from "../../../../../images/newImages/one_react_full.jpg";
import img4 from "../../../../../images/newImages/vue_material_free.jpg";

//components
import { Link, Chip } from "../../components/Wrappers";
import Typography from '../../../../common/Typography';
import Button from '../../../../common/Button';
import Widget from "../../components/Widget";
import Pagination from "../../components/Pagination";

const styles = theme => ({
  filter: {
    width: 130,
  },
  citySubtitle: {
    marginTop: 6,
    color: '#6E6E6E',
    opacity: .6
  },
  descriptionText: {
    color: '#6E6E6E',
    marginTop: 22,
    '@media (max-width: 1430px)': {
      fontSize: 14,
      marginTop: 10,
    }
  },
  adjustRightBorderRadius: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  adjustLeftBorderRadius: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  flexContainer: {
    display: 'flex',
    '@media (max-width: 960px)': {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '& > img': {
      maxWidth: 300,
      '@media (max-width: 1430px)': {
        maxWidth: 220,
      },
      '@media (max-width: 960px)': {
        maxWidth: '100%'
      }
    },
    '@media (max-width: 1430px)': {
      justifyContent: 'space-between',
    }
  },
  filterBlock: {
    background: '#fff',
    padding: 24
  },
  searchText: {
    maxWidth: '40%',
    '@media (max-width: 1640px)': {
      maxWidth: '30%',
    },
    '@media (max-width: 1430px)': {
      maxWidth: '40%',
      margin: 10,
    },
    '@media (max-width: 960px)': {
      maxWidth: '100%',
    }
  },
  learnButton: {
    marginTop: 40
  },
  titleLink: {
    fontSize: 22,
    fontWeight: 100,
    '@media (max-width: 1430px)': {
      fontSize: 17,
      lineHeight: 1.3
    }
  },
  priceBtnBox: {
    '@media (max-width: 1430px)': {
      margin: '10px 24px 10px 0',
    }
  },
  itemBtnPadding: {
    '@media (max-width: 1430px)': {
      padding: 0,
    }
  },
  resultDescriptoin: {
    paddingTop: 15
  },
  resultBlock: {
    paddingLeft: 24,
    '@media (max-width: 1280px)': {
      paddingLeft: 0,
      paddingBottom: 24
    }
  }
})

function SearchComp({ classes }) {
  const [select, setSelect] = React.useState({
    row: true,
    grid: false
  });
  const [popularField, setValues] = React.useState("Popular");
  const [timeField, setTimeField] = React.useState("All Time");
  const handleChange = event => {
    setValues(event.target.value);
  };
  const handleChangeTimeField = event => {
    setTimeField(event.target.value);
  };
  const toggleSelect = () => {
    setSelect(prevState => ({
      row: !prevState.row,
      grid: !prevState.grid
    }));
  };
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <FormControl
              variant={"outlined"}
              className={classes.filter}
              style={{ marginRight: 8 }}
            >
              <Select value={popularField} onChange={handleChange}>
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Popular"}>Popular</MenuItem>
                <MenuItem value={"Interesting"}>Interesting</MenuItem>
                <MenuItem value={"Latest"}>Latest</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant={"outlined"} className={classes.filter}>
              <Select value={timeField} onChange={handleChangeTimeField}>
                <MenuItem value={"All Time"}>All Time</MenuItem>
                <MenuItem value={"Last 24h"}>Last 24h</MenuItem>
                <MenuItem value={"Last Month"}>Last Month</MenuItem>
                <MenuItem value={"Last Year"}>Last Year</MenuItem>
                <MenuItem value={"Latest"}>Latest</MenuItem>
              </Select>
            </FormControl>
            <Box style={{ display: "inline-flex", marginLeft: "auto" }}>
              <ButtonGroup
                color="primary"
                size="large"
                aria-label="large contained secondary button group"
              >
                <Button
                  select={select.row ? 1 : 0}
                  onClick={() => toggleSelect()}
                  className={classes.adjustRightBorderRadius}
                >
                  <RowIcon />
                </Button>
                <Button
                  select={select.grid ? 1 : 0}
                  onClick={() => toggleSelect()}
                  className={classes.adjustLeftBorderRadius}
                >
                  <GridIcon />
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
          <Box my={2}>
            <Typography variant={"subtitle2"}>
              About 94 700 000 (0.39 sec.) results
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid item container xs={12} direction="row-reverse">
          <Grid item lg={4} sm={12} xs={12} classes={{ root: classes.resultBlock }}>
            <Box classes={{ root: classes.filterBlock }} display={"flex"} flexDirection={"column"}>
              <Typography block variant="h5">
                Results{" "}
                <Typography weight="medium" variant="h5" display="inline">
                  Filtering
                </Typography>
                <Box fontSize={".875rem"} classes={{ root: classes.resultDescriptoin }}>
                  Listed content is categorized by the following groups:
                </Box>
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem classes={{ root: classes.itemBtnPadding }} button>
                    <ListItemText primary="Hot Ideas" />
                    <ListItemIcon>
                      <Chip label="34" colorBrightness={.2} color="warningTheme" variant="outlined" />
                    </ListItemIcon>
                  </ListItem>
                  <ListItem button classes={{ root: classes.itemBtnPadding }}>
                    <ListItemText primary="Latest Pictures" />
                    <ListItemIcon>
                      <Chip label="9" colorBrightness={.2} color="successTheme" variant="outlined" />
                    </ListItemIcon>
                  </ListItem>
                  <ListItem button classes={{ root: classes.itemBtnPadding }}>
                    <ListItemText primary="Labels of Day" />
                  </ListItem>
                  <ListItem button classes={{ root: classes.itemBtnPadding }}>
                    <ListItemText primary="Recent Movies" />
                  </ListItem>
                  <ListItem button classes={{ root: classes.itemBtnPadding }}>
                    <ListItemText primary="Globals" />
                    <ListItemIcon>
                      <Chip label="18" colorBrightness={.2} color="errorTheme" variant="outlined" />
                    </ListItemIcon>
                  </ListItem>
                </List>
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={8} sm={12} xs={12}>
            <Grid container spacing={3}>
              <Grid item md={12} sm={6} xs={12}>
                <Widget disableWidgetMenu noBodyPadding inheritHeight>
                  <div className={classes.flexContainer}>
                    <img
                      src={img1}
                      alt="admin templates"
                      style={{ width: "100%", height: "100%" }}
                    />
                    <Box classes={{ root: classes.searchText }} display={"flex"} flexDirection={"column"} m={3}>
                      <Typography block>
                        <Box
                          fontWeight={"fontWeightBold"}
                          fontSize="h5.fontSize"
                        >
                          <Link className={classes.titleLink} color="text">
                            Next generation admin template
                          </Link>{" "}
                        </Box>
                        <Box classes={{ root: classes.citySubtitle }} fontSize={".875rem"} mb={1}>
                          New York, NY 2018
                        </Box>
                        <Box classes={{ root: classes.descriptionText }}>
                          Not just usual Metro. But something bigger. Not just
                          usual widgets, but real widgets.
                        </Box>
                      </Typography>
                    </Box>
                    <Box
                      m={3}
                      display="flex"
                      height={"calc(100% - 48px)"}
                      flexDirection={"column"}
                      alignItems="center"
                      justifyContent={"space-between"}
                      classes={{ root: classes.priceBtnBox }}
                    >
                      <Typography weight="bold">$9700</Typography>
                      <Typography variant="caption" uppercase>
                        per week
                      </Typography>
                      <Button className={classes.learnButton} color="primary">
                        Learn More
                      </Button>
                    </Box>
                  </div>
                </Widget>
              </Grid>
              <Grid item md={12} sm={6} xs={12}>
                <Widget disableWidgetMenu noBodyPadding inheritHeight>
                  <div className={classes.flexContainer}>
                      <img
                        src={img3}
                        alt="admin templates"
                        style={{ width: "100%", height: "100%" }}
                      />
                      <Box classes={{ root: classes.searchText }} display={"flex"} flexDirection={"column"} m={3}>
                        <Typography block>
                          <Box
                            fontWeight={"fontWeightBold"}
                            fontSize="h5.fontSize"
                            display={"flex"}
                          >
                            <Link color="text" className={classes.titleLink}>
                              Try. Posted by Okendoken
                            </Link>{" "}
                            <Chip
                              label="Best Deal!"
                              color="primaryTheme"
                              style={{ marginLeft: "auto" }}
                            />
                          </Box>
                          <Box classes={{ root: classes.citySubtitle }} fontSize={".875rem"} mb={1}>
                            Los Angeles, NY 2020
                          </Box>
                          <Box classes={{ root: classes.descriptionText }}>
                            You will never know exactly how something will go
                            until you try it.
                          </Box>
                        </Typography>
                      </Box>
                      <Box
                        m={3}
                        display="flex"
                        height={"calc(100% - 48px)"}
                        flexDirection={"column"}
                        alignItems="center"
                        justifyContent={"space-between"}
                        classes={{ root: classes.priceBtnBox }}
                      >
                        <Typography weight={"bold"}>$10300</Typography>
                        <Typography variant={"caption"} uppercase>
                          per week
                        </Typography>
                        <Button className={classes.learnButton} variant="contained" color="primary">
                          Learn More
                        </Button>
                      </Box>
                    </div>
                </Widget>
              </Grid>
              <Grid item md={12} sm={6} xs={12}>
                <Widget disableWidgetMenu noBodyPadding inheritHeight>
                  <div className={classes.flexContainer}>
                      <img
                        src={img4}
                        alt="admin templates"
                        style={{ width: "100%", height: "100%" }}
                      />
                      <Box classes={{ root: classes.searchText }} display={"flex"} flexDirection={"column"} m={3}>
                        <Typography block>
                          <Box
                            fontWeight={"fontWeightBold"}
                            fontSize="h5.fontSize"
                          >
                            <Link color="text" className={classes.titleLink}>Vitaut the Great</Link>{" "}
                          </Box>
                          <Box classes={{ root: classes.citySubtitle }} fontSize={".875rem"} mb={1}>
                            New York, NY 20188
                          </Box>
                          <Box classes={{ root: classes.descriptionText }}>
                            The Great Prince of the Grand Duchy of Lithuania he
                            had stopped the invasion
                          </Box>
                        </Typography>
                      </Box>
                      <Box
                        m={3}
                        display="flex"
                        height={"calc(100% - 48px)"}
                        flexDirection={"column"}
                        alignItems="center"
                        justifyContent={"space-between"}
                        classes={{ root: classes.priceBtnBox }}
                      >
                        <Typography weight={"bold"}>$3200</Typography>
                        <Typography variant={"caption"} uppercase>
                          per week
                        </Typography>
                        <Button className={classes.learnButton} variant="contained" color="primary">
                          Learn More
                        </Button>
                      </Box>
                    </div>
                </Widget>
              </Grid>
              <Grid item md={12} sm={6} xs={12}>
              <Widget disableWidgetMenu noBodyPadding inheritHeight>
                <div className={classes.flexContainer}>
                    <img
                      src={img2}
                      alt="admin templates"
                      style={{ width: "100%", height: "100%" }}
                    />
                    <Box classes={{ root: classes.searchText }} display={"flex"} flexDirection={"column"} m={3}>
                      <Typography block>
                        <Box
                          fontWeight={"fontWeightBold"}
                          fontSize="h5.fontSize"
                        >
                          <Link color="text" className={classes.titleLink}>
                            Can I use CSS3 Radial-Gradient?
                          </Link>{" "}
                        </Box>
                        <Box classes={{ root: classes.citySubtitle }} fontSize={".875rem"} mb={1}>
                          Minsk, NY 20188
                        </Box>
                        <Box classes={{ root: classes.descriptionText }}>
                          Yes you can! Further more, you should! It let's you
                          create really beautiful images.
                        </Box>
                      </Typography>
                    </Box>
                    <Box
                      m={3}
                      display="flex"
                      height={"calc(100% - 48px)"}
                      flexDirection={"column"}
                      alignItems="center"
                      justifyContent={"space-between"}
                      classes={{ root: classes.priceBtnBox }}
                    >
                      <Typography weight={"bold"}>$2400</Typography>
                      <Typography variant={"caption"} uppercase>
                        per week
                      </Typography>
                      <Button className={classes.learnButton} variant="contained" color="primary">
                        Learn More
                      </Button>
                    </Box>
                  </div>
              </Widget>
              <Pagination
                pageCount={10}
                previousLabel={"<"}
                nextLabel={">"}
                initialPage={1}
              />
            </Grid>
            </Grid>
          </Grid>
        </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default withStyles(styles)(SearchComp);