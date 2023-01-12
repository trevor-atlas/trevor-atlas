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

export const iconMap: Record<typeof links[number]['title'], IconType> = {
  'Github': AiOutlineGithub,
  'Twitter': AiOutlineTwitter,
  'Linkedin': AiOutlineLinkedin,
  'Dribbble': AiOutlineDribbble,
  'Stack Overflow': FaStackOverflow,
  'Resume': AiOutlineFilePdf,
  'Email': BsMailbox
};

export const links = [
  {
    url: 'https://github.com/trevor-atlas',
    title: 'Github',
    color: 'white'
  },
  {
    url: 'https://twitter.com/trevoratlas',
    title: 'Twitter',
    color: '#1da1f2'
  },
  {
    url: 'https://www.linkedin.com/in/trevoratlas',
    title: 'Linkedin',
    color: '#2867b2'
  },
  {
    url: 'https://dribbble.com/trevoratlas',
    title: 'Dribbble',
    color: '#ea4c89'
  },
  {
    url: 'https://stackoverflow.com/users/5770188/trevor-atlas',
    title: 'Stack Overflow',
    color: '#FF9900'
  },
  {
    url: 'https://app.standardresume.co/r/TrevorAllen',
    title: 'Resume',
    color: 'rgb(242, 7, 4)'
  },
  {
    url: 'mailto:me@trevoratlas.com',
    title: 'Email',
    color: Colors.palette.ocean
  }
];
