import z from 'zod';

const searchInputSchema = z.string().min(3).max(20);

export const searchInputCheck = (req , res , next) => {
    const data = req.body.name;
    searchInputSchema.parseAsync(data)
        .then(() => {
            console.log("Search Input Check Successful ...")
            next();
        })
        .catch((error) => {
            res.status(500).send({
                Error: `Incorrect User Input: ${error} !!!`
            });
        })
}