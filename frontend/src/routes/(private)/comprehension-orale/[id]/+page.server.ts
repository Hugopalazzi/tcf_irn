export const load = async ({ params }) => {
    const title = ` Module ${params.id}`
    return {
        title
    };
};