export default {
    name: 'socialLinks',
    title: 'Social Links',
    type: 'document',
    fields: [
        {
            name: 'platform',
            title: 'Platform',
            type: 'string',
            description: 'e.g., LinkedIn, GitHub, Twitter, Stack Overflow',
            validation: Rule => Rule.required(),
            options: {
                list: [
                    { title: 'LinkedIn', value: 'linkedin' },
                    { title: 'GitHub', value: 'github' },
                    { title: 'Twitter', value: 'twitter' },
                    { title: 'Stack Overflow', value: 'stackoverflow' },
                    { title: 'Facebook', value: 'facebook' },
                    { title: 'Instagram', value: 'instagram' },
                    { title: 'Other', value: 'other' },
                ],
            },
        },
        {
            name: 'url',
            title: 'URL',
            type: 'url',
            validation: Rule => Rule.required().uri({
                scheme: ['http', 'https']
            })
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which this link should appear',
        },
    ],
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }]
        }
    ]
};
