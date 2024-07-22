import { styled } from "@mui/material/styles";
import {
  Table,
  TableContainer,
  Card,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@mui/material";

const StyledTableCell = styled(TableCell)``;

const StyledTableRow = styled(TableRow)`
  height: 56px;
`;

const StyledCard = styled(Card)`
  display: block;
  margin-bottom: 15px;
  margin-top: 15px;
`;

const StyledTableContainer = styled(TableContainer)`
  background: #fdfdfd;
  border-radius: 12px;
  border: 2px solid #cecbcb;
`;
const StyledTable = styled(Table)`
  background: #fafbff;
  font-size: 16px;
  color: blue;
`;
const StyledTableHead = styled(TableHead)`
  background: #dce3f6;
  .MuiTableCell-head {
    color: #183c8c;
    font-weight: bold;
  }
`;
const StyledTableBody = styled(TableBody)`
  margin: 5px;
  background: #fdfdfd;
  & :hover {
    background-color: #f5f6f8;
  }
`;

export {
  StyledCard,
  StyledTableContainer,
  StyledTable,
  StyledTableBody,
  StyledTableHead,
  StyledTableRow,
};
