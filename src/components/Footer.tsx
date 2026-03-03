const contactLinks = [
  {
    icon: "mail",
    label: "Email",
    href: "mailto:therohitmahar@gmail.com",
  },
  {
    icon: "code",
    label: "GitHub",
    href: "https://github.com/Therohitmahar",
  },
  {
    icon: "work",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/therohitmahar/",
  },
  {
    icon: "terminal",
    label: "LeetCode",
    href: "https://leetcode.com/u/Therohitmahar/",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer
      className="flex flex-col items-center justify-center border-t border-[var(--color-border)] py-12 mt-auto"
    >
      <div className="flex items-center justify-center gap-8 mb-8 flex-wrap">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-primary transition-colors font-medium group"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
              {link.icon}
            </span>
            <span>{link.label}</span>
          </a>
        ))}
      </div>
      <p className="text-[var(--color-copyright)] text-sm text-center">
        © {currentYear} Rohit Mahar. All rights reserved. Built with precision.
      </p>
    </footer>
  );
}
