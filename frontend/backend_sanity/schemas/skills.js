export default{
    name:'skills',
    title:'Skills',
    type: 'document',
    fields:[
        {
            name:'order',
            title:'Order',
            type:'number',
            description:'Lower numbers show first.'
        },
        {
            name:'name',
            title:'Name',
            type:'string'
        },
        {
            name:'bgColor',
            title:'BgColor',
            type:'string'
        },
        {
            name:'icon',
            title:'Icon',
            type: 'image',
            options: {
              hotspot: true,
            },
        },
        
    ]
}