const WHATSAPP_GREEN = '#25D366';
const WHATSAPP_GREEN_DARK = '#1FAE54';

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.86 2.722.86.817 0 2.5-.515 2.84-1.318.214-.487.214-.903.143-1.017-.114-.198-.286-.298-.586-.43L19.11 17.205zM16.16 27.66c-1.59 0-3.123-.43-4.498-1.226L4.84 28.135l1.7-6.66c-.87-1.46-1.36-3.116-1.36-4.85 0-5.51 4.49-9.998 9.997-9.998s9.998 4.49 9.998 9.998-4.49 9.998-9.998 9.998l-.017.038zm0-22.045c-6.66 0-12.064 5.405-12.064 12.064 0 2.07.515 4.103 1.51 5.92L4.158 30.395l6.91-1.834a12.094 12.094 0 0 0 5.726 1.45c6.66 0 12.064-5.405 12.064-12.064S22.823 5.91 16.16 5.91v-.295z" />
    </svg>
  );
}

export default function WhatsAppButton({
  number,
  message,
  label,
  fullWidth = false,
  className = '',
}) {
  const digitsOnly = String(number || '').replace(/[^\d]/g, '');
  const encodedMessage = encodeURIComponent(message || '');
  const href = `https://wa.me/${digitsOnly}${encodedMessage ? `?text=${encodedMessage}` : ''}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`no-underline inline-flex items-center justify-center gap-2 rounded-full font-bold shadow-md hover:shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.99] ${className}`}
      style={{
        backgroundColor: WHATSAPP_GREEN,
        color: '#FFFFFF',
        padding: '14px 28px',
        minHeight: '52px',
        fontSize: '16px',
        width: fullWidth ? '100%' : undefined,
        fontFamily: 'var(--font-body)',
        border: `2px solid ${WHATSAPP_GREEN_DARK}`,
        lineHeight: 1.1,
      }}
      aria-label={label}
    >
      <WhatsAppIcon size={20} />
      <span>{label}</span>
    </a>
  );
}
