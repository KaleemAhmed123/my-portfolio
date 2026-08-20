export default {
    name: 'personalInfo',
    title: 'Personal Info',
    type: 'document',
    fields: [
        {
            name: 'fullName',
            title: 'Full Name',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'phone',
            title: 'Phone',
            type: 'string',
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: Rule => Rule.required().email()
        },
        {
            name: 'website',
            title: 'Website',
            type: 'url',
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
        },
    ],
};
