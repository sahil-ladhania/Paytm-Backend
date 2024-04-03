import z from 'zod'

const signupInputSchema = z.object({
    firstName : z.string().min(3).max(10),
    lastName : z.string().min(3).max(10),
    email : z.string(),
    password : z.string().min(8).max(20)
});

export const signupInputCheck = (req , res , next) => {
    const data = req.body;
    signupInputSchema.parseAsync(data)
        .then(() => {
            res.status(200).send({
                Message: "Signup Input Check Successful ..."
            });
            return next();
        })
        .catch((error) => {
            res.status(500).send({
                Error: `Incorrect User Input: ${error} !!!`
            });
        });
}