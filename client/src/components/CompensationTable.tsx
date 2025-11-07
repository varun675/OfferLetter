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
      <div className="bg-primary/10 p-3 sm:p-4 border-b">
        <h3 className="font-bold text-base sm:text-lg">SALARY STRUCTURE</h3>
      </div>
      
      <div className="p-3 sm:p-4">
        <div className="mb-3 sm:mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
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
              <TableRow>
                <TableHead className="font-bold text-xs sm:text-sm" style={{ width: '29%' }}>(i) Monthly Payments:</TableHead>
                <TableHead className="text-right font-bold text-xs sm:text-sm" style={{ width: '35.5%' }}>Per Month</TableHead>
                <TableHead className="text-right font-bold text-xs sm:text-sm" style={{ width: '35.5%' }}>Per Annum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs sm:text-sm">
            <TableRow>
              <TableCell className="whitespace-nowrap">Basic Pay</TableCell>
              <TableCell className="text-right whitespace-nowrap" data-testid="cell-basic-monthly">
                {basic > 0 ? basic.toLocaleString('en-IN') : '—'}
              </TableCell>
              <TableCell className="text-right whitespace-nowrap" data-testid="cell-basic-annual">
                {basic > 0 ? (basic * 12).toLocaleString('en-IN') : '—'}
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell className="whitespace-nowrap">House Rent Allowance</TableCell>
              <TableCell className="text-right whitespace-nowrap" data-testid="cell-hra-monthly">
                {hraVal > 0 ? hraVal.toLocaleString('en-IN') : '—'}
              </TableCell>
              <TableCell className="text-right whitespace-nowrap" data-testid="cell-hra-annual">
                {hraVal > 0 ? (hraVal * 12).toLocaleString('en-IN') : '—'}
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell className="whitespace-nowrap">Special Allowance</TableCell>
              <TableCell className="text-right whitespace-nowrap" data-testid="cell-special-monthly">
                {special > 0 ? special.toLocaleString('en-IN') : '—'}
              </TableCell>
              <TableCell className="text-right whitespace-nowrap" data-testid="cell-special-annual">
                {special > 0 ? (special * 12).toLocaleString('en-IN') : '—'}
              </TableCell>
            </TableRow>
            
            <TableRow className="font-semibold bg-muted/50">
              <TableCell className="whitespace-nowrap">Total Gross Fixed CTC(I)</TableCell>
              <TableCell className="text-right whitespace-nowrap" data-testid="cell-fixed-monthly">
                {totalFixed > 0 ? totalFixed.toLocaleString('en-IN') : '—'}
              </TableCell>
              <TableCell className="text-right whitespace-nowrap" data-testid="cell-fixed-annual">
                {totalFixed > 0 ? (totalFixed * 12).toLocaleString('en-IN') : '—'}
              </TableCell>
            </TableRow>
            
            {bonuses.map((bonus, index) => (
              bonus.label && parseFloat(bonus.amount) > 0 && (
                <TableRow key={index}>
                  <TableCell className="whitespace-nowrap">{bonus.label}</TableCell>
                  <TableCell className="text-right"></TableCell>
                  <TableCell className="text-right whitespace-nowrap" data-testid={`cell-bonus-${index}`}>
                    {parseFloat(bonus.amount).toLocaleString('en-IN')}
                  </TableCell>
                </TableRow>
              )
            ))}
            
            {totalBonuses > 0 && (
              <TableRow className="font-semibold">
                <TableCell className="whitespace-nowrap">Total CTC(I+II):</TableCell>
                <TableCell className="text-right"></TableCell>
                <TableCell className="text-right whitespace-nowrap" data-testid="cell-ctc-with-bonus">
                  {totalCTCWithBonus.toLocaleString('en-IN')}
                </TableCell>
              </TableRow>
            )}
            
            <TableRow className="font-bold bg-primary/20">
              <TableCell className="whitespace-nowrap">Total CTC(RO):</TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right whitespace-nowrap" data-testid="cell-total-ctc">
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
