export const calculateNetSalary = (state) => {
  const { basicSalary, earnings, deductions } = state;


  const totalEarnings = basicSalary + earnings.reduce((acc, earning) => acc + earning.amount, 0);
  const totalDeductions = deductions.reduce((acc, deduction) => acc + deduction.amount, 0);
  const grossEarnings = totalEarnings - totalDeductions;
  const grossDeduction = totalDeductions;


  const epfAllowedEarnings = earnings.filter(e => e.epfEtfApplicable).reduce((acc, earning) => acc + earning.amount, 0);
  const totalEarningsForEPF = basicSalary + epfAllowedEarnings;

  const employeeEPF = totalEarningsForEPF * 0.08;
  const employerEPF = totalEarningsForEPF * 0.12;
  const employerETF = totalEarningsForEPF * 0.03;

  let APIT = 0;
  if (grossEarnings > 308333) {
      APIT = grossEarnings * 0.36 - 73500;
  } else if (grossEarnings > 266667) {
      APIT = grossEarnings * 0.30 - 55000;
  } else if (grossEarnings > 225000) {
      APIT = grossEarnings * 0.24 - 39000;
  } else if (grossEarnings > 183333) {
      APIT = grossEarnings * 0.18 - 25500;
  } else if (grossEarnings > 141667) {
      APIT = grossEarnings * 0.12 - 14500;
  } else if (grossEarnings > 100000) {
      APIT = grossEarnings * 0.06 - 6000;
  }

  const netSalary = grossEarnings - employeeEPF - APIT;
  const costToCompany = grossEarnings + employerEPF + employerETF;

  return {
      basicSalary,
      totalEarnings,
      grossEarnings,
      grossDeduction,
      employeeEPF,
      employerEPF,
      employerETF,
      APIT,
      netSalary,
      costToCompany
  };
};
