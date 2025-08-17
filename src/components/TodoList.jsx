import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Check, Circle, Zap } from 'lucide-react';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="space-y-6">
      {/* Active Todos */}
      {activeTodos.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-cyan-400 text-lg font-semibold flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            Active Tasks ({activeTodos.length})
          </h3>
          <AnimatePresence>
            {activeTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Completed Todos */}
      {completedTodos.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-green-400 text-lg font-semibold flex items-center gap-2">
            <Check className="w-5 h-5 text-green-400" />
            Completed ({completedTodos.length})
          </h3>
          <AnimatePresence>
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Empty State */}
      {todos.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
            <div className="relative bg-gray-900/50 border border-cyan-500/30 rounded-xl p-8 backdrop-blur-sm">
              <Circle className="w-16 h-16 text-cyan-400/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">No tasks yet</h3>
              <p className="text-gray-400">Add your first cyberpunk task to get started!</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className={`relative bg-gray-900/80 backdrop-blur-sm border rounded-lg p-4 transition-all duration-300 ${
        todo.completed 
          ? 'border-green-500/30 bg-green-500/5' 
          : 'border-cyan-500/30 hover:border-cyan-400/50'
      }`}>
        <div className="flex items-center gap-4">
          {/* Toggle Button */}
          <button
            onClick={() => onToggle(todo.id)}
            className={`relative w-6 h-6 rounded-full border-2 transition-all duration-300 ${
              todo.completed
                ? 'border-green-400 bg-green-400 text-gray-900'
                : 'border-cyan-400 hover:border-cyan-300 hover:bg-cyan-400/10'
            }`}
          >
            <AnimatePresence>
              {todo.completed && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Check className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Todo Text */}
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleEdit}
                onKeyDown={handleKeyPress}
                className="w-full bg-transparent border-b border-cyan-400/50 text-white focus:outline-none focus:border-cyan-400 pb-1"
                autoFocus
              />
            ) : (
              <span
                onClick={() => !todo.completed && setIsEditing(true)}
                className={`block cursor-pointer transition-all duration-300 ${
                  todo.completed
                    ? 'text-gray-400 line-through'
                    : 'text-white hover:text-cyan-300'
                }`}
              >
                {todo.text}
              </span>
            )}
          </div>

          {/* Priority Indicator */}
          {todo.priority && (
            <div className={`w-2 h-2 rounded-full ${
              todo.priority === 'high' ? 'bg-red-400' :
              todo.priority === 'medium' ? 'bg-yellow-400' :
              'bg-green-400'
            }`}></div>
          )}

          {/* Delete Button */}
          <button
            onClick={() => onDelete(todo.id)}
            className="opacity-0 group-hover:opacity-100 p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Created Date */}
        {todo.createdAt && (
          <div className="mt-2 text-xs text-gray-500">
            Created: {new Date(todo.createdAt).toLocaleDateString()}
          </div>
        )}

        {/* Neon Glow Effect */}
        <div className={`absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300 ${
          todo.completed 
            ? 'shadow-[0_0_20px_rgba(34,197,94,0.1)]' 
            : 'shadow-[0_0_20px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]'
        }`}></div>
      </div>
    </motion.div>
  );
};

export default TodoList;