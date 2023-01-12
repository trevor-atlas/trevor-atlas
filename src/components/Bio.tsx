import React from 'react';
import { useIsVisible } from 'src/hooks/useIsVisible';
import { getCareerLength } from '../utils/helpers';
import { Container } from './Container';
import { Section } from 'src/components/section/Section';
import Image from 'next/image';
import Balancer from 'react-wrap-balancer';
import styles from './bio.module.scss';

const delay = (n: number) => ({ animationDelay: `.${n}s` });

function Bio() {
  const [visible, trigger] = useIsVisible();
  return (
    <Section>
      <div ref={trigger}>
        {visible && (
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row content-center items-center">
                <div
                  className={`${
                    visible ? 'slide-in-right' : ''
                  } flex text-center`}
                >
                  <Image
                    alt="Portrait of Trevor Atlas"
                    src="/portrait-2023.png"
                    className={`${styles.bioPortrait}`}
                    height={250}
                    width={250}
                    priority
                  />
                </div>
                <div className="flex-1 md:ml-8">
                  <h2 className={`mb-0 ${visible ? 'slide-in-up ' : ''}`}>
                    <span className="wave">👋</span>{' '}
                    <span className="">Hello,</span>
                  </h2>
                  <h4
                    className={`mt-0 ${visible ? 'slide-in-up' : ''}`}
                    style={{ ...delay(2) }}
                  >
                    <Balancer ratio={1}>
                      I'm Trevor Atlas – a developer, writer, and creator.
                    </Balancer>
                  </h4>
                  <p
                    className={`${visible ? 'slide-in-up' : ''}
                      text-lg
                    `}
                    style={{
                      ...delay(4),
                      fontFamily: `'Patua One', sans-serif`
                    }}
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
}

export default Bio;
