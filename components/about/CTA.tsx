import Link from "next/link";
import styles from "./CTA.module.css";

function TrustIcon({ icon }: { icon: string }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: styles.trustIconSvg,
  };

  switch (icon) {
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 2l7 3v5c0 5-3.5 9.74-7 11-3.5-1.26-7-6-7-11V5l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "star":
      return (
        <svg {...props}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case "users":
      return (
        <svg {...props}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "verified":
      return (
        <svg {...props}>
          <path d="M9 12l2 2 4-4" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function CTA() {
  const tag = "ابدأ رحلتك";
  const title = "وحدتك المثالية تنتظرك";
  const subtitle = "تصفح أكثر من 500 وحدة فاخرة في أفضل كومباوندات مصر. فريق متخصص جاهز لمساعدتك في اتخاذ القرار الصح.";
  const buttons = [
    { label: "تصفح الوحدات الآن", href: "/properties", variant: "primary" },
    { label: "تواصل مع فريق المبيعات", href: "/contact", variant: "secondary" },
  ];
  const trustItems = [
    { icon: "shield", label: "وحدات موثقة 100%" },
    { icon: "star", label: "تقييم 4.9 / 5" },
    { icon: "users", label: "+200 عميل راضٍ" },
    { icon: "verified", label: "مطورون معتمدون" },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.bgDecoration} aria-hidden="true" />
      <div className={styles.container}>
        <span className={styles.tag}>{tag}</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>

        <div className={styles.actions}>
          {buttons.map((btn, idx) =>
            btn.variant === "primary" ? (
              <Link key={idx} href={btn.href} className={styles.primaryButton}>
                <span>{btn.label}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className={styles.buttonIcon}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 12H5m7-7-7 7 7 7"
                  />
                </svg>
              </Link>
            ) : (
              <Link key={idx} href={btn.href} className={styles.secondaryButton}>
                {btn.label}
              </Link>
            )
          )}
        </div>

        <div className={styles.divider} aria-hidden="true">
          <span className={styles.dividerLine} />
          <span className={styles.dividerDiamond} />
          <span className={styles.dividerLine} />
        </div>

        <div className={styles.trustList}>
          {trustItems.map((item, idx) => (
            <div key={idx} className={styles.trustItem}>
              <div className={styles.trustIcon}>
                <TrustIcon icon={item.icon} />
              </div>
              <span className={styles.trustLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}