export const Section = ({ id, className = '', children }) => (
  <section id={id} className={`py-20 md:py-28 scroll-mt-20 ${className}`}>
    {children}
  </section>
)

export const Container = ({ className = '', children }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
)

export const Kicker = ({ children, dark = false }) => (
  <p className={`text-sm font-semibold tracking-widest uppercase mb-3 ${dark ? 'text-gold-400' : 'text-gold-600'}`}>
    {children}
  </p>
)

export const SectionTitle = ({ kicker, title, subtitle, dark = false, align = 'center' }) => (
  <div className={`mb-14 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-3xl'}`}>
    {kicker && <Kicker dark={dark}>{kicker}</Kicker>}
    <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight ${dark ? 'text-white' : 'text-primary-900'}`}>
      {title}
    </h2>
    {subtitle && <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-gray-500'}`}>{subtitle}</p>}
  </div>
)