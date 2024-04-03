import z from 'zod';

const searchInputSchema = z.string().min(3).max(10);

export const searchInputCheck = (req , res , next) => {
    const data = req.body;
    searchInputSchema.parseAsync(data)
        .then(() => {
            res.status(200).send({
                Message: "Search Input Check Successful ..."
            });
            return next();
        })
        .catch((error) => {
            res.status(500).send({
                Error: `Incorrect User Input: ${error} !!!`
            });
        })
}