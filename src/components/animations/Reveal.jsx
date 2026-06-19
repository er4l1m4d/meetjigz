import { motion } from 'framer-motion'

const prefersReduced =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Reveal({ children, variants, className, style, ...props }) {
  if (prefersReduced) {
    return (
      <div className={className} style={style} {...props}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
