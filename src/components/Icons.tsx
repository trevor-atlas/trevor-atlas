import { IconType } from 'react-icons';
import {
  AiOutlineDribbble,
  AiFillFilePdf,
  AiOutlineGithub,
  AiFillLinkedin,
  AiOutlineTwitter,
  AiFillFacebook
} from 'react-icons/ai';
import { BsMailbox } from 'react-icons/bs';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { FaStackOverflow } from 'react-icons/fa';
import { Colors } from 'src/utils/colors';

const Twitter = () => (
  <AiOutlineTwitter
    title="Twitter"
    aria-label="Twitter"
    style={{ color: '#1da1f2' }}
  />
);
const Linkedin = () => (
  <AiFillLinkedin
    title="LinkedIn"
    aria-label="LinkedIn"
    style={{ color: '#2867b2' }}
  />
);
const Github = () => (
  <AiOutlineGithub
    title="Github"
    aria-label="Github"
    style={{ color: 'white' }}
  />
);
const Dribbble = () => (
  <AiOutlineDribbble
    title="Dribbble"
    aria-label="Dribbble"
    style={{ color: '#ea4c89' }}
  />
);
const StackOverflow = () => (
  <FaStackOverflow
    title="Stack Overflow"
    aria-label="Stack Overflow"
    style={{ color: '#ff9900' }}
  />
);
const Email = () => (
  <MdOutlineAlternateEmail
    title="Email Trevor"
    aria-label="Email Trevor"
    style={{ color: Colors.palette.ocean }}
  />
);
const Resume = () => (
  <AiFillFilePdf
    title="Trevor's Resume"
    aria-label="Trevor's Resume"
    style={{ color: 'rgb(242, 7, 4)' }}
  />
);
const Facebook = () => (
  <AiFillFacebook
    title="Facebook"
    aria-label="Facebook"
    style={{ color: '#3b5998' }}
  />
);

export {
  Twitter,
  Linkedin,
  Github,
  Dribbble,
  StackOverflow,
  Email,
  Resume,
  Facebook
};
