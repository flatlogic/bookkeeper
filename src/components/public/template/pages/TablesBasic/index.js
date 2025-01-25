import React from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

// components
import Widget from "../../components/Widget";
import Table from "../../components/Table";

// data
import mock from "../../components/Table/mock";

const datatableData = [
  ["Joe James", "Example Inc.", "Yonkers", "NY"],
  ["John Walsh", "Example Inc.", "Hartford", "CT"],
  ["Bob Herm", "Example Inc.", "Tampa", "FL"],
  ["James Houston", "Example Inc.", "Dallas", "TX"],
  ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
  ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
  ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
  ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
  ["Meral Elias", "Example Inc.", "Hartford", "CT"],
  ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
  ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
  ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
  ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
  ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
  ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
  ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
  ["Gaston Festus", "Example Inc.", "Tampa", "FL"]
];

const styles = theme => ({
  root: {
    boxShadow: 'unset',
    '& > th': {
      padding: 20
    }
  },
  tableWrapper: {
    overflowX: "auto"
  }
})

const getMuiTheme = () => createMuiTheme({
  overrides: {
    MUIDataTableBodyCell: {
      selected: {
        backgroundColor: "#FEAA4B"
      }
    },
    MUIDataTableBodyRow: {
      selected: {
        backgroundColor: "#FEAA4B"
      }
    },
    MuiTableRow: {
      selected: {
        backgroundColor: "#FEAA4B"
      }
    }
  }
})

function Tables({ classes }) {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              className={classes.root}
              title="Employee List"
              data={datatableData}
              columns={["Name", "Company", "City", "State"]}
              options={{
                filterType: "checkbox"
              }}
            />
          </MuiThemeProvider>
        </Grid>
        <Grid item xs={12}>
          <Widget
            title="Material-UI Table"
            noBodyPadding
            bodyClass={classes.tableWrapper}
          >
            <Table data={mock.table} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

export default withStyles(styles)(Tables);