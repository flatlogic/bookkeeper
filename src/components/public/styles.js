export const tableBaseStyles = theme => ({
  tableWrapper: {
    marginTop: 27,
    minWidth: 930,
    overflowX: 'auto',
    '& tr td:nth-child(2) > span': {
      fontWeight: '500',
    },
    '& button': {
      marginRight: 15,
    },
  },
  tableActionsWrapper: {
    justifyContent: 'flex-end',
    padding: '25px',
  },
  addButton: {
    marginTop: 10,
  },
});