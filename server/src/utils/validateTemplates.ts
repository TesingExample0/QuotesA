import { templateInput } from 'src/resolvers/templates';

export const validateTemplate = (input: templateInput) => {
    if (!input.subject) {
        return [
            {
                field: 'subject',
                message: 'subject can not be empty',
            },
        ];
    }
    if (input.title.length <= 2) {
        return [
            {
                field: 'title',
                message: 'length must be greater than 2',
            },
        ];
    }
    if (input.body.length <= 10) {
        return [
            {
                field: 'template',
                message: 'Template is too small',
            },
        ];
    }

    return null;
};
