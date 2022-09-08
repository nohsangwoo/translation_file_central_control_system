import { useRouter } from 'next/router'
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
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
import { debounce } from 'lodash'

interface Props {
  scripts: any
}

const CompanyTable = ({ scripts: objectEntries }: Props) => {
  const objectLength = objectEntries.length
  const extractLangColumnList = Object.keys(objectEntries[0]).filter(
    key => key != 'key',
  )
  console.log('objectLength: ', objectLength)
  console.log('objectEntries: ', objectEntries)

  console.log()
  const makeLangColumns = (LangList: string[]) => {
    const result = LangList.map(data => {
      return {
        id: data.toUpperCase(),
        label: data.toUpperCase(),
      }
    })
    return result
  }

  const TABLE_HEAD = [
    { id: 'KEY', label: 'KEY', alignRight: false },
    ...makeLangColumns(extractLangColumnList),
  ]

  const [page, setPage] = useState<number>(0)
  const [order, setOrder] = useState<string>('desc')
  const [orderBy, setOrderBy] = useState<string>('COMPANYNO')
  const [filterValue, setFilterValue] = useState<string>('')
  const [rowsPerPage, setRowsPerPage] = useState<number>(25)
  const [viewFilterValue, setViewFilterValue] = useState<string>('')

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

  // debounce set filename

  // debounce를 활용하여 viewFilterValue이 변경되었을때 700ms 이후에 변경되게 한다.
  const debouncedSetFilterValue = useRef(
    debounce(value => {
      setFilterValue(value)
    }, 700),
  ).current

  useEffect(() => {
    return () => {
      debouncedSetFilterValue.cancel()
    }
  }, [debouncedSetFilterValue])

  useEffect(() => {
    debouncedSetFilterValue(viewFilterValue)
  }, [debouncedSetFilterValue, viewFilterValue])

  // 일반 onchange를 위한 setValue
  const onChangeViewFilterValue = (event: ChangeEvent<HTMLInputElement>) => {
    setViewFilterValue(event.target.value)
  }

  // --end of debounce
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - objectLength) : 0

  const filteredCompany = applySortFilter(
    objectEntries,
    getComparator(order, orderBy),
    filterValue,
    extractLangColumnList,
  )

  const isUserNotFound = filteredCompany.length === 0

  console.log('isUserNotFound: ', isUserNotFound)

  const handleRegist = useCallback(() => {
    router.push('/addCompany')
  }, [])

  return (
    <>
      <Card className="CompanyTableCard">
        <CompanyToolbar
          filterValue={viewFilterValue}
          onFilterValue={onChangeViewFilterValue}
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
                  console.log('row: ', row)
                  const { key } = row
                  return (
                    <TableRow hover key={index} tabIndex={-1}>
                      <TableCell
                        sx={{ pl: 2 }}
                        component="th"
                        scope="row"
                        padding="none"
                      >
                        {key}
                      </TableCell>
                      {extractLangColumnList.map((lang, index) => {
                        return (
                          <TableCell key={index} align="left">
                            {row[lang]}
                          </TableCell>
                        )
                      })}

                      <TableCell align="right" className="companyMenuList">
                        <CompanyMenu
                        // dbname={`videohelp_DBNAME`}
                        // path={PATH}
                        // companyno={COMPANYNO}
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
                    <SearchNotFound searchQuery={filterValue} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={objectLength}
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
