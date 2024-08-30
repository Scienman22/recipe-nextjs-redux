export default [
    {
        key: "name",
        value: "Your Name", 
        name: "name", 
        meta: {
            datatype: 'text',
            required: true,
        }
    },
    {
        key: "email",
        value: "Email Address", 
        name: "email", 
        meta: {
            datatype: 'email',
            required: true,
        }
    },
    {
        key: "title",
        value: "Title", 
        name: "title", 
        meta: {
            datatype: 'text',
            required: true,
        }
    },
    {
        key: "description",
        value: "Description", 
        name: "description", 
        meta: {
            datatype: 'textarea',
            required: false,
        }
    },
    {
        key: "ingredients",
        value: "Ingredients", 
        name: "ingredients", 
        meta: {
            datatype: 'textarea',
            required: true,
        }
    },
    {
        key: "instructions",
        value: "Instructions", 
        name: "instructions", 
        meta: {
            datatype: 'textarea',
            required: true,
        }
    },
]