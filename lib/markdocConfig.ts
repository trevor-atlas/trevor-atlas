import { Gallery } from 'src/components/gallery/Gallery';
import Code from 'src/components/markdoc-nodes/Code';
import { OgLink } from 'src/components/OgLink';
import { HoverPopover } from 'src/components/Popover';
import { Youtube } from 'src/components/youtube/Youtube';
import { heading } from 'src/markdoc/heading';
import { image } from 'src/markdoc/image';
import { MarkdocConfigurator } from './MarkdocConfigurator';

const markdocConfig = MarkdocConfigurator.getInstance()
  .addComponentNode(
    'fence',
    {
      render: 'Code',
      attributes: {
        language: {
          type: String
        }
      }
    },
    Code
  )
  .addNode('heading', heading)
  .addNode('image', image)
  .addTag(
    'popover',
    {
      render: 'HoverPopover',
      attributes: {
        content: {
          type: String
        }
      }
    },
    HoverPopover
  )
  .addTag(
    'gallery',
    {
      render: 'Gallery',
      attributes: {
        images: {
          type: Array
        }
      }
    },
    Gallery
  )
  .addTag(
    'oglink',
    {
      render: 'OgLink',
      attributes: {
        url: {
          type: String
        },
        // used only as a fallback
        title: {
          type: String
        }
      }
    },
    OgLink
  )
  .addTag(
    'youtube',
    {
      render: 'Youtube',
      attributes: {
        videoId: {
          type: String
        },
        title: {
          type: String
        }
      }
    },
    Youtube
  );

export default markdocConfig;
