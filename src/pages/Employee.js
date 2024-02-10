import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  CircularProgress,
  IconButton,
  MenuItem,
  DialogContentText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Layout from "../components/Layout";
import Alert from "../components/Alert";

const jobPositions = [
  "Software Engineer",
  "Project Manager",
  "Data Analyst",
  "Graphic Designer",
  "Product Manager",
  "Marketing Specialist",
  "Sales Representative",
  "Human Resources Manager",
  "Customer Service Representative",
  "Network Administrator",
];

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
  });
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [open, setOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const employeesCollectionRef = useMemo(() => collection(db, "employee"), []);

  const fetchEmployees = useCallback(() => {
    setLoading(true);
    setTimeout(async () => {
      const data = await getDocs(employeesCollectionRef);
      setEmployees(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    }, 2000);
  }, [employeesCollectionRef]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleCreate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const docRef = await addDoc(employeesCollectionRef, newEmployee);
      setEmployees((prev) => [...prev, { ...newEmployee, id: docRef.id }]);
      setSnackbarMessage("Employee successfully added.");
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error adding document: ", error);
      setSnackbarMessage("Failed to add employee.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const employeeDoc = doc(db, "employee", editEmployeeId);
    try {
      await updateDoc(employeeDoc, newEmployee);
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editEmployeeId ? { ...emp, ...newEmployee } : emp,
        ),
      );
      setSnackbarMessage("Employee successfully edited.");
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error updating document: ", error);
      setSnackbarMessage("Failed to update employee.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
      setEditEmployeeId(null);
      handleClose();
    }
  };

  const handleDeleteConfirmed = async () => {
    if (!deleteCandidateId) return;
    setLoading(true);
    try {
      const employeeDoc = doc(db, "employee", deleteCandidateId);
      await deleteDoc(employeeDoc);
      setEmployees((prev) =>
        prev.filter((emp) => emp.id !== deleteCandidateId),
      );
      setSnackbarMessage("Employee successfully deleted.");
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error deleting document: ", error);
      setSnackbarMessage("Failed to delete employee.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
      setDeleteCandidateId(null);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewEmployee({ name: "", email: "", phone: "", position: "" });
    setEditEmployeeId(null);
  };

  const handleOpenDelete = (id) => {
    setDeleteCandidateId(id);
    setShowDeleteConfirm(true);
  };

  const handleEditClickOpen = (employee) => {
    setOpen(true);
    setEditEmployeeId(employee.id);
    setNewEmployee({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      position: employee.position,
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const { name, email, phone, position } = newEmployee;
    if (!name || !email || !phone || !position) {
      setSnackbarMessage("All fields are required.");
      setOpenSnackbar(true);
      return false;
    }
    if (!isValidEmail(email)) {
      setSnackbarMessage("Invalid email format.");
      setOpenSnackbar(true);
      return false;
    }
    if (!isValidPhone(phone)) {
      setSnackbarMessage("Phone number should contain only numbers.");
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  const TableRowsLoader = ({ rowsNum }) => {
    return [...Array(rowsNum)].map((row, index) => (
      <TableRow key={index}>
        <TableCell component="th" scope="row">
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Layout>
      <Button onClick={handleClickOpen}>Add Employee</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {!editEmployeeId ? "Add" : "Edit"} Employee
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            name="email"
            value={newEmployee.email}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, email: e.target.value })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            type="number"
            label="Phone"
            name="phone"
            value={newEmployee.phone}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, phone: e.target.value })
            }
          />
          <TextField
            select
            margin="normal"
            required
            fullWidth
            id="position"
            label="Position"
            name="position"
            value={newEmployee.position}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, position: e.target.value })
            }
          >
            {jobPositions.map((job) => (
              <MenuItem key={job} value={job}>
                {job}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={editEmployeeId ? handleUpdate : handleCreate}
            disabled={loading}
          >
            {editEmployeeId ? "Update" : "Create"}
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: "primary",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRowsLoader rowsNum={5} />
            ) : employees.length > 0 ? (
              employees?.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell component="th" scope="row">
                    {employee.name}
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditClickOpen(employee)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleOpenDelete(employee.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No employees found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Alert
        key={new Date()}
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        snackbarMessage={snackbarMessage}
        severity={snackbarSeverity}
      />
      <Dialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteConfirm(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteConfirmed()}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
