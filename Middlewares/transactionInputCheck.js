import z from 'zod';

const transactionInputSchema = z.object({
    payerId : z.string(),
    amountToSend : z.number().positive()
})

export const transactionInputCheck = (req , res , next) => {
    const data = req.body;
    transactionInputSchema.parseAsync(data)
        .then(() => {
            console.log("Transaction Amount Input Check Successful ...")
            next();
        })
        .catch((error) => {
            res.status(500).send({
                Error: `Incorrect User Input: ${error} !!!`
            });
        })
}