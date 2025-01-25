import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  IconButton
} from "@material-ui/core";
import { Favorite as LikeIcon, Chat as CommentsIcon, Bookmark as BookmarkIcon } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
//images
import img1 from "../../../../../images/newImages/card7.jpg";
import img2 from "../../../../../images/newImages/card8.png";
import img3 from "../../../../../images/newImages/card9.png";
import img4 from "../../../../../images/newImages/card10.jpg";
import img5 from "../../../../../images/newImages/card11.jpg";
import img6 from "../../../../../images/newImages/card12.jpg";
import img7 from "../../../../../images/newImages/card13.jpg";
import img8 from "../../../../../images/newImages/card14.jpg";
import img9 from "../../../../../images/newImages/card15.jpg";
import img10 from "../../../../../images/newImages/card16.jpg";
import img11 from "../../../../../images/newImages/card17.jpg";
import img12 from "../../../../../images/newImages/card18.jpg";


const gallery = [
  {
    img: img1,
    id: 1
  },
  {
    img: img2,
    id: 2
  },
  {
    img: img3,
    id: 3
  },
  {
    img: img4,
    id: 4
  },
  {
    img: img5,
    id: 5
  },
  {
    img: img6,
    id: 6
  },
  {
    img: img7,
    id: 7
  },
  {
    img: img8,
    id: 8
  },
  {
    img: img9,
    id: 9
  },
  {
    img: img10,
    id: 10
  },
  {
    img: img11,
    id: 11
  },
  {
    img: img12,
    id: 12
  }
];

const styles = () => ({
  customCard: {
    boxShadow: 'none',
    borderRadius: 0,
  },
  iconColor: {
    color: '#CBCBCB',
    padding: 6,
    margin: 6,
  },
  iconsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
  }
})

const Gallery = ({ classes }) => {
  return (
    <>
      <Grid container spacing={6}>
        {gallery.map((c, n) => (
          <Grid item md={3} xs={12} key={c.id}>
            <Card classes={{ root: classes.customCard }}>
              <CardActionArea>
                <CardMedia
                  image={c.img}
                  title="Gallery"
                  style={{ height: 200 }}
                />
              </CardActionArea>
              <CardActions classes={{ root: classes.iconsWrapper }}>
                <div>
                  <IconButton classes={{ root: classes.iconColor }} aria-label="like">
                    <LikeIcon />
                  </IconButton>
                  <IconButton classes={{ root: classes.iconColor }} aria-label="comments">
                    <CommentsIcon />
                  </IconButton>
                </div>
                <IconButton classes={{ root: classes.iconColor }} aria-label="bookmark">
                  <BookmarkIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default withStyles(styles)(Gallery);
