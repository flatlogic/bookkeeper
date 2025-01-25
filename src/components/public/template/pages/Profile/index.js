import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Typography from '../../../../common/Typography';
import Button from '../../../../common/Button';
import { Badge, Chip } from "../../components/Wrappers";
import Widget from '../../components/Widget';
import Tabs from './Components/Tabs';
import Donut from './Components/DonutChart';
import ToDo from './Components/ToDo';
import WidgetGrowth from './Components/widget';
import Calendar from './Components/Calendar/Calendar';
import MediaBlock from './Components/MediaBlock';
import ProfileHero from '../../../../../images/profile_hero.png';
import BehanceIcon from '../../../../../images/icons/behance.png';
import FacebookIcon from '../../../../../images/icons/facebook.png';
import InstagramIcon from '../../../../../images/icons/instagram-logo.png';
import DribbleIcon from '../../../../../images/icons/dribble.png';
import MediumIcon from '../../../../../images/icons/medium.png';
import cloudImg from '../../../../../images/icons/cloudImg.png';
import RNSWidget from './Components/RNSWidget';

const styles = (theme) => ({
    root: {},
    visualProfile: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    profileImage: {
        padding: 5,
        border: `3px dotted ${theme.palette.text.primaryTheme}`,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width: 768px)': {
            maxWidth: 200
        }
    },
    profileTitle: {
        fontSize: 32,
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 500,
        display: 'block'
    },
    profileSubTitle: {
        color: '#A1AEBD',
        fontSize: 14,
        marginTop: 20,
        display: 'block',
    },
    profileExternalRes: {
        fontSize: 16,
        margin: '12px 0 25px',
        color: theme.palette.text.primaryTheme,
        display: 'block',
    },
    socials: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 30,
        alignItems: 'center',
        maxWidth: 180
    },
    chipMargin: {
        marginTop: 20
    },
    widgetBody: {
        padding: 0
    },
    updateWidget: {
        background: theme.palette.text.primaryTheme,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '20px 0',
        color: '#fff',
    },
    mediaBlockPadding: {
        padding: '0 24px 12px 24px'
    },
    detailsBtn: {
        color: '#fff',
        borderColor: '#fff',
    },
    updateWidgetFlexContainer: {
        display: 'flex',
        marginRight: 32,
        alignItems: 'center',
    },
    imgWrap: {
        marginRight: 15,
    },
    profileDescription: {
        paddingLeft: 40
    },
    adjustHeight: {
        height: '100%',
        '@media (max-width: 1280px)': {
            height: 'auto'
        }
    }
});

const Profile = ({ classes }) => {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography variant="h2" Component="div">Charts of Accounts</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={5} md={6} sm={6} xs={12}>
                    <Widget>
                        <Grid container spacing={1}>
                            <Grid item  lg={5} md={5} sm={5} xs={12}>
                                <div className={classes.visualProfile}>
                                    <div className={classes.profileImage}>
                                        <img width="100%" src={ProfileHero} alt="profile" />
                                    </div>
                                    <Chip
                                        className={classes.chipMargin}
                                        color="errorTheme"
                                        label={"PRO"}
                                    />
                                </div>
                            </Grid>
                            <Grid item lg={7} md={7} sm={7} xs={12}>
                                <div className={classes.profileDescription}>
                                    <Typography variant="h3" className={classes.profileTitle}>
                                        Julee Cruise
                                    </Typography>
                                    <span className={classes.profileSubTitle}>Product Designer</span>
                                    <a className={classes.profileExternalRes} href="https://flatlogic.com">flatlogic.com</a>

                                    <div className={classes.tags}>
                                        <Badge type="tag" badgeContent={"UI/Ux"} color="primaryTheme"/>
                                        <Badge type="tag" badgeContent={"Art"} color="warningTheme"/>
                                        <Badge type="tag" badgeContent={"Design"} color="errorTheme"/>
                                        <Badge type="tag" badgeContent={"Illustration"} color="warningTheme"/>
                                        <Badge type="tag" badgeContent={"Mobile"} color="successTheme"/>
                                    </div>
                                    <div className={classes.socials}>
                                        <a href="#"><img src={FacebookIcon} alt="FacebookIcon" /></a>
                                        <a href="#"><img src={MediumIcon} alt="MediumIcon" /></a>
                                        <a href="#"><img src={DribbleIcon} alt="DribbleIcon" /></a>
                                        <a href="#"><img src={BehanceIcon} alt="BehanceIcon" /></a>
                                        <a href="#"><img src={InstagramIcon} alt="InstagramIcon" /></a>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Widget> 
                </Grid>
                <Grid item lg={7} md={6} sm={6} xs={12}>
                    <Widget title="Files">
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Tabs />
                            </Grid>
                        </Grid>
                    </Widget>
                </Grid>
       
                <Grid item lg={5} xs={12}>
                    <Grid container spacing={3}>
                        <Grid item lg={5}  md={4} sm={4} xs={12} className={classes.adjustHeight}>
                            <Widget bodyClass={classes.mediaBlockPadding} widgetWithDropdown title="Media">
                                <Grid container spacing={1}>
                                    <MediaBlock />
                                </Grid>
                            </Widget>
                        </Grid>
                        <Grid item lg={7} md={4} sm={4} xs={12} className={classes.adjustHeight}>
                            <Widget widgetWithDropdown title="Projects">
                                <Donut />
                            </Widget>
                        </Grid>
                        <Grid item lg={12} md={4} sm={4} xs={12}>
                            <Widget>
                                <RNSWidget />
                            </Widget>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={4} xs={12}>
                    <Widget bodyClass={classes.widgetBody} widgetWithDropdown title="Tasks">
                        <ToDo />
                    </Widget>
                </Grid>
                <Grid item lg={3} xs={12} className={classes.adjustHeight}>
                    <Grid container spacing={3}>
                        <Grid item lg={12} md={6} sm={6} xs={12}>
                            <Widget><Calendar /></Widget>
                        </Grid>
                        <Grid item lg={12} md={6} sm={6} xs={12}>
                            <Widget><WidgetGrowth color="#FF4D3A" title="Views" subtitle="7.2%" value={7.156} /></Widget>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <div className={classes.updateWidget}>
                                <div className={classes.updateWidgetFlexContainer}>
                                    <div className={classes.imgWrap}>
                                        <img src={cloudImg} alt="Download icon" />
                                    </div>
                                    <Typography color="#fff" variant="h4">Updates</Typography>
                                </div>
                                <Button classes={{ root: classes.detailsBtn }} color="transparent">DETAILS</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default withStyles(styles)(Profile);