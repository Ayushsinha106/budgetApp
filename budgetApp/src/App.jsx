import { Stack, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import React from 'react';
import BudgetCard from "./components/BudgetCard"
import AddBudgetModal from "./components/AddBudgetModal";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BugetContext"
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpenseModal";


function App() {
  const [showAddBudgetModal, setShowAddModalButton] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [ViewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
      <Container className='my-4'>
        <Stack direction='horizontal' gap='2' className='mb-4'>
          <h1>Budgets</h1>
          <Button variant='primary' onClick={() => setShowAddModalButton(true)}>Add Button</Button>
          <Button variant='outline-primary' onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          alignItems: "flex-start"
        }}>
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            )
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
              />
            )
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddModalButton(false)}
      />
      <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={addExpenseModalBudgetId} handleClose={() => setShowAddExpenseModal(false)} />
      <ViewExpensesModal
        budgetId={ViewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    </>
  )
}

export default App;
