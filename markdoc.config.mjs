import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  tags: {
    design_showcase: {
      render: component('./src/components/markdown/DesignShowcase.astro'),
      attributes: {
        templates: {
          type: Array,
          required: true,
        },
      },
    },
  },
});
