import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
  Box,
} from '@mui/material'
import { applySortFilter, getComparator } from './tableSortUtil'
import CompanyToolbar from './CompanyToolbar'
import CompanyHead from './CompanyHead'
import CompanyMenu from './CompanyMenu'
import SearchNotFound from './../notFound/SearchNotFound'

interface Props {
  databases: any
}

const TABLE_HEAD = [
  { id: 'SEQNO', label: 'SEQNO', alignRight: false },
  { id: 'PATH', label: '회사이름' },
  { id: 'COMPANYCODE', label: '회사코드' },
  { id: 'COMPANYNO', label: '회사 번호', alignRight: false },
  { id: 'REGISTED_IP', label: '등록된 IP수', alignRight: false },
  { id: 'CDATETIME', label: '가입날짜', alignRight: false },
  { id: '' },
]

const CompanyTable = ({
  databases: {
    getDatabases: { databases },
  },
}: Props) => {
  const [page, setPage] = useState<number>(0)
  const [order, setOrder] = useState<string>('desc')
  const [orderBy, setOrderBy] = useState<string>('COMPANYNO')
  const [filterName, setFilterName] = useState<string>('')
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const router = useRouter()

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleFilterByName = (event: any) => {
    setFilterName(event.target.value)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - databases.length) : 0

  const filteredCompany = applySortFilter(
    databases,
    getComparator(order, orderBy),
    filterName,
  )

  const isUserNotFound = filteredCompany.length === 0

  const handleRegist = useCallback(() => {
    router.push('/addCompany')
  }, [])

  return (
    <>
      <Card className="CompanyTableCard">
        <CompanyToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
          registKind="company"
          handleRegist={handleRegist}
        />
        <TableContainer
          sx={{ minWidth: 800 }}
          className="CompanyTableContainer"
        >
          <Table className="companyInfoTable">
            <CompanyHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {filteredCompany
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const {
                    SEQNO,
                    PATH,
                    COMPANYCODE,
                    COMPANYNO,
                    countedIP,
                    CDATETIME,
                  } = row

                  return (
                    <TableRow hover key={index} tabIndex={-1}>
                      <TableCell
                        sx={{ pl: 2 }}
                        component="th"
                        scope="row"
                        padding="none"
                      >
                        {SEQNO}
                      </TableCell>
                      <TableCell>{PATH}</TableCell>
                      <TableCell align="left">{COMPANYCODE}</TableCell>
                      <TableCell align="left">{COMPANYNO}</TableCell>
                      <TableCell align="left">{countedIP}</TableCell>
                      <TableCell align="left">{CDATETIME}</TableCell>

                      <TableCell align="right" className="companyMenuList">
                        <CompanyMenu
                          dbname={`videohelp_${COMPANYCODE}`}
                          path={PATH}
                          companyno={COMPANYNO}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={databases.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  )
}

export default CompanyTable
