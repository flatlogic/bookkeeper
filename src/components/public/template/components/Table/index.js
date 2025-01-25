import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Box
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

import { Avatar, Chip } from "../Wrappers";
import user1 from '../../../../../images/table_user1.png';
import user2 from '../../../../../images/table_user2.png';
import user3 from '../../../../../images/table_user3.png';
import user4 from '../../../../../images/table_user4.png';
import user5 from '../../../../../images/table_user5.png';
import user6 from '../../../../../images/table_user6.png';

const users = [user1,user2,user3,user4,user5,user6];

// components
const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary"
};

const styles = theme => ({
  tableHeadStyle: {
    color: '#A1AEBD',
    fontWeight: 'normal',
    textTransform: 'uppercase',
    textAlign: 'left',
    fontSize: 14,
    paddingLeft: 14,
    paddingBottom: 10,
  },
  badge: {
    margin: theme.spacing(2, 2, 0, 0),
  },
})

function TableComponent({ data, classes }) {
  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  keys.shift();
  keys.pop(); // delete "id, colors" key

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell class={classes.tableHeadStyle} key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(
          ({ id, name, email, product, price, date, city, status, color, avatar }) => (
            <TableRow style={{ background: id % 2 !== 0 && 'rgba(225,239,255,0.28)'}} key={id}>
              <TableCell className="fw-normal">
                <Box display={"flex"} alignItems={"center"}>
                  <Avatar style={{ marginRight: 20 }} color={color}>
                    <img src={users[id]} alt={name} width="100%" height="100%" />
                  </Avatar>{" "}
                </Box>
              </TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{product}</TableCell>
              <TableCell>{price}</TableCell>
              <TableCell>{date}</TableCell>
              <TableCell>{city}</TableCell>
              <TableCell>
                <Chip
                  className={classes.badge}
                  color={color}
                  label={status}
                />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}

export default withStyles(styles)(TableComponent)