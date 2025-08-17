import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Check, Edit3, Save, X, Zap, Terminal, Cpu } from 'lucide-react'
import { cn } from './lib/utils'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const savedTodos = localStorage.getItem('cyberpunk-todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cyberpunk-todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      }
      setTodos([todo, ...todos])
      setNewTodo('')
    }
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const startEdit = (id, text) => {
    setEditingId(id)
    setEditText(text)
  }

  const saveEdit = () => {
    if (editText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      ))
    }
    setEditingId(null)
    setEditText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit()
    } else if (e.key === 'Escape') {
      cancelEdit()
    }
  }

  return (
    <div className="min-h-screen bg-black text-cyan-400 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Glitch effects */}
      <div className="absolute top-20 left-10 w-2 h-20 bg-gradient-to-b from-cyan-400 to-transparent opacity-60 animate-pulse" />
      <div className="absolute top-40 right-20 w-1 h-32 bg-gradient-to-b from-purple-400 to-transparent opacity-40 animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-1/4 w-3 h-16 bg-gradient-to-b from-pink-400 to-transparent opacity-30 animate-pulse delay-500" />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Terminal className="w-8 h-8 text-cyan-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              CYBER_TODO
            </h1>
            <Cpu className="w-8 h-8 text-purple-400" />
          </div>
          <p className="text-cyan-300/70 text-lg font-mono">
            {'>'} NEURAL_TASK_MANAGER.exe
          </p>
        </motion.div>

        {/* Add Todo Input */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <div className="relative">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Initialize new task..."
              className={cn(
                "w-full px-6 py-4 bg-black/50 border-2 border-cyan-400/30 rounded-lg",
                "text-cyan-100 placeholder-cyan-400/50 font-mono",
                "focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,255,255,0.3)]",
                "transition-all duration-300"
              )}
            />
            <button
              onClick={addTodo}
              className={cn(
                "absolute right-2 top-2 bottom-2 px-4",
                "bg-gradient-to-r from-cyan-500 to-purple-500 rounded-md",
                "hover:from-cyan-400 hover:to-purple-400",
                "transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.5)]",
                "flex items-center gap-2 text-black font-semibold"
              )}
            >
              <Plus className="w-4 h-4" />
              ADD
            </button>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-2 mb-8 justify-center"
        >
          {[
            { key: 'all', label: 'ALL_TASKS' },
            { key: 'active', label: 'ACTIVE' },
            { key: 'completed', label: 'COMPLETED' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={cn(
                "px-4 py-2 rounded-md font-mono text-sm transition-all duration-300",
                filter === key
                  ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,255,255,0.3)]"
                  : "text-cyan-400/60 hover:text-cyan-400 hover:bg-cyan-400/10 border border-transparent"
              )}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="text-center p-4 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 rounded-lg border border-cyan-400/20">
            <div className="text-2xl font-bold text-cyan-400">{todos.length}</div>
            <div className="text-xs text-cyan-400/70 font-mono">TOTAL</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-400/20">
            <div className="text-2xl font-bold text-purple-400">{todos.filter(t => !t.completed).length}</div>
            <div className="text-xs text-purple-400/70 font-mono">ACTIVE</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-pink-900/20 to-cyan-900/20 rounded-lg border border-pink-400/20">
            <div className="text-2xl font-bold text-pink-400">{todos.filter(t => t.completed).length}</div>
            <div className="text-xs text-pink-400/70 font-mono">DONE</div>
          </div>
        </motion.div>

        {/* Todo List */}
        <div className="space-y-3">
          <AnimatePresence>
            {filteredTodos.map((todo, index) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, x: -100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "group relative p-4 rounded-lg border-2 transition-all duration-300",
                  "bg-gradient-to-r from-black/50 via-gray-900/30 to-black/50",
                  todo.completed 
                    ? "border-green-400/30 shadow-[0_0_10px_rgba(0,255,0,0.1)]" 
                    : "border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]"
                )}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={cn(
                      "w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-300",
                      todo.completed
                        ? "bg-green-400/20 border-green-400 text-green-400"
                        : "border-cyan-400 hover:bg-cyan-400/10 text-cyan-400"
                    )}
                  >
                    {todo.completed && <Check className="w-4 h-4" />}
                  </button>

                  <div className="flex-1">
                    {editingId === todo.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyPress={handleEditKeyPress}
                        className="w-full bg-transparent border-b border-cyan-400 text-cyan-100 font-mono focus:outline-none"
                        autoFocus
                      />
                    ) : (
                      <span
                        className={cn(
                          "font-mono text-lg transition-all duration-300",
                          todo.completed
                            ? "text-green-400/70 line-through"
                            : "text-cyan-100"
                        )}
                      >
                        {todo.text}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {editingId === todo.id ? (
                      <>
                        <button
                          onClick={saveEdit}
                          className="p-2 text-green-400 hover:bg-green-400/20 rounded transition-colors duration-200"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-2 text-red-400 hover:bg-red-400/20 rounded transition-colors duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(todo.id, todo.text)}
                          className="p-2 text-purple-400 hover:bg-purple-400/20 rounded transition-colors duration-200"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="p-2 text-red-400 hover:bg-red-400/20 rounded transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Glitch effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTodos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Zap className="w-16 h-16 text-cyan-400/30 mx-auto mb-4" />
            <p className="text-cyan-400/50 font-mono text-lg">
              {filter === 'all' ? 'NO_TASKS_FOUND' : 
               filter === 'active' ? 'NO_ACTIVE_TASKS' : 'NO_COMPLETED_TASKS'}
            </p>
            <p className="text-cyan-400/30 font-mono text-sm mt-2">
              {'>'} INITIALIZE_NEW_TASK.exe
            </p>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 text-cyan-400/30 font-mono text-sm"
        >
          <p>{'>'} CYBERPUNK_TODO_v2.077 - NEURAL_ENHANCED</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>SYSTEM_ONLINE</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default App