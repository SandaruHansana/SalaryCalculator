import React, { useContext } from 'react';
import SalaryContext from '../context/SalaryContext';
import { calculateNetSalary } from '../utils/calculations';
import styled from 'styled-components';

const SummaryContainer = styled.div`
  border: 1px solid #ccc;
  padding: 15px;
  width: 450px;
`;

const SalaryBox = styled.div`
  border: 1px solid #ccc;
  padding: 8px;
  margin-bottom: 5px;
  border-radius: 1px;
  width: 100%;
  height: 38px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SmallerText = styled.span`
  font-size: 14px;
  color: grey;
`;

const SalaryText = styled.span`
  font-weight: bold;
  font-size: 20px; 
`;

const SalarySummary = () => {
  const { state } = useContext(SalaryContext);
  const summary = calculateNetSalary(state);

  return (
    <SummaryContainer>
      <Row>
        <h3><SalaryText>Your Salary</SalaryText></h3>
      </Row>
      <Row>
        <SmallerText>Items</SmallerText>
        <SmallerText>Amount</SmallerText>
      </Row>
      <Row>
        <span>Basic Salary</span>
        <span>{summary.basicSalary}</span>
      </Row>
      <Row>
        <span>Gross Earnings</span>
        <span>{summary.grossEarnings}</span>
      </Row>
      <Row>
        <span>Gross Deduction</span>
        <span>{summary.grossDeduction}</span>
      </Row>
      <Row>
        <span>Employee EPF (8%)</span>
        <span>{summary.employeeEPF}</span>
      </Row>
      <Row>
        <span>APIT</span>
        <span>{summary.APIT}</span>
      </Row>
      <div><span style={{ display: 'inline-block', marginBottom: '20px'}}></span></div>
      <SalaryBox>
        <strong>
          <Row>
            <span>Net Salary (Take Home)</span>
            <span>{summary.netSalary}</span>
          </Row>
        </strong>
      </SalaryBox>
      <div><span style={{ display: 'inline-block', marginTop: '20px'}}></span></div>
      <Row>
        <SmallerText>Contribution from the employer</SmallerText>
      </Row>
      <Row>
        <span>Employer EPF (12%)</span>
        <span>{summary.employerEPF}</span>
      </Row>
      <Row>
        <span>Employer ETF (3%)</span>
        <span>{summary.employerETF}</span>
      </Row>
      <div><span style={{ display: 'inline-block', marginTop: '20px'}}></span></div>
      <Row>
        <span>CTC (Cost To Company)</span>
        <span>{summary.costToCompany}</span>
      </Row>
    </SummaryContainer>
  );
};

export default SalarySummary;
