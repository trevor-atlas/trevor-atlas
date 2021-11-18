import { IResumeData } from 'pages/resume';
import { FC } from 'react';
import styles from './resume.module.scss';

interface IResume {
  resume: IResumeData;
}

const Resume: FC<IResume> = ({ resume: { basics, work, skills } }) => (
  <article className={styles['resume-container']}>
    <section className={styles.intro}>
      <h1 className={styles.heading}>{basics.name}</h1>
      <div className={styles['basic-information']}>
        <span className="basic-info">{basics.email}</span>
        <span className="basic-info">{basics.url}</span>
        <span className="basic-info">
          {basics.location.city} | {basics.location.region}
        </span>
        <span className="basic-info">{basics.phone}</span>
      </div>
      <p className="summary">{basics.summary}</p>
    </section>
    <section className={styles.work}>
      <h3 className={styles.heading}>Experience</h3>
      {work.map((role) => (
        <div key={role.name} className="role-container">
          <div className="role-details">
            <h4 className={styles.heading}>{role.name}</h4>
            <div className={styles['role-info']}>
              <p className={styles.position}>{role.position}</p>
              <p className={styles.position}>{role.url}</p>
            </div>
            <p>{role.summary}</p>
          </div>
          <ul className="role-highlights">
            {role.highlights.map((highlight) => (
              <li className={styles.highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
    <section>
      <h3 className={styles.heading}>Skills</h3>
      <ul className={styles.skills}>
        {skills.map((skill) => (
          <li className={styles.skill}>{skill.name}</li>
        ))}
      </ul>
    </section>
  </article>
);

export default Resume;
