import React, { FC } from 'react';
import { useIsVisible } from 'src/hooks/useIsVisible';
import { Colors } from 'src/utils/colors';
import { getCareerLength } from '../utils/helpers';
import { Container } from './Container';
import { Section } from 'src/components/section/Section';
import Image from 'next/image';
import styles from './bio.module.scss';

interface IProps {}
const delay = (n: number) => ({ animationDelay: `.${n}s` });

const Bio: FC<IProps> = () => {
  const [visible, trigger] = useIsVisible();
  return (
    <Section>
      <div ref={trigger}>
        {visible && (
          <Container>
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row content-center items-center">
                <div className={`${visible ? 'slide-in-right' : ''} flex text-center`}>
                  <Image
                    alt="Portrait of Trevor Atlas"
                    src="/portrait2020.png"
                    className={`${styles.bioPortrait}`}
                    height={250}
                    width={250}
                  />
                </div>
                <div className="flex-1 ml-8">
                  <h2 className={`mb-0 ${visible ? 'slide-in-up ' : ''}`}>
                    <span className="wave">👋</span> Hello,
                  </h2>
                  <h4
                    className={`mt-0 ${visible ? 'slide-in-up' : ''}`}
                    style={{ ...delay(2) }}
                  >
                    I'm Trevor Atlas – a developer, writer, and creator.
                  </h4>
                  <p
                    className={`${visible ? 'slide-in-up' : ''}`}
                    style={{ ...delay(4) }}
                  >
                    For {getCareerLength()}, I've worked at agencies, startups
                    and corporations building functional and intuitive
                    interfaces, flexible and robust services and powerful mobile
                    applications.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        )}
      </div>
    </Section>
  );
};

export default Bio;
