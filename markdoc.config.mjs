import { defineMarkdocConfig, nodes } from '@astrojs/markdoc/config';
import markdocPkg from '@markdoc/markdoc';
import dimensions from './src/data/image-dimensions.json' with { type: 'json' };

const { Tag } = markdocPkg;

const imgAttrs = {
  ...nodes.image.attributes,
  width: { type: Number, render: false },
  height: { type: Number, render: false },
  loading: { type: String, render: false },
  decoding: { type: String, render: false },
};

export default defineMarkdocConfig({
  tags: {},
  nodes: {
    image: {
      ...nodes.image,
      attributes: imgAttrs,
      transform(node, config) {
        const attributes = node.transformAttributes(config);
        const children = node.transformChildren(config);
        const src = typeof attributes.src === 'string' ? attributes.src : '';
        const dims = dimensions[src];
        if (dims) {
          if (attributes.width === undefined) attributes.width = dims[0];
          if (attributes.height === undefined) attributes.height = dims[1];
        }
        if (attributes.loading === undefined) attributes.loading = 'lazy';
        if (attributes.decoding === undefined) attributes.decoding = 'async';
        return new Tag('img', attributes, children);
      },
    },
  },
});
