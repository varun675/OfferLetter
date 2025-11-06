import CompensationTable from '../CompensationTable';

export default function CompensationTableExample() {
  return (
    <div className="p-6 max-w-3xl">
      <CompensationTable
        employeeName="Roshan Saroj"
        position="Digital Consultant"
        basicPay="30000"
        hra="9666"
        specialAllowance="14500"
        bonuses={[
          { label: "Retention Bonus", amount: "100000" }
        ]}
      />
    </div>
  );
}
