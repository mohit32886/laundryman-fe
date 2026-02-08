import { motion } from 'framer-motion'
import { bgColor, hoverBgColor, textColor, borderColor, focusRingColor } from '../../utils/classNames'
import { buttonTextClasses } from '../../utils/fonts'

/**
 * Button Component
 * Reusable button with multiple variants and sizes
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'base',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    rounded-lg font-semibold
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `

  const variantClasses = {
    primary: `
      ${bgColor('primary')} 
      text-white 
      ${hoverBgColor('primary')}
      ${focusRingColor('primary')}
    `,
    outline: `
      border-2 ${borderColor('primary')}
      ${textColor('primary')}
      bg-transparent
      hover:${bgColor('primary')} hover:text-white
      ${focusRingColor('primary')}
    `,
    success: `
      bg-green-600
      text-white
      hover:bg-green-700
      focus:ring-2 focus:ring-green-600
    `,
    whatsapp: `
      ${bgColor('whatsapp')}
      text-white
      ${hoverBgColor('whatsapp')}
      ${focusRingColor('secondary')}
    `,
  }

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    base: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.base}
    ${widthClass}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button
