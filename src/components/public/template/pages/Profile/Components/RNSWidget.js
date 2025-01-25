import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '../../../../../common/Typography';
import Grid from '@material-ui/core/Grid';
import { Bookmark as BookmarkIcon } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

import rnsHero from '../../../../../../images/newImages/rnsHero.png';

const styles = (theme) => ({
    rnsImgWrap: {
        '& img': {
            maxWidth: '100%',
        },
    },
    author: {
        opacity: .8,
        fontSize: 13
    },
    date: {
        opacity: .6,
        fontSize: 13
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconColor: {
        color: '#FEAA4B',
        padding: 0
    }
})

const RNSWidget = ({ classes }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4">TOP 5 REACT NATIVE STARTER KITS</Typography>
            </Grid>
            <Grid item lg={6} md={12} xs={12}>
                <div className={classes.rnsImgWrap}>
                    <img src={rnsHero} alt="RNS" />
                </div>
            </Grid>
            <Grid item lg={6} md={12} xs={12}>
                <div className={classes.textRight}>
                    <span className={classes.author}>Nastassia Ovchinnikova</span>
                    <p className={classes.textContent}>
                    React Native allows us to create a boilerplate that have been crafted for both platforms...
                    </p>
                    <div className={classes.flexContainer}>
                        <span className={classes.date}>11 Feb 2019 | 5 min read</span>
                        <IconButton classes={{ root: classes.iconColor }} aria-label="bookmark">
                            <BookmarkIcon />
                        </IconButton>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(RNSWidget);