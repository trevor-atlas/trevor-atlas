import { IconType } from 'react-icons';
import {
  AiOutlineDribbble,
  AiOutlineFilePdf,
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineTwitter
} from 'react-icons/ai';
import { BsMailbox } from 'react-icons/bs';
import { FaStackOverflow } from 'react-icons/fa';
import { Colors } from 'src/utils/colors';
import {
  Dribbble,
  Email,
  Github,
  Linkedin,
  Resume,
  StackOverflow,
  Twitter
} from '../Icons';

export const iconMap: Record<keyof typeof links, IconType> = {
  'Github': Github,
  'Twitter': Twitter,
  'Linkedin': Linkedin,
  'Dribbble': Dribbble,
  'Stack Overflow': StackOverflow,
  'Resume': Resume,
  'Email': Email
};

export const links = {
  'Github': 'https://github.com/trevor-atlas',
  'Twitter': 'https://twitter.com/trevoratlas',
  'Linkedin': 'https://www.linkedin.com/in/trevoratlas',
  'Dribbble': 'https://dribbble.com/trevoratlas',
  'Stack Overflow': 'https://stackoverflow.com/users/5770188/trevor-atlas',
  'Resume': 'https://app.standardresume.co/r/TrevorAllen',
  'Email': 'mailto:me@trevoratlas.com'
};
