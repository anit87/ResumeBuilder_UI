import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Layout from '../../Pages/Layout';
import { makeStyles } from '@mui/styles';
import {
  Paper, Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, TableHead, Toolbar, FormGroup
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Switch from '@mui/material/Switch';
import { alpha } from '@mui/material/styles';
import { Allcustomer, StatusChange, allFaqData, toggle } from '../../../../redux/action/Action'





const useStyle = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(20),
    width: '100%',
  },
  table: {

    //  width:'90%',
    margin: 'auto',

  },
  statusDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  active: {
    fontSize: '17px!important',
    fontWeight: '500!important',
    color: 'green',
    marginBottom: 2,
    paddingTop: '5px!important'
  },
  inactive: {
    fontSize: '17px!important',
    fontWeight: '500!important',
    color: 'red',
    marginBottom: 2,
    paddingTop: '5px!important'

  },

  box_noData: {
    height: '100px',
    fontSize: '14px',
    textAlign: 'center',
    padding: '10px',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ' & .active': {
    color: 'green',
  },
  // '& .css-xcho4-MuiButtonBase-root-MuiRadio-root.Mui-checked': {
  //   color: '#16ab52 !important' ,
  // },
}))



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >


    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


//-----------------------------//-----------------main table starts here --------------------//-----------------------//
const CustomTable = () => {
  const classes = useStyle();
  const toggleState = useSelector((state) => state.togglingReducer.togglingAll)

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customerStatus, setCustomerStatus] = useState({
    id: '',
    status: '0',
    statusApi: false
  });

  const [userStatus, setUserStatus] = useState({
    active: '1',
    inactive: '0'
  })

  const [activeClass, setActiveClass] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState('')

  const getallcustomer = useSelector((state) => state.getallcustomer.customerData)


  const dispatch = useDispatch()

  function createData(first_name, last_name, email) {
    return {
      first_name,
      last_name,
      email,

    };
  }


  let rows = [];
  getallcustomer?.map((i) => {
    rows.push({ first_name: i.first_name, last_name: i.last_name, email: i.email, id: i.id, status: i.status })
  })

  const handlerStatus = (e, id) => {
    // debugger;
    let { name, value } = e.target;

    if (customerStatus.statusApi) {

      setCustomerStatus((prev) => {
        return {
          ...prev,
          [name]: false,
          status: "0",
        }
      })
      let data = { "action": "CustomersStatusChange", "id": parseInt(id), "status": customerStatus.status }
      // dispatch(StatusChange(data))

    } else {
      setCustomerStatus((prev) => {

        return {
          ...prev,
          [name]: true,
          status: "1",
        }
      })

      let data = { "action": "CustomersStatusChange", "id": parseInt(id), "status": customerStatus.status }
      // dispatch(StatusChange(data))

    }

  }



  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  useEffect(() => {
    dispatch(toggle())
  }, [])

  useEffect(() => {
    dispatch(allFaqData())
  }, [])

  useEffect(() => {
    dispatch(Allcustomer());
  }, [])
  useEffect(() => {
    setCustomerStatus({
      id: 2,
      status: getallcustomer?.status,
      statusApi: getallcustomer?.status == '0' ? false : true
    })
  }, [getallcustomer])


  return (
    <>
      <Layout>
        <div className={classes.root} >

          <div className={classes.student}>
            <Paper variant='outlined' className={classes.table}
              style={{ position: 'absolute', right: 0, left: toggleState ? 300 : 0, width: toggleState ? '80%' : '90%', transition: '.3s all', }}>
              {rows == '' ? <Box className={classes.box_noData} >No Records Found</Box> :
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                      <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                      >
                        <EnhancedTableHead
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          onSelectAllClick={handleSelectAllClick}
                          onRequestSort={handleRequestSort}
                          rowCount={rows.length}
                        />
                        <TableHead>
                          <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell align="right">Last name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Status</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>

                          {
                            stableSort(rows, getComparator(order, orderBy))
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, index) => {
                                return (
                                  <TableRow >
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      padding="none"
                                    >
                                      {row.first_name}
                                    </TableCell>
                                    <TableCell align="right">{row.last_name}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right"  >
                                      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                        <FormGroup>
                                          <Switch name="statusApi" value={customerStatus.statusApi} onChange={(e) => handlerStatus(e, row.id)} />
                                        </FormGroup>

                                      </Box>
                                    </TableCell>

                                  </TableRow>
                                );
                              })}
                          {emptyRows > 0 && (
                            <TableRow
                              style={{
                                height: (dense ? 33 : 53) * emptyRows,
                              }}
                            >
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Box>
                </Box>
              }
            </Paper>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default CustomTable;
