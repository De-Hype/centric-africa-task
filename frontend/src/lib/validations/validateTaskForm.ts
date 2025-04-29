// This is a simplified version of the Zod schema for client-side validation
// In a real application, we would use Zod directly or share validation logic between client and server

import ITask from "../../interfaces/ITask";


export const validateTaskForm = (data:ITask|any) => {
    const errors: Partial<{
        title: string;
        description: string;
        budget: string;
      }> = {};
      
    let isValid:boolean = true;
  
    // Name validation
    if (!data.title) {
      errors.title = "Task name is required";
      isValid = false;
    } else if (data.title.length < 8) {
      errors.title = "Task name must be at least 8 characters long";
      isValid = false;
    }
  
    // Description validation
    if (!data.description) {
      errors.description = "Task description is required";
      isValid = false;
    } else if (data.description.length < 8) {
      errors.description = "Task description must be at least 8 characters long";
      isValid = false;
    }
  
    // Budget validation
    if (!data.budget) {
      errors.budget = "Task budget is required";
      isValid = false;
    } else {
      const budgetValue = parseFloat(String(data.budget));
      if (isNaN(budgetValue) || budgetValue <= 0) {
        errors.budget = "Task budget must be a positive number";
        isValid = false;
      }
    }
  
    return {
      success: isValid,
      errors
    };
  };