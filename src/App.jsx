import React from 'react';
import SalaryProvider from './context/SalaryProvider';
import SalaryForm from './components/SalaryForm';
import SalarySummary from './components/SalarySummary';
import GlobalStyles from './Styles/GlobalStyles';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-right: 20px;
    margin-bottom: 0;
  }
`;

const SummaryContainer = styled.div`
  flex: 1;
`;

const App = () => {
  return (
    <SalaryProvider>
      <GlobalStyles />
      <AppContainer>
        <FormContainer>
          <SalaryForm />
        </FormContainer>
        <SummaryContainer>
          <SalarySummary />
        </SummaryContainer>
      </AppContainer>
    </SalaryProvider>
  );
};

export default App;
