import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { Button, Grid, Typography } from '@material-ui/core';

//  Icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  table: { minWidth: 650 },
  tableContainer: {
    borderRadius: 15,
    margin: '10px auto',
    maxWidth: 1080,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: { fontWeight: 'bold', color: theme.palette.secondary.dark },
}));

function createData(name: string, email: string, role: string, id: number) {
  return { name, email, role, id };
}

const rows = [
  createData('Frozen yoghurt', 'email@email.com', 'Admin', 1),
  createData('Ice cream sandwich', 'email@email.com', 'Costumer', 2),
  createData('Eclair', 'email@email.com', 'Costumer', 3),
];

export default function AcccessibleTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="caption table">
        <caption>A basic table example with a caption</caption>
        <TableHead>
          <TableRow>
            <TableCell align="left" className={classes.tableHeaderCell}>
              Name
            </TableCell>
            <TableCell align="left" className={classes.tableHeaderCell}>
              Email
            </TableCell>
            <TableCell align="left" className={classes.tableHeaderCell}>
              Role
            </TableCell>
            <TableCell align="center" className={classes.tableHeaderCell}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>
                <Grid container alignItems="center">
                  <Grid item lg={2}>
                    <Avatar alt={row.name} src="." className={classes.avatar} />
                  </Grid>
                  <Grid item lg={10}>
                    <Typography className={classes.name}>{row.name}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell align="center">
                <Grid container>
                  <Grid item lg={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      href={`/dashboard/user/edit/${row.id}`}
                    >
                      Edit
                    </Button>
                  </Grid>
                  <Grid item lg={6}>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
