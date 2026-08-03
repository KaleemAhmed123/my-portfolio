export default {
  name: 'credentials',
  title: 'Test Access Credentials',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Project Name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers show first.',
    },
    {
      name: 'projectLink',
      title: 'Project Link (optional)',
      type: 'string',
    },
    {
      name: 'codeLink',
      title: 'Code Link (optional)',
      type: 'string',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'environments',
      title: 'Environments',
      description: 'e.g. Testing, Staging, Live — each can have its own URLs and logins.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'environment',
          title: 'Environment',
          fields: [
            {
              name: 'name',
              title: 'Environment Name',
              type: 'string',
              description: 'Testing, Staging, Live, …',
            },
            {
              name: 'note',
              title: 'Note',
              type: 'string',
            },
            {
              name: 'portals',
              title: 'Portals / Roles',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'portal',
                  title: 'Portal',
                  fields: [
                    { name: 'role', title: 'Role / Portal Name', type: 'string' },
                    { name: 'url', title: 'URL', type: 'string' },
                    { name: 'email', title: 'Email', type: 'string' },
                    { name: 'username', title: 'Username', type: 'string' },
                    { name: 'password', title: 'Password', type: 'string' },
                    { name: 'token', title: 'Token / API Key', type: 'string' },
                    { name: 'note', title: 'Note', type: 'string' },
                  ],
                  preview: {
                    select: { title: 'role', subtitle: 'url' },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'name' },
            prepare: ({ title }) => ({ title: title || 'Environment' }),
          },
        },
      ],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'description' },
  },
};
