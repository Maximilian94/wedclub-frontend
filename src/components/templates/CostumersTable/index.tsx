import React, { useEffect, useState } from 'react';
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
import { Link } from 'react-router-dom';
import { getAllUsers } from '../../../services/api';
import { useUser } from '../../../context/user';
import { useSnackbar } from '../../../context/snackbar';

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

// function createData(name: string, email: string, role: string, id: number) {
//   return { name, email, role, id };
// }

interface Users {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  _id: string;
}

export default function AcccessibleTable() {
  const classes = useStyles();
  const [users, setUsers] = useState<Users[]>([]);
  const { deleteUser } = useUser();
  const { setOpen, setMessage, setSeverity, open } = useSnackbar();

  const deleteUserAction = async (id: string) => {
    const dataResponse = await deleteUser(id);
    setMessage(`${dataResponse.message} - Refresh page`);
    setSeverity('error');
    setOpen(true);
  };

  const fetchUsers = async (): Promise<any> => {
    const response = await getAllUsers();
    const usersResponse = await response.json();
    setUsers(usersResponse);
  };

  useEffect(() => {}, [open]);

  useEffect(() => {
    fetchUsers();
  }, []);

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
          {users.map((row) => (
            <TableRow key={`${row.firstName}-${row.lastName}`}>
              <TableCell>
                <Grid container alignItems="center">
                  <Grid item lg={2}>
                    <Avatar
                      alt={`${row.firstName}-${row.lastName}`}
                      src="."
                      className={classes.avatar}
                    />
                  </Grid>
                  <Grid item lg={10}>
                    <Typography className={classes.name}>
                      {`${row.firstName} ${row.lastName}`}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell align="center">
                <Grid container>
                  <Grid item lg={6}>
                    <Link
                      to={`/dashboard/user/${row._id}`} // eslint-disable-line
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item lg={6}>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={
                        () => deleteUserAction(row._id) // eslint-disable-line
                      }
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
