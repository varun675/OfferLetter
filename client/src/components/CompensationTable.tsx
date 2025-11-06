import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface BonusField {
  label: string;
  amount: string;
}

interface CompensationTableProps {
  employeeName: string;
  position: string;
  basicPay: string;
  hra: string;
  specialAllowance: string;
  bonuses: BonusField[];
}

export default function CompensationTable({
  employeeName,
  position,
  basicPay,
  hra,
  specialAllowance,
  bonuses,
}: CompensationTableProps) {
  const basic = parseFloat(basicPay) || 0;
  const hraVal = parseFloat(hra) || 0;
  const special = parseFloat(specialAllowance) || 0;
  
  const totalFixed = basic + hraVal + special;
  
  const totalBonuses = bonuses.reduce((sum, bonus) => {
    return sum + (parseFloat(bonus.amount) || 0);
  }, 0);
  
  const totalCTCWithBonus = totalFixed + totalBonuses;
  const roundedTotal = Math.round(totalCTCWithBonus);

  return (
    <div className="border rounded-lg overflow-hidden bg-card" data-testid="compensation-table">
      <div className="bg-primary/10 p-4 border-b">
        <h3 className="font-bold text-lg">ANNEXURE</h3>
        <p className="text-sm text-muted-foreground">SALARY STRUCTURE</p>
      </div>
      
      <div className="p-4">
        <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold">Name:</span> {employeeName || "—"}
          </div>
          <div>
            <span className="font-semibold">Designation:</span> {position || "—"}
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">(i) Monthly Payments:</TableHead>
              <TableHead className="text-right font-bold">Per Month</TableHead>
              <TableHead className="text-right font-bold">Per Annum</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Basic Pay</TableCell>
              <TableCell className="text-right" data-testid="cell-basic-monthly">
                {basic > 0 ? basic.toLocaleString('en-IN') : '—'}
              </TableCell>
              <TableCell className="text-right" data-testid="cell-basic-annual">
                {basic > 0 ? (basic * 12).toLocaleString('en-IN') : '—'}
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell>House Rent Allowance</TableCell>
              <TableCell className="text-right" data-testid="cell-hra-monthly">
                {hraVal > 0 ? hraVal.toLocaleString('en-IN') : '—'}
              </TableCell>
              <TableCell className="text-right" data-testid="cell-hra-annual">
                {hraVal > 0 ? (hraVal * 12).toLocaleString('en-IN') : '—'}
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell>Special Allowance</TableCell>
              <TableCell className="text-right" data-testid="cell-special-monthly">
                {special > 0 ? special.toLocaleString('en-IN') : '—'}
              </TableCell>
              <TableCell className="text-right" data-testid="cell-special-annual">
                {special > 0 ? (special * 12).toLocaleString('en-IN') : '—'}
              </TableCell>
            </TableRow>
            
            <TableRow className="font-semibold bg-muted/50">
              <TableCell>Total Gross Fixed CTC(I)</TableCell>
              <TableCell className="text-right" data-testid="cell-fixed-monthly">
                {totalFixed > 0 ? totalFixed.toLocaleString('en-IN') : '—'}
              </TableCell>
              <TableCell className="text-right" data-testid="cell-fixed-annual">
                {totalFixed > 0 ? (totalFixed * 12).toLocaleString('en-IN') : '—'}
              </TableCell>
            </TableRow>
            
            {bonuses.map((bonus, index) => (
              bonus.label && parseFloat(bonus.amount) > 0 && (
                <TableRow key={index}>
                  <TableCell>{bonus.label}</TableCell>
                  <TableCell className="text-right"></TableCell>
                  <TableCell className="text-right" data-testid={`cell-bonus-${index}`}>
                    {parseFloat(bonus.amount).toLocaleString('en-IN')}
                  </TableCell>
                </TableRow>
              )
            ))}
            
            {totalBonuses > 0 && (
              <TableRow className="font-semibold">
                <TableCell>Total CTC(I+II):</TableCell>
                <TableCell className="text-right"></TableCell>
                <TableCell className="text-right" data-testid="cell-ctc-with-bonus">
                  {totalCTCWithBonus.toLocaleString('en-IN')}
                </TableCell>
              </TableRow>
            )}
            
            <TableRow className="font-bold bg-primary/20">
              <TableCell>Total CTC(RO):</TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right" data-testid="cell-total-ctc">
                {roundedTotal > 0 ? roundedTotal.toLocaleString('en-IN') : '—'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
