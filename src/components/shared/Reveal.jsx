import useInView from '../../hooks/useInView';

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal-on-scroll ${inView ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
