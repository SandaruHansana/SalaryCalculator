import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import SalaryContext from '../context/SalaryContext';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 15px;
  width: 450px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  width: 150px;
`;

const StyledInput = styled.input`
  border: 1px solid #ccc;
  padding: 5px;
  width: 100%;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const CheckboxLabel = styled.label`
  margin-left: 5px;
  font-size: 12px;
  font-weight: bold;
`;

const BlueButton = styled.button`
  color: blue;
  font-family: 'Times New Roman', Times, serif;
  margin-left: 10px;
`;

const BoldText = styled.span`
  font-weight: bold;
  font-size: 20px;
`;

const GrayText = styled.span`
  color: grey;
  font-size: 14px;
`;

const Separator = styled.hr`
  border: 0;
  border-top: 1px solid #ccc;
  margin: 10px 0;
`;

const SalaryForm = () => {
  const { dispatch, state } = useContext(SalaryContext);
  const { basicSalary, earnings, deductions } = state;

  const [earningTitle, setEarningTitle] = useState('');
  const [earningAmount, setEarningAmount] = useState(0);
  const [isEpfEtfApplicable, setIsEpfEtfApplicable] = useState(false);
  const [deductionTitle, setDeductionTitle] = useState('');
  const [deductionAmount, setDeductionAmount] = useState(0);
  const [editIndex, setEditIndex] = useState(null);

  const handleBasicSalaryChange = (e) => {
    const value = parseFloat(e.target.value);
    dispatch({ type: 'SET_BASIC_SALARY', payload: value });
  };

  const handleEarningTitleChange = (e) => {
    setEarningTitle(e.target.value);
  };

  const handleEarningAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setEarningAmount(value);
  };

  const handleEpfEtfChange = (e) => {
    setIsEpfEtfApplicable(e.target.checked);
  };

  const handleAddOrEditEarning = () => {
    const newEarning = {
      title: earningTitle,
      amount: earningAmount,
      epfEtfApplicable: isEpfEtfApplicable,
    };
    if (editIndex !== null) {
      dispatch({ type: 'UPDATE_EARNING', payload: { index: editIndex, earning: newEarning } });
      setEditIndex(null);
    } else {
      dispatch({ type: 'ADD_EARNING', payload: newEarning });
    }
    setEarningTitle('');
    setEarningAmount(0);
    setIsEpfEtfApplicable(false);
  };

  const handleEditEarning = (index) => {
    const earning = earnings[index];
    setEarningTitle(earning.title);
    setEarningAmount(earning.amount);
    setIsEpfEtfApplicable(earning.epfEtfApplicable);
    setEditIndex(index);
  };

  const handleDeleteEarning = (index) => {
    dispatch({ type: 'REMOVE_EARNING', payload: index });
  };

  const handleDeductionTitleChange = (e) => {
    setDeductionTitle(e.target.value);
  };

  const handleDeductionAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setDeductionAmount(value);
  };

  const handleAddOrEditDeduction = () => {
    const newDeduction = {
      title: deductionTitle,
      amount: deductionAmount,
    };
    if (editIndex !== null) {
      dispatch({ type: 'UPDATE_DEDUCTION', payload: { index: editIndex, deduction: newDeduction } });
      setEditIndex(null);
    } else {
      dispatch({ type: 'ADD_DEDUCTION', payload: newDeduction });
    }
    setDeductionTitle('');
    setDeductionAmount(0);
  };

  const handleEditDeduction = (index) => {
    const deduction = deductions[index];
    setDeductionTitle(deduction.title);
    setDeductionAmount(deduction.amount);
    setEditIndex(index);
  };

  const handleDeleteDeduction = (index) => {
    dispatch({ type: 'REMOVE_DEDUCTION', payload: index });
  };

  const handlePageReset = () => {
    window.location.reload();
  };

  return (
    <FormContainer>
      <Row>
        <BoldText>Calculate Your Salary</BoldText>
        <span style={{ marginLeft: 'auto' }}></span>
        <BlueButton type="button" onClick={handlePageReset}>Reset</BlueButton>
      </Row>
      <div><span style={{ display: 'inline-block'}}></span></div>
      <form>
        <Row>
          <Label>Basic Salary</Label>
        </Row>
        <Row>
          <StyledInput type="number" value={basicSalary} onChange={handleBasicSalaryChange} />
        </Row>
        <div><span style={{ display: 'inline-block'}}></span></div>
        <Row>
          <Label>Earnings</Label>
        </Row>
        <Row>
          <GrayText>Allowance, Fixed Allowance, Bonus and etc.</GrayText>
        </Row>
        <Row>
          <StyledInput type="text" value={earningTitle} onChange={handleEarningTitleChange} placeholder="Pay Details (Title)" />
          <div><span style={{ display: 'inline-block', marginLeft: '6px'}}></span></div>
          <StyledInput type="number" value={earningAmount} onChange={handleEarningAmountChange} />
        </Row>
        <CheckboxContainer>
          <input type="checkbox" checked={isEpfEtfApplicable} onChange={handleEpfEtfChange} />
          <CheckboxLabel>EPF/ETF</CheckboxLabel>
        </CheckboxContainer>
        <BlueButton type="button" onClick={handleAddOrEditEarning}>{editIndex !== null ? 'Edit' : '+ Add New'} Allowance</BlueButton>
        {earnings.map((earning, index) => (
          <Row key={index}>
            <span>{earning.title} - {earning.amount}</span>
            <span style={{ marginLeft: 'auto' }}>EPF/ETF: <small>{earning.epfEtfApplicable ? 'Yes' : 'No'}</small></span>
            <BlueButton type="button" onClick={() => handleEditEarning(index)}>Edit</BlueButton>
            <BlueButton type="button" onClick={() => handleDeleteEarning(index)}>X</BlueButton>
          </Row>
        ))}
        <div><span style={{ display: 'inline-block'}}></span></div>
        <Separator />
        <div><span style={{ display: 'inline-block'}}></span></div>
        <Row>
          <Label>Deductions</Label>
        </Row>
        <Row>
          <GrayText>Salary Advances, Loan Deductions and all</GrayText>
        </Row>
        <Row>
          <StyledInput type="text" value={deductionTitle} onChange={handleDeductionTitleChange} placeholder="Deduction Title" />
          <div><span style={{ display: 'inline-block', marginLeft: '6px'}}></span></div>
          <StyledInput type="number" value={deductionAmount} onChange={handleDeductionAmountChange} />
        </Row>
        <BlueButton type="button" onClick={handleAddOrEditDeduction}>{editIndex !== null ? 'Edit' : '+ Add New'} Deduction</BlueButton>
        {deductions.map((deduction, index) => (
          <Row key={index}>
            <span>{deduction.title} - {deduction.amount}</span>
            <BlueButton type="button" onClick={() => handleEditDeduction(index)}>Edit</BlueButton>
            <BlueButton type="button" onClick={() => handleDeleteDeduction(index)}>X</BlueButton>
          </Row>
        ))}
      </form>
    </FormContainer>
  );
};

export default SalaryForm;
