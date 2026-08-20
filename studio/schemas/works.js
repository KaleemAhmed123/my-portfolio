export default {
    name: 'works',
    title: 'Works',
    type: 'document',
    fields: [
      {
        name: 'order',
        title: 'Order',
        type: 'number',
        description: 'Lower numbers show first.',
      },
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
    
      {
        name: 'role',
        title: 'My Role',
        type: 'string',
        description: 'Ownership signal shown as a pill, e.g. "Sole engineer", "Lead architect".',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'string',
      },
      {
        name: 'problem',
        title: 'The Idea / Problem',
        type: 'text',
        rows: 3,
        description: 'What this solves and why it needed to exist. Leads the modal.',
      },
      {
        name: 'highlights',
        title: 'Engineering Highlights',
        type: 'array',
        of: [{ type: 'string' }],
        description: 'The hard parts — one bullet each (event flow, idempotency, RAG grounding, scaling call…).',
      },
      {
        name: 'projectLink',
        title: 'Project Link',
        type: 'string',
      },
      {
        name: 'codeLink',
        title: 'Code Link',
        type: 'string',
      },
      {
        name: 'imgUrl',
        title: 'ImageUrl',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'clipUrl',
        title: 'Clip URL',
        type: 'url',
        description: 'Optional preview video (mp4/webm) shown in the project modal. Falls back to the image when empty.',
      },
      {
        name: 'credentialsKey',
        title: 'Credentials Search Key',
        type: 'string',
        description: 'If this project has test-access credentials, put the exact term that finds it on the Credentials page (e.g. the credentials Project Name). Leave empty to hide the "Test credentials" button.',
      },

      {
        name: 'tags',
        title: 'Tags',
       type:'array',
       of: [
         {
           name:'tag',
           title:'Tag',
           type:'string'
         }
       ]
      },
     
    ],
  };