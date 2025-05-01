import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '../../lib/store/taskStore';
import { validateTaskForm } from '../../lib/validations/validateTaskForm';


function TaskForm() {
  const navigate = useNavigate();
  const { addTask } =  useTaskStore();
  const [formData, setFormData] = useState({
    _id:"",
    title: '',
    description: '',
    budget: '',
    createdAt:"",
    updatedAt:"",
    assignedTo:"",
    createdBy:""
  });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    
    // Validate form
    const validationResult = validateTaskForm(formData);
    if (!validationResult.success) {
      setErrors(validationResult.errors);
      return;
    }
    
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      await addTask({
        _id:formData._id,
        budget:Number(formData.budget),
        description:formData.description,
        title:formData.title,

      });
      
      // Redirect to available tasks page after successful creation
      navigate('/available-tasks');
    } catch (err:any) {
      setSubmitError(err.message || 'Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Task</h2>
      
      {submitError && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
          {submitError}
        </div>
      )}
      
      <div className="mb-6">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
          Task Name
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'
          }`}
          placeholder="Enter task name"
        />
        {errors.title && (
          <p className="mt-1 text-red-600 text-sm">{errors.title}</p>
        )}
      </div>
      
      <div className="mb-6">
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.description ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'
          }`}
          placeholder="Enter task description"
          rows={4}
        ></textarea>
        {errors.description && (
          <p className="mt-1 text-red-600 text-sm">{errors.description}</p>
        )}
      </div>
      
      <div className="mb-8">
        <label htmlFor="budget" className="block text-gray-700 font-medium mb-2">
          Budget ($)
        </label>
        <input
          type="text"
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.budget ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'
          }`}
          placeholder="Enter task budget"
        />
        {errors.budget && (
          <p className="mt-1 text-red-600 text-sm">{errors.budget}</p>
        )}
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 mr-4 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 rounded-md font-medium text-white ${
            isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'
          }`}
        >
          {isSubmitting ? 'Creating...' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;