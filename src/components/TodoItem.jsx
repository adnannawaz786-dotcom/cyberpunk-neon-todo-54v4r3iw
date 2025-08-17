import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit3, Check, X } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      if (editText.trim()) {
        onEdit(todo.id, editText.trim());
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`
        group relative bg-black/40 backdrop-blur-sm border border-cyan-500/30 
        rounded-lg p-4 mb-3 hover:border-cyan-400/60 transition-all duration-300
        ${todo.completed ? 'opacity-60' : ''}
      `}
    >
      {/* Neon glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/60 rounded-tr-lg" />
      
      <div className="relative flex items-center gap-4">
        {/* Checkbox */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(todo.id)}
          className={`
            relative w-6 h-6 rounded border-2 transition-all duration-300
            ${todo.completed 
              ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' 
              : 'border-cyan-500/60 hover:border-cyan-400'
            }
          `}
        >
          {todo.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Check size={14} className="text-black font-bold" />
            </motion.div>
          )}
        </motion.button>

        {/* Todo text */}
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleEdit}
              autoFocus
              className={`
                w-full bg-transparent border-b-2 border-cyan-400/60 text-cyan-100 
                text-lg font-mono focus:outline-none focus:border-cyan-400
                focus:shadow-[0_2px_10px_rgba(34,211,238,0.3)]
                transition-all duration-300
              `}
            />
          ) : (
            <motion.span
              className={`
                text-lg font-mono transition-all duration-300
                ${todo.completed 
                  ? 'line-through text-gray-400' 
                  : 'text-cyan-100 hover:text-cyan-300'
                }
              `}
            >
              {todo.text}
            </motion.span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {isEditing ? (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleEdit}
                className={`
                  p-2 rounded-lg bg-green-500/20 border border-green-500/40 
                  text-green-400 hover:bg-green-500/30 hover:border-green-400
                  hover:shadow-[0_0_10px_rgba(34,197,94,0.3)]
                  transition-all duration-300
                `}
              >
                <Check size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCancel}
                className={`
                  p-2 rounded-lg bg-red-500/20 border border-red-500/40 
                  text-red-400 hover:bg-red-500/30 hover:border-red-400
                  hover:shadow-[0_0_10px_rgba(239,68,68,0.3)]
                  transition-all duration-300
                `}
              >
                <X size={16} />
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleEdit}
                className={`
                  p-2 rounded-lg bg-purple-500/20 border border-purple-500/40 
                  text-purple-400 hover:bg-purple-500/30 hover:border-purple-400
                  hover:shadow-[0_0_10px_rgba(147,51,234,0.3)]
                  transition-all duration-300
                `}
              >
                <Edit3 size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(todo.id)}
                className={`
                  p-2 rounded-lg bg-red-500/20 border border-red-500/40 
                  text-red-400 hover:bg-red-500/30 hover:border-red-400
                  hover:shadow-[0_0_10px_rgba(239,68,68,0.3)]
                  transition-all duration-300
                `}
              >
                <Trash2 size={16} />
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Priority indicator */}
      {todo.priority && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 rounded-l-lg" />
      )}

      {/* Completion timestamp */}
      {todo.completed && todo.completedAt && (
        <div className="mt-2 text-xs text-gray-500 font-mono">
          Completed: {new Date(todo.completedAt).toLocaleString()}
        </div>
      )}
    </motion.div>
  );
};

export default TodoItem;