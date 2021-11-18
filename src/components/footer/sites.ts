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

export default [
  {
    url: 'https://github.com/trevor-atlas',
    icon: AiOutlineGithub,
    title: 'Github',
    color: 'white'
  },
  {
    url: 'https://twitter.com/trevoratlas',
    icon: AiOutlineTwitter,
    title: 'Twitter',
    color: '#1da1f2'
  },
  {
    url: 'https://www.linkedin.com/in/trevoratlas',
    icon: AiOutlineLinkedin,
    title: 'Linkedin',
    color: '#2867b2'
  },
  {
    url: 'https://dribbble.com/trevoratlas',
    icon: AiOutlineDribbble,
    title: 'Dribbble',
    color: '#ea4c89'
  },
  {
    url: 'https://stackoverflow.com/users/5770188/trevor-atlas',
    icon: FaStackOverflow,
    title: 'Stack Overflow',
    color: '#FF9900'
  },
  {
    url: 'https://app.standardresume.co/r/TrevorAllen',
    icon: AiOutlineFilePdf,
    title: 'Resume',
    color: 'rgb(242, 7, 4)'
  },
  {
    url: 'mailto:me@trevoratlas.com',
    icon: BsMailbox,
    title: 'Email',
    color: Colors.palette.ocean
  }
];
