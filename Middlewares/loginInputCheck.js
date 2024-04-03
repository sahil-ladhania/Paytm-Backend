import z from 'zod';

const loginInputSchema = z.object({
    email : z.string(),
    password : z.string().min(8).max(20)
});

export const loginInputCheck = (req , res , next) => {
    const data = req.body;
    loginInputSchema.parseAsync(data)
        .then(() => {
            console.log("Input Data Valid Hai ...")
            next();
        })
        .catch((error) => {
            res.status(500).send({
                Error: `Incorrect User Input: ${error} !!!`
            });
        })
}