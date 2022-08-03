import { TableContainer, Table, Thead, Tbody, Tr, Th, Skeleton } from '@chakra-ui/react'
import { useFoods } from '../../hooks/useFoods'
import { FoodTableRow } from './FoodTableRow'

export interface FoodTableProps { }
export function FoodTable({}: FoodTableProps) {
  const { foods, isLoading } = useFoods()
  if (isLoading) return <Skeleton height='20px' />
  return (
    <TableContainer>
      <Table variant='simple' size='sm'>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th isNumeric>Validade</Th>
            <Th/>
          </Tr>
        </Thead>
        <Tbody>
          {
            foods.map((food, index) => (
              <FoodTableRow key={index} food={food}  />
            ))
          }
        </Tbody>
      </Table>
    </TableContainer>
  )
}