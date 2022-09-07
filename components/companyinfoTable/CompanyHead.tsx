// material
import { visuallyHidden } from '@mui/utils'
import {
  Box,
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from '@mui/material'

// ----------------------------------------------------------------------

interface Props {
  order: any
  orderBy: string
  headLabel: any[]
  onRequestSort: (event: any, property: string) => void
}

export default function CompanyHead({
  order,
  orderBy,
  headLabel,
  onRequestSort,
}: Props) {
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell: any, index) => (
          <TableCell
            key={index}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
