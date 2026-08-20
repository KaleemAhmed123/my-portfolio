export default {
    name: 'intro',
    title: 'Intro',
    type: 'document',
    fields: [
        {
            name: 'roleLabel',
            title: 'Role Label',
            type: 'string',
            description: 'Shown under the greeting, e.g. "Full-Stack AI Engineer".',
        },
        {
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
            description: 'One line under the role label.',
        },
        {
            name: 'stats',
            title: 'Stat Strip',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'value', title: 'Value', type: 'string' },
                    { name: 'label', title: 'Label', type: 'string' },
                ],
                preview: { select: { title: 'value', subtitle: 'label' } },
            }],
            description: 'Figures shown as a strip under the intro.',
        },
        {
            name: 'greeting',
            title: 'Greeting',
            type: 'string',
            description: 'e.g., "Hello There!"',
        },
        {
            name: 'section1',
            title: 'Section 1',
            type: 'text',
            description: 'First paragraph about yourself',
            validation: Rule => Rule.required()
        },
        {
            name: 'section2',
            title: 'Section 2',
            type: 'text',
            description: 'Second paragraph about your skills and experience',
            validation: Rule => Rule.required()
        },
        {
            name: 'section3',
            title: 'Section 3',
            type: 'text',
            description: 'Third paragraph about your goals and aspirations',
            validation: Rule => Rule.required()
        },
    ],
};
