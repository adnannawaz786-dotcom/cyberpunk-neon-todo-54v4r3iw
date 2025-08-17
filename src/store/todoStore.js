
const useTodoStore = create(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all', // 'all', 'active', 'completed'
      
      // Add a new todo
      addTodo: (text) => {
        const newTodo = {
          id: Date.now().toString(),
          text: text.trim(),
          completed: false,
          createdAt: new Date().toISOString(),
          priority: 'medium', // 'low', 'medium', 'high'
          category: 'general'
        }
        
        set((state) => ({
          todos: [newTodo, ...state.todos]
        }))
      },
      
      // Toggle todo completion
      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        }))
      },
      
      // Delete a todo
      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id)
        }))
      },
      
      // Edit todo text
      editTodo: (id, newText) => {
        if (!newText.trim()) return
        
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text: newText.trim() } : todo
          )
        }))
      },
      
      // Set todo priority
      setPriority: (id, priority) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, priority } : todo
          )
        }))
      },
      
      // Set todo category
      setCategory: (id, category) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, category } : todo
          )
        }))
      },
      
      // Clear all completed todos
      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed)
        }))
      },
      
      // Mark all todos as completed
      completeAll: () => {
        const { todos } = get()
        const allCompleted = todos.every((todo) => todo.completed)
        
        set((state) => ({
          todos: state.todos.map((todo) => ({
            ...todo,
            completed: !allCompleted
          }))
        }))
      },
      
      // Set filter
      setFilter: (filter) => {
        set({ filter })
      },
      
      // Get filtered todos
      getFilteredTodos: () => {
        const { todos, filter } = get()
        
        switch (filter) {
          case 'active':
            return todos.filter((todo) => !todo.completed)
          case 'completed':
            return todos.filter((todo) => todo.completed)
          default:
            return todos
        }
      },
      
      // Get todos by category
      getTodosByCategory: (category) => {
        const { todos } = get()
        return todos.filter((todo) => todo.category === category)
      },
      
      // Get todos by priority
      getTodosByPriority: (priority) => {
        const { todos } = get()
        return todos.filter((todo) => todo.priority === priority)
      },
      
      // Get todo statistics
      getStats: () => {
        const { todos } = get()
        
        return {
          total: todos.length,
          completed: todos.filter((todo) => todo.completed).length,
          active: todos.filter((todo) => !todo.completed).length,
          byPriority: {
            high: todos.filter((todo) => todo.priority === 'high').length,
            medium: todos.filter((todo) => todo.priority === 'medium').length,
            low: todos.filter((todo) => todo.priority === 'low').length
          },
          byCategory: todos.reduce((acc, todo) => {
            acc[todo.category] = (acc[todo.category] || 0) + 1
            return acc
          }, {})
        }
      },
      
      // Reorder todos (for drag and drop)
      reorderTodos: (startIndex, endIndex) => {
        set((state) => {
          const result = Array.from(state.todos)
          const [removed] = result.splice(startIndex, 1)
          result.splice(endIndex, 0, removed)
          
          return { todos: result }
        })
      },
      
      // Search todos
      searchTodos: (query) => {
        const { todos } = get()
        if (!query.trim()) return todos
        
        const lowercaseQuery = query.toLowerCase()
        return todos.filter((todo) =>
          todo.text.toLowerCase().includes(lowercaseQuery) ||
          todo.category.toLowerCase().includes(lowercaseQuery)
        )
      },
      
      // Bulk actions
      bulkDelete: (ids) => {
        set((state) => ({
          todos: state.todos.filter((todo) => !ids.includes(todo.id))
        }))
      },
      
      bulkComplete: (ids) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            ids.includes(todo.id) ? { ...todo, completed: true } : todo
          )
        }))
      },
      
      bulkSetPriority: (ids, priority) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            ids.includes(todo.id) ? { ...todo, priority } : todo
          )
        }))
      },
      
      // Import/Export functionality
      exportTodos: () => {
        const { todos } = get()
        return JSON.stringify(todos, null, 2)
      },
      
      importTodos: (todosJson) => {
        try {
          const importedTodos = JSON.parse(todosJson)
          if (Array.isArray(importedTodos)) {
            set({ todos: importedTodos })
            return true
          }
        } catch (error) {
          console.error('Failed to import todos:', error)
        }
        return false
      },
      
      // Reset store
      reset: () => {
        set({
          todos: [],
          filter: 'all'
        })
      }
    }),
    {
      name: 'cyberpunk-todos',
      version: 1,
      migrate: (persistedState, version) => {
        // Handle migrations if needed in the future
        return persistedState
      }
    }
  )
)

export default useTodoStore