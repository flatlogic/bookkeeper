import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {MenuItem} from '@material-ui/core'

import {
    IconButton,
    Menu,
  } from "@material-ui/core";
  import { MoreVert as MoreIcon } from "@material-ui/icons";
  
  import Dot from '../../../components/Dot';

const styles = (theme) => ({
    todoItemWrap: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 24px',
        cursor: 'pointer',
    },
    itemIsDone: {
        color: '#9B9B9B',
        textDecoration: 'line-through',
        'div > div': {
            background: '#9B9B9B!important'
        }
    },
    taskText: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        paddingLeft: 30,
        '& p': {
            margin: 0,
            fontSize: 15,
            width: 210,
            overflow: 'hidden',
        }
    },
    time: {
        fontSize: 12
    }
}) 

const ToDoItem = ({ classes, time, title, color, backgroundColor }) => {

    const [moreButtonRef, setMoreButtonRef] = useState(null);
    const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);
    const [itemStatus, setItemStatus] = useState(false);

    return (
        <div className={`${classes.todoItemWrap} ${itemStatus && classes.itemIsDone}`} onClick={() => setItemStatus(!itemStatus)} style={{ backgroundColor: backgroundColor }}>
            <span className={classes.time}>{time}</span>
            <div className={classes.taskText}>
                <Dot color={color} style={{ marginRight: 5 }} />
                <p>{title}</p>
            </div>
            <div className={classes.learnMore}>
                <IconButton
                    color="#9B9B9B"
                    className={classes.moreButton}
                    aria-owns="widget-menu"
                    aria-haspopup="true"
                    onClick={() => setMoreMenuOpen(true)}
                    buttonRef={setMoreButtonRef}
                >
                    <MoreIcon />
                </IconButton>
                <Menu
                    id="widget-menu"
                    open={isMoreMenuOpen}
                    anchorEl={moreButtonRef}
                    onClose={() => setMoreMenuOpen(false)}
                    disableAutoFocusItem
                >
                    <MenuItem>
                        <Typography>Edit</Typography>
                    </MenuItem>
                    <MenuItem>
                        <Typography>Copy</Typography>
                    </MenuItem>
                    <MenuItem>
                        <Typography>Delete</Typography>
                    </MenuItem>
                    <MenuItem>
                        <Typography>Print</Typography>
                    </MenuItem>
                </Menu>                  
              </div>
            
          </div>
    )
}

ToDoItem.propTypes = {
    classes: PropTypes.object,
    time: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
};

export default withStyles(styles)(ToDoItem);