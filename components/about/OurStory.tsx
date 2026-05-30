import Image from "next/image";
import styles from "./OurStory.module.css";

export default function OurStory() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.tag}>قصتنا</span>
            <h2 className={styles.title}>من فكرة إلى منصة رائدة في السوق المصري</h2>
          </div>

          <div className={styles.body}>
            <p className={styles.paragraph}>
              بدأنا رحلتنا عام 2019 بسؤال بسيط: لماذا يصعب على المصريين إيجاد وحدتهم المثالية في سوق مليء بالفرص؟
            </p>
            <p className={styles.paragraph}>
              آمنّا بأن التكنولوجيا قادرة على تغيير قواعد اللعبة العقارية. فبنينا منصة تجمع بين الشفافية الكاملة، والبيانات الدقيقة، وفريق متخصص يرافقك في كل خطوة.
            </p>
            <p className={styles.paragraph}>
              اليوم نفخر بخدمة آلاف العملاء عبر أكبر قاعدة بيانات عقارية متكاملة في مصر، مع شراكات استراتيجية مع أكبر المطورين.
            </p>
          </div>

          <div className={styles.cards}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>رؤيتنا</h3>
              <p className={styles.cardText}>
                أن نكون المرجع الأول والأكثر موثوقية للعقارات الفاخرة في السوق المصري والعربي.
              </p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>رسالتنا</h3>
              <p className={styles.cardText}>
                تبسيط رحلة البحث عن المنزل المثالي من خلال بيانات شفافة وتجربة مستخدم استثنائية.
              </p>
            </div>
          </div>

          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <span className={styles.timelineYear}>2019</span>
              <span className={styles.timelineLabel}>تأسيس المنصة</span>
            </div>
            <div className={styles.timelineItem}>
              <span className={styles.timelineYear}>2020</span>
              <span className={styles.timelineLabel}>أول 100 وحدة</span>
            </div>
            <div className={styles.timelineItem}>
              <span className={styles.timelineYear}>2021</span>
              <span className={styles.timelineLabel}>500 وحدة مسجلة</span>
            </div>
            <div className={styles.timelineItem}>
              <span className={styles.timelineYear}>2022</span>
              <span className={styles.timelineLabel}>توسع لـ 4 مدن</span>
            </div>
            <div className={styles.timelineItem}>
              <span className={styles.timelineYear}>2023</span>
              <span className={styles.timelineLabel}>10,000 مستخدم</span>
            </div>
            <div className={styles.timelineItem}>
              <span className={styles.timelineYear}>2024</span>
              <span className={styles.timelineLabel}>50 مطور شريك</span>
            </div>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src="/images/about/office.jpg"
            alt="مقر الشركة ومعرض الوحدات العقارية"
            fill
            quality={100}
            className={styles.image}
            sizes="(max-width:768px) 100vw, 50vw"
          />
          <div className={styles.badge}>
            <span className={styles.badgeText}>منذ</span>
            <span className={styles.badgeYear}>2019</span>
          </div>
        </div>
      </div>
    </section>
  );
}