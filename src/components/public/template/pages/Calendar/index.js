import React from "react";
import {
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  TextField as Input,
  Box
} from "@material-ui/core";
import { withStyles } from '@material-ui/styles';
import {
  KeyboardArrowLeft as LeftArrowIcon,
  KeyboardArrowRight as RightArrowIcon,
  CalendarToday as CalendarIcon
} from "@material-ui/icons";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import moment from "moment/moment";
import cn from "classnames";

//components
import Widget from "../../components/Widget";
import Dot from "../../components/Dot";
import Button from '../../../../common/Button';
import Typography from '../../../../common/Typography';

import Menu from '@material-ui/core/Menu';
import { MoreVert as MoreIcon } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  iconButton: {
    position: 'absolute',
  },
  relativeContainer: {
    position: 'relative',
    '& h2.fc-toolbar-title': {
      fontSize: '1.5em',
      fontWeight: 100,
      color: '#6E6E6E',
      '@media (max-width: 400px)': {
        fontSize: '1em',
      }
    },
    '& .fc .fc-daygrid-day.fc-day-today': {
      background: '#E1EFFF'
    }
  },
  arrowRight: {
    position: 'absolute',
    top: 16,
    right: '50%',
    marginRight: 120,
    '@media (max-width: 400px)': {
      marginRight: 70,
      top: 9
    }
  },
  arrowLeft: {
    position: 'absolute',
    top: 16,
    left: '50%',
    marginLeft: 120,
    '@media (max-width: 400px)': {
      marginLeft: 70,
      top: 9
    }
  },
  iconButtonPosition: {
    position: 'absolute',
    top: 16,
    right: 0,
    '@media (max-width: 400px)': {
      top: 9
    }
  },
  resetMinHeight: {
    minHeight: 'unset',
  },
  calendarWidgetTitle: {
    display: 'block',
    color: '#6E6E6E',
    marginBottom: 8,
  },
  calendarWidgetText: {
    color: '#6E6E6E',
  }
});

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();
    this.state = {
      anchorEl: null,
      anchorOriginVertical: 'bottom',
      anchorOriginHorizontal: 'right',
      transformOriginVertical: 'top',
      transformOriginHorizontal: 'right',
      anchorReference: 'anchorEl',
      event: {},
      modal: false,
      modalEvent: false,
      calendarView: "dayGridMonth",
      currentMonth: moment().format("MMM YYYY"),
      currentDay: moment().format("dddd"),
      calendarOptions: {
        header: {
          left: "",
          center: "",
          right: ""
        },
        events: [
          {
            title: "All Day Event",
            start: new Date(y, m, 1),
            backgroundColor: "#4B9FFE",
            textColor: "#fff",
            description: "Will be busy throughout the whole day"
          },
          {
            title: "Long Event",
            start: new Date(y, m, d + 5),
            end: new Date(y, m, d + 7),
            textColor: "#f4f4f4",
            backgroundColor: "#4B9FFE",
            description: "This conference should be worse visiting"
          },
          {
            id: 999,
            title: "Blah Blah Car",
            start: new Date(y, m, d - 3, 16, 0),
            allDay: false,
            backgroundColor: "#FF4D3A",
            textColor: "#333",
            description: "Agree with this guy on arrival time"
          },
          {
            id: 1000,
            title: "Buy this template",
            start: new Date(y, m, d + 3, 12, 0),
            allDay: false,
            backgroundColor: "#1ACA95",
            textColor: "#fff",
            description: "Make sure everything is consistent first"
          },
          {
            title: "Got to school",
            start: new Date(y, m, d + 16, 12, 0),
            end: new Date(y, m, d + 16, 13, 0),
            backgroundColor: "#FF4D3A",
            textColor: "#fff",
            description: "Time to go back"
          },
          {
            title: "Study some Node",
            start: new Date(y, m, d + 18, 12, 0),
            end: new Date(y, m, d + 18, 13, 0),
            backgroundColor: "#85B6EC",
            textColor: "#fff",
            description:
              "Node.js is a platform built " +
              "on Chrome's JavaScript runtime for easily" +
              " building fast, scalable network applications." +
              " Node.js uses an event-driven, non-blocking" +
              " I/O model that makes it lightweight and" +
              " efficient, perfect for data-intensive real-time" +
              " applications that run across distributed devices."
          },
          {
            title: "Click for Flatlogic",
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            url: "http://flatlogic.com/",
            backgroundColor: "#FEAA4B",
            textColor: "#fff",
            description: "Creative solutions"
          }
        ],
        selectable: true,
        selectHelper: true,
        editable: true,
        droppable: true
      },
      calendarPlugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin ],
      dragOptions: { zIndex: 999, revert: true, revertDuration: 0 }
    };
  }

  componentDidMount() {
    new Draggable(this.externalEvents, {
      itemSelector: ".external-event"
    });
  }

  drop = info => {
    info.draggedEl.parentNode.removeChild(info.draggedEl);
  };

  handleChange = e => {
    this.setState({ event: { ...this.state.event, title: e.target.value } });
  };
  createEvent = () => {
    this.fullCalendar.getApi().addEvent(this.state.event);
    this.fullCalendar.getApi().unselect();
    this.toggleModal();
  };
  select = ({ start, end, allDay }) => {
    this.setState({
      event: {
        start,
        end,
        allDay,
        backgroundColor: "#64bd63",
        textColor: "#fff",
        editable: true
      }
    });
    this.toggleModal();
  };
  eventClick = e => {
    this.setState({ event: e.event });
    this.toggleModalEvent();
  };
  prev = () => {
    this.fullCalendar.getApi().prev();
  };
  next = () => {
    this.fullCalendar.getApi().next();
  };
  today = () => {
    this.fullCalendar.getApi().today();
  };
  changeView = view => {
    this.fullCalendar.getApi().changeView(view);
    this.setState({
      calendarView: view
    });
  };
  getFormattedDate = date => {
    return moment(date).format("YYYY-MM-DD");
  };
  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };
  toggleModalEvent = () => {
    this.setState({ modalEvent: !this.state.modalEvent });
  };
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleChangeView = (view) => {
    this.setState({ anchorEl: null });
    this.changeView(view);
  }


  render() {
    const { classes } = this.props;
    const { event, calendarOptions, modal, modalEvent, anchorEl  } = this.state;
    const open = Boolean(anchorEl);
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Widget className={classes.resetMinHeight}>
              <Typography variant="h4" className={classes.calendarWidgetTitle}>
                Draggable Events
              </Typography>
              <Typography variant="body2" className={classes.calendarWidgetText}>
                Just drap and drop events from there directly into the calendar.
              </Typography>
            </Widget>
            <div
              ref={node => {
                this.externalEvents = node;
              }}
            >
              <div
                data-event='{ "classNames": ["bg-warning", "text-white"], "title": "Make a tea" }'
                className={cn(
                  "d-flex",
                  "align-items-center",
                  "draggable",
                  "external-event",
                )}
                style={{
                  backgroundColor: "#fff",
                  padding: "8px",
                  margin: "12px 0",
                  boxShadow: "none",
                  borderRadius: "0px",
                  border: '1px solid #FEAA4B',
                  color: '#FEAA4B',
                }}
              >
                <Box alignItems="center" display="flex">
                  <Dot color="warningTheme" size="medium" />
                  <Typography
                    variant="body2"
                    style={{ marginLeft: 8, color: "inherit" }}
                  >
                    Make a tea
                  </Typography>
                </Box>
              </div>
              <div
                data-event='{ "classNames": ["bg-warning", "text-white"], "title": "Open windows" }'
                className={cn(
                  "d-flex",
                  "align-items-center",
                  "draggable",
                  "external-event",
                )}
                style={{
                  backgroundColor: "#fff",
                  padding: "8px",
                  margin: "12px 0",
                  boxShadow: "none",
                  borderRadius: "0px",
                  color: "#FF4D3A",
                  border: '1px solid #FF4D3A'
                }}
              >
                <Box alignItems="center" display="flex">
                  <Dot color="errorTheme" size="medium" />
                  <Typography
                    variant="body2"
                    style={{ marginLeft: 8, color: "inherit" }}
                  >
                    Open windows
                  </Typography>
                </Box>
              </div>
              <div
                data-event='{ "classNames": ["bg-error", "text-white"], "title": "Some stuff" }'
                className={cn(
                  "d-flex",
                  "align-items-center",
                  "draggable",
                  "external-event",
                )}
                style={{
                  backgroundColor: "#fff",
                  padding: "8px",
                  margin: "12px 0",
                  boxShadow: "none",
                  borderRadius: "0px",
                  color: "#1ACA95",
                  border: '1px solid #1ACA95'
                }}
              >
                <Box alignItems="center" display="flex">
                  <Dot color="successTheme" size="medium" />
                  <Typography
                    variant="body2"
                    style={{ marginLeft: 8, color: "inherit" }}
                  >
                    Some stuff
                  </Typography>
                </Box>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <Widget className={classes.relativeContainer} disableWidgetMenu>
              <Grid
                container
                item
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <IconButton classes={{ root: classes.arrowRight }} onClick={this.prev} aria-label="previous page">
                    <LeftArrowIcon />
                  </IconButton>
                  <IconButton classes={{ root: classes.arrowLeft }} onClick={this.next} aria-label="next page">
                    <RightArrowIcon />
                  </IconButton>
                </Grid>
                <Grid item>

                  <IconButton
                    classes={{ root: classes.iconButtonPosition }}
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="contrast"
                  >
                    <MoreIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={() => this.handleChangeView('dayGridMonth')}>Month</MenuItem>
                    <MenuItem onClick={() => this.handleChangeView('timeGridWeek')}>Week</MenuItem>
                    <MenuItem onClick={() => this.handleChangeView('timeGridDay')}>Day</MenuItem>
                    <MenuItem onClick={() => this.handleChangeView('list')}>List</MenuItem>
                    <MenuItem onClick={this.today}>Today</MenuItem>
                  </Menu> 

                </Grid>
              </Grid>
              <FullCalendar
                ref={node => {
                  this.fullCalendar = node;
                }}
                headerToolbar={{
                  left: '',
                  center: 'title',
                  right: ''
                }}
                plugins={this.state.calendarPlugins}
                select={this.select}
                eventClick={this.eventClick}
                drop={this.drop}
                {...calendarOptions}
              />
            </Widget>
          </Grid>
        </Grid>

        <Dialog open={modal} onClose={this.toggleModal} id="news-close-modal">
          <DialogTitle id="news-close-modal-label">
            Create New Event
          </DialogTitle>
          <Box m={3} display="flex" flexDirection="column">
            <Typography variant="body2" style={{ marginBottom: 16 }}>
              Just enter event name to create a new one
            </Typography>
            <Input
              onChange={this.handleChange}
              value={event.title}
              name="title"
              placeholder="Title"
            />
            <Box mt={2}>
              <Button
                onClick={this.toggleModal}
                data-dismiss="modal"
                style={{ marginRight: 8 }}
              >
                Close
              </Button>{" "}
              <Button
                color="success"
                variant="contained"
                onClick={this.createEvent}
                id="news-widget-remove"
              >
                Create
              </Button>
            </Box>
          </Box>
        </Dialog>

        <Dialog
          open={modalEvent}
          onClose={this.toggleModalEvent}
          id="news-close-modal"
        >
          <DialogTitle id="news-close-modal-label">{event.title}</DialogTitle>
          <Box m={3}>
            <Typography style={{ marginBottom: 16 }}>
              <CalendarIcon style={{ marginRight: 8 }} />
              {this.getFormattedDate(event.start)}
            </Typography>
            <Typography variant="body2" style={{ marginBottom: 16 }}>
              {event.extendedProps && event.extendedProps.description}
            </Typography>{' '}
            <Button
              color="primary"
              variant="contained"
              onClick={this.toggleModalEvent}
              data-dismiss="modal"
            >
              OK
            </Button>
          </Box>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(Calendar);
