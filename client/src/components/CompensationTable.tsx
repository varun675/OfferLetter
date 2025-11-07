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
  annualCTC?: string;
}

export default function CompensationTable({
  employeeName,
  position,
  basicPay,
  hra,
  specialAllowance,
  bonuses,
  annualCTC,
  testIdSuffix = "",
}: CompensationTableProps & { testIdSuffix?: string }) {
  const basic = parseFloat(basicPay) || 0;
  const hraVal = parseFloat(hra) || 0;
  const special = parseFloat(specialAllowance) || 0;
  
  const totalFixed = basic + hraVal + special;
  
  const totalBonuses = bonuses.reduce((sum, bonus) => {
    return sum + (parseFloat(bonus.amount) || 0);
  }, 0);
  
  const totalCTCWithBonus = totalFixed + totalBonuses;
  
  // Total CTC(RO) should be the entered Annual CTC, not calculated
  // If no annualCTC provided, calculate as monthly total × 12
  const totalCTCRO = annualCTC ? parseFloat(annualCTC) : Math.round(totalCTCWithBonus * 12);

  return (
    <div className="border rounded-lg overflow-hidden bg-card" data-testid={`compensation-table${testIdSuffix}`}>
      <div className="bg-primary/10 p-2 border-b">
        <h3 className="font-bold text-sm">SALARY STRUCTURE</h3>
      </div>
      
      <div className="p-2">
        <div className="mb-2 grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-xs">
          <div>
            <span className="font-semibold">Name:</span> {employeeName || "—"}
          </div>
          <div>
            <span className="font-semibold">Designation:</span> {position || "—"}
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table style={{ width: '100%', tableLayout: 'fixed' }}>
            <TableHeader>
              <TableRow className="h-8">
                <TableHead className="font-bold text-xs py-1" style={{ width: '29%' }}>(i) Monthly Payments:</TableHead>
                <TableHead className="text-right font-bold text-xs py-1" style={{ width: '35.5%' }}>Per Month</TableHead>
                <TableHead className="text-right font-bold text-xs py-1" style={{ width: '35.5%' }}>Per Annum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs">
            <TableRow className="h-7">
              <TableCell className="whitespace-nowrap py-1">Basic Pay</TableCell>
              <TableCell className="text-right whitespace-nowrap py-1" data-testid="cell-basic-monthly">
                {basic > 0 ? basic.toLocaleString('en-IN') : '—'}
              </TableCell>
              <TableCell className="text-right whitespace-nowrap py-1" data-testid="cell-basic-annual">
                {basic > 0 ? (basic * 12).toLocaleString('en-IN') : '—'}
              </TableCell>
            </TableRow>
            
            <TableRow className="h-7">
              <TableCell className="whitespace-nowrap py-1">House Rent Allowance</TableCell>
              <TableCell className="text-right whitespace-nowrap py-1" data-testid="cell-hra-monthly">
                {hraVal > 0 ? hraVal.toLocaleString('en-IN') : '—'}
              </TableCell>
              <TableCell className="text-right whitespace-nowrap py-1" data-testid="cell-hra-annual">
                {hraVal > 0 ? (hraVal * 12).toLocaleString('en-IN') : '—'}
              </TableCell>
            </TableRow>
            
            <TableRow className="h-7">
              <TableCell className="whitespace-nowrap py-1">Special Allowance</TableCell>
              <TableCell className="text-right whitespace-nowrap py-1" data-testid="cell-special-monthly">
                {special > 0 ? special.toLocaleString('en-IN') : '—'}
              </TableCell>
              <TableCell className="text-right whitespace-nowrap py-1" data-testid="cell-special-annual">
                {special > 0 ? (special * 12).toLocaleString('en-IN') : '—'}
              </TableCell>
            </TableRow>
            
            <TableRow className="font-semibold bg-muted/50 h-8">
              <TableCell className="whitespace-nowrap py-1">Total Gross Fixed CTC(I)</TableCell>
              <TableCell className="text-right whitespace-nowrap py-1" data-testid="cell-fixed-monthly">
                {totalFixed > 0 ? totalFixed.toLocaleString('en-IN') : '—'}
              </TableCell>
              <TableCell className="text-right whitespace-nowrap py-1" data-testid="cell-fixed-annual">
                {totalFixed > 0 ? (totalFixed * 12).toLocaleString('en-IN') : '—'}
              </TableCell>
            </TableRow>
            
            {bonuses.map((bonus, index) => (
              bonus.label && parseFloat(bonus.amount) > 0 && (
                <TableRow key={index} className="h-7">
                  <TableCell className="whitespace-nowrap py-1">{bonus.label}</TableCell>
                  <TableCell className="text-right py-1"></TableCell>
                  <TableCell className="text-right whitespace-nowrap py-1" data-testid={`cell-bonus-${index}`}>
                    {parseFloat(bonus.amount).toLocaleString('en-IN')}
                  </TableCell>
                </TableRow>
              )
            ))}
            
            {totalBonuses > 0 && (
              <TableRow className="font-semibold h-8">
                <TableCell className="whitespace-nowrap py-1">Total CTC(I+II):</TableCell>
                <TableCell className="text-right py-1"></TableCell>
                <TableCell className="text-right whitespace-nowrap py-1" data-testid="cell-ctc-with-bonus">
                  {totalCTCWithBonus.toLocaleString('en-IN')}
                </TableCell>
              </TableRow>
            )}
            
            <TableRow className="font-bold bg-primary/20 h-8">
              <TableCell className="whitespace-nowrap py-1">Total CTC(RO):</TableCell>
              <TableCell className="text-right py-1"></TableCell>
              <TableCell className="text-right whitespace-nowrap py-1" data-testid="cell-total-ctc">
                {totalCTCRO > 0 ? totalCTCRO.toLocaleString('en-IN') : '—'}
              </TableCell>
            </TableRow>
          </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
