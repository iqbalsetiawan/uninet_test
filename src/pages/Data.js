import React from "react";
import jsonData from "../data/data.json";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";

import { CurrencyFormat } from "../utils/currency";
import Layout from "../components/Layout";

export default function Data() {
  const billDetails = jsonData.data.response.billdetails;

  const denominations = billDetails.map((detail) => {
    const denomString = detail.body[0];
    const denomValue = parseInt(denomString.split(":")[1].trim(), 10);
    return denomValue;
  });

  const filteredDenominations = denominations.filter(
    (denom) => denom >= 100000,
  );

  return (
    <Layout>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Toolbar
            sx={{
              pl: { sm: 2 },
            }}
          >
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Original Denominations
            </Typography>
          </Toolbar>
          <TableContainer component={Paper}>
            <Table aria-label="original denominations table">
              <TableHead>
                <TableRow>
                  <TableCell>Denomination</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {denominations.map((denom, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {CurrencyFormat(denom)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Paper sx={{ width: "100%", mb: 2 }}>
          <Toolbar
            sx={{
              pl: { sm: 2 },
            }}
          >
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              {"Filtered Denominations (>= 100000)"}
            </Typography>
          </Toolbar>
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table aria-label="filtered denominations table">
              <TableHead>
                <TableRow>
                  <TableCell>Denomination</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDenominations.map((denom, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {CurrencyFormat(denom)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Layout>
  );
}
