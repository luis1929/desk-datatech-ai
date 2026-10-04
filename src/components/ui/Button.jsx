export const Button = ({ href, variant = 'primary', size = 'md', children, className = '', onClick, type = 'link' }) => {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 whitespace-nowrap'
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3.5 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  const variants = {
    primary:
      'bg-primary-800 text-white hover:bg-primary-900 shadow-lg shadow-primary-900/20 hover:shadow-primary-900/30',
    gold: 'bg-gradient-to-r from-gold-500 to-gold-400 text-primary-950 hover:from-gold-400 hover:to-gold-300 shadow-lg shadow-gold-500/30',
    outline:
      'border-2 border-white/20 text-white hover:border-gold-400 hover:text-gold-300',
    ghost: 'text-primary-800 hover:bg-primary-900/5',
    light: 'bg-white text-primary-900 hover:bg-gold-100 shadow-lg shadow-black/10',
  }

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  if (type === 'button' || onClick) {
    return (
      <button type={type === 'button' ? 'button' : 'submit'} onClick={onClick} className={classes}>
        {children}
      </button>
    )
  }
  return (
    <a href={href} className={classes}>
      {children}
    </a>
  )
}