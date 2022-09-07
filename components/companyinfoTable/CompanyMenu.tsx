import { useRef, useState } from 'react'
import NextLink from 'next/link'
import {
  Edit,
  MoreVert,
  Delete,
  Refresh,
  AddToQueue,
} from '@mui/icons-material'

import { People, PersonAdd, Person, Domain } from '@mui/icons-material'

// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material'

// ----------------------------------------------------------------------

interface Props {
  dbname?: string
  path?: string
  companyno?: string
}
export default function CompanyMenu({
  dbname = 'mkdbname',
  path = 'mkpath',
  companyno = 'mkcompanyno',
}: Props) {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const items = [
    {
      href: {
        pathname: '/updateCompany',
        query: { dbname, path, companyno },
      },
      icon: <Edit fontSize="small" />,
      title: '편집하기',
    },
    {
      href: {
        pathname: '/dropDatabse',
        query: { dbname, path, companyno },
      },
      icon: <Delete fontSize="small" />,
      title: '삭제하기',
    },
  ]

  return (
    <>
      <IconButton sx={{ p: 0 }} ref={ref} onClick={() => setIsOpen(true)}>
        <MoreVert width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {items.map(({ href, icon, title }, index) => {
          return (
            <NextLink href={href} key={index}>
              <MenuItem sx={{ color: 'text.secondary' }} component="a">
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  primary={title}
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </MenuItem>
            </NextLink>
          )
        })}
      </Menu>
    </>
  )
}
