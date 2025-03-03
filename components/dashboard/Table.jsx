import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DashboardTable() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Khách hàng gần đây</CardTitle>
        <CardDescription>Khách hàng đăng kí gần đây nhất.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Plan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Sarah Johnson</TableCell>
              <TableCell>Pro</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Michael Brown</TableCell>
              <TableCell>Basic</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Emily Davis</TableCell>
              <TableCell>Enterprise</TableCell>
              
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Robert Wilson</TableCell>
              <TableCell>Pro</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Jennifer Taylor</TableCell>
              <TableCell>Basic</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

