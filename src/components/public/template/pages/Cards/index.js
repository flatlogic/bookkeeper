import React from "react";
import {
  Grid,
  Box,
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  CardMedia,
  CardHeader,
  IconButton,
  Divider
} from "@material-ui/core";
import {
  Star as StarIcon,
  MoreVert as MoreVertIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon
} from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

import Button from "../../../../common/Button";
import Typography from "../../../../common/Typography";

//images
import card1 from "../../../../../images/newImages/card1.jpg";
import card2 from "../../../../../images/newImages/card2.jpg";
import card3 from "../../../../../images/newImages/card3.jpg";
import card4 from "../../../../../images/newImages/card4.jpg";
import card5 from "../../../../../images/newImages/card5.jpg";
import card6 from "../../../../../images/newImages/card6.jpg";
import table_user from "../../../../../images/table_user3.png";
// components
import { Link, Avatar } from "../../components/Wrappers";

const styles = theme => ({
  card: {
    minWidth: "100%",
    position: "relative",
    backgroundImage: props => `url(${card1})`,
    backgroundSize: "cover",
    backgroundPosition: "50%",
    color: "#fff",
    height: 370,
    borderRadius: 0,
    boxShadow: "none",
    '@media (max-width: 568px)': {
      paddingBottom: 35
    }
  },
  smallCard: {
    borderRadius: 0,
    boxShadow: "none",
  },
  cardMedia: {
    minWidth: "100%",
    borderRadius: 0,
    boxShadow: "none",
    height: "100%"
  },
  media: {
    height: "140px",
  },
  mediaPlus: {
    height: "170px"
  },
  starIcon: {
    color: "#ffc247",
  },
  cardActions: {
    padding: theme.spacing(2)
  },
  cardActionsPosition: {
    position: "absolute",
    bottom: 16,
    left: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
    marginBottom: 4,
    display: "block",
  },
  date: {
    display: "block",
    marginBottom: 20,
  },
  paragraph: {
    width: "100%",
    maxWidth: 700,
    lineHeight: 1.5,
    display: "inline-block",
  },
  cardButtonPosition: {
    justifyContent: "center",
  },
  spaceBetween: {
    justifyContent: 'space-between',
    padding: '0 16px',
  },
  cardContent: {
    lineHeight: 1.5,
    padding: '20px 16px',
    '& > span': {
      lineHeight: 1.5,
    }
  },
  reviews: {
    marginLeft: "auto",
    color: theme.palette.text.primaryTheme
  },
  cardTopLinks: {
    marginBottom: 20,
    display: 'inline-block',
    fontWeight: 100,
  },
  autoHeight: {
    height: 'auto',
  }
});

function CardsComp({ classes }) {
  return (
    <div>
      <Grid container spacing={6}>
        <Grid item md={12} xs={12}>
          <Card card={card1} className={classes.card}>
            <CardContent classes={{ root: classes.cardContent }}>
              <Typography className={classes.title} color="#fff" variant="h5" component="h2">
                Lifestyle brand
              </Typography>
              <Typography
                className={classes.date}
                color="textSecondary"
                gutterBottom
              >
                13 Mar
              </Typography>
              <Typography className={classes.paragraph} color="#fff" variant="body2" component="p">
                A lifestyle brand is a company that markets its products or
                services to embody the interests, attitudes, and opinions of a
                group or a culture. Lifestyle brands seek to inspire, guide, and
                motivate people, with the goal of their products contributing to
                the definition of the consumer"s way of life.
              </Typography>
            </CardContent>
            <CardActions classes={{ root: classes.cardActionsPosition }}>
              <Button color="secondary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card className={classes.cardMedia}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={card2}
                title="Contemplative Reptile"
              />
              <CardContent classes={{ root: classes.cardContent }}>
                <Typography variant="body2" color="textSecondary" component="p">
                  A lifestyle brand is a company that markets its products or services to embody the ...
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions classes={{ root: classes.cardActions }}>
              <Button variant="contained" size="small" color="primary">
                Share
              </Button>
              <Button variant="contained" size="small" color="secondary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card className={classes.cardMedia}>
            <CardActionArea>
              <CardMedia
                className={classes.mediaPlus}
                image={card5}
                title="Contemplative Reptile"
              />
              <CardContent classes={{ root: classes.cardContent }}>
                <Typography variant="body2" color="textSecondary" component="p">
                  A lifestyle brand is a company that marke ...
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions classes={{ root: classes.cardButtonPosition }}>
              <Button variant="contained" size="small" color="warning">
                Get More Information
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card className={classes.cardMedia}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={card3}
                title="Contemplative Reptile"
              />
              <CardContent classes={{ root: classes.cardContent }}>
                <Typography variant="body2" color="textSecondary" component="p">
                  A lifestyle brand is a company that markets its products or services to embody the ... 
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions classes={{ root: classes.spaceBetween }}>
              <strong className={classes.cardPrice}>99.58$</strong>
              <Button variant="contained" size="small" color="danger">
                Buy
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Card className={classes.cardMedia}>
            <CardHeader
              avatar={
                <Avatar aria-label="" color={"primary"}>
                  <img src={table_user} alt="usericon" />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Lisa Swon"
              subheader="15 min ago"
            />
            <CardMedia
              className={classes.media}
              image={card6}
              title="Paella dish"
            />
            <CardContent classes={{ root: classes.cardContent }}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              >
                There are at least 109 mountains on Earts with elevations
                greeter than 7,200 meters
              </Typography>
            </CardContent>
            <CardActions  classes={{ root: classes.spaceBetween }} disableSpacing>
              <Box>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </Box>
              <Button color="infoTheme">
              More Info
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid container item md={4} xs={12}>
          <Box display={"flex"} flexDirection={"column"} width={"100%"}>
          <Box mb={6}>
              <Card className={classes.cardMedia}>
                <CardContent classes={{ root: classes.cardContent }}>
                  <Typography className={classes.cardTopLinks} gutterBottom variant="h6">
                    <Link color={"primary"}>Avr Rating </Link>
                    <Link>All Time</Link>
                  </Typography>
                  <Divider style={{ width: "100%" }} />
                  <Box display={"flex"} alignItems={"center"} my={3}>
                    <Box>
                      <StarIcon className={classes.starIcon} />
                      <StarIcon className={classes.starIcon} />
                      <StarIcon className={classes.starIcon} />
                      <StarIcon className={classes.starIcon} />
                      <StarIcon className={classes.starIcon} />
                    </Box>
                    <Box classes={{ root: classes.reviews }}>342 Reviews</Box>
                  </Box>
                  <Typography variant="body2" color="textSecondary" block>
                    69% of customers recommend this product. Lorem ipsum is simply dummy text of the printing and typesetting industry.
                  </Typography>
                </CardContent>
                <CardActions classes={{ root: classes.cardActions }}>
                  <Button color="primary">
                    Write a review
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card className={`${classes.cardMedia} ${classes.autoHeight}`}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={card4}
                title="Technology"
              />
              <CardContent classes={{ root: classes.cardContent }}>
                <Typography variant="body2" color="textSecondary" component="p">
                A lifestyle brand is a company that marke ...
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions classes={{ root: classes.cardActions }}>
              <Button
                size="small"
                color="success"
                variant="contained"
                style={{ marginLeft: "auto" }}
              >
                Read more
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(CardsComp);